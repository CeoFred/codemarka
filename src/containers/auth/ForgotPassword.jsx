import React from "react";

import Button from "../../components/Partials/Button";
import Input from "../../components/Partials/Input";
import Helmet from '../../components/SEO/helmet';


const emailIconSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign">
  <circle cx="12" cy="12" r="4"></circle>
  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94">
  </path>
  </svg>
)

export default function ForgotPassword() {
  return (
    <div>
      <Helmet title="Account Recovery || colab.io " metaDescription="" />

      <section>
        <div class="row align-items-center justify-content-center min-vh-100">
          <div class="col-md-6 col-lg-5 col-xl-4 py-6 py-md-0">
            <div>
              <div class="mb-5 text-center">
                <h6 class="h3 mb-1">Account Reecovery</h6>
                <p class="text-muted mb-0">
                We would help you recover your account if you know the email associated with your account.
                </p>
              </div>
              <span class="clearfix" />
              <form>
                <Input 
                type="email"
                placeholder="someone@someserver.com"
                label="Email address"
                initialPrepend
                initialPrependsvg={emailIconSvg}
                value=""
                />
                
                <div class="mt-4">
                  <Button type="button" textColor="#fff" block color="primary">
                    Go
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
