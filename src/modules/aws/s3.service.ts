import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import * as path from "path";

@Injectable()
export class S3Service {
  private s3 = new S3Client({ region: process.env.AWS_S3_REGION });

  async uploadFile(file: Express.Multer.File, folder: "upload") {
    if (!file) {
      throw new Error('Aucun fichier reçu');
    }
    const ext = path.extname(file.originalname);
    const key = `${folder}/${randomUUID()}${ext}`

    await this.s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));
    
    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
  }

}
