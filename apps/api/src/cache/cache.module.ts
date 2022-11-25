import { Global, Module } from "@nestjs/common";
import { CacheManager } from "./cacheManager";

@Module({
  providers: [CacheManager],
  exports: [CacheManager],
})
@Global()
export class CacheModule {}
