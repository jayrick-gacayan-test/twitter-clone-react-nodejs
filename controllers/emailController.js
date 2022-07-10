const nodemailer = require("nodemailer");

const transporter = 
    nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'jayrick.gacayan@kodakollectiv.com',
            pass: '1227Greymar',
        },
        secure: true,
    });

exports.sendEmail = async (req, res) => {
    
    const mailData = {
        from : 'jayrick.gacayan@kodakollectiv.com',
        to: 'jirk24cay0988@gmail.com',
        subject: 'Text Send Email',
        text: 'Hello World',
        html: '<p>First send email message!</p>'
    }

    transporter.sendMail(mailData,
        (error, info) => {
            if(error){ 
                console.log("Error --- ", error);
                return res.status(400).json({
                    error: error
                });
            }
            console.log("Info", info);
            return res.status(200).send({ message: "Mail send."});
        }
    ); // sending eMail using nodemailer
};

exports.multiSendEmail = async (req, res) => {
    return res.status(200).json({
        message: "Send email/s are successful."
    });
}