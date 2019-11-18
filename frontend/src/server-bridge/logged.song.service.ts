import SongService, {Song} from "./song.service";

export interface Channel {
    readonly log: Function;
}

export class DefaultChannel implements Channel {
    log(row: LoggerRow) {
        console.log(row);
    }
}

export interface LoggerRow {
    readonly num: number;
    readonly service: string;
    readonly action: string;
    readonly description: string;
    readonly input: string;
}

export default class LoggedSongService implements SongService {
    readonly songService: SongService;
    readonly channels: Channel[];


    constructor(songService: SongService, channels: Channel[]) {
        this.songService = songService;
        this.channels = [new DefaultChannel(), ...channels];
    }

    addSong(song: Song): Promise<any> {
        this.channels.forEach(channel => channel.log({
            service: "song service",
            action: "add song",
            description: "request",
            input: song
        }));
        return this.songService.addSong(song);
    }

    deleteOne(songId: string): Promise<any> {
        this.channels.forEach(channel => channel.log({
            service: "song service",
            action: "delete one",
            description: "request",
            input: songId
        }));
        return this.songService.deleteOne(songId);
    }

    getSongs(params: any): Promise<any> {
        const { startRow, endRow } = params;
        this.channels.forEach(channel => channel.log({
            service: "song service",
            action: "get songs",
            description: "request",
            input: JSON.stringify({ startRow, endRow})
        }));
        return this.songService.getSongs(params);
    }

    putSong(song: Song): Promise<any> {
        this.channels.forEach(channel => channel.log({
            service: "song service",
            action: "put songs",
            description: "request",
            input: JSON.stringify(song),
        }));
        return this.songService.putSong(song);
    }

}
