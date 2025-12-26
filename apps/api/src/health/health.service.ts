import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

export interface HealthStatus {
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
  version: string;
  environment: string;
  services: {
    database: 'connected' | 'disconnected' | 'not_configured';
    redis: 'connected' | 'disconnected' | 'not_configured';
  };
  uptime: number;
}

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  private readonly startTime = Date.now();

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async check(): Promise<HealthStatus> {
    const dbStatus = await this.checkDatabase();
    const redisStatus = await this.checkRedis();

    // Determine overall status
    let status: 'ok' | 'degraded' | 'down' = 'ok';
    if (dbStatus === 'disconnected' && redisStatus === 'disconnected') {
      status = 'down';
    } else if (dbStatus === 'disconnected' || redisStatus === 'disconnected') {
      status = 'degraded';
    }

    return {
      status,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: dbStatus,
        redis: redisStatus,
      },
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
    };
  }

  private async checkDatabase(): Promise<'connected' | 'disconnected' | 'not_configured'> {
    if (!process.env.DATABASE_URL) {
      this.logger.warn('DATABASE_URL is not configured');
      return 'not_configured';
    }

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return 'connected';
    } catch (error) {
      this.logger.error('Database connection failed:', error);
      return 'disconnected';
    }
  }

  private async checkRedis(): Promise<'connected' | 'disconnected' | 'not_configured'> {
    if (!process.env.REDIS_URL) {
      this.logger.warn('REDIS_URL is not configured');
      return 'not_configured';
    }

    try {
      const isConnected = await this.redis.ping();
      return isConnected ? 'connected' : 'disconnected';
    } catch (error) {
      this.logger.error('Redis connection failed:', error);
      return 'disconnected';
    }
  }
}

