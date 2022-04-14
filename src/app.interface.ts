export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export class TweetMediaPayload {
  tweetId: number;
}

export class TweetMediaResults {
  mediaUrls: string[];
}
