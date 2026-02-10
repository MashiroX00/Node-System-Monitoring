import express from "express";
const routes = express.Router();
import { getSystemUsage } from "../modules/resources.js";
import {Duration} from 'luxon'
routes.get("/resources", async (req, res) => {
  try {
    const Usage = await getSystemUsage(false);
    const threads = Usage.threads;
    const dayformatted = Duration.fromMillis(Usage.cpuTime * 1000).toFormat("dd:hh:mm:ss");
    const day = dayformatted.split(':');
    const data = {
      os: Usage.fullosname,
      name: Usage.name,
      model: Usage.cpuname,
      threads,
      loadavgs: Usage.cpupercentage,
      memorypercentage: Usage.memoryUsage,
      memtoal: (Usage.memorytotal / 1024 / 1024).toFixed(2),
      memfree: (Usage.memoryfree / 1024 / 1024).toFixed(2),
      uptime: {days: day[0], hours: day[1], minutes: day[2], seconds: day[3]},
      details: Usage.cpuinfo,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch system usage" });
  }
});

export default routes;
