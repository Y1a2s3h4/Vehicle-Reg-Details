const express = require("express");
const app = express();
const { carNumber } = require("./Route/Number.js");
app.get("/:term", async (req, res) => {
  const term = req.params.term;
  console.log(term);
  res.send(await carNumber(term));
});
app.listen(process.env.PORT || 3000);
