import axios from 'axios';

const host = "http://localhost:8080";
const api = "";
const songs = "/songs";
const songsUrl = `${host}${api}${songs}`;

export const getSongs = () => {
    return axios.get(songsUrl);
};

export const putSong = ({ _id, ...song}) => {
    return axios.put(`${songsUrl}/${_id}`, song);
};

export const addSong = (song) => {
    return axios.post(`${songsUrl}`, song);
};

export const deleteOne = (songId) => {
    return axios.delete(`${songsUrl}/${songId}`);
};
