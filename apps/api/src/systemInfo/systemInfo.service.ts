import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { currentLoad, mem } from "systeminformation";

@Injectable()
export class SystemInfoService {
  private logger: Logger = new Logger(SystemInfoService.name);
  private cpuData: { time: Date; value: number }[] = [];

  @Interval(2000)
  protected async updateCpuData() {
    const data = await currentLoad();

    this.cpuData = [
      ...this.cpuData.slice(-9),
      {
        time: new Date(),
        value: data.currentLoad,
      },
    ];
  }

  public getCpuData() {
    return this.cpuData;
  }

  public async getCpuLoad() {
    const data = await currentLoad();

    return data.currentLoad;
  }

  public async getMemoryInfo() {
    const memory = await mem();

    return {
      totalMemory: memory.total,
      usedMemory: memory.active,
    };
  }

  public async getMemoryUsage() {
    const memory = await mem();

    return memory.active;
  }
}
