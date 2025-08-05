import { TelemetryParser } from "..";

const project_cars_2_parser: TelemetryParser = {
    parse: (udp_packet) => {
        const id: number = udp_packet[0]
        return { speed: id } // For testing 
    }
} 

export default project_cars_2_parser