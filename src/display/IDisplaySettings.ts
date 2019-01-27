export interface IDisplaySettings {
    name: string;
    mode: string;
    primary?: boolean;
    pos?: {
        "mode": "left-of" | "right-of" | "above" | "below" | "same-as";
        "display": string;
    };
}
