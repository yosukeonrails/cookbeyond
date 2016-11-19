
export default class View {

   showErrorMessage(message){


   }

    showUser() {

        window.location.href = "/facebookhome.html";

        $('#profile-pic').append('<img src=' + this.user.pictureUrl + ' alt="" />');

        $('.show-user').text(this.user.name);
    }

    showBirthday() {


    }

    updateQuestion() {

        let questions = data.questions_array;

        console.log(questions.choices);



        $.each(questions, function(index, value) {



            console.log(value.question);

            var option;

            for (let i = 0; i < value.choices.length; i++) {

                console.log(value.choices[i]);
                console.log(value.choices.length);

                $('.quiz-window').append('<option value="1">' + value.choices[i] + '</option>');

                option = value.choices[i];
                console.log('options are' + option);

            }

            $('.quiz-window').append('<select><label>' + value.question + '</label>' + options + '</select>');







        });

        $.each(data.questions_array.choices, function() {
            console.log(value);
        });


    }

    login() {

        let email = $('#email-input').val();
        let password = $('#password-input').val();
        let userData = data.users;

        if (!userData[email] || password != data.users[email].password) {

            alert('wrong passoword or user mate!');
            return;
        }

        this.user = new User(data.users[email].name, data.users[email].email, data.users[email].pictureUrl, data.users[email].friendList);

        $('.sign-in').fadeOut(500, function() {

        });

        this.showUser();
    }



}
