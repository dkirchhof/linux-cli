export interface IDisplaySettings {
    name: string;
    mode: string;
    primary?: boolean;
    pos?: "left-of" | "right-of" | "above" | "below" | "same-as"; 
}
