import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource, { dataSourceOptions } from 'db/data.source';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
