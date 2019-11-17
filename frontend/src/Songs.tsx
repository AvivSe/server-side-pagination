import React, {useEffect, useState} from 'react';
import {AgGridColumn, AgGridReact} from '@ag-grid-community/react';
import {AllModules} from '@ag-grid-enterprise/all-modules';
import {addSong, deleteOne, putSong} from './api-actions';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import AddSong from "./add-song";
import {Button} from "@material-ui/core";
import ServerSideDatasource from './server-bridge/primary.datasource'

// @ts-ignore
import styled from 'styled-components';

const DeleteCellRendererContainer = styled.div`
 color: red;
 cursor: pointer;
`;
const defaultColumnDefs = [
    {headerName: "#", width: 45, checkboxSelection: true, sortable: false, filter: false, pinned: true,},
    {headerName: "Id", field: "_id", hide: true, sortable: false, editable: false},
    {headerName: "Name", field: "name", width: 140},
    {headerName: "Artist", field: "artist", width: 140},
    {headerName: "Album", field: "album", width: 140},
    {headerName: "Year", field: "year", width: 75},
    {headerName: "Genre", field: "genre", width: 120,},
    {headerName: "Image", field: "image"},
    {headerName: "Duration", width: 100, field: "duration"},
    {headerName: "", width: 30, field: "duration", cellRenderer: 'deleteCellRenderer'}];

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
    const [, setAgGridApis] = useState({grid: null, column: null});
    const [columnDefs] = useState(defaultColumnDefs);
    const [rowData, setRawData] = useState([]);
    const [showAddSong, setShowAddSong] = useState(false);

    useEffect(() => {
    }, []);

    const DeleteCellRenderer = (props: any) => {
        const handleClickDelete = () => {
            const songId = props.data._id;
            deleteOne(songId).then(({data}) => {
                if (data && data.ok === 1) {
                    setRawData((prevState) => [...prevState.filter(({_id}) => _id !== songId)]);
                }
            })
        };
        return (<DeleteCellRendererContainer onClick={handleClickDelete}>x</DeleteCellRendererContainer>)
    };

    const frameworkComponents = {
        'deleteCellRenderer': DeleteCellRenderer,
    };

    // @ts-ignore
    const onGridReady = ({columnApi, api}) => {
        setAgGridApis({grid: api, column: columnApi});

        // @ts-ignore
        api.setServerSideDatasource(new ServerSideDatasource());
        api.sizeColumnsToFit();
    };

    // @ts-ignore
    const cellValueChanged = ({data}) => {
        putSong(data).then();
    };

    const handleSubmit = (song: any) => {
        // @ts-ignore
        addSong(song).then(({data}) => setRawData(prevState => [...prevState, data]))
    };

    return (<>
            <div className="ag-theme-balham-dark" style={{height: '250px', width: '1200px'}}>
                <AgGridReact
                    onGridReady={onGridReady}
                    onCellValueChanged={cellValueChanged}
                    //rowData={rowData}
                    pagination={true}
                    paginationAutoPageSize={true}
                    cacheBlockSize={10}
                    rowSelection="multiple"
                    suppressRowClickSelection={true}
                    frameworkComponents={frameworkComponents}
                    gridOptions={{rowModelType:'serverSide'}}
                    defaultColDef={{
                        resizable: true,
                        sortable: true,
                        filter: true,
                    }}
                    modules={AllModules}>
                    {
                        columnDefs.map(({cellRenderer, ...rest}, i) => <AgGridColumn
                            cellRenderer={cellRenderer}
                            key={rest.headerName + i} {...rest}/>)
                    }
                </AgGridReact>
            </div>
            <AddSongWrapper>
                {showAddSong ? <AddSong handleSubmit={handleSubmit} handleClickCancel={() => setShowAddSong(false)}/> :
                    <AddSongButton onClick={() => setShowAddSong(true)}>Add song</AddSongButton>}
            </AddSongWrapper>
        </>
    )
};

export default Songs;
