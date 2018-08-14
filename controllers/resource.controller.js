const { Resource } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res){
    let err, resource;


    let resource_info = req.body;


    [err, resource] = await to(Resource.create(resource_info));
    if(err) return ReE(res, err, 422);


    return ReS(res, {message:'Successfully created Resource.', resource:resource.toWeb()}, 201);
}

module.exports.create = create;

const getAll = async function(req, res){
    let user = req.user;
    let err, resources;

    [err, resources] = await to(Resource.findAll());

    let resources_json =[]
    for( let i in resources){
        let resource = resources[i];
        let resource_info = resource.toWeb();
        resources_json.push(resource_info);
    }

    console.log('c t', resources_json);
    return ReS(res, {resources:resources_json});
}
module.exports.getAll = getAll;

const get = async function(req, res){
    let resource_id, err, resource;
    resource_id = req.params.resource_id;

    
    [err, resource] = await to(Resource.findOne({where:{id:resource_id}}));
    if(err) return ReE(res, "err finding resource");
   
    return ReS(res, {resource:resource.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let resource_id, err, resource;
    resource_id = req.params.resource_id;

    [err, resource] = await to(Resource.findOne({where:{id:resource_id}}));
    if(err) return ReE(res, "err finding facilty");
    
    data = req.body;
    resource.set(data);

    [err, resource] = await to(resource.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {resource:resource.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let resource_id, err, resource;
    resource_id = req.params.resource_id;

    [err, resource] = await to(Resource.findOne({where:{id:resource_id}}));
    if(err) return ReE(res, "err finding facilty");
    
    [err, resource] = await to(resource.destroy());
    if(err) return ReE(res, 'error occured trying to delete the Resource');

    return ReS(res, {message:'Deleted Resource'}, 204);
}
module.exports.remove = remove;