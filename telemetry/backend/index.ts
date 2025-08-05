import { Readable } from "stream"
import project_cars_2_parser from "./telemetry_parsers/ps2_parser"
import dgram from "node:dgram"

export enum TelemetryType {
    PROJECT_CARS_2 = "PROJECT_CARS_2"
}

export interface TelemetryPacket {
    speed: number
}

export interface TelemetryParser {
    parse: (udp_packet: Uint8Array) => TelemetryPacket
}

export interface Options {
    ip: string,
    port: number,
    telemetryType: TelemetryType
}

const telemetryStore = (telemetryType: TelemetryType): TelemetryParser => {
    switch(telemetryType) {
        case TelemetryType.PROJECT_CARS_2: 
            return project_cars_2_parser
    }
}

export const getTelemetryEventStream = (options: Options) => {
    const telemetryParser = telemetryStore(options.telemetryType);
    const stream: Readable = new Readable();

    const server = dgram.createSocket('udp4');

    server.on('message', (msg, rinfo) => {
        stream.push(telemetryParser.parse(msg));
    })

    server.bind(options.port); // binds to local host 
}