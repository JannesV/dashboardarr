import { Module } from "@nestjs/common";
import { SystemInfoResolver } from "./systemInfo.resolver";

@Module({
  providers: [SystemInfoResolver],
})
export class SystemInfoModule {}
