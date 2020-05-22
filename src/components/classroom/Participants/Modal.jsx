/* eslint-disable react/prop-types */
import React from 'react'

const Modal = ({
    userid,
    ownerid,
    users,
    toogleUserEditAccess,
    owner,
    sendUserPrivateMessage,
    waveAtUser,
    blockUser,
    handleAddUserIconClicked
}) => {
    let users__ = 'Waiting for people to join...'

    if (users && users.length > 0) {
         users__ =  users.map(u => {
            if (userid !== u.kid) {
                return (
                    <li className="list-group-item  justify-content-between align-items-center" key={ u.id }>
                        <div className="d-inline">
                            <img
                                alt={
                                    u.username.toUpperCase()[0] +
                                    '' +
                                    u.username.toUpperCase()[1]
                                }
                                src={ u.avatar }
                                class="avatar  rounded-circle avatar-sm"
                            />
                            <span>
                                <a
                                    href={ `/user/profile/${ u.id }?ref=classroom` }
                                    className="text-dark font-weight-normal pl-3 text-uppercase">
                                    @{u.username}{' '}
                                    {ownerid === u.id ? '(Admin)' : ''}
                                </a>
                                <br />
                                {owner ? (
                                    <div className="ml-5">
                                        <b
                                            style={ { cursor: 'pointer' } }
                                            onClick={ (e, user = u) =>
                                                sendUserPrivateMessage(e, user)
                                            }
                                            className="text-info p-1">
                                            message{' '}
                                        </b>

                                        <b
                                            onClick={ (e, user = u) =>
                                                waveAtUser(e, user)
                                            }
                                            style={ { cursor: 'pointer' } }
                                            className="text-dark p-1">
                                            wave
                                        </b>

                                        <b
                                            onClick={ (e, user = u) =>
                                                blockUser(e, user)
                                            }
                                            style={ { cursor: 'pointer' } }
                                            className="text-danger p-1">
                                            block
                                        </b>
                                    </div>
                                ) : (
                                    <div className="ml-5">
                                        <b
                                            onClick={ (e, user = u) =>
                                                sendUserPrivateMessage(e, user)
                                            }
                                            style={ { cursor: 'pointer' } }
                                            className="text-info p-1">
                                            message
                                        </b>
                                        <b
                                            onClick={ (e, user = u) =>
                                                waveAtUser(e, user)
                                            }
                                            style={ { cursor: 'pointer' } }
                                            className="text-dark p-1">
                                            wave
                                        </b>
                                    </div>
                                )}
                            </span>
                        </div>
                        {owner ? (
                            <div>
                                <select
                                    className="d-inline custom-select"
                                    onChange={ e => toogleUserEditAccess(e, u) }>
                                    <option
                                        selected={ u.role === '1' ? true : false }
                                        value="1">
                                        User Role
                                    </option>
                                    <option
                                        selected={ u.role === '2' ? true : false }
                                        value="2">
                                        Editor Access Role{' '}
                                    </option>
                                    <option
                                        selected={ u.role === '3' ? true : false }
                                        value="3">
                                        Classroom Access Role
                                    </option>
                                </select>
                            </div>
                        ) : (
                            ''
                        )}
                    </li>
                )
            }
        })
    }

    if (
        users__ &&
        Array.isArray(users__) &&
        users__.length === 1 &&
        users__[0] === undefined
    ) {
        users__ = 'No one has joined yet.'
        if(owner){
            users__ =  'Your students are yet to join, try inviting the, via email or usernameby clicking the icon below.'
        }
    }
    
    return (
        <div class="modal fade docs-example-modal-lg" id="participantModal" tabindex="-1" role="dialog" aria-labelledby="participantModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title h6" id="participantModalLabel">Participants</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ul className="list-group">
                            {users__}
                        </ul>
                     </div>
                </div>
            </div>
        </div>
      )
}

export default Modal
