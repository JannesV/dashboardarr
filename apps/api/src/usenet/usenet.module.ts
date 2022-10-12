import { Module } from "@nestjs/common";
import { SabnzbdModule } from "../sabnzbd/sabnzbd.module";
import { UsenetResolver } from "./usenet.resolver";
import { UsenetModuleResolver } from "./usenetModule.resolver";

@Module({
  providers: [UsenetResolver, UsenetModuleResolver],
  imports: [SabnzbdModule],
})
export class UsenetModule {}
