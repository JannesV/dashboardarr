import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Service } from "src/services/models/service.model";
import { ConfigService } from "./config.service";
import { ButtonModule } from "./models/buttonModule.model";

@Resolver(() => ButtonModule)
export class ButtonModuleResolver {
  constructor(private configService: ConfigService) {}

  @ResolveField(() => Service)
  service(@Parent() parent: ButtonModule): Promise<Service> {
    return this.configService.getServiceById(parent.serviceId);
  }
}
