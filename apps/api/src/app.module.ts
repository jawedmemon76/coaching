import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Core modules
    PrismaModule,
    RedisModule,
    HealthModule,

    // Feature modules will be added here
    // AuthModule,
    // UsersModule,
    // CoursesModule,
    // etc.
  ],
})
export class AppModule {}

