import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { runHostCommand } from './utils';

dotenv.config({ path: __dirname + '/../.env' });

const app = express();

app.use(express.json({ limit: '50mb' }));

app.get(
    '/',
    expressAsyncHandler(async (req: Request, res: Response) => {
        const commandResponse = await runHostCommand('docker ps -a');
        res.json(commandResponse);
    }),
);

app.listen(process.env.API_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${process.env.API_PORT}`);
});
