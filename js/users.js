

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
          console.log(user);
        this.createUser(user);
    }

    getUser() {

    }

    logInUser(logInData) {

        var user = {
            username: logInData.username,
            password: logInData.password
        };

        console.log(logInData);

        var ajax = $.ajax('/login', {

            type: 'POST',
            data: JSON.stringify(user),
            dataType: 'json',
            contentType: 'application/json',

            success: function(data) {

                window.location="/dashboard.html";       

            },
            error: function(error) {
                  console.log('NOPE');
            }

        });

    }


    createUser(user) {

        var createdUser = {
            userNickname:$('#nickname-input').val(),
            username: user.username,
            password: user.password
        };

        var ajax = $.ajax('/users', {

            type: 'POST',
            data: JSON.stringify(createdUser),
            dataType: 'json',
            contentType: 'application/json',

            success: function(data) {
            var appUser = new User();

            var logInData= {
                username:user.username,
                password:user.password
              }  ;

                appUser.logInUser(logInData);

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
