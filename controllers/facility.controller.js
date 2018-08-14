const { Facility } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res){
    let err, facility;


    let facility_info = req.body;


    [err, facility] = await to(Facility.create(facility_info));
    if(err) return ReE(res, err, 422);


    return ReS(res, {message:'Successfully created facility.', facility:facility.toWeb()}, 201);
}

module.exports.create = create;

const getAll = async function(req, res){
    let user = req.user;
    let err, facilities;

    [err, facilities] = await to(Facility.findAll());

    let facilities_json =[]
    for( let i in facilities){
        let facility = facilities[i];
        let facility_info = facility.toWeb();
        facilities_json.push(facility_info);
    }

    console.log('c t', facilities_json);
    return ReS(res, {facilities:facilities_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    let facility_id, err, facility;
    facility_id = req.params.facility_id;

    
    [err, facility] = await to(Facility.findOne({where:{id:facility_id}}));
    if(err) return ReE(res, "err finding facility");
   
    return ReS(res, {facility:facility.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let facility_id, err, facility;
    facility_id = req.params.facility_id;

    [err, facility] = await to(Facility.findOne({where:{id:facility_id}}));
    if(err) return ReE(res, "err finding facilty");
    
    data = req.body;
    facility.set(data);

    [err, facility] = await to(facility.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {facility:facility.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let facility_id, err, facility;
    facility_id = req.params.facility_id;

    [err, facility] = await to(Facility.findOne({where:{id:facility_id}}));
    if(err) return ReE(res, "err finding facilty");
    
    [err, facility] = await to(facility.destroy());
    if(err) return ReE(res, 'error occured trying to delete the Facility');

    return ReS(res, {message:'Deleted Facility'}, 204);
}
module.exports.remove = remove;