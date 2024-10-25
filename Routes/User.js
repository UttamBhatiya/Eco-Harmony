const express = require('express');
const router = express.Router({mergeParams:true});
const {handleLogin, handleSignup, handleUpdateUser, handleDeleteUser, handleRenderLoginForm, handleRenderSignup} = require('../Controllers/User');

router.get('/login', handleRenderLoginForm);
router.get('/signup', handleRenderSignup);
router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.put('/', handleUpdateUser);
router.delete('/', handleDeleteUser);

module.exports = router;
