import express, { Express } from 'express';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "*"}));

app.listen(port, () => {
    console.log("server is running on", port);
});

// sloji dist v .gitignore