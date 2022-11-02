import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ConfigService } from "src/configs/config.service";
import { Service } from "src/services/models/service.model";
import { ServiceInput } from "src/services/models/serviceInput.model";

@Resolver()
export class ServicesResolver {
  constructor(private configService: ConfigService) {}

  @Mutation(() => Service)
  async createService(
    @Args("service") serviceInput: ServiceInput
  ): Promise<Service> {
    return (await this.configService.saveService(serviceInput)).updatedService;
  }

  @Mutation(() => Service)
  async updateService(
    @Args("id") id: string,
    @Args("service") serviceInput: ServiceInput
  ): Promise<Service> {
    return (await this.configService.saveService(serviceInput, id))
      .updatedService;
  }

  @Mutation(() => Boolean)
  async deleteService(
    @Args("ids", { type: () => [String] }) ids: string[]
  ): Promise<boolean> {
    await this.configService.deleteService(...ids);

    return true;
  }

  @Query(() => [Service])
  async services() {
    return (await this.configService.getServices()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
}
