import { Logger } from "@nestjs/common";
import {
  Field,
  ObjectType,
  Query,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import { subscriptionInterval } from "src/utils/subscriptionIntervalHelper";
import {
  currentLoad,
  mem,
  fsSize,
  diskLayout,
  blockDevices,
} from "systeminformation";
import { format } from "util";
import { SystemInfoService } from "./systemInfo.service";
@ObjectType()
class Info {
  @Field()
  totalMemory: number;

  @Field()
  usedMemory: number;

  @Field()
  totalDiskSpace: number;
}

@Resolver()
export class SystemInfoResolver {
  constructor(private systemInfoService: SystemInfoService) {}
  private logger = new Logger(SystemInfoResolver.name);
  @Query(() => Info)
  async getSystemInfo(): Promise<Info> {
    const [memory, diskSize, diskLay, blockDev] = await Promise.all([
      await mem(),
      await fsSize(),
      await diskLayout(),
      await blockDevices(),
    ]);

    this.logger.log(
      format({
        diskSize: diskSize,
        diskLayout: diskLay,
        blockDevices: blockDev,
      })
    );

    return {
      totalMemory: memory.total,
      usedMemory: memory.active,
      totalDiskSpace: 0,
    };
  }

  @Query(() => [CpuLoad], { name: "cpuLoad" })
  cpuLoad(): CpuLoad[] {
    return this.systemInfoService.getCpuData();
  }

  @Subscription(() => CpuLoad, { name: "cpuLoad" })
  cpuLoadSubscription() {
    return subscriptionInterval(async () => {
      const data = await currentLoad();

      return {
        time: new Date(),
        value: data.currentLoad,
      };
    }, "cpuLoad");
  }
}

@ObjectType()
class CpuLoad {
  @Field()
  time: Date;

  @Field()
  value: number;
}
