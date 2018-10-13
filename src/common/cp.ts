import { exec as execNative } from "child_process";

export function exec(command: string) {
    return new Promise<string>((resolve, reject) => {
        execNative(command, (error, stdout, _) => {
            if(error) {
                return reject(error);
            }

            return resolve(stdout);
        });
    });
}
