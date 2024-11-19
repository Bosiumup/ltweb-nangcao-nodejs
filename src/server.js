import express from "express";
import dotenv from "dotenv";
import viewEngine from "./config/viewEngine";
import initRoutes from "./routes/routes";
import initApiRoutes from "./routes/apiRoutes";
import bodyParser from "body-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import { initModels } from "./models";
import cors from "cors";

let app = express();
app.use(cors({ origin: process.env.URL_REACT, credentials: true })); // Cho phép truy cập từ domain của frontend
dotenv.config();
let port = process.env.PORT;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
viewEngine(app);
// Initialize client.
let redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
});

// Initialize session storage.
app.use(
    session({
        store: redisStore,
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: false, // recommended: only save session when data exists
        secret: "keyboard cat",
        cookie: {
            secure: false, // Thiết lập secure: true khi chạy trên HTTPS
            httpOnly: true, // Chỉ có thể truy cập cookie từ server
            maxAge: 3600000, // Thời gian sống của session, ở đây là 1 giờ
        },
    })
);
initModels();
initApiRoutes(app);
initRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
