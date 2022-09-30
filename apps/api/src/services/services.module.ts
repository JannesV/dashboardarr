import { Module } from '@nestjs/common';
import { ServicesResolver } from './services.resolver';

@Module({
  providers: [ServicesResolver],
})
export class ServicesModule {}
