import { io, Socket } from "socket.io-client";
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

    send(payload: string) {
        this.socket?.emit("message", payload);
    }

    on(topic: string, callback: (data: Value) => void) {
        if (this.socket) {
            this.socket.on(topic, (data: string) => {
                console.log("Received data via WebSocket: ", data , "on topic: ", topic);
                callback(JSON.parse(data));
            });
        }
    }

    off() {
        this.socket?.off("message");
    }
}

export const websocketClient = new WebSocketClient();
