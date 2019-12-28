import { Document } from 'mongoose';

export interface Song extends Document {
  readonly _id: string;
  readonly name: string;
  readonly artist: string;
  readonly album: string;
  readonly year: number;
  readonly genre: string;
  readonly image: string;
  readonly duration: string;
}
