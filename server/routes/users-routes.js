const express = require('express');
const router = express.Router();
const { createUser, getUsersList, getUser, updateUser, deleteUser, userLogin } = require('../controllers/users-controller.js')

router.post('/api/user', createUser);
router.get('/api/users-list', getUsersList);
router.get('/api/user/:id', getUser);
router.put('/api/user/:id', updateUser);
router.delete('/api/user/:id', deleteUser);
router.post('/api/user/login', userLogin);

module.exports = router;