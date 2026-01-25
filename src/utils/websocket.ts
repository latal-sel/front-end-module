import { io, Socket } from "socket.io-client";
import type { WebsocketEvent } from "../model/websocketEvent";
import type { Value } from "../model/value";

class WebSocketClient {
    private socket: Socket | null = null;

    connect() {
        if (!this.socket) {
            console.log("Connection...");
            this.socket = io("http://192.168.200.1", {
                path: "/socket.io/",
                transports: ["websocket"]
            });

            this.socket.on("connect", () => console.log("✅ Connected"));
            this.socket.on("disconnect", () => console.log("⚠️ Disconnected"));
            this.socket.on("connect_error", (err) => console.error("❌ Connect error:", err));
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    send(payload: string, topic: string = "message") {
        this.socket?.emit(topic, payload);
    }

    onValue(topic: string, callback: (data: Value) => void) {
        if (this.socket) {
            this.socket.on(topic, (data: Value) => {
                console.log(`Received on ${topic}:`, data);
                const parsed = typeof data === 'string' ? JSON.parse(data) : data;
                callback(parsed);
            });
        }
    }

    onEvent(topic: string, callback: (data: WebsocketEvent) => void) {
        if (this.socket) {
            this.socket.on(topic, (data: WebsocketEvent) => {
                callback(data);
            });
        }
    }

    emit(topic: string, data: unknown) {
        if (this.socket) {
            this.socket.emit(topic, data);
        } else {
            console.warn("Socket not connected, cannot emit", topic);
        }
    }

    off() {
        this.socket?.off("message");
    }
}

export const websocketClient = new WebSocketClient();
