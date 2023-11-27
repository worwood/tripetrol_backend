const {Router} = require('express');
const { check } = require('express-validator');
const router =Router();

const {downloadExcel
} = require('../controllers/excelcreator.js')


router.post('/reporte',downloadExcel);


module.exports=router;