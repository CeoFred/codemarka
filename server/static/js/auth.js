function init(){
  const token =window.localStorage.getItem('token');

  if(token){

postData('http://localhost:3001/auth/jwt?token=' + token)
  .then(data => {
    if (data.status == "success") {
      let ab = document.getElementById('action_btn');
      ab.innerHTML = "<a href='/classroom/' class='btn btn-primary mr-2 mb-2'>Explore classrooms</a>";

     var u = document.getElementById('user');
     u.innerText = data.meta.data.username
    }
  })
  .catch(err => console.log(err));
  }

  function postData(url = ``) {
    return fetch(url, {
        method: "GET",
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer"
      })
      .then(response => response.json());
  }
}