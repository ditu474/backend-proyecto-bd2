const client = require('../config/postgresdb');
const catchAsync = require('../utils/catchAsync');
const FamilyInfoModel = require('../models/familyInfo.model');

const userController = {};

userController.login = catchAsync(async (req, res) => {
  // const email = req.body["email"]
  const { email, typeOfUser } = req.query;
  switch (typeOfUser) {
    case 'estudiante':
      await searchInPostgres(
        res,
        `SELECT dni, nombres, apellido1, apellido2, estudiantes.plan, ult_sem_matri, email, programa.nombre as programa  FROM estudiantes JOIN plan ON estudiantes.plan=plan.codigo JOIN programa ON plan.cod_programa=programa.codigo WHERE email='${email}'`,
        typeOfUser
      );
      break;
    case 'docente':
      await searchInPostgres(
        res,
        `SELECT nro_documento, tipo_doc, nombre_completo, email, tipo, programa.nombre as programa, area_facultad.nombre as facultad  FROM docentes JOIN programa ON docentes.cod_programa=programa.codigo JOIN area_facultad ON programa.cod_facultad=area_facultad.codigo WHERE docentes.email='${email}'`,
        typeOfUser
      );
      break;
    case 'empleado':
      await searchInPostgres(
        res,
        `SELECT nro_doc, empleados.nombre, empleados.area_facultad, cargo, email, area_facultad.nombre as facultad FROM empleados JOIN area_facultad ON empleados.area_facultad=area_facultad.codigo WHERE email='${email}'`,
        typeOfUser
      );
      break;
  }
});

const searchInPostgres = async (res, query, typeOfUser) => {
  await client.query(query, (error, response) => {
    if (error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      if (!response.rows[0]) {
        res.status(404).json({
          message: `El ${typeOfUser} no se ha encontrado`,
        });
      } else {
        res.status(200).json({
          data: response.rows[0],
        });
      }
    }
  });
};

userController.getFamilyInfo = catchAsync(async (req, res) => {
  const { email } = req.query;
  const data = await FamilyInfoModel.findOne({ user_email: email });
  if (!data) {
    res.status(404).json({
      message: `No se encontró información familiar asociada al email: ${email}`,
    });
  } else {
    res.status(200).json({
      data,
    });
  }
});

userController.postFamilyInfo = catchAsync(async (req, res) => {
  const { user_email, relatives, childrens, location, sports } = req.body;
  const number_of_relatives = relatives.length;
  const number_of_childrens = childrens.length;
  let data = await FamilyInfoModel.findOne({ user_email });
  if (data) {
    data.number_of_relatives = number_of_relatives;
    data.relatives = relatives;
    data.number_of_childrens = number_of_childrens;
    data.childrens = childrens;
    data.location = location;
    data.sports = sports;
    data.save();
    res.status(200).json({
      message: `Se ha actualizado la información familiar asociada al email ${user_email}`,
      data,
    });
  } else {
    data = await FamilyInfoModel.create({
      user_email,
      number_of_relatives,
      relatives,
      number_of_childrens,
      childrens,
      location,
      sports,
    });
    res.status(201).json({
      message: `Se ha creado la información familiar asociada al email ${user_email}`,
      data,
    });
  }
});

module.exports = userController;
