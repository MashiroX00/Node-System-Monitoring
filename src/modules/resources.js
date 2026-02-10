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
            const ostype = os.type();
            const osversion = os.release();
            const osbrand = os.arch();
            const fullosname = `${ostype} ${osversion} ${osbrand}`;
            const name = os.hostname();
            resolve({
                fullosname,
                ostype,
                osversion,
                osbrand,
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
