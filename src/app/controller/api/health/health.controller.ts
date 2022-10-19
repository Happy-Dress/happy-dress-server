import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  HealthCheckResult,
  HealthIndicatorResult, TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  private PARENT_FOLDER = process.env.PARENT_FOLDER;
  private PATH_GOOGLE_DRIVE = `https://drive.google.com/drive/folders/${this.PARENT_FOLDER}`;

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> => this.db.pingCheck('database', { timeout: 100 } ),
      (): Promise<HealthIndicatorResult> => this.http.pingCheck('google-drive', this.PATH_GOOGLE_DRIVE),
    ]);
  }
}