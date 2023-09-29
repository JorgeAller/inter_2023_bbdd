const insertPhotoSessionQuery = require("../../bbdd/queries/02_sessions/insertPhotoSessionQuery");
const insertBasicInfoFilmQuery = require("../../bbdd/queries/03_films/insertBasicInfoFilmQuery");
const insertFilmQuery = require("../../bbdd/queries/03_films/insertFilmQuery");
const insertGeneralInfoFilmQuery = require("../../bbdd/queries/03_films/insertGeneralInfoFilmQuery");
const insertPhotoFilmQuery = require("../../bbdd/queries/03_films/insertPhotoFilmQuery");
const insertTeamFilmQuery = require("../../bbdd/queries/03_films/insertTeamFilmQuery");
const insertTechnicalInfoFilmQuery = require("../../bbdd/queries/03_films/insertTechnicalInfoFilmQuery");

const { generateError, savePhoto } = require("../../helpers");

const newFilm = async (req, res, next) => {
  try {
    const {
      idSession,
      title,
      short_desc,
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
      participants,
      idPeople
    } = req.body;

    if (
      !idSession ||
      !title ||
      !director ||
      !year ||
      !duration ||
      !country ||
      !bio ||
      !genre ||
      !title_original ||
      !lang || 
      !idPeople
    ) {
      throw generateError("Faltan campos", 400);
    }

    // Insertamos la entrada y obtenemos el id que se le ha asignado
    // en la base de datos.
    const idBasicInfo = await insertBasicInfoFilmQuery(
      director,
      year,
      duration,
      sponsor,
      country
    );
    const idGeneralInfo = await insertGeneralInfoFilmQuery(
      bio,
      credits,
      genre,
      title_original,
      translated_title,
      lang,
      subt_lang,
      film_type,
      premiere_type
    );
    const idTechnicalInfo = await insertTechnicalInfoFilmQuery(
      sound_format,
      color_bn,
      recording_format,
      exhibition_format,
      film_dimmension
    );
    const idTeam = await insertTeamFilmQuery(
      writer,
      dir_photo,
      editor,
      sound,
      exec_prod,
      other,
      prod,
      prod_company,
      distr_company,
      participants
    );
    
    const idFilm = await insertFilmQuery(
      idSession,
      idBasicInfo,
      idGeneralInfo,
      idTechnicalInfo,
      idTeam,
      title,
      short_desc,
      idPeople
    );

  
    let image;

    if (!req.files?.media) {
      throw generateError("Faltan campos", 400);
    }

    if (req.files.media) {
      image = await savePhoto(req.files.media);

      await insertPhotoFilmQuery(image, idFilm);
    }

    res.send({
      status: "ok",
      data: {
        Película: {
          idFilm: idFilm,
          idBasicInfoFilm: idBasicInfo,
          idGeneralInfoFilm: idGeneralInfo,
          idTechnicalInfoFilm: idTechnicalInfo,
          idTeamInfoFilm: idTeam,
          title,
          short_desc,
          image,
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
          participants,
          createdAt: new Date(),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newFilm;

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
