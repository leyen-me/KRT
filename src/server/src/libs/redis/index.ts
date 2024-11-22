import Redis from 'ioredis';
import { logger } from '@app/logger';

export class RedisClient {
  private static instance: RedisClient;
  private client: Redis;

  private constructor() {
    this.client = new Redis({
      host: process.env.VITE_REDIS_HOST,
      port: Number(process.env.VITE_REDIS_PORT),
      password: process.env.VITE_REDIS_PASSWORD,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    // 错误处理
    this.client.on('error', (err) => {
      logger.error('Redis Client Error:', err);
    });

    this.client.on('connect', () => {
      logger.info('Redis Client Connected');
    });
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  // 封装常用方法
  public async set(key: string, value: string, expires?: number): Promise<void> {
    try {
      if (expires) {
        await this.client.set(key, value, 'EX', expires);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      logger.error('Redis Set Error:', error);
      throw error;
    }
  }

  public async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      logger.error('Redis Get Error:', error);
      throw error;
    }
  }

  public async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      logger.error('Redis Del Error:', error);
      throw error;
    }
  }

  // 用于存储用户 token 的特定方法
  public async setSysUserToken(userId: string, token: string, expires: number): Promise<void> {
    const key = `user:token:${userId}`;
    await this.set(key, token, expires);
  }

  public async getSysUserToken(userId: string): Promise<string | null> {
    const key = `user:token:${userId}`;
    return await this.get(key);
  }

  public async removeSysUserToken(userId: string): Promise<void> {
    const key = `user:token:${userId}`;
    await this.del(key);
  }

  // 关闭连接
  public async close(): Promise<void> {
    await this.client.quit();
  }
}

// 导出单例
export const redisClient = RedisClient.getInstance();