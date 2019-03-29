const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/trackerApp.db3"
  },
  debug: true
};

const db = knex(knexConfig);

router.get("/", (req, res) => {
  // retrieves all project records from the 'projects' table
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
