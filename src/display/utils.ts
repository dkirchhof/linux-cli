import { IDisplaySettings } from "./IDisplaySettings";
import { IDisplayState } from "./IDisplayState";
import { exec } from "../common/cp";
import { globalMatches } from "../common/regexp";

function createConnectedString(settings: IDisplaySettings) {
    return [
        `--output ${settings.name}`,
        `--mode ${settings.mode}`,
        ...(settings.primary ? ["--primary"] : []),
        ...(settings.pos ? [`--${settings.pos.mode}`, settings.pos.display] : []),
    ].join(" ");
}

function createDisconnectString(displayName: string) {
    return [
        `--output ${displayName}`,
        `--off`,
    ].join(" ");
}

function isDisplayConnected(displayName: string, displays: IDisplayState[]) {
    const state = displays.find(state => state.name === displayName);
    
    if(!state) {
        return false;
    }

    return state.connected;
}

function createXrandrCommand(config: IDisplaySettings[], displays: IDisplayState[]) {
    const connectedConfigStrings = config.map(display => createConnectedString(display));

    const conntectedDisplayNames = config.map(display => display.name);
    const disconnectedDisplays = displays.filter(display => !conntectedDisplayNames.includes(display.name));

    const disconnectedConfigStrings = disconnectedDisplays.map(display => createDisconnectString(display.name));

    return [
        "xrandr",
        ...connectedConfigStrings,
        ...disconnectedConfigStrings,
    ].join(" ");
}

export async function getDisplayStates(): Promise<IDisplayState[]> {
    const xrandrOutput = await exec("xrandr");

    return ( 
        globalMatches(xrandrOutput, /(\w+) ((connected)|(disconnected))/g)
        .map(m => ({ 
            name: m[1], 
            connected: m[2] === "connected" 
        }))
    );
}

export function isConfigReasonable(config: IDisplaySettings[], displays: IDisplayState[]) {
    return config.every(display => isDisplayConnected(display.name, displays));
}

export async function setDisplays(displaySettings: IDisplaySettings[], displays: IDisplayState[]) {
    const command = createXrandrCommand(displaySettings, displays);
    exec(command);
}
