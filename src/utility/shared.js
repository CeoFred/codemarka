import {isFuture} from "date-fns";

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

if(rules.required){
    isValid = value.trim() !== '' && isValid;
}
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
return isValid;

}

export const resolvePromise = (promise) => {
    return promise.then(data => data).catch(error => error);
}
