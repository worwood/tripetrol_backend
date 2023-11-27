const {Router} = require('express');
const { check } = require('express-validator');
const router =Router();

const {compraPost,
ordenCompraSalidaGet,
trasladoRetornoPut} = require('../controllers/orden_compra_controller')

router.post('/compra',compraPost);
router.get('/ordenesSalida',ordenCompraSalidaGet);
router.put('/ordenRetorno/:id',trasladoRetornoPut);

module.exports=router;