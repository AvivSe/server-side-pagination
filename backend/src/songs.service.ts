import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from './interfaces/Song';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongsService {
  constructor(@InjectModel('Song') private readonly songModel: Model<Song>) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const createSong = new this.songModel(createSongDto);
    return await createSong.save();
  }

  async delete(ids: string[]): Promise<any>  {
    return this.songModel.remove({ _id: ids});
  }

  async update(song: Song): Promise<any>  {
    return this.songModel.findOneAndUpdate({ _id: song._id }, song);
  }

  async find(): Promise<Song[]> {
    return await this.songModel.find().exec();
  }
}
