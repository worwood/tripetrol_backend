const {Router} = require('express');
const { check } = require('express-validator');
const router =Router();

const {distribucionPost,
    ordenDistribucionSalidaGet,
    distribucionRetornoPut,
} = require('../controllers/orden_distribucion_controller')

router.post('/distribucion',distribucionPost);
router.get('/ordenSalida',ordenDistribucionSalidaGet);
router.put('/ordenRetorno/:id',distribucionRetornoPut);

module.exports=router;