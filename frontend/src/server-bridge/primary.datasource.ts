import {getSongs} from "../api-actions";

// datasource for Server-side Row Model
interface IServerSideDatasource {
    // grid calls this to get rows
    getRows(params: any): void; // any is referring to IServerSideGetRowsParams
    // optional destroy method, if your datasource has state it needs to clean up
    destroy?(): void;
}

class ServerSideDatasource implements IServerSideDatasource{
    destroy(): void {
    }

    getRows(params: any): void {
        const { request, successCallback, failCallback } = params;
        getSongs(request).then(({data}) => {
            if(!!data) {
                successCallback(data.rows, data.lastRow);
            } else {
                failCallback();
            }
        });
    }
}

export default ServerSideDatasource;
