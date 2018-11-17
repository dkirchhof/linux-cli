import { readConfig } from "../common/config";
import { exec } from "../common/cp";
import { parseState, setVolumeUpOrDown, muteUnmuteOrToggle } from "./utils";

export default async function run(args: string[]) {
    switch(args[0]) {
        case "state":
            getState();
            break;
        case "up":
            up();
            break;
        case "down":
            down();
            break;
        case "mute":
            mute();
            break;
        case "unmute":
            unmute();
            break;
        case "toggle":
            toggle();
            break;
    }
}

async function getState() {
    const { volume: { device } } = await readConfig();
    
    const amixerOutput = await exec(`amixer -D ${device}`);
    const state = parseState(amixerOutput);

    console.log(state);
}

async function up() {
    console.log(await setVolumeUpOrDown("+"));
}

async function down() {
    console.log(await setVolumeUpOrDown("-"));
}

async function mute() {
    console.log(await muteUnmuteOrToggle("mute"));
}

async function unmute() {
    console.log(await muteUnmuteOrToggle("unmute"));
}

async function toggle() {
    console.log(await muteUnmuteOrToggle("toggle"));
}
