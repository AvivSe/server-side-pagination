import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from './interfaces/song';
import { UpsetSongDto } from './dto/upset-song.dto';
import PaginationResponse from './interfaces/pagination.response';

@Injectable()
export class SongsService {
  constructor(@InjectModel('Song') private readonly songModel: Model<Song>) {}

  async create(song: UpsetSongDto): Promise<Song> {
    const createSong = new this.songModel(song);
    return await createSong.save();
  }

  async delete(ids: string[]): Promise<any>  {
    return this.songModel.remove({ _id: ids});
  }

  async update(id: string, song: UpsetSongDto): Promise<any>  {
    return this.songModel.findOneAndUpdate({ _id: id}, song, {new: true});
  }

  async find(startRow: number, endRow: number): Promise<PaginationResponse<Song>> {
    return {
      rows: await this.songModel.find().skip(startRow).limit(endRow - startRow).exec(),
      lastRow: await this.songModel.countDocuments(),
    };
  }
}
