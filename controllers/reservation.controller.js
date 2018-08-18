const { Reservation } = require('../models');
const { Sequelize} = require('sequelize');
const { to, ReE, ReS } = require('../services/util.service');
const  moment  = require('moment');

const create = async function(req, res){
    let err, reservation;


    let reservation_info = req.body;


    [err, reservation] = await to(Reservation.create(reservation_info));
    if(err) return ReE(res, err, 422);


    return ReS(res, {message:'Successfully created reservation.', reservation:reservation.toWeb()}, 201);
}

module.exports.create = create;

const getAll = async function(req, res){
    let resourceId, beginDate, endDate;
    resourceId = req.query.resourceId;
    beginDate = moment(req.query.beginDate).toDate();
    endDate = moment(req.query.endDate).toDate();
    
    let err, reservations;

    [err, reservations] = await to(Reservation.findAll({
        where: 
            {
            ResourceId: resourceId,
            startDateTime: {
                [Sequelize.Op.gte]: beginDate
            },
            endDateTime: {
                [Sequelize.Op.lte]: endDate
            }

        }
    }));

    let reservations_json =[]
    for( let i in reservations){
        let reservation = reservations[i];
        let reservation_info = reservation.toWeb();
        reservations_json.push(reservation_info);
    }

    console.log('c t', reservations_json);
    return ReS(res, {reservations:reservations_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    let reservation_id, err, reservation;
    reservation_id = req.params.reservation_id;

    
    [err, reservation] = await to(Reservation.findOne({where:{id:reservation_id}}));
    if(err) return ReE(res, "err finding reservation");
   
    return ReS(res, {reservation:reservation.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let reservation_id, err, reservation;
    reservation_id = req.params.reservation_id;

    [err, reservation] = await to(Reservation.findOne({where:{id:reservation_id}}));
    if(err) return ReE(res, "err finding facilty");
    
    data = req.body;
    reservation.set(data);

    [err, reservation] = await to(reservation.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {reservation:reservation.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let reservation_id, err, reservation;
    reservation_id = req.params.reservation_id;

    [err, reservation] = await to(Reservation.findOne({where:{id:reservation_id}}));
    if(err) return ReE(res, "err finding facilty");
    
    [err, reservation] = await to(reservation.destroy());
    if(err) return ReE(res, 'error occured trying to delete the Reservation');

    return ReS(res, {message:'Deleted Reservation'}, 204);
}
module.exports.remove = remove;

