import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import compression from "compression";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(graphqlUploadExpress({ maxFileSize: 100000, maxFiles: 10 }));
  app.use(compression());
  await app.listen(3001);
}

bootstrap();
