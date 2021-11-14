const express = require("express");
const { body } = require('express-validator');

const {
  fileUploadController,
  createRecordController,
  readRecordController,
  updateRecordController,
  deleteRecordController,
  adminLoginController,
  } = require('../controllers/userControllers');

const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

router.get('/adminLogin', adminLoginController);
router.post('/fileUpload', fileUploadController);
router.post('/createRecord', 
  [ 
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('firstname','firstname can be maximum 20 characters long').trim().isLength({max: 20}),
    body('firstname','firstname can be maximum 20 characters long').trim().isLength({max: 20}),
  ], adminAuth, createRecordController);

router.get('/readRecord', readRecordController);
router.put('/updateRecord', 
  [ 
    body('updatedEmail').isEmail().withMessage('Please enter a valid email'),
    body('updatedFirstname','firstname can be maximum 20 characters long').trim().isLength({max: 20}),
    body('updatedLastname','firstname can be maximum 20 characters long').trim().isLength({max: 20}),
  ], adminAuth, updateRecordController);

router.delete('/deleteRecord', adminAuth, deleteRecordController);

module.exports = router;