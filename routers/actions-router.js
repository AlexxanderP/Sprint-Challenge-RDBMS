const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/projects.sqlite3"
  },
  debug: true
};

const db = knex(knexConfig);

//----- Get Router -----//
router.get("/", (req, res) => {
  db("actions")
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//------ Get by ID Router-----//
router.get("/:id", (req, res) => {
  const actionId = req.params.id;

  db("actions")
    .where({ id: actionId })
    .first()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//------- Post Router -----//
router.post("/", (req, res) => {
  db("actions")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];

      db("actions")
        .where({ id })
        .first()
        .then(action => {
          res.status(201).json(action);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
