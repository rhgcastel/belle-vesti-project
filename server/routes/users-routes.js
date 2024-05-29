const express = require('express');
const router = express.Router();
const { createUser, getUsersList, getUser, updateUser, deleteUser, userLogin, refreshUserToken, userLogout } = require('../controllers/users-controller');
const { validateCreateUser } = require('../middlewares/validator');

router.post('/api/user', validateCreateUser, createUser);
router.get('/api/users-list', getUsersList);
router.get('/api/user/:id', getUser);
router.put('/api/user/:id', validateCreateUser, updateUser);
router.delete('/api/user/:id', deleteUser);
router.post('/api/user/login', userLogin);
router.post('/api/user/token', refreshUserToken);
router.post('/api/user/logout', userLogout);

module.exports = router;
