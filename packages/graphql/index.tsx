/* eslint-disable */
/* AUTOMATICALLY GENERATED FILE. DO NOT MODIFY. */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: string;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ButtonModule = ModuleItem & {
  __typename?: 'ButtonModule';
  id: Scalars['String'];
  position: ModulePosition;
  service: Service;
};

export type ButtonModuleInput = {
  serviceId: Scalars['String'];
};

export type CalendarItem = MovieCalendarItem | TvCalendarItem;

export type CalendarModule = ModuleItem & {
  __typename?: 'CalendarModule';
  id: Scalars['String'];
  position: ModulePosition;
  services: Array<Service>;
  startOfWeek: CalendarWeekStart;
};

export type CalendarModuleInput = {
  startOfWeek: CalendarWeekStart;
};

export enum CalendarWeekStart {
  Monday = 'MONDAY',
  Sunday = 'SUNDAY'
}

export enum ColorMode {
  Auto = 'Auto',
  Dark = 'Dark',
  Light = 'Light'
}

export type Config = {
  __typename?: 'Config';
  modules: Array<ModuleItem>;
  name: Scalars['String'];
  settings: Settings;
};

export enum DockerAction {
  Remove = 'Remove',
  Restart = 'Restart',
  Start = 'Start',
  Stop = 'Stop'
}

export type DockerContainer = {
  __typename?: 'DockerContainer';
  id: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  ports: Array<DockerPort>;
  status: DockerStatus;
};

export type DockerPort = {
  __typename?: 'DockerPort';
  private: Scalars['Float'];
  public: Scalars['Float'];
};

export enum DockerStatus {
  Created = 'Created',
  Exited = 'Exited',
  Running = 'Running',
  Unknown = 'Unknown'
}

export type MemoryInfo = {
  __typename?: 'MemoryInfo';
  totalMemory: Scalars['Float'];
  usedMemory: Scalars['Float'];
};

export type ModuleItem = {
  id: Scalars['String'];
  position: ModulePosition;
};

export type ModuleItemInput = {
  button?: InputMaybe<ButtonModuleInput>;
  calendar?: InputMaybe<CalendarModuleInput>;
  systemInfo?: InputMaybe<SystemInfoModuleInput>;
  usenet?: InputMaybe<UsenetModuleInput>;
};

export type ModulePosition = {
  __typename?: 'ModulePosition';
  h?: Maybe<Scalars['Float']>;
  w?: Maybe<Scalars['Float']>;
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type ModulePositionInput = {
  h?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
  w?: InputMaybe<Scalars['Float']>;
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type MovieCalendarItem = {
  __typename?: 'MovieCalendarItem';
  digitalDate?: Maybe<Scalars['DateTime']>;
  genres: Array<Scalars['String']>;
  imdbId: Scalars['String'];
  inCinemasDate?: Maybe<Scalars['DateTime']>;
  movieTitle: Scalars['String'];
  overview: Scalars['String'];
  poster?: Maybe<Scalars['String']>;
  voteAverage?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addModuleItem: Config;
  createService: Service;
  deleteModuleItem: Config;
  deleteService: Scalars['Boolean'];
  pauseUsenetQueue: UsenetInfo;
  resumeUsenetQueue: UsenetInfo;
  updateConfig: Config;
  updateContainers: Array<DockerContainer>;
  updateModulePositions: Config;
  updateService: Service;
  updateSettings: Config;
};


export type MutationAddModuleItemArgs = {
  configName: Scalars['String'];
  module: ModuleItemInput;
};


export type MutationCreateServiceArgs = {
  service: ServiceInput;
};


export type MutationDeleteModuleItemArgs = {
  configName: Scalars['String'];
  moduleId: Scalars['String'];
};


export type MutationDeleteServiceArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationPauseUsenetQueueArgs = {
  serviceId: Scalars['String'];
};


export type MutationResumeUsenetQueueArgs = {
  serviceId: Scalars['String'];
};


export type MutationUpdateConfigArgs = {
  body: Scalars['String'];
  configName: Scalars['String'];
};


export type MutationUpdateContainersArgs = {
  action: DockerAction;
  ids: Array<Scalars['String']>;
};


export type MutationUpdateModulePositionsArgs = {
  configName: Scalars['String'];
  positions: Array<ModulePositionInput>;
};


export type MutationUpdateServiceArgs = {
  id: Scalars['String'];
  service: ServiceInput;
};


export type MutationUpdateSettingsArgs = {
  configName: Scalars['String'];
  settings: SettingsInput;
};

export type Query = {
  __typename?: 'Query';
  calendar: Array<CalendarItem>;
  config: Config;
  configs: Array<Config>;
  containers: Array<DockerContainer>;
  cpuLoadHistory: Array<SystemLoadItem>;
  memoryInfo: MemoryInfo;
  search: Array<SearchResult>;
  services: Array<Service>;
  usenetHistory: UsenetHistory;
  usenetInfo: UsenetInfo;
  usenetQueue: UsenetQueue;
};


export type QueryCalendarArgs = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};


export type QueryConfigArgs = {
  configName: Scalars['String'];
};


export type QuerySearchArgs = {
  limit: Scalars['Int'];
  search: Scalars['String'];
};


export type QueryUsenetHistoryArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  serviceId: Scalars['String'];
};


export type QueryUsenetInfoArgs = {
  serviceId: Scalars['String'];
};


export type QueryUsenetQueueArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  serviceId: Scalars['String'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  image?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type Service = {
  __typename?: 'Service';
  apiKey?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  type: ServiceType;
  url: Scalars['String'];
};

export type ServiceInput = {
  apiKey?: InputMaybe<Scalars['String']>;
  externalUrl?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['Upload']>;
  name: Scalars['String'];
  type: ServiceType;
  url: Scalars['String'];
};

export enum ServiceType {
  DashDot = 'DashDot',
  Deluge = 'Deluge',
  Emby = 'Emby',
  Jellyseerr = 'Jellyseerr',
  Lidarr = 'Lidarr',
  Other = 'Other',
  Overseerr = 'Overseerr',
  Plex = 'Plex',
  Radarr = 'Radarr',
  Readarr = 'Readarr',
  Sabnzbd = 'Sabnzbd',
  Sonarr = 'Sonarr',
  Transmission = 'Transmission',
  QBittorrent = 'qBittorrent'
}

export type Settings = {
  __typename?: 'Settings';
  colorMode: ColorMode;
  favicon?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type SettingsInput = {
  colorMode?: InputMaybe<ColorMode>;
  favicon?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  currentCpuLoad: SystemLoadItem;
  currentMemoryUsage: SystemLoadItem;
  usenetHistory: UsenetHistory;
  usenetInfo: UsenetInfo;
  usenetQueue: UsenetQueue;
};


export type SubscriptionUsenetHistoryArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  serviceId: Scalars['String'];
};


export type SubscriptionUsenetInfoArgs = {
  serviceId: Scalars['String'];
};


export type SubscriptionUsenetQueueArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  serviceId: Scalars['String'];
};

export type SystemInfoModule = ModuleItem & {
  __typename?: 'SystemInfoModule';
  id: Scalars['String'];
  position: ModulePosition;
};

export type SystemInfoModuleInput = {
  test: Scalars['Boolean'];
};

export type SystemLoadItem = {
  __typename?: 'SystemLoadItem';
  time: Scalars['DateTime'];
  value: Scalars['Float'];
};

export type TvCalendarItem = {
  __typename?: 'TvCalendarItem';
  airDate: Scalars['DateTime'];
  episodeNumber: Scalars['Float'];
  episodeTitle: Scalars['String'];
  genres: Array<Scalars['String']>;
  imdbId: Scalars['String'];
  overview: Scalars['String'];
  poster?: Maybe<Scalars['String']>;
  seasonNumber: Scalars['Float'];
  seriesTitle: Scalars['String'];
  tvDbId: Scalars['String'];
};

export type UsenetHistory = {
  __typename?: 'UsenetHistory';
  items: Array<UsenetHistoryItem>;
  total: Scalars['Float'];
};

export type UsenetHistoryItem = {
  __typename?: 'UsenetHistoryItem';
  completedIn: Scalars['Float'];
  completedOn: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  size: Scalars['Float'];
  time: Scalars['Float'];
};

export type UsenetInfo = {
  __typename?: 'UsenetInfo';
  eta: Scalars['Float'];
  itemsRemaining: Scalars['Float'];
  paused: Scalars['Boolean'];
  sizeLeft: Scalars['Float'];
  speed: Scalars['Float'];
};

export type UsenetModule = ModuleItem & {
  __typename?: 'UsenetModule';
  id: Scalars['String'];
  position: ModulePosition;
  service: Service;
};

export type UsenetModuleInput = {
  serviceId: Scalars['String'];
};

export type UsenetQueue = {
  __typename?: 'UsenetQueue';
  items: Array<UsenetQueueItem>;
  total: Scalars['Float'];
};

export type UsenetQueueItem = {
  __typename?: 'UsenetQueueItem';
  eta: Scalars['Float'];
  id: Scalars['String'];
  name: Scalars['String'];
  progress: Scalars['Float'];
  size: Scalars['Float'];
  state: UsenetQueueStatus;
};

export enum UsenetQueueStatus {
  Downloading = 'Downloading',
  Paused = 'Paused',
  Queued = 'Queued'
}

export type AddModuleItemMutationVariables = Exact<{
  configName: Scalars['String'];
  module: ModuleItemInput;
}>;


export type AddModuleItemMutation = { __typename?: 'Mutation', addModuleItem: { __typename?: 'Config', name: string, settings: { __typename?: 'Settings', title?: string | null, logo?: string | null, favicon?: string | null, colorMode: ColorMode }, modules: Array<{ __typename?: 'ButtonModule', id: string, service: { __typename?: 'Service', name: string, id: string, type: ServiceType, icon: string, url: string, externalUrl?: string | null }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'CalendarModule', startOfWeek: CalendarWeekStart, id: string, services: Array<{ __typename?: 'Service', id: string }>, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'SystemInfoModule', id: string, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'UsenetModule', id: string, service: { __typename?: 'Service', id: string }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } }> } };

export type ConfigFragment = { __typename?: 'Config', name: string, settings: { __typename?: 'Settings', title?: string | null, logo?: string | null, favicon?: string | null, colorMode: ColorMode }, modules: Array<{ __typename?: 'ButtonModule', id: string, service: { __typename?: 'Service', name: string, id: string, type: ServiceType, icon: string, url: string, externalUrl?: string | null }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'CalendarModule', startOfWeek: CalendarWeekStart, id: string, services: Array<{ __typename?: 'Service', id: string }>, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'SystemInfoModule', id: string, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'UsenetModule', id: string, service: { __typename?: 'Service', id: string }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } }> };

export type CreateServiceMutationVariables = Exact<{
  service: ServiceInput;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'Service', name: string, id: string, type: ServiceType, icon: string, url: string, externalUrl?: string | null, apiKey?: string | null } };

export type CurrentCpuLoadSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CurrentCpuLoadSubscription = { __typename?: 'Subscription', currentCpuLoad: { __typename?: 'SystemLoadItem', time: string, value: number } };

export type CurrentMemoryUsageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CurrentMemoryUsageSubscription = { __typename?: 'Subscription', currentMemoryUsage: { __typename?: 'SystemLoadItem', time: string, value: number } };

export type DeleteModuleItemMutationVariables = Exact<{
  configName: Scalars['String'];
  moduleId: Scalars['String'];
}>;


export type DeleteModuleItemMutation = { __typename?: 'Mutation', deleteModuleItem: { __typename?: 'Config', name: string, settings: { __typename?: 'Settings', title?: string | null, logo?: string | null, favicon?: string | null, colorMode: ColorMode }, modules: Array<{ __typename?: 'ButtonModule', id: string, service: { __typename?: 'Service', name: string, id: string, type: ServiceType, icon: string, url: string, externalUrl?: string | null }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'CalendarModule', startOfWeek: CalendarWeekStart, id: string, services: Array<{ __typename?: 'Service', id: string }>, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'SystemInfoModule', id: string, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'UsenetModule', id: string, service: { __typename?: 'Service', id: string }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } }> } };

export type DeleteServiceMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteService: boolean };

export type GetCalendarQueryVariables = Exact<{
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
}>;


export type GetCalendarQuery = { __typename?: 'Query', calendar: Array<{ __typename?: 'MovieCalendarItem', movieTitle: string, inCinemasDate?: string | null, digitalDate?: string | null, imdbId: string, poster?: string | null, genres: Array<string>, overview: string, voteAverage?: number | null } | { __typename?: 'TvCalendarItem', seriesTitle: string, episodeTitle: string, airDate: string, seasonNumber: number, episodeNumber: number, tvDbId: string, imdbId: string, poster?: string | null, genres: Array<string>, overview: string }> };

export type GetConfigQueryVariables = Exact<{
  configName: Scalars['String'];
}>;


export type GetConfigQuery = { __typename?: 'Query', config: { __typename?: 'Config', name: string, settings: { __typename?: 'Settings', title?: string | null, logo?: string | null, favicon?: string | null, colorMode: ColorMode }, modules: Array<{ __typename?: 'ButtonModule', id: string, service: { __typename?: 'Service', name: string, id: string, type: ServiceType, icon: string, url: string, externalUrl?: string | null }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'CalendarModule', startOfWeek: CalendarWeekStart, id: string, services: Array<{ __typename?: 'Service', id: string }>, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'SystemInfoModule', id: string, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'UsenetModule', id: string, service: { __typename?: 'Service', id: string }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } }> } };

export type GetConfigListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConfigListQuery = { __typename?: 'Query', configs: Array<{ __typename?: 'Config', name: string }> };

export type GetContainersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContainersQuery = { __typename?: 'Query', containers: Array<{ __typename?: 'DockerContainer', id: string, name: string, image: string, status: DockerStatus, ports: Array<{ __typename?: 'DockerPort', private: number, public: number }> }> };

export type GetCpuLoadHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCpuLoadHistoryQuery = { __typename?: 'Query', cpuLoadHistory: Array<{ __typename?: 'SystemLoadItem', time: string, value: number }> };

export type GetMemoryInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMemoryInfoQuery = { __typename?: 'Query', memoryInfo: { __typename?: 'MemoryInfo', totalMemory: number, usedMemory: number } };

export type GetServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServicesQuery = { __typename?: 'Query', services: Array<{ __typename?: 'Service', name: string, id: string, type: ServiceType, icon: string, url: string, externalUrl?: string | null, apiKey?: string | null }> };

export type GetUsenetHistoryQueryVariables = Exact<{
  serviceId: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetUsenetHistoryQuery = { __typename?: 'Query', usenetHistory: { __typename?: 'UsenetHistory', total: number, items: Array<{ __typename?: 'UsenetHistoryItem', name: string, size: number, id: string, time: number, completedOn: string, completedIn: number }> } };

export type GetUsenetHistorySubscriptionSubscriptionVariables = Exact<{
  serviceId: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetUsenetHistorySubscriptionSubscription = { __typename?: 'Subscription', usenetHistory: { __typename?: 'UsenetHistory', total: number, items: Array<{ __typename?: 'UsenetHistoryItem', name: string, size: number, id: string, time: number, completedOn: string, completedIn: number }> } };

export type GetUsenetInfoQueryVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type GetUsenetInfoQuery = { __typename?: 'Query', usenetInfo: { __typename?: 'UsenetInfo', paused: boolean, sizeLeft: number, speed: number, eta: number, itemsRemaining: number } };

export type GetUsenetInfoSubscriptionSubscriptionVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type GetUsenetInfoSubscriptionSubscription = { __typename?: 'Subscription', usenetInfo: { __typename?: 'UsenetInfo', paused: boolean, sizeLeft: number, speed: number, eta: number, itemsRemaining: number } };

export type GetUsenetQueueQueryVariables = Exact<{
  serviceId: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetUsenetQueueQuery = { __typename?: 'Query', usenetQueue: { __typename?: 'UsenetQueue', total: number, items: Array<{ __typename?: 'UsenetQueueItem', name: string, size: number, id: string, progress: number, state: UsenetQueueStatus, eta: number }> } };

export type GetUsenetQueueSubscriptionSubscriptionVariables = Exact<{
  serviceId: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetUsenetQueueSubscriptionSubscription = { __typename?: 'Subscription', usenetQueue: { __typename?: 'UsenetQueue', total: number, items: Array<{ __typename?: 'UsenetQueueItem', name: string, size: number, id: string, progress: number, state: UsenetQueueStatus, eta: number }> } };

export type PauseUsenetQueueMutationVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type PauseUsenetQueueMutation = { __typename?: 'Mutation', pauseUsenetQueue: { __typename?: 'UsenetInfo', paused: boolean, sizeLeft: number, speed: number, eta: number, itemsRemaining: number } };

export type ResumeUsenetQueueMutationVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type ResumeUsenetQueueMutation = { __typename?: 'Mutation', resumeUsenetQueue: { __typename?: 'UsenetInfo', paused: boolean, sizeLeft: number, speed: number, eta: number, itemsRemaining: number } };

export type SearchQueryVariables = Exact<{
  search: Scalars['String'];
  limit: Scalars['Int'];
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'SearchResult', image?: string | null, title: string, type: string, url: string }> };

export type ServiceFragment = { __typename?: 'Service', name: string, id: string, type: ServiceType, icon: string, url: string, externalUrl?: string | null, apiKey?: string | null };

export type UpdateConfigMutationVariables = Exact<{
  configName: Scalars['String'];
  body: Scalars['String'];
}>;


export type UpdateConfigMutation = { __typename?: 'Mutation', updateConfig: { __typename?: 'Config', name: string, settings: { __typename?: 'Settings', title?: string | null, logo?: string | null, favicon?: string | null, colorMode: ColorMode }, modules: Array<{ __typename?: 'ButtonModule', id: string, service: { __typename?: 'Service', name: string, id: string, type: ServiceType, icon: string, url: string, externalUrl?: string | null }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'CalendarModule', startOfWeek: CalendarWeekStart, id: string, services: Array<{ __typename?: 'Service', id: string }>, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'SystemInfoModule', id: string, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'UsenetModule', id: string, service: { __typename?: 'Service', id: string }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } }> } };

export type UpdateContainersMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
  action: DockerAction;
}>;


export type UpdateContainersMutation = { __typename?: 'Mutation', updateContainers: Array<{ __typename?: 'DockerContainer', id: string, name: string, image: string, status: DockerStatus, ports: Array<{ __typename?: 'DockerPort', private: number, public: number }> }> };

export type UpdateModulePositionsMutationVariables = Exact<{
  configName: Scalars['String'];
  positions: Array<ModulePositionInput> | ModulePositionInput;
}>;


export type UpdateModulePositionsMutation = { __typename?: 'Mutation', updateModulePositions: { __typename?: 'Config', name: string, settings: { __typename?: 'Settings', title?: string | null, logo?: string | null, favicon?: string | null, colorMode: ColorMode }, modules: Array<{ __typename?: 'ButtonModule', id: string, service: { __typename?: 'Service', name: string, id: string, type: ServiceType, icon: string, url: string, externalUrl?: string | null }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'CalendarModule', startOfWeek: CalendarWeekStart, id: string, services: Array<{ __typename?: 'Service', id: string }>, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'SystemInfoModule', id: string, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'UsenetModule', id: string, service: { __typename?: 'Service', id: string }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } }> } };

export type UpdateServiceMutationVariables = Exact<{
  id: Scalars['String'];
  service: ServiceInput;
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateService: { __typename?: 'Service', name: string, id: string, type: ServiceType, icon: string, url: string, externalUrl?: string | null, apiKey?: string | null } };

export type UpdateSettingsMutationVariables = Exact<{
  configName: Scalars['String'];
  settings: SettingsInput;
}>;


export type UpdateSettingsMutation = { __typename?: 'Mutation', updateSettings: { __typename?: 'Config', name: string, settings: { __typename?: 'Settings', title?: string | null, logo?: string | null, favicon?: string | null, colorMode: ColorMode }, modules: Array<{ __typename?: 'ButtonModule', id: string, service: { __typename?: 'Service', name: string, id: string, type: ServiceType, icon: string, url: string, externalUrl?: string | null }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'CalendarModule', startOfWeek: CalendarWeekStart, id: string, services: Array<{ __typename?: 'Service', id: string }>, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'SystemInfoModule', id: string, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } } | { __typename?: 'UsenetModule', id: string, service: { __typename?: 'Service', id: string }, position: { __typename?: 'ModulePosition', x: number, y: number, w?: number | null, h?: number | null } }> } };

export type UsenetHistoryItemFragment = { __typename?: 'UsenetHistoryItem', name: string, size: number, id: string, time: number, completedOn: string, completedIn: number };

export type UsenetInfoFragment = { __typename?: 'UsenetInfo', paused: boolean, sizeLeft: number, speed: number, eta: number, itemsRemaining: number };

export type UsenetQueueItemFragment = { __typename?: 'UsenetQueueItem', name: string, size: number, id: string, progress: number, state: UsenetQueueStatus, eta: number };

export const ConfigFragmentDoc = gql`
    fragment Config on Config {
  name
  settings {
    title
    logo
    favicon
    colorMode
  }
  modules {
    id
    position {
      x
      y
      w
      h
    }
    ... on ButtonModule {
      service {
        name
        id
        type
        icon
        url
        externalUrl
      }
    }
    ... on UsenetModule {
      service {
        id
      }
    }
    ... on CalendarModule {
      services {
        id
      }
      startOfWeek
    }
  }
}
    `;
export const ServiceFragmentDoc = gql`
    fragment Service on Service {
  name
  id
  type
  icon
  url
  externalUrl
  apiKey
}
    `;
export const UsenetHistoryItemFragmentDoc = gql`
    fragment UsenetHistoryItem on UsenetHistoryItem {
  name
  size
  id
  time
  completedOn
  completedIn
}
    `;
export const UsenetInfoFragmentDoc = gql`
    fragment UsenetInfo on UsenetInfo {
  paused
  sizeLeft
  speed
  eta
  itemsRemaining
}
    `;
export const UsenetQueueItemFragmentDoc = gql`
    fragment UsenetQueueItem on UsenetQueueItem {
  name
  size
  id
  progress
  state
  eta
}
    `;
export const AddModuleItemDocument = gql`
    mutation addModuleItem($configName: String!, $module: ModuleItemInput!) {
  addModuleItem(configName: $configName, module: $module) {
    ...Config
  }
}
    ${ConfigFragmentDoc}`;
export type AddModuleItemMutationFn = Apollo.MutationFunction<AddModuleItemMutation, AddModuleItemMutationVariables>;

/**
 * __useAddModuleItemMutation__
 *
 * To run a mutation, you first call `useAddModuleItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddModuleItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addModuleItemMutation, { data, loading, error }] = useAddModuleItemMutation({
 *   variables: {
 *      configName: // value for 'configName'
 *      module: // value for 'module'
 *   },
 * });
 */
export function useAddModuleItemMutation(baseOptions?: Apollo.MutationHookOptions<AddModuleItemMutation, AddModuleItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddModuleItemMutation, AddModuleItemMutationVariables>(AddModuleItemDocument, options);
      }
export type AddModuleItemMutationHookResult = ReturnType<typeof useAddModuleItemMutation>;
export type AddModuleItemMutationResult = Apollo.MutationResult<AddModuleItemMutation>;
export type AddModuleItemMutationOptions = Apollo.BaseMutationOptions<AddModuleItemMutation, AddModuleItemMutationVariables>;
export const CreateServiceDocument = gql`
    mutation createService($service: ServiceInput!) {
  createService(service: $service) {
    ...Service
  }
}
    ${ServiceFragmentDoc}`;
export type CreateServiceMutationFn = Apollo.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      service: // value for 'service'
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, options);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = Apollo.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = Apollo.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const CurrentCpuLoadDocument = gql`
    subscription currentCpuLoad {
  currentCpuLoad {
    time
    value
  }
}
    `;

/**
 * __useCurrentCpuLoadSubscription__
 *
 * To run a query within a React component, call `useCurrentCpuLoadSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCurrentCpuLoadSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentCpuLoadSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCurrentCpuLoadSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CurrentCpuLoadSubscription, CurrentCpuLoadSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CurrentCpuLoadSubscription, CurrentCpuLoadSubscriptionVariables>(CurrentCpuLoadDocument, options);
      }
export type CurrentCpuLoadSubscriptionHookResult = ReturnType<typeof useCurrentCpuLoadSubscription>;
export type CurrentCpuLoadSubscriptionResult = Apollo.SubscriptionResult<CurrentCpuLoadSubscription>;
export const CurrentMemoryUsageDocument = gql`
    subscription currentMemoryUsage {
  currentMemoryUsage {
    time
    value
  }
}
    `;

/**
 * __useCurrentMemoryUsageSubscription__
 *
 * To run a query within a React component, call `useCurrentMemoryUsageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCurrentMemoryUsageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentMemoryUsageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCurrentMemoryUsageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CurrentMemoryUsageSubscription, CurrentMemoryUsageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CurrentMemoryUsageSubscription, CurrentMemoryUsageSubscriptionVariables>(CurrentMemoryUsageDocument, options);
      }
export type CurrentMemoryUsageSubscriptionHookResult = ReturnType<typeof useCurrentMemoryUsageSubscription>;
export type CurrentMemoryUsageSubscriptionResult = Apollo.SubscriptionResult<CurrentMemoryUsageSubscription>;
export const DeleteModuleItemDocument = gql`
    mutation deleteModuleItem($configName: String!, $moduleId: String!) {
  deleteModuleItem(configName: $configName, moduleId: $moduleId) {
    ...Config
  }
}
    ${ConfigFragmentDoc}`;
export type DeleteModuleItemMutationFn = Apollo.MutationFunction<DeleteModuleItemMutation, DeleteModuleItemMutationVariables>;

/**
 * __useDeleteModuleItemMutation__
 *
 * To run a mutation, you first call `useDeleteModuleItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteModuleItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteModuleItemMutation, { data, loading, error }] = useDeleteModuleItemMutation({
 *   variables: {
 *      configName: // value for 'configName'
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useDeleteModuleItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteModuleItemMutation, DeleteModuleItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteModuleItemMutation, DeleteModuleItemMutationVariables>(DeleteModuleItemDocument, options);
      }
export type DeleteModuleItemMutationHookResult = ReturnType<typeof useDeleteModuleItemMutation>;
export type DeleteModuleItemMutationResult = Apollo.MutationResult<DeleteModuleItemMutation>;
export type DeleteModuleItemMutationOptions = Apollo.BaseMutationOptions<DeleteModuleItemMutation, DeleteModuleItemMutationVariables>;
export const DeleteServiceDocument = gql`
    mutation deleteService($ids: [String!]!) {
  deleteService(ids: $ids)
}
    `;
export type DeleteServiceMutationFn = Apollo.MutationFunction<DeleteServiceMutation, DeleteServiceMutationVariables>;

/**
 * __useDeleteServiceMutation__
 *
 * To run a mutation, you first call `useDeleteServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceMutation, { data, loading, error }] = useDeleteServiceMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteServiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServiceMutation, DeleteServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServiceMutation, DeleteServiceMutationVariables>(DeleteServiceDocument, options);
      }
export type DeleteServiceMutationHookResult = ReturnType<typeof useDeleteServiceMutation>;
export type DeleteServiceMutationResult = Apollo.MutationResult<DeleteServiceMutation>;
export type DeleteServiceMutationOptions = Apollo.BaseMutationOptions<DeleteServiceMutation, DeleteServiceMutationVariables>;
export const GetCalendarDocument = gql`
    query getCalendar($startDate: DateTime!, $endDate: DateTime!) {
  calendar(startDate: $startDate, endDate: $endDate) {
    ... on TvCalendarItem {
      seriesTitle
      episodeTitle
      airDate
      seasonNumber
      episodeNumber
      tvDbId
      imdbId
      poster
      genres
      overview
    }
    ... on MovieCalendarItem {
      movieTitle
      inCinemasDate
      digitalDate
      imdbId
      poster
      genres
      overview
      voteAverage
    }
  }
}
    `;

/**
 * __useGetCalendarQuery__
 *
 * To run a query within a React component, call `useGetCalendarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCalendarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCalendarQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useGetCalendarQuery(baseOptions: Apollo.QueryHookOptions<GetCalendarQuery, GetCalendarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCalendarQuery, GetCalendarQueryVariables>(GetCalendarDocument, options);
      }
export function useGetCalendarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCalendarQuery, GetCalendarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCalendarQuery, GetCalendarQueryVariables>(GetCalendarDocument, options);
        }
export type GetCalendarQueryHookResult = ReturnType<typeof useGetCalendarQuery>;
export type GetCalendarLazyQueryHookResult = ReturnType<typeof useGetCalendarLazyQuery>;
export type GetCalendarQueryResult = Apollo.QueryResult<GetCalendarQuery, GetCalendarQueryVariables>;
export const GetConfigDocument = gql`
    query getConfig($configName: String!) {
  config(configName: $configName) {
    ...Config
  }
}
    ${ConfigFragmentDoc}`;

/**
 * __useGetConfigQuery__
 *
 * To run a query within a React component, call `useGetConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConfigQuery({
 *   variables: {
 *      configName: // value for 'configName'
 *   },
 * });
 */
export function useGetConfigQuery(baseOptions: Apollo.QueryHookOptions<GetConfigQuery, GetConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConfigQuery, GetConfigQueryVariables>(GetConfigDocument, options);
      }
export function useGetConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConfigQuery, GetConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConfigQuery, GetConfigQueryVariables>(GetConfigDocument, options);
        }
export type GetConfigQueryHookResult = ReturnType<typeof useGetConfigQuery>;
export type GetConfigLazyQueryHookResult = ReturnType<typeof useGetConfigLazyQuery>;
export type GetConfigQueryResult = Apollo.QueryResult<GetConfigQuery, GetConfigQueryVariables>;
export const GetConfigListDocument = gql`
    query getConfigList {
  configs {
    name
  }
}
    `;

/**
 * __useGetConfigListQuery__
 *
 * To run a query within a React component, call `useGetConfigListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConfigListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConfigListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConfigListQuery(baseOptions?: Apollo.QueryHookOptions<GetConfigListQuery, GetConfigListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConfigListQuery, GetConfigListQueryVariables>(GetConfigListDocument, options);
      }
export function useGetConfigListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConfigListQuery, GetConfigListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConfigListQuery, GetConfigListQueryVariables>(GetConfigListDocument, options);
        }
export type GetConfigListQueryHookResult = ReturnType<typeof useGetConfigListQuery>;
export type GetConfigListLazyQueryHookResult = ReturnType<typeof useGetConfigListLazyQuery>;
export type GetConfigListQueryResult = Apollo.QueryResult<GetConfigListQuery, GetConfigListQueryVariables>;
export const GetContainersDocument = gql`
    query getContainers {
  containers {
    id
    name
    image
    ports {
      private
      public
    }
    status
  }
}
    `;

/**
 * __useGetContainersQuery__
 *
 * To run a query within a React component, call `useGetContainersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContainersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContainersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetContainersQuery(baseOptions?: Apollo.QueryHookOptions<GetContainersQuery, GetContainersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContainersQuery, GetContainersQueryVariables>(GetContainersDocument, options);
      }
export function useGetContainersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContainersQuery, GetContainersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContainersQuery, GetContainersQueryVariables>(GetContainersDocument, options);
        }
export type GetContainersQueryHookResult = ReturnType<typeof useGetContainersQuery>;
export type GetContainersLazyQueryHookResult = ReturnType<typeof useGetContainersLazyQuery>;
export type GetContainersQueryResult = Apollo.QueryResult<GetContainersQuery, GetContainersQueryVariables>;
export const GetCpuLoadHistoryDocument = gql`
    query getCpuLoadHistory {
  cpuLoadHistory {
    time
    value
  }
}
    `;

/**
 * __useGetCpuLoadHistoryQuery__
 *
 * To run a query within a React component, call `useGetCpuLoadHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCpuLoadHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCpuLoadHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCpuLoadHistoryQuery(baseOptions?: Apollo.QueryHookOptions<GetCpuLoadHistoryQuery, GetCpuLoadHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCpuLoadHistoryQuery, GetCpuLoadHistoryQueryVariables>(GetCpuLoadHistoryDocument, options);
      }
export function useGetCpuLoadHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCpuLoadHistoryQuery, GetCpuLoadHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCpuLoadHistoryQuery, GetCpuLoadHistoryQueryVariables>(GetCpuLoadHistoryDocument, options);
        }
export type GetCpuLoadHistoryQueryHookResult = ReturnType<typeof useGetCpuLoadHistoryQuery>;
export type GetCpuLoadHistoryLazyQueryHookResult = ReturnType<typeof useGetCpuLoadHistoryLazyQuery>;
export type GetCpuLoadHistoryQueryResult = Apollo.QueryResult<GetCpuLoadHistoryQuery, GetCpuLoadHistoryQueryVariables>;
export const GetMemoryInfoDocument = gql`
    query getMemoryInfo {
  memoryInfo {
    totalMemory
    usedMemory
  }
}
    `;

/**
 * __useGetMemoryInfoQuery__
 *
 * To run a query within a React component, call `useGetMemoryInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemoryInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemoryInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMemoryInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetMemoryInfoQuery, GetMemoryInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemoryInfoQuery, GetMemoryInfoQueryVariables>(GetMemoryInfoDocument, options);
      }
export function useGetMemoryInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemoryInfoQuery, GetMemoryInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemoryInfoQuery, GetMemoryInfoQueryVariables>(GetMemoryInfoDocument, options);
        }
export type GetMemoryInfoQueryHookResult = ReturnType<typeof useGetMemoryInfoQuery>;
export type GetMemoryInfoLazyQueryHookResult = ReturnType<typeof useGetMemoryInfoLazyQuery>;
export type GetMemoryInfoQueryResult = Apollo.QueryResult<GetMemoryInfoQuery, GetMemoryInfoQueryVariables>;
export const GetServicesDocument = gql`
    query getServices {
  services {
    ...Service
  }
}
    ${ServiceFragmentDoc}`;

/**
 * __useGetServicesQuery__
 *
 * To run a query within a React component, call `useGetServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServicesQuery(baseOptions?: Apollo.QueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
      }
export function useGetServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
        }
export type GetServicesQueryHookResult = ReturnType<typeof useGetServicesQuery>;
export type GetServicesLazyQueryHookResult = ReturnType<typeof useGetServicesLazyQuery>;
export type GetServicesQueryResult = Apollo.QueryResult<GetServicesQuery, GetServicesQueryVariables>;
export const GetUsenetHistoryDocument = gql`
    query getUsenetHistory($serviceId: String!, $limit: Int!, $offset: Int!) {
  usenetHistory(serviceId: $serviceId, limit: $limit, offset: $offset) {
    items {
      ...UsenetHistoryItem
    }
    total
  }
}
    ${UsenetHistoryItemFragmentDoc}`;

/**
 * __useGetUsenetHistoryQuery__
 *
 * To run a query within a React component, call `useGetUsenetHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsenetHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsenetHistoryQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUsenetHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetUsenetHistoryQuery, GetUsenetHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsenetHistoryQuery, GetUsenetHistoryQueryVariables>(GetUsenetHistoryDocument, options);
      }
export function useGetUsenetHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsenetHistoryQuery, GetUsenetHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsenetHistoryQuery, GetUsenetHistoryQueryVariables>(GetUsenetHistoryDocument, options);
        }
export type GetUsenetHistoryQueryHookResult = ReturnType<typeof useGetUsenetHistoryQuery>;
export type GetUsenetHistoryLazyQueryHookResult = ReturnType<typeof useGetUsenetHistoryLazyQuery>;
export type GetUsenetHistoryQueryResult = Apollo.QueryResult<GetUsenetHistoryQuery, GetUsenetHistoryQueryVariables>;
export const GetUsenetHistorySubscriptionDocument = gql`
    subscription getUsenetHistorySubscription($serviceId: String!, $limit: Int!, $offset: Int!) {
  usenetHistory(serviceId: $serviceId, limit: $limit, offset: $offset) {
    items {
      ...UsenetHistoryItem
    }
    total
  }
}
    ${UsenetHistoryItemFragmentDoc}`;

/**
 * __useGetUsenetHistorySubscriptionSubscription__
 *
 * To run a query within a React component, call `useGetUsenetHistorySubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetUsenetHistorySubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsenetHistorySubscriptionSubscription({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUsenetHistorySubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetUsenetHistorySubscriptionSubscription, GetUsenetHistorySubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetUsenetHistorySubscriptionSubscription, GetUsenetHistorySubscriptionSubscriptionVariables>(GetUsenetHistorySubscriptionDocument, options);
      }
export type GetUsenetHistorySubscriptionSubscriptionHookResult = ReturnType<typeof useGetUsenetHistorySubscriptionSubscription>;
export type GetUsenetHistorySubscriptionSubscriptionResult = Apollo.SubscriptionResult<GetUsenetHistorySubscriptionSubscription>;
export const GetUsenetInfoDocument = gql`
    query getUsenetInfo($serviceId: String!) {
  usenetInfo(serviceId: $serviceId) {
    ...UsenetInfo
  }
}
    ${UsenetInfoFragmentDoc}`;

/**
 * __useGetUsenetInfoQuery__
 *
 * To run a query within a React component, call `useGetUsenetInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsenetInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsenetInfoQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetUsenetInfoQuery(baseOptions: Apollo.QueryHookOptions<GetUsenetInfoQuery, GetUsenetInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsenetInfoQuery, GetUsenetInfoQueryVariables>(GetUsenetInfoDocument, options);
      }
export function useGetUsenetInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsenetInfoQuery, GetUsenetInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsenetInfoQuery, GetUsenetInfoQueryVariables>(GetUsenetInfoDocument, options);
        }
export type GetUsenetInfoQueryHookResult = ReturnType<typeof useGetUsenetInfoQuery>;
export type GetUsenetInfoLazyQueryHookResult = ReturnType<typeof useGetUsenetInfoLazyQuery>;
export type GetUsenetInfoQueryResult = Apollo.QueryResult<GetUsenetInfoQuery, GetUsenetInfoQueryVariables>;
export const GetUsenetInfoSubscriptionDocument = gql`
    subscription getUsenetInfoSubscription($serviceId: String!) {
  usenetInfo(serviceId: $serviceId) {
    ...UsenetInfo
  }
}
    ${UsenetInfoFragmentDoc}`;

/**
 * __useGetUsenetInfoSubscriptionSubscription__
 *
 * To run a query within a React component, call `useGetUsenetInfoSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetUsenetInfoSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsenetInfoSubscriptionSubscription({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetUsenetInfoSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetUsenetInfoSubscriptionSubscription, GetUsenetInfoSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetUsenetInfoSubscriptionSubscription, GetUsenetInfoSubscriptionSubscriptionVariables>(GetUsenetInfoSubscriptionDocument, options);
      }
export type GetUsenetInfoSubscriptionSubscriptionHookResult = ReturnType<typeof useGetUsenetInfoSubscriptionSubscription>;
export type GetUsenetInfoSubscriptionSubscriptionResult = Apollo.SubscriptionResult<GetUsenetInfoSubscriptionSubscription>;
export const GetUsenetQueueDocument = gql`
    query getUsenetQueue($serviceId: String!, $limit: Int!, $offset: Int!) {
  usenetQueue(serviceId: $serviceId, limit: $limit, offset: $offset) {
    items {
      ...UsenetQueueItem
    }
    total
  }
}
    ${UsenetQueueItemFragmentDoc}`;

/**
 * __useGetUsenetQueueQuery__
 *
 * To run a query within a React component, call `useGetUsenetQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsenetQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsenetQueueQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUsenetQueueQuery(baseOptions: Apollo.QueryHookOptions<GetUsenetQueueQuery, GetUsenetQueueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsenetQueueQuery, GetUsenetQueueQueryVariables>(GetUsenetQueueDocument, options);
      }
export function useGetUsenetQueueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsenetQueueQuery, GetUsenetQueueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsenetQueueQuery, GetUsenetQueueQueryVariables>(GetUsenetQueueDocument, options);
        }
export type GetUsenetQueueQueryHookResult = ReturnType<typeof useGetUsenetQueueQuery>;
export type GetUsenetQueueLazyQueryHookResult = ReturnType<typeof useGetUsenetQueueLazyQuery>;
export type GetUsenetQueueQueryResult = Apollo.QueryResult<GetUsenetQueueQuery, GetUsenetQueueQueryVariables>;
export const GetUsenetQueueSubscriptionDocument = gql`
    subscription getUsenetQueueSubscription($serviceId: String!, $limit: Int!, $offset: Int!) {
  usenetQueue(serviceId: $serviceId, limit: $limit, offset: $offset) {
    items {
      ...UsenetQueueItem
    }
    total
  }
}
    ${UsenetQueueItemFragmentDoc}`;

/**
 * __useGetUsenetQueueSubscriptionSubscription__
 *
 * To run a query within a React component, call `useGetUsenetQueueSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetUsenetQueueSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsenetQueueSubscriptionSubscription({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUsenetQueueSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetUsenetQueueSubscriptionSubscription, GetUsenetQueueSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetUsenetQueueSubscriptionSubscription, GetUsenetQueueSubscriptionSubscriptionVariables>(GetUsenetQueueSubscriptionDocument, options);
      }
export type GetUsenetQueueSubscriptionSubscriptionHookResult = ReturnType<typeof useGetUsenetQueueSubscriptionSubscription>;
export type GetUsenetQueueSubscriptionSubscriptionResult = Apollo.SubscriptionResult<GetUsenetQueueSubscriptionSubscription>;
export const PauseUsenetQueueDocument = gql`
    mutation pauseUsenetQueue($serviceId: String!) {
  pauseUsenetQueue(serviceId: $serviceId) {
    ...UsenetInfo
  }
}
    ${UsenetInfoFragmentDoc}`;
export type PauseUsenetQueueMutationFn = Apollo.MutationFunction<PauseUsenetQueueMutation, PauseUsenetQueueMutationVariables>;

/**
 * __usePauseUsenetQueueMutation__
 *
 * To run a mutation, you first call `usePauseUsenetQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseUsenetQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseUsenetQueueMutation, { data, loading, error }] = usePauseUsenetQueueMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function usePauseUsenetQueueMutation(baseOptions?: Apollo.MutationHookOptions<PauseUsenetQueueMutation, PauseUsenetQueueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PauseUsenetQueueMutation, PauseUsenetQueueMutationVariables>(PauseUsenetQueueDocument, options);
      }
export type PauseUsenetQueueMutationHookResult = ReturnType<typeof usePauseUsenetQueueMutation>;
export type PauseUsenetQueueMutationResult = Apollo.MutationResult<PauseUsenetQueueMutation>;
export type PauseUsenetQueueMutationOptions = Apollo.BaseMutationOptions<PauseUsenetQueueMutation, PauseUsenetQueueMutationVariables>;
export const ResumeUsenetQueueDocument = gql`
    mutation resumeUsenetQueue($serviceId: String!) {
  resumeUsenetQueue(serviceId: $serviceId) {
    ...UsenetInfo
  }
}
    ${UsenetInfoFragmentDoc}`;
export type ResumeUsenetQueueMutationFn = Apollo.MutationFunction<ResumeUsenetQueueMutation, ResumeUsenetQueueMutationVariables>;

/**
 * __useResumeUsenetQueueMutation__
 *
 * To run a mutation, you first call `useResumeUsenetQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResumeUsenetQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resumeUsenetQueueMutation, { data, loading, error }] = useResumeUsenetQueueMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useResumeUsenetQueueMutation(baseOptions?: Apollo.MutationHookOptions<ResumeUsenetQueueMutation, ResumeUsenetQueueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResumeUsenetQueueMutation, ResumeUsenetQueueMutationVariables>(ResumeUsenetQueueDocument, options);
      }
export type ResumeUsenetQueueMutationHookResult = ReturnType<typeof useResumeUsenetQueueMutation>;
export type ResumeUsenetQueueMutationResult = Apollo.MutationResult<ResumeUsenetQueueMutation>;
export type ResumeUsenetQueueMutationOptions = Apollo.BaseMutationOptions<ResumeUsenetQueueMutation, ResumeUsenetQueueMutationVariables>;
export const SearchDocument = gql`
    query search($search: String!, $limit: Int!) {
  search(search: $search, limit: $limit) {
    image
    title
    type
    url
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      search: // value for 'search'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const UpdateConfigDocument = gql`
    mutation updateConfig($configName: String!, $body: String!) {
  updateConfig(configName: $configName, body: $body) {
    ...Config
  }
}
    ${ConfigFragmentDoc}`;
export type UpdateConfigMutationFn = Apollo.MutationFunction<UpdateConfigMutation, UpdateConfigMutationVariables>;

/**
 * __useUpdateConfigMutation__
 *
 * To run a mutation, you first call `useUpdateConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConfigMutation, { data, loading, error }] = useUpdateConfigMutation({
 *   variables: {
 *      configName: // value for 'configName'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdateConfigMutation(baseOptions?: Apollo.MutationHookOptions<UpdateConfigMutation, UpdateConfigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateConfigMutation, UpdateConfigMutationVariables>(UpdateConfigDocument, options);
      }
export type UpdateConfigMutationHookResult = ReturnType<typeof useUpdateConfigMutation>;
export type UpdateConfigMutationResult = Apollo.MutationResult<UpdateConfigMutation>;
export type UpdateConfigMutationOptions = Apollo.BaseMutationOptions<UpdateConfigMutation, UpdateConfigMutationVariables>;
export const UpdateContainersDocument = gql`
    mutation updateContainers($ids: [String!]!, $action: DockerAction!) {
  updateContainers(ids: $ids, action: $action) {
    id
    name
    image
    ports {
      private
      public
    }
    status
  }
}
    `;
export type UpdateContainersMutationFn = Apollo.MutationFunction<UpdateContainersMutation, UpdateContainersMutationVariables>;

/**
 * __useUpdateContainersMutation__
 *
 * To run a mutation, you first call `useUpdateContainersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContainersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContainersMutation, { data, loading, error }] = useUpdateContainersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useUpdateContainersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContainersMutation, UpdateContainersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContainersMutation, UpdateContainersMutationVariables>(UpdateContainersDocument, options);
      }
export type UpdateContainersMutationHookResult = ReturnType<typeof useUpdateContainersMutation>;
export type UpdateContainersMutationResult = Apollo.MutationResult<UpdateContainersMutation>;
export type UpdateContainersMutationOptions = Apollo.BaseMutationOptions<UpdateContainersMutation, UpdateContainersMutationVariables>;
export const UpdateModulePositionsDocument = gql`
    mutation updateModulePositions($configName: String!, $positions: [ModulePositionInput!]!) {
  updateModulePositions(configName: $configName, positions: $positions) {
    ...Config
  }
}
    ${ConfigFragmentDoc}`;
export type UpdateModulePositionsMutationFn = Apollo.MutationFunction<UpdateModulePositionsMutation, UpdateModulePositionsMutationVariables>;

/**
 * __useUpdateModulePositionsMutation__
 *
 * To run a mutation, you first call `useUpdateModulePositionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModulePositionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModulePositionsMutation, { data, loading, error }] = useUpdateModulePositionsMutation({
 *   variables: {
 *      configName: // value for 'configName'
 *      positions: // value for 'positions'
 *   },
 * });
 */
export function useUpdateModulePositionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateModulePositionsMutation, UpdateModulePositionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateModulePositionsMutation, UpdateModulePositionsMutationVariables>(UpdateModulePositionsDocument, options);
      }
export type UpdateModulePositionsMutationHookResult = ReturnType<typeof useUpdateModulePositionsMutation>;
export type UpdateModulePositionsMutationResult = Apollo.MutationResult<UpdateModulePositionsMutation>;
export type UpdateModulePositionsMutationOptions = Apollo.BaseMutationOptions<UpdateModulePositionsMutation, UpdateModulePositionsMutationVariables>;
export const UpdateServiceDocument = gql`
    mutation updateService($id: String!, $service: ServiceInput!) {
  updateService(id: $id, service: $service) {
    ...Service
  }
}
    ${ServiceFragmentDoc}`;
export type UpdateServiceMutationFn = Apollo.MutationFunction<UpdateServiceMutation, UpdateServiceMutationVariables>;

/**
 * __useUpdateServiceMutation__
 *
 * To run a mutation, you first call `useUpdateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceMutation, { data, loading, error }] = useUpdateServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      service: // value for 'service'
 *   },
 * });
 */
export function useUpdateServiceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceMutation, UpdateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceMutation, UpdateServiceMutationVariables>(UpdateServiceDocument, options);
      }
export type UpdateServiceMutationHookResult = ReturnType<typeof useUpdateServiceMutation>;
export type UpdateServiceMutationResult = Apollo.MutationResult<UpdateServiceMutation>;
export type UpdateServiceMutationOptions = Apollo.BaseMutationOptions<UpdateServiceMutation, UpdateServiceMutationVariables>;
export const UpdateSettingsDocument = gql`
    mutation updateSettings($configName: String!, $settings: SettingsInput!) {
  updateSettings(configName: $configName, settings: $settings) {
    ...Config
  }
}
    ${ConfigFragmentDoc}`;
export type UpdateSettingsMutationFn = Apollo.MutationFunction<UpdateSettingsMutation, UpdateSettingsMutationVariables>;

/**
 * __useUpdateSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingsMutation, { data, loading, error }] = useUpdateSettingsMutation({
 *   variables: {
 *      configName: // value for 'configName'
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSettingsMutation, UpdateSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>(UpdateSettingsDocument, options);
      }
export type UpdateSettingsMutationHookResult = ReturnType<typeof useUpdateSettingsMutation>;
export type UpdateSettingsMutationResult = Apollo.MutationResult<UpdateSettingsMutation>;
export type UpdateSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateSettingsMutation, UpdateSettingsMutationVariables>;