const {Router} = require('express');
const { check } = require('express-validator');
const router =Router();

const {cobranzasIncompletasGet,
    saldoCajaGet,
    cobranzaPut,
    remesasPost,
    saldosPost,
    camionesSaldosGet
} = require('../controllers/registro_cobranzas_controller')

router.get('/cobranzasI',cobranzasIncompletasGet);
router.get('/camionesSaldos',camionesSaldosGet);
router.get('/saldoCaja',saldoCajaGet);
router.put('/cobranza/:id',cobranzaPut);
router.post('/remesa',remesasPost);
router.post('/saldo',saldosPost);
module.exports=router;