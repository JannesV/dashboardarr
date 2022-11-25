import { Injectable, OnModuleInit } from "@nestjs/common";

import { caching, MemoryCache } from "cache-manager";

@Injectable()
export class CacheManager implements OnModuleInit {
  private manager: MemoryCache;

  async onModuleInit() {
    this.manager = await caching("memory", {
      ttl: 60000,
    });
  }

  async get<T>(key: string): Promise<T | undefined> {
    console.log(await this.manager.store.keys());
    return this.manager.get(key);
  }

  set(key: string, value: unknown, ttl?: number): Promise<void> {
    return this.manager.set(key, value, ttl);
  }
}
