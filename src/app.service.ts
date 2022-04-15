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
      const tweet = await roClient.v1.singleTweet(tweetId);
      const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id}`;
      const mediaUrls = [];
      tweet.extended_entities.media.forEach((media) => {
        if (media.type === 'photo') {
          mediaUrls.push(media.media_url);
        } else if (media.type === 'video' || media.type === 'animated_gif') {
          media.video_info.variants.every((variant) => {
            if (variant.url.includes('.mp4')) {
              mediaUrls.push(variant.url);
              return false;
            }
          });
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
