module.exports.email = {
    transporter: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'oljec.ethereum@gmail.com',
            pass: 'Morein13mop'
        }
    },

    from: 'oljec.ethereum@gmail.com',


    // transporter: {
    //     host: 'SMTP server',
    //     port: 465,
    //     secure: true, // use SSL
    //     auth: {
    //         user: '***',
    //         pass: '***'
    //     }
    // },
    //
    // from: 'oljec.ethereum@gmail.com',
    templateDir: "api/emailTemplates",
    testMode: false
};