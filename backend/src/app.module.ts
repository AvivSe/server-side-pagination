import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsModule } from './songs.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), SongsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
