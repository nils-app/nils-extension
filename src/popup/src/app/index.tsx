import React, { useEffect, useState } from "react";
import { browser } from "webextension-polyfill-ts";
import { Col, Row } from "react-bootstrap";

import { TabStatus, getUrlStatus } from "../lib/tabs";
import useCheckLogin from "../lib/checkAuth";
import { useStateValue } from "../store/state";
import Logo from "../components/Logo";
import { API_URL, WEB_URL } from '../constants';
import Transactions from "../components/Transactions";
import CurrentPayment from '../components/CurrentPayment';
import Footer from '../components/Footer';

export default () => {
  const { state } = useStateValue();
  const [ tabStatus, setTabStatus ] = useState<TabStatus | null>(null);

  useCheckLogin();

  useEffect(() => {
    // subscription pattern to avoid setting state if unmounted
    let isSubscribed = true;
    browser.tabs.query({ active: true, currentWindow: true }).then(
      tabs => {
        if (tabs.length < 1 || !tabs[0].url) {
          if (isSubscribed) {
            setTabStatus(null);
          }
          return;
        }
        getUrlStatus(tabs[0].url).then((status) => {
          if (isSubscribed) {
            setTabStatus(status);
          }
        });
      },
      (e) => {
        console.warn(e);
        if (isSubscribed) {
          setTabStatus(null);
        }
      }
    );
    return () => { isSubscribed = false };
  }, []);

  if (!state.auth.checked) {
    // Loading
    return (
      <div className='loading'>
        <p>
          <Logo /> Nils
        </p>
        <p>
          Loading...
        </p>
      </div>
    );
  }

  if (state.auth.checked && state.offline) {
    // Loading
    return (
      <div className='loading'>
        <p>
          <Logo /> Nils
        </p>
        <p className='text-muted'>
          Can't reach the Nils server. <br/>
          Please try again later!
        </p>
      </div>
    );
  }

  if (state.auth.checked && !state.auth.user) {
    // Loading
    return (
      <div className='loading'>
        <p>
          <Logo /> Nils
        </p>
        <p className='mt-4'>
          <a href={ `${WEB_URL}/login` } className='btn btn-primary btn-sm' title='Sign in to Nils, or create an account'>
            Sign In / Up
          </a>
        </p>
      </div>
    );
  }

  return (
    <>
      <a className='section' href={ `${WEB_URL}/dashboard` } title='Top up your account now'>
        <Row>
          <Col>
            <small className='text-muted'>Balance</small><br/>
            { state.auth.user ? state.auth.user.balance : 0 } Nils
          </Col>
          <Col>
            <span className="right text-muted"></span>
          </Col>
        </Row>
      </a>
      <CurrentPayment tabStatus={ tabStatus } />
      <section>
        <div className='mb-2 text-muted'>Previous payments</div>
        <Transactions />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};
