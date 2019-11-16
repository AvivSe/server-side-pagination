import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './interfaces/Song';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {
  }

  @Post()
  create(@Body() creatSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(creatSongDto);
  }

  @Get()
  find(): Promise<Song[]> {
    return this.songsService.find();
  }

  @Put()
  update(@Body() song: Song) {
    return this.songsService.update(song);
  }

  @Delete()
  delete(@Body() ids: string[]) {
    return this.songsService.delete(ids);
  }

}
