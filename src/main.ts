import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer} from 'class-validator';

const logger = new Logger('main');
const port = 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api/simple-stackoverflow');
  app.useGlobalPipes(new ValidationPipe({transform: true}))
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  await app.listen(port);
  logger.log(`Server running on PORT ${port}`);
}
bootstrap();
