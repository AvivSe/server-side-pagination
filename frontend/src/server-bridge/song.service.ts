
export interface Song {
    readonly _id: string;
    readonly name: string;
    readonly artist: string;
    readonly album: string;
    readonly year: number;
    readonly genre: string;
    readonly image: string;
    readonly duration: string;
}

interface SongService {
    getSongs(params: any): Promise<any>;
    putSong(song: Song): Promise<any>;
    addSong(song: Song): Promise<any>;
    deleteOne(songId: string): Promise<any>;
}

export default SongService;
