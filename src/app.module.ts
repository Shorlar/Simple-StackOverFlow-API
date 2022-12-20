import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StackApiModule } from './stack-api/stack-api.module';

@Module({
  imports: [StackApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
