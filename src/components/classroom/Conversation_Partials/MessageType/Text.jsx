/* eslint-disable no-undef */
/** @format */

import React from 'react'
import PropTypes from 'prop-types'

function Text(props) {
    const copyCode = (e, code) => {
        navigator.permissions
            .query({ name: 'clipboard-write' })
            .then((result) => {
                if (result.state == 'granted' || result.state == 'prompt') {
                    /* write to the clipboard now */
                    navigator.clipboard.writeText(code).then(
                        function () {
                            /* clipboard successfully set */
                            alert('Copied code to clipboard')
                        },
                        function () {
                            /* clipboard write failed */
                        }
                    )
                }
            })
    }

    var wrapURLs = function (text, new_window, id) {
        var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/gm
        let hasHTML = false
        const tabFound = text.replace('\t', '')
        const newLine = tabFound.replace('\n', '')
        text = newLine
        const htmlRegex = /<.+?>/g

        let rt = text.replace(htmlRegex, function (username) {
            hasHTML = true
            return username
        })

        if (hasHTML) {
            return (
                <code
                    style={ { cursor: 'pointer' } }
                    onClick={ (e) => copyCode(e, rt) }>
                    {rt}
                </code>
            )
        }

        var target = new_window === true || new_window == null ? '_blank' : ''
        rt = rt.replace(url_pattern, function (url) {
            var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i
            var href = protocol_pattern.test(url) ? url : 'http://' + url

            return `<a href="${ href }" target="${ target }"> ${ url } </a>`
        })
        const mentionReqex = /@+[\w]*/gm

        rt = rt.replace(mentionReqex, function (username) {
            const userFound = props.users.filter((user) => {
                return (
                    String(`@${ user.username.trim() }`) ===
                    String(username.trim())
                )
            })
            if (userFound.length) {
                return `<b style="
    background: black;
    padding: 2px;
    border-radius: 6px;
"><a style="color:gold;cursor:pointer" href="/u/${ userFound[0].username }" class="mentions_username"> ${ username }</a>
             <div class="mentions_username_profile">
                <div class="card shadow-none">
    <div class="p-3 d-flex" style="align-items:center">
                  <a href="#" class="avatar rounded-circle hover-scale-105">
    <img alt="Image placeholder" src="${ userFound[0].avatar }" class="">

</a>
        <div>
         
        </div>
    </div>
</div>
             </div>
             </b>`
            } else return username
        })

        return (
            <div
                id={ props.message.msgId }
                className="r-message"
                dangerouslySetInnerHTML={ { __html: rt } }
            />
        )
    }
    return <React.Fragment>
        {wrapURLs(props.message.msg)}
    </React.Fragment>
}

Text.propTypes = {
    message: PropTypes.isRequired,
}

export default Text
