import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { ConfigService } from "src/configs/config.service";
import { Service } from "src/services/models/service.model";
import { UsenetModule } from "./models/usenetModule.model";

@Resolver(() => UsenetModule)
export class UsenetModuleResolver {
  constructor(private configService: ConfigService) {}

  @ResolveField(() => Service)
  service(@Parent() parent: UsenetModule): Promise<Service> {
    return this.configService.getServiceById(parent.serviceId);
  }
}
