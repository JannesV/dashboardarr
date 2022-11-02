import { Logger } from "@nestjs/common";
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { withStaticFields } from "src/utils/withObservable";
import { SabnzbdService } from "../sabnzbd/sabnzbd.service";
import { UsenetHistory } from "./models/usenetHistory.model";
import { UsenetInfo } from "./models/usenetInfo.model";
import { UsenetQueue } from "./models/usenetQueu.model";

const pubSub = new PubSub();

@Resolver()
export class UsenetResolver {
  private logger = new Logger(UsenetResolver.name);
  constructor(private sabnzbdService: SabnzbdService) {}

  @Query(() => UsenetHistory)
  usenetHistory(
    @Args("serviceId") serviceId: string,
    @Args("limit", { type: () => Int }) limit: number,
    @Args("offset", { type: () => Int }) offset: number
  ): Promise<UsenetHistory> {
    return this.sabnzbdService.getHistory({
      serviceId,
      limit,
      offset,
    });
  }

  @Query(() => UsenetQueue)
  usenetQueue(
    @Args("serviceId") serviceId: string,
    @Args("limit", { type: () => Int }) limit: number,
    @Args("offset", { type: () => Int }) offset: number
  ): Promise<UsenetQueue> {
    return this.sabnzbdService.getQueue({
      serviceId,
      limit,
      offset,
    });
  }

  @Query(() => UsenetInfo)
  usenetInfo(@Args("serviceId") serviceId: string): Promise<UsenetInfo> {
    return this.sabnzbdService.getInfo(serviceId);
  }

  @Mutation(() => UsenetInfo)
  async pauseUsenetQueue(
    @Args("serviceId") serviceId: string
  ): Promise<UsenetInfo> {
    await this.sabnzbdService.pauseQueue(serviceId);

    return this.sabnzbdService.getInfo(serviceId);
  }

  @Mutation(() => UsenetInfo)
  async resumeUsenetQueue(
    @Args("serviceId") serviceId: string
  ): Promise<UsenetInfo> {
    await this.sabnzbdService.resumeQueue(serviceId);

    return this.sabnzbdService.getInfo(serviceId);
  }

  @Subscription(() => UsenetInfo)
  async usenetInfoUpdated(@Args("serviceId") serviceId: string) {
    let prevValue: UsenetInfo = await this.sabnzbdService.getInfo(serviceId);

    const interval = setInterval(async () => {
      const data = await this.sabnzbdService.getInfo(serviceId);

      // Todo better equal
      if (JSON.stringify(prevValue) !== JSON.stringify(data)) {
        console.log("Data changed");
        prevValue = data;
        pubSub.publish("usenetInfoUpdated", {
          usenetInfoUpdated: data,
        });
      }
    }, 1000);

    return withStaticFields(pubSub.asyncIterator("usenetInfoUpdated"), () => {
      clearInterval(interval);
      console.log("Cleared interval");
    });
  }
}
