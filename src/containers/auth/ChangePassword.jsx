import React from "react";

import Button from "../../components/Partials/Button";
import Input from "../../components/Partials/Input";
import Helmet from '../../components/SEO/helmet';

const initialPrependsvg = (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-key"
  >
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);

const finalAppendsvg = (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-eye"
  >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

export default function ChangePassword() {
  return (
      <div>
          <Helmet title="Sign Into your account" metaDescription="" />

          <section>
              <div class="row align-items-center justify-content-center min-vh-100">
                  <div class="col-md-6 col-lg-5 col-xl-4 py-6 py-md-0">
                      <div>
                          <div class="mb-5 text-center">
                              <h6 class="h3 mb-1">Password Reset</h6>
                              <p class="text-muted mb-0">
                    Hey! You can now set a new password for your account.
                              </p>
                          </div>
                          <span class="clearfix" />
                          <form>
                
                              {/* pasword input */}
                              <Input
                  type="password"
                  placeholder="New password"
                  label="password"
                  isLoginPasswordInput
                  initialPrepend
                  initialPrependsvg={ initialPrependsvg }
                  value=""
                  finalAppend
                  finalAppendsvg={ finalAppendsvg }
                />
                              {/* pasword input */}
                              <Input
                  type="password"
                  placeholder="Confirm password"
                  label="password again"
                  isLoginPasswordInput
                  initialPrepend
                  initialPrependsvg={ initialPrependsvg }
                  value=""
                  finalAppend
                  finalAppendsvg={ finalAppendsvg }
                />
                              <div class="mt-4">
                                  <Button type="button" textColor="#fff" block color="success">
                    Reset
                                  </Button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  );
}
