import * as mongoose from 'mongoose';

export const SongSchema = new mongoose.Schema({
  name: String,
  artist: String,
  album: String,
  year: Number,
  duration: Number,
});
