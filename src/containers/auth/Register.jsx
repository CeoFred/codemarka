import React from "react";

import { Link } from "react-router-dom";

import Github from "../../components/Partials/Auth/Button/Github";
import Google from "../../components/Partials/Auth/Button/Google";

import Button from "../../components/Partials/Button";
import Input from "../../components/Partials/Input";

import Helmet from "../../components/SEO/helmet";

const emailIconSvg = (
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
    class="feather feather-at-sign"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);

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

const userIconSvg = (
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
    class="feather feather-user"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
export default function Register() {
  return (
    <div>
      <Helmet title="Signup to colab" metaDescription="" />

      <section>
        <div class="mt-3 row align-items-center justify-content-center min-vh-100">
          <div class="col-md-6 col-lg-5 col-xl-4 py-6 py-md-0">
            <div>
              <div class="mb-5 text-center">
                <h6 class="h3 mb-1">Create your account</h6>
                <p class="text-muted mb-0">Made with love for developers</p>
              </div>
              <span class="clearfix" />
              <form>
                {/* email input */}
                <Input
                  type="text"
                  placeholder="superuser"
                  label="username"
                  initialPrepend
                  initialPrependsvg={userIconSvg}
                  value=""
                />

                {/* email input */}
                <Input
                  type="email"
                  placeholder="someone@someserver.com"
                  label="Email address"
                  initialPrepend
                  initialPrependsvg={emailIconSvg}
                  value=""
                />
                {/* pasword input */}
                <Input
                  type="password"
                  placeholder="Secret password"
                  label="password"
                  isLoginPasswordInput={false}
                  initialPrepend
                  initialPrependsvg={initialPrependsvg}
                  value=""
                />
                {/* confirm pasword input */}
                <Input
                  type="password"
                  placeholder="Password again"
                  label="confirm password"
                  isLoginPasswordInput={false}
                  initialPrepend
                  initialPrependsvg={initialPrependsvg}
                  value=""
                />

                {/* checkbox */}
                <Input fieldtype="checkbox">
                  I agree to the{" "}
                  <Link to="/public/terms">terms and conditions</Link>
                </Input>

                <div class="mt-4">
                  <Button type="button" textColor="#fff" block color="primary">
                    Create my account
                  </Button>
                </div>
              </form>
              <div class="py-3 text-center">
                <span class="text-xs text-uppercase">or</span>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  {/* github action button */}
                  <Github link="github.com/oauth/" />
                  {/* github action button */}
                </div>

                <div class="col-sm-6">
                  <Google link="https://www.google.com/oauth" />
                </div>
              </div>
              <div class="mt-4 text-center">
                <small>Already have an account?</small>
                <Link to="/auth/signin" class="small font-weight-bold">
                  signin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
