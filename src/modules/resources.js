//Get OS system usage
import os from 'os';
import fs from 'fs/promises';
import { saveMatrix, ensureMatrixExists } from '../utils/saveMatrix.js';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const matrix_fullpath = path.join(__dirname, "..", "storages/matrix.json");

export const initializeResources = async () => {
    await ensureMatrixExists(matrix_fullpath);
};

async function getDetailedOSName() {
    if (os.platform() === 'linux') {
        try {
            const data = await fs.readFile('/etc/os-release', 'utf8');
            const lines = data.split('\n');
            const prettyNameLine = lines.find(line => line.startsWith('PRETTY_NAME='));
            if (prettyNameLine) {
                return prettyNameLine.split('=')[1].replace(/"/g, '');
            }
        } catch (err) {
            // Fallback
        }
    }
    // os.version() returns "Windows 11 Home" etc. on Windows
    // and kernel build info on Linux if /etc/os-release fails
    return os.version() || `${os.type()} ${os.release()}`;
}

export const getSystemUsage = async (threaddetails = true) => {
    const cpuTime = os.uptime();
    const cpuinfo = threaddetails ? os.cpus() : [];
    const cpuname = os.cpus()[0] ? os.cpus()[0].model : 'Unknown';
    const threads = os.cpus().length;
    const memorytotal = os.totalmem();
    const memoryfree = os.freemem();
    const memoryUsage = (memorytotal - memoryfree) / memorytotal * 100;
    const cpupercentage = os.loadavg();
    const ostype = os.type();
    const osversion = os.release();
    const osbrand = os.arch();
    const fullosname = await getDetailedOSName();
    const name = os.hostname();
    
    // Fire and forget saving to matrix
    saveMatrix(matrix_fullpath, {
        cpupercentage,
        memorytotal,
        memoryfree,
        memoryUsage,
    });

    return {
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
    };
}