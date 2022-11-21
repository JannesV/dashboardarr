import { Controller, Get, Logger, Param, Res } from "@nestjs/common";
import type { Response } from "express";
import axios from "axios";
import { ConfigService } from "src/configs/config.service";
import sharp from "sharp";

@Controller("/radarr")
export class RadarrController {
  private logger = new Logger(RadarrController.name);
  constructor(private configService: ConfigService) {}
  @Get("/images/:serviceId/*")
  async images(
    @Param() params: { serviceId: string; 0: string },
    @Res() res: Response
  ) {
    const service = await this.configService.getServiceById(params.serviceId);
    this.logger.log("Resolving image", params[0]);

    const response = await axios({
      method: "get",
      url: `${service.url}/${params[0]}`,
      params: {
        apiKey: service.apiKey,
      },
      responseType: "stream",
    });

    const resize = sharp().resize(100);

    return response.data.pipe(resize).pipe(res);
  }
}
