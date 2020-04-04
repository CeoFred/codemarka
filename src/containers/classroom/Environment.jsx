/**
 * /* eslint-disable no-undef
 *
 * @format
 */

/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'
import * as action from '../../store/actions/'
import { dispatchAppEnvironment } from '../../store/actions/app'

import './css/Environment.css'
import '../../components/classroom/Editor/editor.css'
import ColabLayout from './Class'
import failedImg from '../../media/images/vectors/flame-1.png'
import endedImg from '../../media/images/vectors/hugo-unsubscribed.png'
import notStartedImg from '../../media/images/vectors/pluto-coming-soon-1.png'
import notSupportedImg from '../../media/images/vectors/page-under-construction-1.png'

function Environment(props) {
    const {
        match: { params },
        history
    } = props
    const classroomId = params.classroom
    const {
        onClassroomVerify,
        onClassroomSwitch,
        clearClassRoomData,
        status
    } = props

    const checking = (
        <div className="env--content--loading text-center">
            <div
                className="spinner-grow"
                style={{ width: '3rem', height: '3rem', background: 'grey' }}
                role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div style={{ marginTop: '5' }}>Checking classroom..</div>
        </div>
    )

    const [colabstate, setty] = React.useState({
        user_id: props.userid,
        classroom_id: classroomId,
        username: props.username,
        className: props.className,
        isSmallScreen: null,
        in: false
    })

    const { class_verified, isAuthenticated } = props

    React.useEffect(() => {
        if (!colabstate.in) {
            onClassroomSwitch('classroom')

            if (window.innerWidth < 750) {
                setty(s => {
                    return { ...s, isSmallScreen: true }
                })
            }

            setty(s => {
                return { ...s, in: true }
            })
        }

        if (!class_verified && isAuthenticated) {
            onClassroomVerify(classroomId)
        }
    }, [
        class_verified,
        isAuthenticated,
        colabstate.in,
        classroomId,
        onClassroomSwitch,
        onClassroomVerify
    ])

    const getContent = () => {
        if (!props.isAuthenticated && props.authState === 'done') {
            clearClassRoomData()

            return (
                <Redirect
                    to={`/auth/signin?authCheck=failed&redir=/c/classroom/${ classroomId }`}
                />
            )
        }
        if (colabstate.isSmallScreen) {
            return (
                <div>
                    <div
                        style={{ height: '100vh' }}
                        className="bg-warning pt-7 text-center justify-content-center">
                        <div className="m-auto">
                            <h1 className="text-white">Heads Up!</h1>
                            <p className="p-3 text-white">
                                {' '}
                                <span className="text-white">
                                    Unfortunately, classrooms are not yet
                                    supported for your device size, we are
                                    working on getting support for your screen,
                                    please switch to a larger screen to
                                    continue.
                                </span>
                                <br />
                                return{' '}
                                <a
                                    href="/"
                                    className="text-dark text-uppercase font-weight-bold">
                                    Home
                                </a>
                            </p>
                            <hr className="divider" />
                            <div className="m-3">
                                <img
                                    style={{ height: '300px' }}
                                    src={notSupportedImg}
                                    alt="failed"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (!props.class_verified && !props.validation_error_message) {
            return checking
        } else if (props.validation_error_message && !props.class_verified) {
            clearClassRoomData()
            return <Redirect to="/classError/notFound/" />
        } else if (
            props.isAuthenticated &&
            status &&
            props.class_verified &&
            props.username &&
            props.userid
        ) {
            let blocked = false

            if (String(props.classOwner) !== String(props.userid)) {
                if (status === 3) {
                    return (
                        <div>
                            <div
                                style={{ height: '100vh' }}
                                className="bg-primary pt-7 text-center justify-content-center">
                                <div className="m-auto">
                                    <h1 className="text-white">
                                        Class Has Ended!
                                    </h1>
                                    <p className="p-3 text-white">
                                        {' '}
                                        <span className="text-white">
                                            Whoops! Seems you ran late for this
                                            class session.
                                        </span>
                                        <br />
                                        return{' '}
                                        <a
                                            href="/"
                                            className="text-dark text-uppercase font-weight-bold">
                                            Home
                                        </a>
                                    </p>
                                    <hr className="divider" />
                                    <div className="m-3">
                                        <img
                                            style={{ height: '300px' }}
                                            src={endedImg}
                                            alt="failed"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } else if (status === 1) {
                    return (
                        <div>
                            <div
                                style={{ height: '100vh' }}
                                className="bg-success pt-7 text-center justify-content-center">
                                <div className="m-auto">
                                    <h1 className="text-white">Heads Up!</h1>
                                    <p className="p-3 text-white">
                                        {' '}
                                        <span className="text-white">
                                            This class session is schedulled to
                                            start at {props.startTimeFull}
                                        </span>
                                        <br />
                                        return{' '}
                                        <a
                                            href="/"
                                            className="text-dark text-uppercase font-weight-bold">
                                            Home
                                        </a>
                                    </p>
                                    <hr className="divider" />
                                    <div className="m-3">
                                        <img
                                            style={{ height: '300px' }}
                                            src={notStartedImg}
                                            alt="failed"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }

            if (props.blocked) {
                props.blocked.forEach(per => {
                    if (per.user.id === props.userid) {
                        blocked = true
                    }
                })
            }

            if (!blocked) {
                return (
                    <ColabLayout
                        started={props.status === 2}
                        cid={props.cid}
                        name={props.className}
                        owner={props.classOwner === props.userid}
                        data={colabstate}
                        username={props.username}
                        userid={props.userid}
                        description={props.class_description}
                        ownerid={props.classOwner}
                        topic={props.classTopic}
                        pinnedMessages={props.class_pinnedMessages}
                        history={history}
                        cd={props.c}
                        kid={props.kid}
                        gravatarUrl={props.gravatarUrl}
                        classroomD={props.classroom}
                    />
                )
            } else {
                clearClassRoomData()

                return (
                    <div
                        style={{ height: '100vh' }}
                        className="bg-warning pt-7 text-center justify-content-center">
                        <div className="m-auto">
                            <h1 className="text-white">Heads Up!</h1>
                            <p className="p-3 text-white">
                                {' '}
                                <span className="text-white">
                                    Whoops! Seems you have been blocked from
                                    joining {props.className}!
                                </span>
                                <br />
                                return{' '}
                                <a
                                    href="/"
                                    className="text-dark text-uppercase font-weight-bold">
                                    Home
                                </a>
                            </p>
                            <hr className="divider" />
                            <div className="m-3">
                                <img
                                    style={{ height: '300px' }}
                                    src={failedImg}
                                    alt="failed"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
    return <div className="env--container">{getContent()}</div>
}

const mapStateToProps = ({ auth, classroom }) => {
    return {
        isAuthenticated: auth.user.token !== null,
        userid: auth.user.userId,
        username: auth.user.username,
        user_t: auth.user.token,
        class_verified: classroom.validated,
        classOwner: classroom.owner,
        className: classroom.name,
        validation_error_message: classroom.validation_error_message,
        class_description: classroom.description,
        authState: auth.authState,
        classTopic: classroom.topic,
        class_pinnedMessages: classroom.pinnedMessages,
        blocked: classroom.blocked,
        status: classroom.status,
        startTimeFull: classroom.startTimeFull,
        cid: classroom._id,
        kid: classroom.Kid,
        gravatarUrl: classroom.gravatarUrl,
        classroom
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClassroomVerify: classroomid =>
            dispatch(action.classVerify(classroomid)),
        onClassroomSwitch: state => dispatch(dispatchAppEnvironment(state)),
        clearClassRoomData: v => dispatch(action.classResetAll())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Environment)
