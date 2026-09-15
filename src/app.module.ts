import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './components/customer/customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
