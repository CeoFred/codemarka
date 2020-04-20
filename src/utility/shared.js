import { isFuture } from "date-fns";

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

export const updateObject = (oldObject, UpdatedProperties) => {
    return {
        ...oldObject,
        ...UpdatedProperties
    }
}

export const checkValidity = (value,rules) => {

    let isValid = true;


// add other rules
if(rules.isEmail){
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
}

if(rules.minLength){
    isValid = value.length >= rules.minLength && isValid;
}

if(rules.maxlength){
    isValid = value.length <= rules.maxlength && isValid;
}
if(rules.isFutureDate){
    isValid = isFuture(new Date(value)) && isValid;
}

if(rules.url){
      var pattern = new RegExp(
          '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
              '(\\#[-a-z\\d_]*)?$',
          'i'
      ) // fragment locator
      isValid = !!pattern.test(value) && isValid;
}

if (rules.required) {
    isValid = value.trim() !== '' && isValid
}
return isValid;

}

export const resolvePromise = (promise) => {
    return promise.then(data => data).catch(error => error);
}
