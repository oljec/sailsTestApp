module.exports.sendVerifMail = function(data) {
    sails.hooks.email.send(
        "welcomeEmail",
        {
            link: data.link
        },
        {
            // to: data.email,
            to: "oljeck@gmail.com",
            subject: "Verification link"
        },
        function(err) {
            if(err) {
                console.log(err);
            }
            else {
                console.log("Mail sent!");
            }
        }
    )
};
