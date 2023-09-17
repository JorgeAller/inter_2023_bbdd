const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");
const { v4: uuid } = require("uuid");

const { UPLOADS_DIR } = process.env;

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

const generateError = (msg, status) => {
  const err = new Error(msg);
  err.statusCode = status;
  return err;
};

/**
 * ################
 * ## Save Photo ##
 * ################
 */

const savePhoto = async (img, imgType = 0) => {
  // Ruta absoluta al directorio de subida de archivos.
  const uploadsPath = path.join(__dirname, UPLOADS_DIR);

  try {
    // Intentamos acceder al directorio uploads.
    await fs.access(uploadsPath);
  } catch {
    // Si no es posible acceder al directorio "access" lanzará un error.
    // Por tanto, si entramos en el catch creamos el directorio.
    await fs.mkdir(uploadsPath);
  }

  // Para poder redimensionar la imagen necesitamos crear un objeto Sharp a
  // partir de la imagen dada.
  const sharpImg = sharp(img.data);

  // Si se trata de un avatar lo redimensionaremos a 150px, de lo contrario,
  // redimensionaremos a 500px.
  if (!imgType) {
    // Redimensionamos a 150px.
    sharpImg.resize(1000);
  } else {
    // Redimensionamos a 500px.
    sharpImg.resize(1000);
  }

  // Generamos un nombre aleatorio para la imagen.
  const imgName = `${uuid()}.jpg`;

  // Ruta absoluta a la imagen.
  const imgPath = path.join(uploadsPath, imgName);

  // Guardamos la imagen en la carpeta uploads.
  await sharpImg.toFile(imgPath);

  // Retornamos el nombre de la imagen.
  return imgName;
};

module.exports = {
  generateError,
  savePhoto,
};
