import { homedir } from "os";
import { join } from "path";
import { IDisplaySettings } from "../display/IDisplaySettings";
import { readFile, writeFile } from "fs";

interface IConfig {
    display: {
        preferred: string;
        fallback: string;
        settings: { [s: string]: IDisplaySettings[]; };
    };
    volume: {
        device: string;
        notification: {
            enabled: boolean;
            icon: string;
        };
        step: number;
    }
}

export function getConfigPath() {
    return join(homedir(), ".config/linux-cli.json");
}

export async function readConfig() {
    return new Promise<IConfig>((resolve, reject) => {
        readFile(getConfigPath(), "utf-8", (err, data) => {
            if(err) {
                return reject(err);
            }

            return resolve(JSON.parse(data));
        });
    });
}

export async function writeConfig(config: IConfig) {
    return new Promise<void>((resolve, reject) => {
        writeFile(getConfigPath(), JSON.stringify(config, null, 4), err => {
            if(err) {
                return reject(err);
            }

            return resolve();
        });
    });
}
