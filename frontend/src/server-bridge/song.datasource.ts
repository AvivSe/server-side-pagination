import SongService from "./song.service";

// datasource for Server-side Row Model
interface Datasource {
    // grid calls this to get rows
    getRows(params: any): void; // any is referring to IServerSideGetRowsParams
    // optional destroy method, if your datasource has state it needs to clean up
    destroy?(): void;
}

class SongDatasource implements Datasource{
    songService: SongService;

    destroy(): void {
    }

    constructor(songService: SongService) {
        this.songService = songService;
    }

    getRows(params: any): void {
        const { request, successCallback, failCallback } = params;
        this.songService.getSongs(request).then(({data}) => {
            if(!!data) {
                successCallback(data.rows, data.lastRow);
            } else {
                failCallback();
            }
        });
    }
}

export default SongDatasource;
