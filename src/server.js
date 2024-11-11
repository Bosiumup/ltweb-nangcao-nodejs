import express from "express";
import dotenv from "dotenv";
import apiUserRoutes from "./routes/apiUserRoutes";
import bodyParser from "body-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    })
);

const initDatabase = async () => {
    try {
        await sequelize.authenticate(); // Kiểm tra kết nối
        console.log("Kết nối tới cơ sở dữ liệu thành công!");

        await sequelize.sync(); // Đồng bộ hóa các mô hình với cơ sở dữ liệu
        console.log("Các models đã được đồng bộ!");
    } catch (error) {
        console.error("Lỗi kết nối tới cơ sở dữ liệu:", error);
    }
};
initDatabase();

apiUserRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
