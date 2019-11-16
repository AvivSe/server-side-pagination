import React, {useEffect, useState} from 'react';
import {AgGridReact} from '@ag-grid-community/react';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import {addSong, getSongs, putSong} from './api-actions';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import AddSong from "./add-song";
import {Button} from "@material-ui/core";
// @ts-ignore
import styled from 'styled-components';
// define cellRenderer to be reused
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var myCellRenderer = function(params: { value: string; }) {
    return <span> {params.value} + </span>;
};

const defaultColumnDefs = [
    {headerName: "Id", field: "_id", hide: true, sortable: false, editable: false},
    {headerName: "Name", field: "name"},
    {headerName: "Artist", field: "artist"},
    {headerName: "Album", field: "album"},
    {headerName: "Year", field: "year"},
    {headerName: "Genre", field: "genre"},
    {headerName: "Image", field: "image"},
    {headerName: "Duration", field: "duration"},].map(colDef => ({editable: true, sortable: true, ...colDef}));

const AddSongWrapper = styled.div`
  background-color: #262C2D;
  border-radius: 0 0 1rem 1rem;
`;

const AddSongButton = styled(Button)`
  & {
    color: white !important;
  }
`;

const Songs: React.FC = () => {
    const [agGridApis, setAgGridApis] = useState({grid: null, column: null});
    const [columnDefs] = useState(defaultColumnDefs);
    const [rowData, setRawData] = useState([]);
    const [showAddSong, setShowAddSong] = useState(false);

    useEffect(() => {
    }, []);

    // @ts-ignore
    const onGridReady = ({columnApi, api}) => {
        setAgGridApis({grid: api, column: columnApi});
        api.sizeColumnsToFit();
        getSongs().then(({data}) => setRawData(data));
    };

    // @ts-ignore
    const cellValueChanged = ({data}) => {
        putSong(data).then();
    };

    const handleSubmit = (song: any) => {
        // @ts-ignore
        addSong(song).then(({data}) => setRawData(prevState => [...prevState, data]))
    };

    // @ts-ignore
    return (<div>
            <div className="ag-theme-balham-dark" style={{height: '400px', width: '1000px'}}>
                <AgGridReact
                    onGridReady={onGridReady}
                    onCellValueChanged={cellValueChanged}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    paginationAutoPageSize={true}
                    pagination={true}
                    rowSelection="multiple"
                    suppressRowClickSelection={true}
                    modules={AllCommunityModules}/>
            </div>
            <AddSongWrapper>
                {!showAddSong && <AddSongButton onClick={() => setShowAddSong(true)}>Add song</AddSongButton>}
                {showAddSong && <AddSong handleSubmit={handleSubmit} handleClickCancel={() => setShowAddSong(false)}/>}
            </AddSongWrapper>
        </div>
    )
};

export default Songs;
