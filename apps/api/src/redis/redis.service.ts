import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;

  async onModuleInit() {
    if (!process.env.REDIS_URL) {
      this.logger.warn(
        '⚠️  REDIS_URL is not configured. Redis operations will be unavailable.',
      );
      this.logger.warn(
        '   Set REDIS_URL in your .env file or environment variables.',
      );
      return;
    }

    try {
      this.client = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        retryStrategy: (times) => {
          if (times > 3) {
            this.logger.error('Redis connection failed after 3 retries');
            return null; // Stop retrying
          }
          return Math.min(times * 200, 2000);
        },
      });

      await this.client.connect();
      this.logger.log('✅ Redis connected successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to Redis:', error);
      this.client = null;
      // Don't crash in development
      if (process.env.NODE_ENV === 'production') {
        throw error;
      }
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
      this.logger.log('Redis disconnected');
    }
  }

  /**
   * Check if Redis is connected
   */
  async ping(): Promise<boolean> {
    if (!this.client) return false;
    try {
      const result = await this.client.ping();
      return result === 'PONG';
    } catch {
      return false;
    }
  }

  /**
   * Get the Redis client (may be null if not configured)
   */
  getClient(): Redis | null {
    return this.client;
  }

  /**
   * Get a value from Redis
   */
  async get(key: string): Promise<string | null> {
    if (!this.client) {
      this.logger.warn('Redis not available, get operation skipped');
      return null;
    }
    return this.client.get(key);
  }

  /**
   * Set a value in Redis with optional TTL
   */
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.client) {
      this.logger.warn('Redis not available, set operation skipped');
      return;
    }
    if (ttlSeconds) {
      await this.client.setex(key, ttlSeconds, value);
    } else {
      await this.client.set(key, value);
    }
  }

  /**
   * Delete a key from Redis
   */
  async del(key: string): Promise<void> {
    if (!this.client) {
      this.logger.warn('Redis not available, del operation skipped');
      return;
    }
    await this.client.del(key);
  }

  /**
   * Delete keys matching a pattern
   */
  async delPattern(pattern: string): Promise<void> {
    if (!this.client) {
      this.logger.warn('Redis not available, delPattern operation skipped');
      return;
    }
    const keys = await this.client.keys(pattern);
    if (keys.length > 0) {
      await this.client.del(...keys);
    }
  }

  /**
   * Check if a key exists
   */
  async exists(key: string): Promise<boolean> {
    if (!this.client) return false;
    const result = await this.client.exists(key);
    return result === 1;
  }

  /**
   * Set expiration on a key
   */
  async expire(key: string, ttlSeconds: number): Promise<void> {
    if (!this.client) return;
    await this.client.expire(key, ttlSeconds);
  }
}

