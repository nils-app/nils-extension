import React from 'react';
import ReactDOM from "react-dom";

import Popup from './app';
import { StateProvider } from './store/state';

import './assets/app.scss';

const app = (
  <StateProvider>
    <Popup />
  </StateProvider>
);

ReactDOM.render(app, document.getElementById("root"));