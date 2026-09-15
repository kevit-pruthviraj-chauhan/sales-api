import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './components/customer/customer.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import microOrmConfig from './shared/configs/micro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(microOrmConfig), CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
