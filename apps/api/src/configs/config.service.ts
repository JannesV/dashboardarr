import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { stripTypenames } from "@dashboardarr/common";
import { mkdir, readdir, readFile, stat, writeFile } from "fs/promises";
import { v4 } from "uuid";
import { ServiceType } from "../services/models/serviceType.enum";
import { Service } from "../services/models/service.model";
import { ServiceInput } from "../services/models/serviceInput.model";
import { join, resolve } from "path";
import { cwd } from "process";
import { Config } from "./models/config.model";
import { ColorMode } from "./models/colorMode.enum";
import { SettingsInput } from "./models/settingsInput.model";
import { ModulePositionInput } from "./models/modulePositionInput.model";
import { ModuleItemInput } from "./models/moduleItemInput.model";
import { getModuleFromInput } from "src/utils/getModuleFromInput";
import { FileUpload } from "graphql-upload/GraphQLUpload.js";
import sharp from "sharp";

const DATA_FOLDER = join(cwd(), "data");
export const ICONS_FOLDER = join(DATA_FOLDER, "icons");
const CONFIGS_FOLDER = join(DATA_FOLDER, "configs");

const SERVICES_PATH = join(DATA_FOLDER, "services.json");

const EMPTY_CONFIG: Config = {
  name: "default",
  settings: {
    colorMode: ColorMode.Auto,
  },
  modules: [],
};

@Injectable()
export class ConfigService implements OnModuleInit {
  private logger: Logger = new Logger(ConfigService.name);

  public async onModuleInit() {
    try {
      await stat(DATA_FOLDER);
    } catch (err) {
      this.logger.debug(
        "Data directory does not exist. Creating initial setup."
      );
      await mkdir(DATA_FOLDER, { recursive: true });
      await mkdir(ICONS_FOLDER, { recursive: true });
      await mkdir(CONFIGS_FOLDER, { recursive: true });

      await writeFile(SERVICES_PATH, "[]");
      await writeFile(
        join(CONFIGS_FOLDER, "default.json"),
        JSON.stringify(EMPTY_CONFIG)
      );
    }
  }

  public async getConfigs(): Promise<Config[]> {
    const files = await readdir(CONFIGS_FOLDER);
    const configs = files.map((file) => file.replace(".json", ""));

    return Promise.all(
      configs.map(async (configName) => this.getConfig(configName))
    );
  }

  public async getConfig(configName: string): Promise<Config> {
    const path = join(CONFIGS_FOLDER, `${configName}.json`);

    const config = JSON.parse(await readFile(path, "utf8")) as Config;

    return config;
  }

  public async getServices(...serviceTypes: ServiceType[]): Promise<Service[]> {
    const services = JSON.parse(
      await readFile(SERVICES_PATH, "utf8")
    ) as Service[];

    if (serviceTypes.length) {
      return services.filter((s) => serviceTypes.includes(s.type));
    }

    return services;
  }

  public async getServiceById(serviceId: string): Promise<Service> {
    const services = await this.getServices();

    const service = services.find((s) => s.id === serviceId);

    if (!service) {
      throw new Error(`Service with id: ${serviceId} is not found.`);
    }

    return service;
  }

  public async saveService(
    serviceInput: ServiceInput,
    serviceId?: string
  ): Promise<{ services: Service[]; updatedService: Service }> {
    const services = await this.getServices();

    const icon = await this.processImage(serviceInput.icon);

    let updatedService: Service;

    if (serviceId) {
      const serviceIndex = services.findIndex((s) => s.id === serviceId);

      if (serviceIndex < 0) {
        throw new Error(`Service with id: ${serviceId} is not found.`);
      }

      updatedService = {
        ...services[serviceIndex],
        ...serviceInput,
        icon: icon || services[serviceIndex].icon,
      };

      services[serviceIndex] = updatedService;
    } else {
      if (!icon) {
        throw new Error("Icon is missing");
      }

      updatedService = {
        ...serviceInput,
        id: v4(),
        icon,
      };
      services.push(updatedService);
    }

    await writeFile(
      SERVICES_PATH,
      JSON.stringify(stripTypenames(services), null, 2)
    );

    return {
      services,
      updatedService,
    };
  }

  public async deleteService(...serviceIds: string[]) {
    const services = await this.getServices();

    const configs = await this.getConfigs();

    await Promise.all(
      configs.map((c) => this.deleteModuleByServiceIds(c.name, serviceIds))
    );

    await writeFile(
      SERVICES_PATH,
      JSON.stringify(
        services.filter((f) => !serviceIds.some((id) => id === f.id)),
        null,
        2
      )
    );
  }

  public async writeConfig(
    configName: string,
    config: Config
  ): Promise<Config> {
    const path = join(CONFIGS_FOLDER, `${configName}.json`);

    await writeFile(path, JSON.stringify(stripTypenames(config), null, 2));

    return config;
  }

  public async updateSettings(
    configName: string,
    settings: SettingsInput
  ): Promise<Config> {
    const config = await this.getConfig(configName);

    return await this.writeConfig(configName, {
      ...config,
      settings: {
        ...config.settings,
        ...settings,
      },
    });
  }

  public async updateModulePositions(
    configName: string,
    modulePositions: ModulePositionInput[]
  ): Promise<Config> {
    const config = await this.getConfig(configName);

    return await this.writeConfig(configName, {
      ...config,
      modules: config.modules.map((mod) => ({
        ...mod,
        position: {
          ...(modulePositions.find((pos) => pos.id === mod.id) || mod.position),
          id: undefined,
        },
      })),
    });
  }

  public async addModule(
    configName: string,
    input: ModuleItemInput
  ): Promise<Config> {
    const config = await this.getConfig(configName);

    const { module, type, constraint } = getModuleFromInput(input);

    // TODO Get position on first row with enough space
    const maxY = config.modules.reduce(
      (prev, { position }) => Math.max(prev, position.y + (position.h || 1)),
      0
    );

    return await this.writeConfig(configName, {
      ...config,
      modules: [
        ...config.modules,
        {
          id: v4(),
          position: {
            x: 0,
            y: maxY,
            h: constraint.minHeight,
            w: constraint.minWidth,
          },
          type,
          ...module,
        },
      ],
    });
  }

  public async deleteModuleById(
    configName: string,
    moduleId: string
  ): Promise<Config> {
    const config = await this.getConfig(configName);

    return await this.writeConfig(configName, {
      ...config,
      modules: config.modules.filter((m) => m.id !== moduleId),
    });
  }
  public async deleteModuleByServiceIds(
    configName: string,
    serviceIds: string[]
  ): Promise<Config> {
    const config = await this.getConfig(configName);

    return await this.writeConfig(configName, {
      ...config,
      modules: config.modules.filter((m) => {
        if ("serviceId" in m && serviceIds.includes((m as any).serviceId)) {
          return false;
        }

        return true;
      }),
    });
  }

  private async processImage(
    image: Promise<FileUpload> | undefined
  ): Promise<string | void> {
    if (!image) {
      return;
    }

    const { createReadStream } = await image;

    const chunks = [];
    for await (const chunk of createReadStream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const filename = `${v4()}.png`;

    const d = await sharp(buffer)
      .png()
      .resize(300)
      .trim()
      .toFile(resolve(ICONS_FOLDER, filename));

    return filename;
  }
}
