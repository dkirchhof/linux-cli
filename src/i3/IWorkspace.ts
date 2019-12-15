import { IRect } from "./IRect";

export interface IWorkspace {
    num: number;
    name: string;
    visible: boolean;
    focused: boolean;
    urgent: boolean;
    rect: IRect;
    output: string;
}
