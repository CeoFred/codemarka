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

        if(!(myHeader.get('Authorization')) & myHeader.get('Content-Type') !== 'Application/json'){
        myHeader.append('Authorization',`Bearer ${data.token}`)
        myHeader.append('Content-Type','Application/json')

        }

        let realSize =   data.size.split(' ')

        let requestData  = {
            name:data.name,
            created_by:data.owner,
            visibility:data.visibility,
            description:data.description,
            location:data.location,
            start_time:data.time,
            start_date:data.date,
            topic:data.topic,
            autostart:false,
            size:realSize[1],
            token:data.token
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
    if(res.status === 'created'){
        dispatch(classCreationSuccess(res.data))
    }else if(res.error && res.type === 'mongo'){
        dispatch(classCreationFailed(res.error.errors))
    }
}).catch(err =>  {
     console.error(err)
     dispatch(classCreationFailed(err))

})

    }
}

export const classCreationFailed = (error) => {
    return {
        type:actionTypes.CLASS_CREATION_FAILED,
        errors:error

    }
}

export const classCreationSuccess = (details) => {
    return {
        type:actionTypes.CLASS_CREATION_SUCCESS,
        payload:details
    }
}