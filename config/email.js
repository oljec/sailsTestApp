module.exports.email = {
    // service: "Gmail",
    // auth: {
    //     user: "oljeck@gmail.com",
    //     pass: "sinka2007bil",
    // },
    // templateDir: "api/emailTemplates",
    // testMode: false
    transporter: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'oljeck@gmail.com',
            pass: 'sinka2007bil'
        }
    },

    from: 'oljeck@gmail.com',


    // transporter: {
    //     host: 'mail.service-sv.com',
    //     port: 465,
    //     secure: true, // use SSL
    //     auth: {
    //         user: 'info@service-sv.com',
    //         pass: 'Morein13mop'
    //     }
    // },
    //
    // from: 'info@service-sv.com',
    templateDir: "api/emailTemplates",
    testMode: false
};