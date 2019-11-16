import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './interfaces/Song';
import { UpsetSongDto } from './dto/upset-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {
  }

  @Post()
  create(@Body() creatSongDto: UpsetSongDto): Promise<Song> {
    return this.songsService.create(creatSongDto);
  }

  @Get()
  find(): Promise<Song[]> {
    return this.songsService.find();
  }

  @Put(':id')
  updateOne(@Param() params, @Body() song: Song) {
      return this.songsService.update(params.id, song);
  }

  @Delete(':id')
  deleteOne(@Param() params) {
    return this.songsService.delete([params.id]);
  }
  @Delete()
  delete(@Body() ids: string[]) {
    return this.songsService.delete(ids);
  }

}
