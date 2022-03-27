const express = require("express");
const app = express();
const router = require("../router/router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", (req, res, next) => {
    if(req.method !== "POST") {
        next();
        return;
    }

    if(req.method === "POST" 
        && req.body.email.trim().length > 3 && req.body.email.trim().length < 256 
        && req.body.name.trim().length > 0 && req.body.name.trim().length <  51 
        && req.body.username.trim().length > 0 && req.body.username.trim().length < 21
        && req.body.password.trim().length > 5 && req.body.password.trim().length < 81) {
        next();

        return;
    } else {
        res.sendStatus(400);

        return;
    }
});

app.use(router);

module.exports = app;
