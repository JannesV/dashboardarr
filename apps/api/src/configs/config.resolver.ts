import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Config } from "./models/config.model";
import { ConfigService } from "./config.service";

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
}
