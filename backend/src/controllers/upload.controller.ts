import {
    Controller,
    Post,
    HttpException,
    UploadedFile,
    UseInterceptors
  } from '@nestjs/common';
  import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
  import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadDto } from 'src/dto/upload.dto';
import { FirebaseService } from 'src/services/firebase.service';
  
  @Controller('uploads')
  @ApiTags('Upload')
  export class UploadsController {
    constructor(private readonly firebaseService: FirebaseService) {}
  
    @Post()
    @ApiBody({
      description: 'Upload a file',
      type: UploadDto,
      // isArray: true,
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: any) {
      try {
          const buff = Buffer.from(file.buffer);
          const downloadUrl = await this.firebaseService.uploadFile(
            buff,
            file.originalname,
          );
        return downloadUrl;
      } catch (err) {
        throw new HttpException(err, err.statusCode || 400);
      }
    }
  }