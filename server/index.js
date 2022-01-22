const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const sequelize = require("./sequelize");

//middleware
app.use(express.json());
app.use(cors());

//Routes

//Register and login routes

app.use("/auth", require("./routes/jwtAuth"));

const seed = (req, res) => {
  sequelize
    .query(
      `
        drop table if exists users;
        
        create table users(
            user_id serial primary key,
            user_name varchar(255) not null,
            user_email varchar(255) not null,
            user_password varchar(255) not null
        );
    `
    )
    .then(() => {
      console.log("DB Seeded!");
      res.sendStatus(200);
    })
    .catch((err) => console.log("error seeding db", err));
};

app.post("/seed", seed);

app.listen(4001, () => console.log("Server is running on post 4001"));
