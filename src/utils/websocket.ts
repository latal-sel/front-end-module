import { io, Socket } from "socket.io-client";
import type { Value } from "../model/value";



class WebSocketClient {
    private socket: Socket | null = null;

    connect() {
        if (!this.socket) {
            this.socket = io("http://localhost:3000");
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    send(payload: string) {
        this.socket?.emit("message", payload);
    }

    on(callback: (data: Value) => void) {
        if (this.socket) {
            this.socket.on("message", (data: string) => {
                callback(JSON.parse(data));
            });
        }
    }

    off() {
        this.socket?.off("message");
    }
}

export const websocketClient = new WebSocketClient();