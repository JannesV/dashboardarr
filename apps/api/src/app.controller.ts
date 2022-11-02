import { Res } from "@nestjs/common";
import { Controller, Get, Param } from "@nestjs/common";
import type { Response } from "express";
import { createReadStream } from "fs";
import { resolve } from "path";
import { ICONS_FOLDER } from "./configs/config.service";

@Controller({})
export class AppController {
  @Get("/icons/:iconUrl")
  async icon(@Param() params: { iconUrl: string }, @Res() res: Response) {
    try {
      await new Promise((reslv, reject) => {
        createReadStream(resolve(ICONS_FOLDER, params.iconUrl))
          .on("error", reject)
          .on("finish", reslv)
          .pipe(res);
      });
    } catch (err) {
      res.status(404);
      res.send("Icon file not found");
    }
  }
}
