import { Field, ObjectType } from '@nestjs/graphql';
import { Modules } from './modules.model';
import { Settings } from './settings.model';

@ObjectType()
export class Config {
  @Field()
  name: string;

  @Field(() => Settings)
  settings: Settings;

  @Field(() => Modules)
  modules: Modules;
}
