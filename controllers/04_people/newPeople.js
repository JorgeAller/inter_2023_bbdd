const insertPhotoSessionQuery = require("../../bbdd/queries/02_sessions/insertPhotoSessionQuery");
const insertBasicInfoFilmQuery = require("../../bbdd/queries/03_films/insertBasicInfoFilmQuery");
const insertFilmQuery = require("../../bbdd/queries/03_films/insertFilmQuery");
const insertGeneralInfoFilmQuery = require("../../bbdd/queries/03_films/insertGeneralInfoFilmQuery");
const insertPhotoFilmQuery = require("../../bbdd/queries/03_films/insertPhotoFilmQuery");
const insertTeamFilmQuery = require("../../bbdd/queries/03_films/insertTeamFilmQuery");
const insertTechnicalInfoFilmQuery = require("../../bbdd/queries/03_films/insertTechnicalInfoFilmQuery");
const insertPeopleQuery = require("../../bbdd/queries/04_people/insertPeopleQuery");
const insertPhotoPeopleQuery = require("../../bbdd/queries/04_people/insertPhotoPeopleQuery");

const { generateError, savePhoto } = require("../../helpers");

const newPeople = async (req, res, next) => {
  try {
    const {
      name,
      short_desc,
      text,
      bio,
      type,
    } = req.body;

    if (
      !name ||
      !bio ||
      !type 
    ) {
      throw generateError("Faltan campos", 400);
    }

    
    
    const idPeople = await insertPeopleQuery(
      name,
      short_desc,
      text,
      bio,
      type,
      short_desc,
    );
    let image;

    if (!req.files?.media) {
      throw generateError("Faltan campos", 400);
    }

    if (req.files.media) {
      image = await savePhoto(req.files.media);

      await insertPhotoPeopleQuery(image, idPeople);
    }

    res.send({
      status: "ok",
      data: {
        Película: {
          idPeople: idPeople,
          name,
          short_desc,
          text,
          bio,
          type,
          createdAt: new Date(),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newPeople;

/* 
director,
year,
duration,
sponsor,
country,
bio,
credits,
genre,
title_original,
translated_title,
lang,
subt_lang,
film_type,
premiere_type,
sound_format,
color_bn,
recording_format,
exhibition_format,
film_dimmension,
writer,
dir_photo,
editor,
sound,
exec_prod,
other,
prod,
prod_company,
distr_company,
participants */
