import fs from 'fs';

export function runHostCommand(command: string): Promise<string> {
    const pipePath = `${process.cwd()}/hostpipe/pipe`;
    const outputPath = `${process.cwd()}/hostpipe/output.txt`;

    clearOutputFile();

    writeCommnadToPipe(command);

    return new Promise((resolve, reject) => {
        const timeout = 10000;
        const timeoutStart = Date.now();

        checkForOutput();

        function checkForOutput() {
            if (isTimeoutExceeded(timeoutStart, timeout)) {
                reject('Timeout exceeded');
            } else if (isOutputFileAvailable()) {
                const data = readOutputFile();
                clearOutputFile();
                resolve(data);
            } else {
                setTimeout(checkForOutput, 70);
            }
        }
    });

    function writeCommnadToPipe(command: string): void {
        const wstream = fs.createWriteStream(pipePath);
        wstream.write(command);
        wstream.close();
    }

    function isTimeoutExceeded(startTime: number, timeout: number): boolean {
        return Date.now() - startTime > timeout;
    }

    function readOutputFile(): string {
        const data = fs.readFileSync(outputPath).toString();

        return data;
    }

    function clearOutputFile(): void {
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
    }

    function isOutputFileAvailable(): boolean {
        return fs.existsSync(outputPath);
    }
}
