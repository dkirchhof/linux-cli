import { IVolumeState } from "./IVolumeState";
import { readConfig } from "../common/config";
import { exec } from "../common/cp";
import { notify } from "../common/notification";

export function parseState(str: string): IVolumeState {
    const matches = /(\d+)%.*\[(on|off)\]/.exec(str)!;

    return { 
        muted: matches[2] === "off",
        volume: parseInt(matches[1]),
    };
}

export async function muteUnmuteOrToggle(op: "mute" | "unmute" | "toggle") {
    const { volume: { device, notification } } = await readConfig();

    const output = await exec(`amixer -D ${device} set Master ${op}`);
    const state = parseState(output);
    
    if(notification.enabled) {
        notify(notification.icon, state.muted ? "muted" : "unmuted");
    }

    return state;
}

function setVolume(device: string, volume: string) {
    return exec(`amixer -D ${device} set Master ${volume} unmute`);
}

export async function setVolumeUpOrDown(direction: "+" | "-") {
    const { volume: { device, step, notification } } = await readConfig();

    const output = await setVolume(device, `${step}%${direction}`);
    const state = parseState(output);
    
    if(notification.enabled) {
        notify(notification.icon, `${state.volume}%`);
    }

    return state;
}
