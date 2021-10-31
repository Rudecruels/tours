const express = require('express');
const userController = require('./../controllers/userControllers');
const authController = require('./../controllers/authcontroller');

const router = express.Router();

router.post('/signup', authController.signup);



router.route('/').get(userController.getAllUsers).post(userController.postUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUsser);

  
module.exports = router;
