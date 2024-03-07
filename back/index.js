const express = require("express");
const cors = require("cors");
const jsonServer = require("json-server");
const db = require("./db.json");

const server = jsonServer.create();
const router = jsonServer.router(db, { foreginKeySuffix: "id" });
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(express.json());
server.use(
  jsonServer.rewriter({
    "/registration": "/users",
  })
);

server.post("/registration", (req, res, next) => {
  req.body.id = Math.random();
  res.cookie("doggee-auth", "123456", {
    httpOnly: true,
    sameStie: "strict",
  });
  next();
});

// server.get("/auth", (req, res) => {
//   const data = db.users;
//   res.send({ data });
// });

server.post("/auth", (req, res) => {
  const { body } = req;
  console.log("server.post ~ body:", body);
  const user = db.users.find(
    (user) => user.password === body.password && user.username === body.username
  );

  if (!user) {
    res.status(404);
    res.send({ success: false, data: { message: "user is not exist" } });
  }

  res.cookie("doggee-auth", "123456", {
    httpOnly: true,
    sameStie: "strict",
  });

  res.send({ success: true, data: user });
});

server.use(middlewares);
server.use(router);

const port = 4000;
server.listen(port, () => console.log(`app listening ong port ${port}`));
