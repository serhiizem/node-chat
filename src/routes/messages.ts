import {Router} from "express";

const express = require('express');

const router: Router = express.Router();
const messagesController = require('../controllers/messagesController');

router.post('/', messagesController.messageCreate);

module.exports = router;