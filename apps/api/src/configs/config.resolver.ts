import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Config } from "./models/config.model";
import { ConfigService } from "./config.service";
import { SettingsInput } from "./models/settingsInput.model";
import { ModulePositionInput } from "./models/modulePositionInput.model";
import { ModuleItemInput } from "./models/moduleItemInput.model";

@Resolver(() => Config)
export class ConfigResolver {
  constructor(private configService: ConfigService) {}

  @Query(() => Config)
  async config(@Args("configName") configName: string): Promise<Config> {
    return this.configService.getConfig(configName);
  }

  @Query(() => [Config])
  async configs(): Promise<Config[]> {
    return this.configService.getConfigs();
  }

  @Mutation(() => Config)
  async updateConfig(
    @Args("configName") configName: string,
    @Args("body") configBody: string
  ): Promise<Config> {
    return this.configService.writeConfig(configName, JSON.parse(configBody));
  }

  @Mutation(() => Config)
  async updateSettings(
    @Args("configName") configName: string,
    @Args("settings") settings: SettingsInput
  ): Promise<Config> {
    return this.configService.updateSettings(configName, settings);
  }

  @Mutation(() => Config)
  async updateModulePositions(
    @Args("configName") configName: string,
    @Args("positions", { type: () => [ModulePositionInput] })
    positions: ModulePositionInput[]
  ): Promise<Config> {
    return this.configService.updateModulePositions(configName, positions);
  }

  @Mutation(() => Config)
  async addModuleItem(
    @Args("configName") configName: string,
    @Args("module", { type: () => ModuleItemInput })
    module: ModuleItemInput
  ): Promise<Config> {
    return this.configService.addModule(configName, module);
  }

  @Mutation(() => Config)
  async deleteModuleItem(
    @Args("configName") configName: string,
    @Args("moduleId")
    moduleId: string
  ): Promise<Config> {
    return this.configService.deleteModule(configName, moduleId);
  }
}
