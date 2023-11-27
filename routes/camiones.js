const {Router} = require('express');
const { check } = require('express-validator');
const router =Router();
router.get('/lista',)

const {camionesGet} = require('../controllers/camiones_controller')

router.get('/',camionesGet);

module.exports=router;