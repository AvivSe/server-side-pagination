import SongService, {Song} from "./song.service";
import mockData from './mock-data';

export default class MockSongService implements SongService {
    songs: Song[];

    constructor() {
        this.songs = mockData;
    }

    static mockApiCall(response: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
                resolve({data: response});
            }
        )
    }

    addSong(song: Song): Promise<any> {
        this.songs.push(song);
        return MockSongService.mockApiCall(song);
    }

    deleteOne(songId: string): Promise<any> {
        this.songs = this.songs.filter(song => song._id !== songId);
        return MockSongService.mockApiCall({ok: 1});
    }

    getSongs(params: any): Promise<any> {
        return MockSongService.mockApiCall({rows: this.songs.slice(params.startRow, params.endRow), lastRow: this.songs.length});
    }

    putSong(song: Song): Promise<any> {
        const index = this.songs.findIndex(({_id}) => song._id === _id);
        this.songs[index] = song;
        return MockSongService.mockApiCall(song);
    }

}
