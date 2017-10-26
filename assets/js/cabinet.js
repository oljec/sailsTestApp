$(document).ready(function(){
    console.log('cabinet.js is loaded');

    $('#btnLogin').click(function(e){
        e.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();
        var dataToSend = {
            email: email,
            password: password
        };

        SendToServer({
            action: "/login",
            input: dataToSend,
            callback: AjaxLoginResults
        });
    });

    $('#btnSignUp').click(function(e){
        e.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();
        var passwordConfirm = $('#passwordConfirm').val();
        var dataToSend = {
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        };

        SendToServer({
            action: "/signUp",
            input: dataToSend,
            callback: AjaxSignUpResults
        });
    });
});

function SendToServer(data){
    $.post( data.action, data.input, data.callback);
}

function AjaxLoginResults(data){
    if (data.state == "fail") {
        ErrorWrite(data.errorMsg)
    } else {
        document.location.href='/';
    }
}

function AjaxSignUpResults(data){
    if (data.state == "fail") {
        ErrorWrite(data.errorMsg)
    } else {
        $('.signUp__form').hide();
        $('.signUp__success').removeClass('hidden');
    }
}

function ErrorWrite(msgArr) {
    console.log(msgArr);
    $('.errors__container').html('');

    for (var i=0; i<msgArr.length; i++) {
        $('.errors__container').append("<h4>" + msgArr[i] + "</h4>");
    }
}