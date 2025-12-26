import { Controller, Get } from '@nestjs/common';
import { HealthService, HealthStatus } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  root(): { name: string; version: string; documentation: string } {
    return {
      name: 'teacher.ac.pk API',
      version: '0.1.0',
      documentation: '/api',
    };
  }

  @Get('health')
  async health(): Promise<HealthStatus> {
    return this.healthService.check();
  }
}

