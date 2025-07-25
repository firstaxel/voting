import env from "@/env.config";
import Redis from "ioredis";

export const redisClient = new Redis(env.REDIS_URL);
