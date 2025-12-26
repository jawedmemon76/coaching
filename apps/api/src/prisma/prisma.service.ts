import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' 
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
    });
  }

  async onModuleInit() {
    if (!process.env.DATABASE_URL) {
      this.logger.warn(
        '⚠️  DATABASE_URL is not configured. Database operations will fail.',
      );
      this.logger.warn(
        '   Set DATABASE_URL in your .env file or environment variables.',
      );
      return;
    }

    try {
      await this.$connect();
      this.logger.log('✅ Database connected successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database:', error);
      // Don't crash the app in development - allow it to start for other operations
      if (process.env.NODE_ENV === 'production') {
        throw error;
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }

  /**
   * Clean the database (useful for testing)
   * WARNING: This will delete all data!
   */
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production!');
    }

    const models = Reflect.ownKeys(this).filter((key) => {
      if (typeof key !== 'string') return false;
      return key[0] !== '_' && key[0] !== '$';
    }) as string[];

    return Promise.all(
      models.map((modelKey) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const model = (this as any)[modelKey];
        return model?.deleteMany?.();
      }),
    );
  }
}

