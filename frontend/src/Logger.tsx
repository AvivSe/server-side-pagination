import React from "react";
import {LoggerRow} from "./server-bridge/logged.song.service";
import {AgGridReact} from "@ag-grid-community/react";
import {AllModules} from '@ag-grid-enterprise/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
// @ts-ignore
import styled from 'styled-components';
interface LoggerProps {
    readonly rows: LoggerRow[];
}


const defaultColumnDefs = [
    {headerName: "#", field: "num", width: 30,},
    {headerName: "Service", field: "service", width: 70},
    {headerName: "Action", field: "action", width: 70},
    {headerName: "Description", field: "description", width: 70},
    {headerName: "Input", field: "input", width: 240},
];

const Title = styled.div`
  font-size: 2rem;
  margin-top: 50px;
  
`;
const Logger: React.FC<LoggerProps> = ({ rows }) => {
    return (            <div className="ag-theme-balham-dark" style={{height: '250px'}}>
        <Title>Backend Logs</Title>
    <AgGridReact
        onGridReady={({api}) => {
            api.sizeColumnsToFit();
        }}
        rowData={rows}
        gridOptions={{ columnDefs:defaultColumnDefs}}
        defaultColDef={{
            sortable: true,
            filter: true,
        }}
        modules={AllModules}/></div>);
};

export default Logger;
