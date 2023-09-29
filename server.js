require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");

const { PORT, UPLOADS_DIR } = process.env;

// Creamos un servidor express.
const app = express();

// Middleware que permite conectar el backend con el frontend
app.use(cors());

// Middleware que indica cuál es el directorio de ficheros estáticos.
app.use(express.static(UPLOADS_DIR));

// Middleware que deserializa un body en formato "raw" creando la propiedad
// "body" en el objeto "request".
app.use(express.json());

// Middleware que deserializa un body en formato "form-data" creando la propiedad
// "files" en el objeto "request".
app.use(fileUpload());

// Middleware que muestra información acerca de la petición.
app.use(morgan("dev"));

/*
 *
 * ##########################
 * ## Middlewares sections ##
 * ##########################
 *
 */

const listSections = require("./controllers/01_sections/listSections");
const getSection = require("./controllers/01_sections/getSection");
const sectionExists = require("./middlewares/01_sectionExists");
const newSection = require("./controllers/01_sections/newSection");

app.get("/sections", listSections);
app.get("/sections/:idSection", sectionExists, getSection);

app.post("/sections", newSection);

/*
 *
 * ##########################
 * ## Middlewares sessions ##
 * ##########################
 *
 *
 */

const listSessionsByIdSection = require("./controllers/02_sessions/listSessionsByIdSection");
const listSessions = require("./controllers/02_sessions/listSessions");
const getSession = require("./controllers/02_sessions/getSession");
const sessionExists = require("./middlewares/02_sessionExists");
const newSession = require("./controllers/02_sessions/newSession");

app.get("/sessions", listSessions);
app.get("/sessions/:idSession", sessionExists, getSession);
app.get(
  "/sessionsByIdSection/:idSection",
  sectionExists,
  listSessionsByIdSection
);

app.post("/sessions", newSession);

/*
 *
 * #######################
 * ## Middlewares films ##
 * #######################
 *
 *
 */

const listFilmsByIdSession = require("./controllers/03_films/listFilmsByIdSession")
const listFilms = require("./controllers/03_films/listFilms");
const getFilms = require("./controllers/03_films/getFilm");
const newFilm = require("./controllers/03_films/newFilm");
const filmExists = require("./middlewares/03_filmExists");

app.get("/films", listFilms);
app.get("/films/:idFilm", filmExists, getFilms);
app.get("/filmsByIdSession/:idSession", sessionExists, listFilmsByIdSession)

app.post("/films", sessionExists, newFilm);

/*
 *
 * ########################
 * ## Middlewares people ##
 * ########################
 *
 *
 */

const listPeople = require("./controllers/04_people/listPeople");
const getPeople = require("./controllers/04_people/getPeople");
const peopleExists = require("./middlewares/04_peopleExists");
const newPeople = require("./controllers/04_people/newPeople");

app.get("/people", listPeople);
app.get("/people/:idPeople", peopleExists, getPeople);

app.post("/people", newPeople);

/* */
/* */
/* */
/* */

/**
 * #####################################
 * ## Middleware de error / not found ##
 * #####################################
 */

// Middleware de error.
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada!",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
