import type { Origin } from "./origin";

export interface Value {
    timestamp: Date;
    origin: Origin;
    name: string;
    value: number;
    unit: string;
    isSimulated: boolean;
}