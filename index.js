import express from "express";
const app = express();
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import Database from "./api/database/Database.js";
import Framework from "./api/database/models/Framework.js";
import ResponseTypes from "./api/constants/ResponseTypes.js";
import Errors from "./api/constants/Errors.js";
import UsersActionsRouter from "./api/routes/controllers/UsersActionsController.js";

const __dirname = process.cwd();

ResponseTypes.buildClass();
Database.__init();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/*", (request, response, next) => {
  const { st_a } = request.cookies || {};
  const apiKey = request.headers["api-key"];
  if(!st_a && !apiKey) return response.status(404).render("errors/missingApiKey.ejs");
 if(request.get("origin") !== "https://frameworks-website.ordahan.repl.co/") response.status(404).render("errors/corsInvalidOrigin");
  next();
});

app.use("/api/*",  (request, response, next) => {
  const { st_a } = request.cookies || {};
  const apiKey = request.headers["api-key"];
  if(!st_a && !apiKey) return response.status(404).json(ResponseTypes[Errors.MISSING_API_KEY]);
 if(request.get("origin") !== "https://frameworks-website.ordahan.repl.co/") response.status(404).json(ResponseTypes[Errors.INVALID_CORS_ORIGIN]);
});


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use(UsersActionsRouter);

app.get("/frameworks", (req, res) => {
  res.render("frameworks");
});

app.get("/frameworks/:frameworkId", (req, res) => {
  const { frameworkId } = req.params;
  const framework = Framework.getById(frameworkId);
  if(!framework) response.render("errors/invalidPage");
  else {
    res.render(`${framework.getId()}/home`);
  };
});

app.get("*", (request, response) => {
  response.render("errors/invalidPage");
});


app.listen(80, () => {
  console.log("Express App running on port 80");
});