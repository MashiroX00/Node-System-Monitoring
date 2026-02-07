//Get OS system usage
import os from 'os';
export const getSystemUsage = (delay = 1000,threaddetails = true) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const cpuTime = os.uptime();
            const cpuinfo = threaddetails ? os.cpus() : [];
            const cpuname = os.cpus()[0].model
            const threads = os.cpus().length;
            const memorytotal = os.totalmem();
            const memoryfree = os.freemem();
            const memoryUsage = (memorytotal - memoryfree) / memorytotal * 100;
            const cpupercentage = os.loadavg();
            const name = os.hostname();
            resolve({
                name,
                memoryUsage,
                cpuTime,
                threads,
                cpuname,
                cpuinfo,
                memorytotal,
                memoryfree,
                cpupercentage,
            });
        }, delay);
    });
}
