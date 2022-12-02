import { Logger } from "@nestjs/common";
import { Field, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { currentLoad, mem, fsSize, diskLayout } from "systeminformation";
import { format } from "util";
@ObjectType()
class Info {
  @Field()
  currentCpuLoad: number;

  @Field(() => [Number])
  coreLoads: number[];

  @Field()
  totalMemory: number;

  @Field()
  usedMemory: number;

  @Field()
  totalDiskSpace: number;
}

@Resolver()
export class SystemInfoResolver {
  private logger = new Logger(SystemInfoResolver.name);
  @Query(() => Info)
  async getSystemInfo(): Promise<Info> {
    const [load, memory, diskSize, layout] = await Promise.all([
      await currentLoad(),
      await mem(),
      await fsSize(),
      await diskLayout(),
    ]);

    this.logger.log(format({ diskSize, diskLayout: layout, load, memory }));

    return {
      currentCpuLoad: load.currentLoad,
      totalMemory: memory.total,
      usedMemory: memory.used,
      coreLoads: load.cpus.map((c) => c.load),
      totalDiskSpace: 0,
    };
  }
}
