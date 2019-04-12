(function ($) {
    "use strict";

    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })
    })
$('#a_t').on('change', function () {
    $(this).find('.btn-hide-validate').remove();
    $(this).removeClass('true-validate');

            const p1 = $('#a_t');
            if (validate(p1) == false) {
                showValidate(this);
            } else {
                $(this).parent().addClass('true-validate');
            }

});

    $('.p2 .input100').each(function () {
        $(this).on('keyup', function () {
     $(thisAlert).find('.btn-hide-validate').remove();
          $(this).parent().removeClass('true-validate');

            const p1 = $('.p1 .input100').val();
            const p2 = this;
            if($(p2).val() !== p1){
                showNoMatch(this);
            }else{
                var thisAlert = $(this).parent();
                $(thisAlert).find('.btn-hide-validate').remove();
                $(this).parent().addClass('true-validate');

            }
        })
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.input100');

    $('#su_btn').on('click',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        const submit_BTN = $('#su_btn');

        if(check == false){
            iziToast.warning({
                title: 'Caution',
                message: 'You forgot important data',
            });

            submit_BTN.html('Try again..');

        }else{
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
let at;
      if ($('#a_t').val() == "individual"){
     at = 1
} else if ($('#a_t').val() == "community") {
    at = 2
}else{
    iziToast.warning({
        title: 'Caution',
        message: 'You forgot important data',
    });
    submit_BTN
        .html(`Try again`)
        .attr("disabled", false)
    return;
}

  const data = {
      email: $('#e_m').val(),
      password: $('#p_w').val(),
      passwordConfirmation: $('#p_wc').val(),
      accountType: at
  }
  postData(`http://localhost:3001/auth/signup`, data)
      .then(data => {
          console.log(data)
          if(data.status == "success"){
            iziToast.success({
                title: 'Great!',
                message: 'Profile is ready, please wait..',
            });

            submit_BTN
                .html(`loading...`)
                .attr("disabled", false);
          }else{
              iziToast.error({
                  title: 'Hey!',
                  message: `${data.meta || data.message.message}`
              });
              submit_BTN
                  .html(`Try again`)
                  .attr("disabled", false)
          }

      })
      .catch(error => console.error(error));

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

                    if(re.test(String($(input)).trim().toLowerCase())){
                        return true;
                    }else{
                        return false;
                    }
        }
        else {
            if ($(input).val().trim() == '' || $(input).val().trim() == null) {
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
    function showNoMatch(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).append('<span class="btn-hide-validate">&#xf135;</span>')

        $('.btn-hide-validate').each(function () {
            $(this).on('click', function () {
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