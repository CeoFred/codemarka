(function ($) {
    "use strict";
$('#ln_btn').on('click', function () {
    var check = true;
    var input = $('.input100');

    for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
        }
    }
    const submit_BTN = $(this);

    if (check == false) {
        iziToast.warning({
            title: 'Caution',
            message: 'You forgot important data',
        });
        submit_BTN.html('Try again..');

    } else {
        submit_BTN
            .html(`<div class='gooey'>
							<span class='dot'></span>
							<div class='dots'>
								<span></span>
								<span></span>
								<span></span>
							</div>
                        </div>`)
            .attr("disabled", true)


        const data = {
            email: $('#lg_em').val(),
            password: $('#lg_pw').val(),
        }
        console.log(data)
        postData(`http://localhost:3001/auth/login`, data)
            .then(data => {
                console.log(data)
                if (data.status == "success") {
                    iziToast.success({
                        title: 'Nice!',
                        message: 'Authentication successful',
                    });

                    submit_BTN
                        .html(`loading...`)
                        .attr("disabled", false);
                    window.localStorage.setItem('token',data.meta.token)
                    window.localStorage.setItem('userId',data.meta.userId)
                    window.localStorage.setItem('t_expires',data.meta.expires)
                    window.localStorage.setItem('user', data.meta.username)

                    setTimeout(() => {
                        window.location.href = '/'
                    }, 1400);
                } else {
                    iziToast.error({
                        title: 'Whoops!',
                        message: `${data.message.status ? data.message.message : data.message.status}`
                    });
                    submit_BTN
                        .html(`Try again...`)
                        .attr("disabled", false)
                }

            })
            .catch(error => {
                iziToast.error({
                    title: 'Whoops!',
                    message: 'Something went wrong!'
                });
                submit_BTN
                    .html(`Try again later...`)
                    .attr("disabled", false)
                console.error(error)
            });

    }


});



function postData(url = ``, data = {}) {
    return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data),
        })
        .then(response => response.json());
}
    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

     function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {

     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

       if(re.test(String($(input).val()).toLowerCase())){
                        return true;
                    }else{
                        return false;
                    }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf135;</span>')

        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });
    }
    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }



})(jQuery);