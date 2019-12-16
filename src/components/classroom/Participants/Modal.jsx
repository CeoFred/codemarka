import React from 'react'

const Modal = ({users, toogleUserEditAccess, owner}) => {
    let users__ = 'Loading...';

    if(users && users.length > 0){
          users__ = users.map(u => {

        return (
<li className="list-group-item" key={u._id}>
  <div className="d-inline float-left">
    <span className="avatar bg-primary text-white rounded-circle avatar-sm ">
    {u.username.toUpperCase()[0]+''+u.username.toUpperCase()[1]}</span>
    <a href={`/user/profile/${u._id}?ref=classroom`} className="text-dark font-weight-900 pl-3">{u.username}</a>
    
<i className="fa fa-envelope-open-text text-info p-1"></i>
<i className="fa fa-hand-peace text-info p-1"></i>
  </div>
{owner ? (
  <span className="float-right">
  <select className="d-inline custom-select" onChange={(e) => toogleUserEditAccess(e,u)}>
    <option selected={u.role === "1" ? true : false} value="1">User Role</option>
    <option selected={u.role === "2" ? true : false} value="2">Editor Access Role </option>
    <option selected={u.role === "3" ? true : false} value="3">Classroom Access Role</option>
</select>
</span>
): ''}
  </li>
        );
    })
    } 
   
    return (
        <div>
<div className="modal fade participants_modal_cont" tabindex="-1" role="dialog" aria-labelledby="participantsModal" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">

      <div className="modal-header bg-dark ">
        <h5 className="modal-title h6 text-white" id="participantsModal">Participants</h5>
        <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <ul className="list-group">
  {users__}

</ul>
     
      </div>
    </div>
  </div>
</div>
        </div>
    )
}

export default Modal
