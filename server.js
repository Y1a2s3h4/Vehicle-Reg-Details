const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const { carNumber } = require("./Route/Number.js");
app.get("/:term", async (req, res) => {
  const term = req.params.term;
  console.log(term);
  res.send(await carNumber(term));
});
app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
