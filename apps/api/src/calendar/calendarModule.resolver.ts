import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { ConfigService } from "src/configs/config.service";
import { Service } from "src/services/models/service.model";
import { CalendarModule } from "./models/calendarModule.model";

@Resolver(() => CalendarModule)
export class CalendarModuleResolver {
  constructor(private configService: ConfigService) {}

  @ResolveField(() => [Service])
  services(@Parent() parent: CalendarModule): Promise<Service[]> {
    return [] as any;
  }
}
