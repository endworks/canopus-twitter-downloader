import {
  HttpStatus,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { ErrorResponse } from './app.interface';

@Injectable()
export class AppService {
  public async getMediaUrls(tweetId: number): Promise<ErrorResponse> {
    throw new NotImplementedException(
      {
        statusCode: HttpStatus.NOT_IMPLEMENTED,
        message: `#TODO get media urls by tweet ID: '${tweetId}'`,
      },
      `#TODO`,
    );
  }
}
