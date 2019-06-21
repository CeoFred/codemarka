import * as actionTypes from './Types'
var myHeader = new Headers()



export const createClassRoomInit = () => {
    return {
        type:actionTypes.CLASSROOM_CREATE_INIT
    }
}

export const createNewClass = (data) => {

return (dispatch) => {
        dispatch(createClassRoomInit)
        let url = '/classroom/create'
        myHeader.append('Content-Type','Application/json')
        myHeader.append('Authorization',`Bearer ${data.token}`)

        let requestData  = {
            name:data.name,
            created_by:data.user_id,
            visibility:data.visibility,
            description:data.description,
            location:data.location,
            start_time:data.start_time,
            end_time:data.end_time,
            topic:data.topic
        }
        
let loginRequest = new Request(url,{
    method:'POST',
    cache:'default',
    headers:myHeader,
    body:JSON.stringify(requestData),
    mode:'cors'

})
fetch(loginRequest).then(res => {
    return res.json()

}).then(res => {
    console.log(res)
    // let expirationDate = new Date(new Date().getTime() + res.meta.expires * 1000);
    // localStorage.setItem('token', res.meta.token);
    // localStorage.setItem('expirationDate', expirationDate);
    // localStorage.setItem('userId',res.meta.userId);
    // setTimeout(() => {
    //     dispatch(classCreationSuccess(res.meta.useerId,res.meta.token));
    //     // dispatch(checkAuthTimeout(res.data.expiresIn));          
    // }, 2000);
  
}).catch(err =>  {
    // setTimeout(() => {
    // dispatch(classCreationFailed(err))
    // }, 2000);
     console.error(err)
})

    }
}

export const classCreationFailed = (error) => {
    return {
        type:actionTypes.CLASS_CREATION_FAILED

    }
}

export const classCreationSuccess = (details) => {
    return {
        type:actionTypes.CLASS_CREATION_SUCCESS
    }
}