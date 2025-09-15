const express = require("express");
const app = express();
const path = require("node:path");
const PORT = 3000;

// Configuration ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Définie le chemin vers le dossier public
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Configuration des routes
const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "New message" },
];

app.get("/", (req, res) => {
  res.render("index", { links: links });
});

app.get("/new", (req, res) => {
  res.render("new", { links: links });
});

// Démarrage du serveur
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
