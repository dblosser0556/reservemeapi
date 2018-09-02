const { to, ReE, ReS } = require('../services/util.service');
const email = require('emailjs');
const CONFIG = require('../config/config');

const sendmail = function(req, res){
    let err;
    const from = req.body.from;
    const to = req.body.to;
    const cc = (req.body.cc !== null)? req.body.cc : null;
    const bcc = (req.body.bcc !== null)? req.body.bcc : null;
    const text = req.body.text;
    const subject = req.body.subject;
    const htmlText = req.body.htmlText;

    // connect to the server
    const server = email.server.connect({
        user: CONFIG.mail_user,
        password: CONFIG.mail_password,
        host: CONFIG.mail_host,
        ssl: CONFIG.mail_ssl
    });
 
    // const message = req.body;
    var message	= {
        text:	text, 
        from:	from, 
        to:		to,
        subject:	subject,
        attachment: [
            { data: htmlText }
        ]
     };
    server.send(message, function(err, message) {console.log(err || message);});
    //if (err) return ReE(res, "email error");

    if (err) return ReS(res, {
        success:true, message:'sent mail as specified', data:''}
    ); 

  
	
}
module.exports.sendmail = sendmail;