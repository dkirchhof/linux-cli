export function globalMatches(input: string, regExp: RegExp) {
    const output: RegExpExecArray[] = [];
    let matches;
    
    while (matches = regExp.exec(input)) {
        output.push(matches);
    }

    return output;
}
