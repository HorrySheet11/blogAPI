export function enhanceConsoleLog() {
    const originalLog = console.log;

    console.log = (...args) => {
        try {
            const err = new Error();
            const stackLines = err.stack.split("\n");

            // Get the caller line (3rd line in most cases)
            const callerLine = stackLines[2] || stackLines[1];

            // Extract file path, line, and column
            const match = callerLine.match(/\((.*):(\d+):(\d+)\)/) || callerLine.match(/at (.*):(\d+):(\d+)/);

            let location = "";
            if (match) {
                const filePath = match[1];
                const line = match[2];
                const col = match[3];
                location = `${filePath}:${line}:${col}`;
            }

            originalLog(`[${location}]`, ...args);
        } catch (e) {
            originalLog(...args);
        }
    };
}