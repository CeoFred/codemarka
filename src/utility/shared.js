export const fetch  = (url='',method='GET',data={}) => {
return fetch(url,{
    method:method,
    mode:'cors',
    cache:'no-cache',
    credentials:'omit',
    headers:{
        'content-Type':'application.json'
    },
    redirect:'follow',
    body:JSON.stringify(data)
}).then(response => response.json())

}