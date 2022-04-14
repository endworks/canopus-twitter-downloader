export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export class TweetMediaResults {
  mediaUrls: string[];
}
