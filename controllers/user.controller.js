const {
    User
} = require('../models');
const authService = require('../services/auth.service');
const {
    to,
    ReE,
    ReS,
    queryParse
} = require('../services/util.service');


const create = async function (req, res) {
    const body = req.body;

    if (!body.unique_key && !body.email && !body.phone) {
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));
        if (err) return ReE(res, err, 422);

        return ReS(res, {
            message: 'Successfully created new user.',
            user: user.toWeb(),
            token: user.getJWT()
        }, 201);
    }
}
module.exports.create = create;

const getNewUsers = async function (req, res) {
    let err, users, facility_id;
    facility_id = req.params.facility_id;

    [err, users] = await to(User.findAll({include: {all: true}, where: {FacilityId: facility_id,
                                                                        UserRoleId: null }}));
    if (err) return ReE(res, "err finding users");

    let users_json = []
    for (let i in users) {
        let user = users[i];
        let user_info = user.toWeb();
        users_json.push(user_info);
    }

    console.log('c t', users_json);
    return ReS(res, {
        users: users_json
    });
}
module.exports.getNewUsers = getNewUsers;

const getAll = async function (req, res) {
    let err, users, query, include;
     let whereQuery = {};
    whereQuery = queryParse(req.query);

 
    console.log(whereQuery);
  
    [err, users] = await to(User.findAll({where: whereQuery, include:{all: true}}));
   // [err, users] = await to(User.findAll({include: {all: true}}));
    if (err) return ReE(res, "err finding users");


    let users_json = []
    for (let i in users) {
        let user = users[i];
        let user_info = user.toWeb();
        users_json.push(user_info);
    }

    console.log('c t', users_json);
    return ReS(res, {
        users: users_json
    });
}
module.exports.getAll = getAll;

const get = async function (req, res) {
    let user_id, err, user;
    user_id = req.params.user_id;

    [err, user] = await to(User.findOne({
        include: {
            all: true
        },
        where: {
            id: user_id
        }
    }));
    if (err) return ReE(res, "err finding user");

    return ReS(res, {
        user: user.toWeb()
    });
}
module.exports.get = get;

const update = async function (req, res) {
    let err, user, data, userId;
    userId = req.params.user_id;

    [err, user] = await to(User.findOne({where:{id: userId}}));
    if (err) return ReE(res, "err finding user");

    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {
        message: 'Updated User: ' + user.email
    });
}
module.exports.update = update;

const patch = async function (req, res) {
    let err, user, data, userId, updatedUser;
    userId = req.params.user_id;
    data = {};
    for (const attr of Object.keys(req.body)) {
        data[attr] = req.body[attr];
    }


    [err, user] = await to(User.update(data, {returning: true, where:{id: userId}}));
    if (err) {
        if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    [err, user] = await to(User.findOne({where:{id: userId}}));
    if (err) {      
        return ReE(res, err);
    }
    return ReS(res, {
        message: 'Updated User: ' + user.email
    });
}
module.exports.patch = patch;


const remove = async function (req, res) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if (err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, {
        message: 'Deleted User'
    }, 204);
}
module.exports.remove = remove;


const login = async function (req, res) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 422);


    return ReS(res, {
        token: user.getJWT(),
        user: user.toWeb()
    });
}
module.exports.login = login;