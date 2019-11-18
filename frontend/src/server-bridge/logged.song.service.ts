import SongService, {Song} from "./song.service";

export default class LoggedSongService implements SongService {
    readonly songService: SongService;
    readonly loggers: Function[];


    constructor(songService: SongService, loggers: Function[]) {
        this.songService = songService;
        this.loggers = loggers;
    }

    addSong(song: Song): Promise<any> {
        this.loggers.forEach(logger => logger("Song service", "Add song", song));
        return this.songService.addSong(song);
    }

    deleteOne(songId: string): Promise<any> {
        this.loggers.forEach(logger => logger("Song service", "Delete one", songId));
        return this.songService.deleteOne(songId);
    }

    getSongs(params: any): Promise<any> {
        this.loggers.forEach(logger => logger("Song service", "Get songs", `Start row: ${params.startRow}`, `End row: ${params.endRow}`));
        return this.songService.getSongs(params);
    }

    putSong(song: Song): Promise<any> {
        this.loggers.forEach(logger => logger("Song service", "Put songs", song));
        return this.songService.putSong(song);
    }

}
