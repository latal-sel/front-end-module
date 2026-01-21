import { io, Socket } from "socket.io-client";
import type { Value } from "../model/value";
import type { Event } from "../model/event";

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

    onValue(topic: string, callback: (data: Value) => void) {
        if (this.socket) {
            this.socket.on(topic, (data: string) => {
                // console.log("Received data via WebSocket: ", data , "on topic: ", topic);
                callback(JSON.parse(data));
            });
        }
    }

    onEvent(topic: string, callback: (data: Event) => void) {
        if (this.socket) {
            this.socket.on(topic, (data: string) => {
                callback(JSON.parse(data));
            });
        }
    }

    off() {
        this.socket?.off("message");
    }
}

export const websocketClient = new WebSocketClient();