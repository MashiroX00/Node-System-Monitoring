import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config'

export async function ensureMatrixExists(filePath) {
    try {
        const dir = path.dirname(filePath);
        await fs.mkdir(dir, { recursive: true });
        
        try {
            await fs.access(filePath);
        } catch {
            await fs.writeFile(filePath, '[]');
        }
    } catch (err) {
        console.error("Error ensuring matrix file exists:", err);
    }
}

export async function readMatrix(path) {
    try {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        // If file doesn't exist, return an empty array to start fresh
        if (err.code === 'ENOENT') return [];
        console.error("Read Error:", err);
        return [];
    }
}

export async function saveMatrix(path, data, point = process.env.MATRIX_POINT || 30) {
    // 1. AWAIT the reading of the existing file
    let stream = await readMatrix(path);

    // 2. Format the new entry
    const newdata = {
        data: {
            "cpu": data.cpupercentage,
            "memory": [data.memorytotal, data.memoryfree, data.memoryUsage],
            "timestamp": Date.now()
        }
    };

    // 3. Add data and manage the "sliding window" (max 30 points)
    stream.push(newdata);
    
    if (stream.length > point) {
        stream.shift(); // Remove the oldest entry
    }

    try {
        // 4. Write back to file (using await version)
        await fs.writeFile(path, JSON.stringify(stream, null, 2));
    } catch (err) {
        console.error("Save Error:", err);
    }
}