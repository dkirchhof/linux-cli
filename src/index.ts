#!/usr/bin/env node

import config from "./config";
import display from "./display";
import help from "./help";
import volume from "./volume";

run();

function run() {
    const args = process.argv.slice(2);

    switch(args[0]) {
        case "config":
            config();
            break;
        case "display":
            display(args.slice(1));
            break;
        case "help":
            help();
            break;
        case "volume":
            volume(args.slice(1));
            break;
    }
}
