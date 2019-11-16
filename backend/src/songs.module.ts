import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { SongSchema } from './schemas/song.schema';

// @ts-ignore
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Song', schema: SongSchema }])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
