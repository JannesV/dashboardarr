import { Module } from "@nestjs/common";
import { SystemInfoResolver } from "./systemInfo.resolver";
import { SystemInfoService } from "./systemInfo.service";

@Module({
  providers: [SystemInfoResolver, SystemInfoService],
})
export class SystemInfoModule {}
