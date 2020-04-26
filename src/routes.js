/**
 * /* eslint-disable react/prop-types
 *
 * @format
 */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, withRouter, Route, Redirect } from 'react-router-dom'

import * as actionType from './store/actions/Types'
import * as url from './config/url'

const classrooom = React.lazy(() =>
    import('./containers/classroom/Environment')
)
const newclassroom = React.lazy(() =>
    import('./containers/classroom/NewClassroom')
)

const logout = React.lazy(() => import('./containers/auth/Logout'))
const Home = React.lazy(() => import('./containers/public/Home/Index'))
const Blog = React.lazy(() => import('./containers/public/Blog'))

const Login = React.lazy(() => import('./containers/auth/Login'))
const Register = React.lazy(() => import('./containers/auth/Register'))
const ForgotPassword = React.lazy(() =>
    import('./containers/auth/ForgotPassword')
)
const ChangePassword = React.lazy(() =>
    import('./containers/auth/ChangePassword')
)
const NotFound = React.lazy(() => import('./containers/public/404'))
const About = React.lazy(() => import('./containers/public/About'))
const oauthSuccess = React.lazy(() => import('./containers/auth/OauthSuccess'))
const classPreviewNewTab = React.lazy(() =>
    import('./containers/classroom/classPreviewNewTab')
)
const EmalVerification = React.lazy(() =>
    import('./containers/auth/EmalVerification')
)
const CommunityAccountRegistration = React.lazy(() =>
    import('./containers/auth/Community/index.jsx')
)

const contactUs = React.lazy(() => import('./containers/public/Contact'))

const ClassRoomPreview = React.lazy(() =>
    import('./containers/classroom/ClassroomPreview')
)
const SingleCommunity = React.lazy(() => import('./containers/community/index'));

const Routes = (props) => {
    useEffect(() => {
        if (!props.isAutheticated) {
            props.onTryAutoSignIn()
        }
    }, [props])
    let routes = (
        <Switch>
            <Route exact component={logout} path={url.AUTH_LOGOUT} />
            <Route exact component={Home} path={url.HOME} />
            <Route exact component={Blog} path={url.BLOG} />
            <Route exact component={Login} path={url.AUTH_SIGN_IN} />
            <Route exact component={Register} path={url.AUTH_SIGN_UP} />
            <Route exact component={About} path={url.ABOUT} />
            <Route exact component={oauthSuccess} path={url.OAUTH_URL} />
            <Route exact component={contactUs} path={url.CONTACT} />
            <Route exact component={SingleCommunity} path={url.COMMUNITY_SINGLE} />
            <Route
                exact
                component={CommunityAccountRegistration}
                path={url.COMMUNITY_ACCOUNT_SIGNUP_PAGE}
            />
            <Route
                exact
                component={EmalVerification}
                path={url.EMAIL_VERIFICATION}
            />
            <Route
                exact
                component={ForgotPassword}
                path={url.AUTH_FORGOT_PASSWORD}
            />
            <Route
                exact
                component={ForgotPassword}
                path={url.CLASSROOMS}
            />
            <Redirect from={url.CLASSROOMS} to={url.AUTH_SIGN_IN} />
            <Route
                exact
                component={ClassRoomPreview}
                path={url.PROTECTED_CLASSROOM_PREVIEW}
            />
            <Route exact component={classrooom} path={url.CLASSROOM} />
            <Route
                exact
                component={classPreviewNewTab}
                path={url.CLASSROOM_PREVIEW_NEW_TAB}
            />
            <Route exact component={newclassroom} path={url.CLASSROOM_NEW} />
            <Route
                exact
                component={ChangePassword}
                path={url.AUTH_CHANGE_PASSWORD}
            />

            <Route component={NotFound} />
        </Switch>
    )

    if (props.isAutheticated) {
        routes = (
            <Switch>
                <Route exact component={Home} path={url.HOME} />
                <Route exact component={Blog} path={url.BLOG} />
                <Route exact component={About} path={url.ABOUT} />
                <Route exact component={oauthSuccess} path={url.OAUTH_URL} />
                <Route exact component={contactUs} path={url.CONTACT} />
                <Route exact component={SingleCommunity} path={url.COMMUNITY_SINGLE} />

                <Route
                    exact
                    component={ChangePassword}
                    path={url.AUTH_CHANGE_PASSWORD}
                />
                <Route exact component={logout} path={url.AUTH_LOGOUT} />
                <Route
                    exact
                    component={newclassroom}
                    path={url.CLASSROOM_NEW}
                />
                <Route exact component={classrooom} path={url.CLASSROOM} />
                <Redirect from={url.CLASSROOMS} to={url.AUTH_SIGN_IN} />
                <Route exact component={Login} path={url.AUTH_SIGN_IN} />
                <Route exact component={Register} path={url.AUTH_SIGN_UP} />
                <Route
                    exact
                    component={ClassRoomPreview}
                    path={url.PROTECTED_CLASSROOM_PREVIEW}
                />
                <Route
                    exact
                    component={classPreviewNewTab}
                    path={url.CLASSROOM_PREVIEW_NEW_TAB}
                />
                <Route component={NotFound} />
            </Switch>
        )
    }
    return <React.Fragment>{routes}</React.Fragment>
}
const mapStateToProps = (state) => {
    return {
        isAutheticated: state.auth.authenticated !== false,
    }
}

const matchDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignIn: () => dispatch({ type: actionType.AUTO_AUTH_INIT }),
    }
}

export default withRouter(
    connect(mapStateToProps, matchDispatchToProps)(Routes)
)
