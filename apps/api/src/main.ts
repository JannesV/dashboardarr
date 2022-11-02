import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix("/api");
  app.use(cookieParser());
  app.use(graphqlUploadExpress({ maxFileSize: 100000, maxFiles: 10 }));
  await app.listen(3001);
}

// AppClusterService.clusterize(bootstrap);
bootstrap();
