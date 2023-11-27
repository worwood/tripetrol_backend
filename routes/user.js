const {Router} = require('express');
const { check } = require('express-validator');
const router =Router();

const {usuariosPost} =require('../controllers/user_controller')

router.post('/createUser', usuariosPost );

module.exports=router;