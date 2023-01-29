import { Test } from '@nestjs/testing';
import { HealthController } from '../../../../app/controller/api/health/health.controller';
import { HealthCheckService, TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthModule } from '../../../../health.module';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthCheckService: HealthCheckService;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [HealthModule, TerminusModule, HttpModule],
        providers: [{
          provide: HealthCheckService,
          useValue:{
            check: jest.fn(),
          },
        }],
        controllers: [HealthController],

      }).compile();

      healthController = moduleRef.get<HealthController>(HealthController);
      healthCheckService = moduleRef.get<HealthCheckService>(HealthCheckService);
    });

    describe('check',  () => {
        it('should return status of checking', async () => {
          const result = {} as any;
            jest.spyOn(healthCheckService, 'check').mockImplementation(() => result);
            const actualResult = await healthController.check();
            expect(actualResult).toBe(result);
        });
    });
});