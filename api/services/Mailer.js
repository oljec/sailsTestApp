module.exports.sendWelcomeMail = function() {
    sails.hooks.email.send(
        "welcomeEmail",
        {
            recipientName: "Joe",
            senderName: "Sue"
        },
        {
            to: "oljeck@gmail.com",
            subject: "Hi there"
        },
        function(err) {
            if(err) {
                console.log(err);
            }
            else {
                console.log("Ited!");
            }
        }
    )
};
