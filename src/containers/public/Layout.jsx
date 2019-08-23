import React, { useState, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Preloader from "../../components/Partials/Preloader";
import NavigationBar from "../../components/UI/Navigation/NavigationBar";
import Button from "../../components/Partials/Button";
import ErrorBoundary from "../../HOC/Error/ErrorBoundary";

import * as actions from "../../redux/actions/Types";
export default function Layout(props) {
  const [appLoaded, setappLoaded] = useState(false);
  const [content, setContent] = useState(<Preloader />);
  const state = useSelector(state => state);
  const { cookie_token } = state.app;
  const dispatch = useDispatch();

  const acceptCookieForUser = () => {
    dispatch({type:actions.ACCEPT_COOKIE});
  };
  const body = (
    <div>
      {!cookie_token ? (
        <div
          className="modal fade show d-inline-block"
          tabIndex="-1"
          role="dialog"
          id="modal-cookies"
          data-backdrop="false"
          aria-labelledby="modal-cookies"
          aria-hidden="false"
        >
          <div className="modal-dialog modal-dialog-float top-5">
            <div className="modal-content bg-dark">
              <div className="modal-body">
                <p className="text-sm text-white mb-3">
                  We use cookies so that our themes work for you. By using our
                  website, you agree to our use of cookies.
                </p>
                <Link
                  to="pages/utility/terms"
                  className="btn btn-sm btn-neutral"
                  target="_blank"
                >
                  Learn more
                </Link>
                <Button
                  color="primary"
                  size="sm"
                  textColor="#fff"
                  clicked={acceptCookieForUser}
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <NavigationBar />
      {props.children}
    </div>
  );
  useEffect(() => {
    setTimeout(() => {
      setappLoaded(true);
      setContent(body);
    }, 500);
    return () => {
      if (!appLoaded) {
        setContent(body);
      }
    };
  }, [appLoaded, setContent, setappLoaded, props.children, body]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Preloader/>}>{content}</Suspense>
    </ErrorBoundary>
  );
}