const { UserRole } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res){
    let err, userRole;


    let userRole_info = req.body;


    [err, userRole] = await to(UserRole.create(userRole_info));
    if(err) return ReE(res, err, 422);


    return ReS(res, {message:'Successfully created userRole.', userRole:userRole.toWeb()}, 201);
}

module.exports.create = create;

const getAll = async function(req, res){
    let user = req.user;
    let err, userRoles;

    [err, userRoles] = await to(UserRole.findAll());

    let userRoles_json =[]
    for( let i in userRoles){
        let userRole = userRoles[i];
        let userRole_info = userRole.toWeb();
        userRoles_json.push(userRole_info);
    }

    console.log('c t', userRoles_json);
    return ReS(res, {userRoles:userRoles_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    let userRole_id, err, userRole;
    userRole_id = req.params.userRole_id;

    
    [err, userRole] = await to(UserRole.findOne({where:{id:userRole_id}}));
    if(err) return ReE(res, "err finding userRole");
   
    return ReS(res, {userRole:userRole.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let userRole_id, err, userRole;
    userRole_id = req.params.userRole_id;

    [err, userRole] = await to(UserRole.findOne({where:{id:userRole_id}}));
    if(err) return ReE(res, "err finding facilty");
    
    data = req.body;
    userRole.set(data);

    [err, userRole] = await to(userRole.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {userRole:userRole.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let userRole_id, err, userRole;
    userRole_id = req.params.userRole_id;

    [err, userRole] = await to(UserRole.findOne({where:{id:userRole_id}}));
    if(err) return ReE(res, "err finding facilty");
    
    [err, userRole] = await to(userRole.destroy());
    if(err) return ReE(res, 'error occured trying to delete the UserRole');

    return ReS(res, {message:'Deleted UserRole'}, 204);
}
module.exports.remove = remove;