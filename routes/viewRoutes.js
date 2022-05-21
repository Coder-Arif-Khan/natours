const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'Arif',
//   });
// });

// router.get('/', viewsController.overview);
// router.get('/tour', viewsController.getTour);
router
  .route('/')
  .get(
    bookingController.createBookingCheckout,
    authController.isLoggedIn,
    viewsController.getOverview
  );
router
  .route('/tour/:slug')
  .get(authController.isLoggedIn, viewsController.getTour);

router
  .route('/login')
  .get(authController.isLoggedIn, viewsController.getLoginForm);
router.route('/me').get(authController.protect, viewsController.getAccount);
router
  .route('/my-tours')
  .get(authController.protect, viewsController.getMyTours);

router
  .route('/submit-user-data')
  .post(authController.protect, viewsController.updateUserData);

module.exports = router;
