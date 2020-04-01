const express = require("express");
const multer = require("multer");

const doCalculate = require("./helpers/do.calculate");
const {
  RESULT,
  DIR_DATA,
  DIR_VIEWS,
  DIR_PUBLIC,
} = require("./helpers/constats");

const app = express();
const upload = multer({ dest: DIR_DATA });

app.set("views", DIR_VIEWS);
app.set("view engine", "ejs");
app.use(express.static(DIR_PUBLIC));

app.get("/", (req, res) => {
  res.render("index", RESULT);
});

app.post("/", upload.single("filedata"), async (req, res) => {
  res.render("index", await doCalculate(req));
});

app.listen(3000, () => {
  console.log("server started");
});
