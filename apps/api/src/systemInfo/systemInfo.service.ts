import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { currentLoad } from "systeminformation";

@Injectable()
export class SystemInfoService {
  private logger: Logger = new Logger(SystemInfoService.name);
  private cpuData: { time: Date; value: number }[] = [];

  @Interval(1000)
  private async updateCpuData() {
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
}
