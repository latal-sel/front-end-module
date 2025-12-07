import { io, Socket } from "socket.io-client";



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

    on(callback: (data: string) => void) {
        if (this.socket) {
            this.socket.on("message", callback);
        }
    }

    off() {
        this.socket?.off("message");
    }
}

export const websocketClient = new WebSocketClient();