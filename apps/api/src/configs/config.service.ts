import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { mkdir, readdir, readFile, stat, writeFile } from "fs/promises";
import { v4 } from "uuid";
import { ServiceType } from "../services/models/serviceType.enum";
import { Service } from "../services/models/service.model";
import { ServiceInput } from "../services/models/serviceInput.model";
import { join } from "path";
import { cwd } from "process";
import { Config } from "./models/config.model";
import { stripTypenames } from "src/utils/stripTypenames";

const DATA_FOLDER = join(cwd(), "data");
const CONFIGS_FOLDER = join(DATA_FOLDER, "configs");

const SERVICES_PATH = join(DATA_FOLDER, "services.json");

const EMPTY_CONFIG: Config = {
  name: "default",
  settings: {},
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

    const updatedService = {
      ...serviceInput,
      id: serviceId || v4(),
    };

    if (serviceId) {
      const serviceIndex = services.findIndex((s) => s.id === serviceId);

      if (serviceIndex < 0) {
        throw new Error(`Service with id: ${serviceId} is not found.`);
      }

      services[serviceIndex] = {
        ...services[serviceIndex],
        ...serviceInput,
      };
    } else {
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
}
