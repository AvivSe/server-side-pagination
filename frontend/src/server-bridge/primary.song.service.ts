import axios from 'axios';
import SongService, {Song} from "./song.service";

const host = "http://localhost:8080";
const api = "";
const songs = "/songs";
const songsUrl = `${host}${api}${songs}`;

export default class PrimarySongService implements SongService {
    addSong(song: Song): Promise<any> {
        return axios.post(`${songsUrl}`, song);
    }

    deleteOne(songId: string): Promise<any> {
        return axios.delete(`${songsUrl}/${songId}`);
    }

    getSongs(params: any): Promise<any> {
        return axios.get(songsUrl, { params });
    }

    putSong(song: Song): Promise<any> {
        return  axios.put(`${songsUrl}/${song._id}`, song);
    }
}

