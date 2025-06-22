import { Module } from "@nestjs/common";
import { S3Service } from "./s3.service";
import { UploadController } from "./s3.controller";

@Module({
  controllers: [UploadController],
  providers: [S3Service],
})

export class S3UploadModule {}