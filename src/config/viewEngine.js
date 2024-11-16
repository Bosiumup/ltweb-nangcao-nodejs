import express from "express";
import expressLayouts from "express-ejs-layouts";

const viewEngine = (app) => {
    app.use(express.static("src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
    app.use(expressLayouts);
    app.set("layout", "layouts/main");
};

export default viewEngine;
