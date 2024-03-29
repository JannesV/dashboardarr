import { Logger } from "@nestjs/common";
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import { pubSub } from "src/utils/pubSub";
import { withStaticFields } from "src/utils/withObservable";
import { SabnzbdService } from "../sabnzbd/sabnzbd.service";
import { UsenetHistory } from "./models/usenetHistory.model";
import { UsenetInfo } from "./models/usenetInfo.model";
import { UsenetQueue } from "./models/usenetQueu.model";

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

  @Subscription(() => UsenetInfo, { name: "usenetInfo" })
  async usenetInfoUpdated(@Args("serviceId") serviceId: string) {
    return this.subscribe(
      () => this.sabnzbdService.getInfo(serviceId),
      "usenetInfo"
    );
  }

  // Todo: More refined subscription on an item basis
  @Subscription(() => UsenetQueue, { name: "usenetQueue" })
  usenetQueueSubscription(
    @Args("serviceId") serviceId: string,
    @Args("limit", { type: () => Int }) limit: number,
    @Args("offset", { type: () => Int }) offset: number
  ) {
    return this.subscribe(
      () =>
        this.sabnzbdService.getQueue({
          serviceId,
          limit,
          offset,
        }),
      "usenetQueue"
    );
  }

  // Todo: More refined subscription on an item basis
  @Subscription(() => UsenetHistory, { name: "usenetHistory" })
  usenetHistorySubscription(
    @Args("serviceId") serviceId: string,
    @Args("limit", { type: () => Int }) limit: number,
    @Args("offset", { type: () => Int }) offset: number
  ) {
    return this.subscribe(
      () =>
        this.sabnzbdService.getHistory({
          serviceId,
          limit,
          offset,
        }),
      "usenetHistory"
    );
  }

  async subscribe(dataFn: () => Promise<any>, key: string) {
    let prevValue: any = await dataFn();

    const interval = setInterval(async () => {
      try {
        const data = await dataFn();

        if (JSON.stringify(prevValue) !== JSON.stringify(data)) {
          prevValue = data;
          pubSub.publish(key, {
            [key]: data,
          });
        }
      } catch (err) {
        this.logger.warn(`Error fetching data for ${key}`, err);
      }
    }, 1000);

    return withStaticFields(pubSub.asyncIterator(key), () => {
      clearInterval(interval);
    });
  }
}
