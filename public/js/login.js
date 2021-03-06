/**
 * Add variable to document.cookie
 * @param key variable name to be added
 * @param value variable value
 */
function writeCookie(key, value) {
    document.cookie = key + "=" + value;
}

/**
 * Delete variable from document.cookie
 * @param key variable name to be deleted
 */
function deleteCookie(key) {
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

/**
 * Generate object of document.cookie
 * @return {object} object of document.cookie
 */
function getCookieDict() {
    let allcookies = document.cookie;
    let obj = {};
    let cookiearray = allcookies.split('; ');
    for (let i = 0; i < cookiearray.length; i++) {
        obj[cookiearray[i].split('=')[0]] = cookiearray[i].split('=')[1];
    }
    return obj;
}

function hash(value) {
    return CryptoJS.SHA1(value).toString();
}

var registerUser = () => {
    var registerFirstName = $('#registerFirstName');
    var registerLastName = $('#registerLastName');
    var registerEmail = $('#registerEmail');
    var registerPassword = $('#registerPassword');
    var registerConfirmPassword = $('#registerConfirmPassword');
    var isValid = true;
    if (!registerFirstName.val()) {
        isValid = false;
        registerFirstName.removeClass('is-valid').addClass('is-invalid');
    } else {
        registerFirstName.removeClass('is-invalid').addClass('is-valid');
    }
    if (!registerLastName.val()) {
        isValid = false;
        registerLastName.removeClass('is-valid').addClass('is-invalid');
    } else {
        registerLastName.removeClass('is-invalid').addClass('is-valid');
    }
    if (!registerEmail.val()) {
        isValid = false;
        registerEmail.removeClass('is-valid').addClass('is-invalid');
    } else {
        registerEmail.removeClass('is-invalid').addClass('is-valid');
    }
    if (!registerPassword.val() || registerPassword.val() === '') {
        isValid = false;
        registerPassword.removeClass('is-valid').addClass('is-invalid');
    } else {
        registerPassword.removeClass('is-invalid').addClass('is-valid');
    }
    if (registerPassword.val() !== registerConfirmPassword.val() || registerConfirmPassword.val() === '') {
        isValid = false;
        registerConfirmPassword.removeClass('is-valid').addClass('is-invalid');
    } else {
        registerConfirmPassword.removeClass('is-invalid').addClass('is-valid');
    }
    if (isValid) {
        $.post('/post/v1/addSuperuser', {
            firstName: registerFirstName.val(),
            lastName: registerLastName.val(),
            email: registerEmail.val(),
            password: hash(registerPassword.val())
        }).then(response => {
            window.location.href = '/index.html';
        });
    } else {
        registerPassword.val('');
        registerConfirmPassword.val('');
    }
}

var resetPassword = () => {
    var forgotPasswordEmail = $('#forgotPasswordEmail');
    var forgotPasswordPassword = $('#forgotPasswordPassword');
    var forgotPasswordConfirmPassword = $('forgotPasswordConfirmPassword');
    var isValid = true;
    if (!forgotPasswordEmail.val()) {
        isValid = false;
        forgotPasswordEmail.removeClass('is-valid').addClass('is-invalid');
    } else {
        forgotPasswordEmail.removeClass('is-invalid').addClass('is-valid');
    }
    if (!forgotPasswordPassword.val() || forgotPasswordPassword.val() === '') {
        isValid = false;
        forgotPasswordPassword.removeClass('is-valid').addClass('is-invalid');
    } else {
        forgotPasswordPassword.removeClass('is-invalid').addClass('is-valid');
    }
    if (forgotPasswordPassword.val() !== forgotPasswordConfirmPassword.val() || forgotPasswordConfirmPassword.val() === '') {
        isValid = false;
        forgotPasswordConfirmPassword.removeClass('is-valid').addClass('is-invalid');
    } else {
        forgotPasswordConfirmPassword.removeClass('is-invalid').addClass('is-valid');
    }
    if (isValid) {
        $.post('/post/v1/superuserChangePassword', {
            email: forgotPasswordEmail.val(),
            password: hash(forgotPasswordPassword.val())
        }).then(response => {
            window.location.href = '/index.html';
        });
    } else {
        forgotPasswordPassword.val('');
        forgotPasswordConfirmPassword.val('');
    }
}

var login = () => {
    var email = $('#email');
    var password = $('#password');
    $.post('/post/v1/superuserLogin',{
        email: email.val(),
        password: hash(password.val())
    }).then(response => {
        if(response.isVertified){
            window.location.href = '/home';
        }else{
            email.val('');
            email.removeClass('is-valid').addClass('is-invalid');
            password.val('');
            password.removeClass('is-valid').addClass('is-invalid');
        }
    })
}