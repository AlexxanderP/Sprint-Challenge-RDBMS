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

//------Get Router-----//
router.get("/", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//------ Get By ID Router-----//
router.get("/:id", (req, res) => {
  const projectId = req.params.id;

  db("projects")
    .where({ id: projectId })
    .first()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//------ Post Router-----//
router.post("/", (req, res) => {
  db("projects")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];

      db("projects")
        .where({ id })
        .first()
        .then(project => {
          res.status(201).json(project);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
module.exports = router;
