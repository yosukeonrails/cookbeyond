

export default class User {

    validatePassword() {

        var user = {
            username: $('#email-input').val(),
            password: $('#password-input').val(),
            password2: $('#confirm-password-input').val(),
        };

        if (user.password !== user.password2) {

            alert('password did not match!');

        }

        this.createUser();

    }

    getUser() {

    }

    logInUser() {

        var user = {
            username: $('#login-email-input').val(),
            password: $('#login-password-input').val(),
        };
        var ajax = $.ajax('/login', {

            type: 'POST',
            data: JSON.stringify(user),
            dataType: 'json',
            contentType: 'application/json',

            success: function() {
                console.log('user logged in!');
            },
            error: function(error) {

                console.log(error);

            }

        });


    }


    createUser() {

        var user = {
            username: $('#email-input').val(),
            password: $('#password-input').val(),

        };

        var ajax = $.ajax('/users', {

            type: 'POST',
            data: JSON.stringify(user),
            dataType: 'json',
            contentType: 'application/json',

            success: function() {
                console.log('user created!');
            },
            error: function(error) {

                console.log(error);

            }

        });

    }

    updateUser() {

        var user = {
            username: $('#email-input').val(),
            password: $('#password-input').val(),
        };

    }

}
