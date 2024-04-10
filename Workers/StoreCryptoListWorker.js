import {Worker , isMainThread, parentPort} from 'worker_threads';

import cron from 'node-cron';
import Apperror from '../utils/ApiError.util.js';
import { fetchAndStoreCryptoList } from '../controllers/fetchAndStore.controller.js';
if (isMainThread) {
    throw new Apperror('This script should be run as a worker thread', 400);
}

cron.schedule("* * * * * *", fetchAndStoreCryptoList);

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception in worker thread:', err);
  });

  
parentPort.on('message', (message) => {
    console.log("Message recieved", message);
});

