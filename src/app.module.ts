import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './components/customer/customer.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductModule } from './components/product/product.module';
import { SalesModule } from './components/sales/sales.module';
import microOrmConfig from './shared/configs/micro-orm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          ...microOrmConfig,
          clientUrl: configService.get('MONGODB_URL'),
          dbName: configService.get('DATABASE_NAME'),
        };
      },
      inject: [ConfigService],
    }),
    CustomerModule,
    ProductModule,
    SalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
