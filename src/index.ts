import * as rpc from 'vscode-jsonrpc';
import { findRailwayRoutesOfTrip } from 'railwaytrip-to-railwayroute';
import type { RailwayRouteOfTripResult } from 'railwaytrip-to-railwayroute/dist/db-data-railway-routes-types';
import type { RailwayrouteRequestParams } from './types'

function isRailwayrouteRequest(req: any): req is RailwayrouteRequestParams {
    return req && req.uic_refs;
}

let connection = rpc.createMessageConnection(
    new rpc.StreamMessageReader(process.stdin),
    new rpc.StreamMessageWriter(process.stdout));

connection.onRequest("findRailwayRoutesOfTrip", (params: any) => {
    if (isRailwayrouteRequest(params)) {
        return findRailwayRoutesOfTrip(params.uic_refs);
    }
    else {
        return new rpc.ResponseError(rpc.ErrorCodes.InvalidParams, "parameter 'uic_refs' expected")
    }
});

connection.listen();
