/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HttpClient, RequestParams } from './http-client';

export class RadarrApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags StaticResource
   * @name GetPath
   * @request GET:/{path}
   * @secure
   */
  getPath = (path: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/${path}`,
      method: 'GET',
      secure: true,
      ...params,
    });
}
