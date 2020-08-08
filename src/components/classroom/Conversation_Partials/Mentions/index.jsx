/** @format */

import React, { useEffect, useState } from 'react'
import './style.css'

function Mentions(props) {
    const [isDisplaying, setIsDisplaying] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(
        function () {
            setIsDisplaying(props.shouldDisplay ? 'flex' : 'none')
            console.log(props.shouldDisplay)
        },
        
        [props.shouldDisplay]
    )

    useEffect(
        function () {
            const formattedUsersArray = props.users
                .map((user) => {
                    return {
                        kid: user.kid,
                        username: user.username,
                        display: user.avatar,
                    }
                })
                .filter((o) => {
                    if(props.mentionSearchString){
                        return o.username.includes(props.mentionSearchString)
                    } else {
                        return true
                    }
                })

            setUsers(formattedUsersArray)
        },
        [props.users, props.mentionSearchString]
    )

    function initUerSelected(e, username) {
        e.preventDefault()
        props.userSelected(e,username)
    }

    return (
        <div className="mention-list" style={{ display: isDisplaying }}>
            {users.map((user) => {
                return (
                    <span
                       
                        key={`mention--user-${user.kid}`}
                        class="mention-list-item"
                        onClick={(e) => initUerSelected(e, user.username)}>
                        <img
                            alt={user.display}
                            className="mentions-avatar avatar"
                            src={user.display}
                            style={{borderRadius:'20%!important'}}
                        />
                        <span>
                            <span class="dot-online"></span> @{user.username}{' '}
                        </span>
                    </span>
                )
            })}
        </div>
    )
}

export default Mentions
