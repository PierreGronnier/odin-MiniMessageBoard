const express = require("express");
const app = express();
const path = require("node:path");
const PORT = process.env.PORT || 3000;

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Configuration ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Définie le chemin vers le dossier public
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Init message
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  const { user, text } = req.body;
  messages.push({
    text: text,
    user: user,
    added: new Date(),
  });
  res.redirect("/");
});

app.get("/message/:id", (req, res) => {
  const messageId = req.params.id;
  if (messages[messageId]) {
    res.render("message", { message: messages[messageId] });
  } else {
    res.status(404).send("Message not found");
  }
});

// Démarrage du serveur
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
