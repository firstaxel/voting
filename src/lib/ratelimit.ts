import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible";
import { redisClient } from "./redis";

export const opts = {
	points: 300,
};

const rateLimiterMemory = new RateLimiterMemory({
	points: 60, // 300 / 5 if there are 5 processes at all
	duration: 60,
});

export const rateLimiterRedis = new RateLimiterRedis({
	storeClient: redisClient,
	points: 300, // Number of points
	duration: 60, // Per 60 seconds
	inMemoryBlockOnConsumed: 301, // If userId or IP consume >=301 points per minute
	inMemoryBlockDuration: 60,
	insuranceLimiter: rateLimiterMemory,
});
