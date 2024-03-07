const { Router } = require("express");
const router = Router();

router.post("/registration", function (req, res, next) {
  req.body.id = Math.random();
  res.cookie("doggee-auth", "123456", {
    httpOnly: true,
    sameStie: "strict",
  });
  next();
});

router.post("/auth", function (req, res) {
  const { body } = req;
  console.log("body:", body);
  const user = db.users.find(
    (user) => user.password === body.password && user.username === body.username
  );

  if (!user) {
    res.status(404);
    res.send({ success: false, data: { message: "use is not exist" } });
  }

  res.cookie("doggee-auth", "123456", {
    httpOnly: true,
    sameStie: "strict",
  });

  res.send({ success: true, data: user });
});

module.exports = router;
