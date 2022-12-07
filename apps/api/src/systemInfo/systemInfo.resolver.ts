import { Logger } from "@nestjs/common";
import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { subscriptionInterval } from "src/utils/subscriptionIntervalHelper";
import { SystemLoadItem } from "./models/cpuLoad.model";
import { MemoryInfo } from "./models/memoryInfo.model";
import { SystemInfoService } from "./systemInfo.service";

@Resolver()
export class SystemInfoResolver {
  constructor(private systemInfoService: SystemInfoService) {}
  private logger = new Logger(SystemInfoResolver.name);

  @Query(() => MemoryInfo)
  async memoryInfo(): Promise<MemoryInfo> {
    return this.systemInfoService.getMemoryInfo();
  }

  @Subscription(() => SystemLoadItem)
  currentMemoryUsage() {
    return subscriptionInterval(
      async () => ({
        time: new Date(),
        value: await this.systemInfoService.getMemoryUsage(),
      }),
      "currentMemoryUsage",
      2000
    );
  }

  @Query(() => [SystemLoadItem])
  cpuLoadHistory(): SystemLoadItem[] {
    return this.systemInfoService.getCpuData();
  }

  @Subscription(() => SystemLoadItem)
  currentCpuLoad() {
    return subscriptionInterval(
      async () => ({
        time: new Date(),
        value: await this.systemInfoService.getCpuLoad(),
      }),
      "currentCpuLoad",
      2000
    );
  }
}
