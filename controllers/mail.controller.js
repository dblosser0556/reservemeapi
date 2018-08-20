const { to, ReE, ReS } = require('../services/util.service');
const email = require('emailjs');
const CONFIG = require('../config/config');

const sendmail = function(req, res){
    let err;
    
    // connect to the server
    const server = email.server.connect({
        user: CONFIG.mail_user,
        password: CONFIG.mail_password,
        host: CONFIG.mail_host,
        ssl: CONFIG.mail_ssl
    });

    // const message = req.body;
    var message	= {
        text:	"i hope this works", 
        from:	"TTCC <TTCC@gmail.com>", 
        to:		"someone <blosserdl@gmail.com>",
        subject:	"testing emailjs",
        attachment: 
        [
           {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
        ]
     };
    server.send(message, function(err, message) {console.log(err || message);});
    if (err) return ReE(res, "err finding user");

    return ReS(res, {
        success:true, message:'it worked', data:'user name is :'}
    ); 

  
	
}
module.exports.sendmail = sendmail;