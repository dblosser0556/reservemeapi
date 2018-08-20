const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
const HomeController 	= require('../controllers/home.controller');
const FacilityController = require('../controllers/facility.controller');
const ResourceController = require('../controllers/resource.controller');
const ReservationController = require('../controllers/reservation.controller');
const UserRoleController = require('../controllers/userrole.controller');
const MailController = require('../controllers/mail.controller');


const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});


router.post(    '/users',                 UserController.create);                                                    // C
router.get(     '/users',                 passport.authenticate('jwt', {session:false}), UserController.getAll);        // R
router.get(     '/users/:user_id',        passport.authenticate('jwt', {session:false}), UserController.get);   
router.get(     '/users/new/:facility_id',passport.authenticate('jwt', {session:false}), UserController.getNewUsers);     // R
router.put(     '/users/:user_id',        passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.patch(   '/users/:user_id',        passport.authenticate('jwt', {session:false}), UserController.patch);  // U
router.delete(  '/users/:user_id',        passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/users/login',           UserController.login);

router.post(    '/facilities',              passport.authenticate('jwt', {session:false}), FacilityController.create);  // C
router.get(     '/facilities',              passport.authenticate('jwt', {session:false}), FacilityController.getAll);  // R
router.get(     '/facilities/:facility_id', passport.authenticate('jwt', {session:false}), FacilityController.get);     // R
router.put(     '/facilities/:facility_id', passport.authenticate('jwt', {session:false}), FacilityController.update);  // U
router.delete(  '/facilities/:facility_id', passport.authenticate('jwt', {session:false}), FacilityController.remove);  // D

router.post(    '/resources',              passport.authenticate('jwt', {session:false}), ResourceController.create);  // C
router.get(     '/resources',              passport.authenticate('jwt', {session:false}), ResourceController.getAll);  // R
router.get(     '/resources/:resource_id', passport.authenticate('jwt', {session:false}), ResourceController.get);     // R
router.put(     '/resources/:resource_id', passport.authenticate('jwt', {session:false}), ResourceController.update);  // U
router.delete(  '/resources/:resource_id', passport.authenticate('jwt', {session:false}), ResourceController.remove);  // D

router.post(    '/reservations',              passport.authenticate('jwt', {session:false}), ReservationController.create);  // C
router.get(     '/reservations',              passport.authenticate('jwt', {session:false}), ReservationController.getAll);  // R
router.get(     '/reservations/:reservation_id', passport.authenticate('jwt', {session:false}), ReservationController.get);     // R
router.put(     '/reservations/:reservation_id', passport.authenticate('jwt', {session:false}), ReservationController.update);  // U
router.delete(  '/reservations/:reservation_id', passport.authenticate('jwt', {session:false}), ReservationController.remove);  // D

router.post(    '/userroles',              passport.authenticate('jwt', {session:false}), UserRoleController.create);  // C
router.get(     '/userroles',              passport.authenticate('jwt', {session:false}), UserRoleController.getAll);  // R
router.get(     '/userroles/:userRole_id', passport.authenticate('jwt', {session:false}), UserRoleController.get);     // R
router.put(     '/userroles/:userRole_id', passport.authenticate('jwt', {session:false}), UserRoleController.update);  // U
router.delete(  '/userroles/:userRole_id', passport.authenticate('jwt', {session:false}), UserRoleController.remove);  // D

router.post(    '/sendmail',               passport.authenticate('jwt', {session:false}), MailController.sendmail);

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
