const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  email_usuario: String,
  fecha: {
    type: Date,
    default: () => +new Date() - 5 * 60 * 60 * 1000,
  },
  antecedentes: {
    hipertension: Boolean,
    diabetes: Boolean,
    enfermedad_pulmonar: Boolean,
    enfermedad_renal: Boolean,
    enfermedad_autoinmune: Boolean,
    malnutricion: Boolean,
    tabaquismo: Boolean,
    embarazo: Boolean,
    convive_mayores: Boolean,
    tratamiento_medico: Boolean,
  },
  sintoma_ultimos_dias: {
    tos: Boolean,
    dolor_garganta: Boolean,
    fiebre: Boolean,
    secrecion_nasal: Boolean,
    malestar_general: Boolean,
    disminucion_percepcion: Boolean,
    dificultad_respiratoria: Boolean,
    diarrea: Boolean,
  },
  identificacion_contacto: {
    contacto_positivo: Boolean,
    contacto_sintomatico: Boolean,
  },
  sector_trabajo: {
    sector: String,
    area_durante_covid: String,
    otra_area: String,
  },
  pruebas_diagnosticas: {
    prueba_con_muestra: Boolean,
    prueba_sangre: Boolean,
    aislamiento: Boolean,
    incapacidad: Boolean,
  },
});

const model = mongoose.model('Form', formSchema);

module.exports = model;
