import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { ErrorResponse, TweetMediaResults } from './app.interface';

@Injectable()
export class AppService {
  public async getMediaUrls(
    tweetId: string,
  ): Promise<TweetMediaResults | ErrorResponse> {
    try {
      const twitterClient = new TwitterApi(process.env.TWITTER_CLIENT_TOKEN);
      const roClient = twitterClient.readOnly;
      const tweet = await roClient.v2.tweets(tweetId, {
        expansions: ['attachments.media_keys', 'author_id'],
        'media.fields': ['url', 'media_key', 'preview_image_url', 'type'],
        'user.fields': ['name'],
      });
      const tweetUrl = `https://twitter.com/${tweet.includes.users[0].username}/status/${tweet.data[0].id}`;
      const mediaUrls = [];
      tweet.includes.media.forEach((media) => {
        if (media.type === 'photo') {
          mediaUrls.push(media.url);
        }
      });
      return { tweetUrl, mediaUrls };
    } catch (exception) {
      throw new InternalServerErrorException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: exception.message,
        },
        exception.message,
      );
    }
  }
}
