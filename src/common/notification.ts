import { exec } from "./cp";

export function notify(icon: string, message: string) {
    return exec(`dunstify -r 987 -i ${icon} -t 2000 ${message}`);
}
