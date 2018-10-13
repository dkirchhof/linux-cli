import { readConfig, writeConfig } from "../common/config";
import { getDisplayStates, isConfigReasonable, setDisplays } from "./utils";

export default async function run(args: string[]) {
    switch(args[0]) {
        case "list":
            listDisplays();
            break;
        case "restore":
            restore();
            break;
        case "set":
            setDisplaySettings(args[1]);
            break;
    }    
}

async function listDisplays() {
    console.log(await getDisplayStates());
}

async function restore() {
    const config = await readConfig();
    const displays = await getDisplayStates();

    const preferredDisplaySettings = config.display.settings[config.display.preferred];
    const fallbackDisplaySettings = config.display.settings[config.display.fallback];
    const isReasonable = isConfigReasonable(preferredDisplaySettings, displays);
    
    if(isReasonable) {
        setDisplays(preferredDisplaySettings, displays);
    } else {
        setDisplays(fallbackDisplaySettings, displays);
    }
}

async function setDisplaySettings(configName: string) {
    const config = await readConfig();
    const displays = await getDisplayStates();

    const displaySettings = config.display.settings[configName];
    
    await setDisplays(displaySettings, displays);
 
    // save new preferred display settings
    config.display.preferred = configName;
    await writeConfig(config);
}
