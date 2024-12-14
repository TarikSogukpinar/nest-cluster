import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { clusterize } from './clustering';
import { ConfigService } from '@nestjs/config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);

  await app.listen(
    configService.get<number>('API_PORT', { infer: true }),
    '0.0.0.0',
  );
};
bootstrap();

if (process.env.CLUSTERING === 'true') clusterize(bootstrap);
else bootstrap();
