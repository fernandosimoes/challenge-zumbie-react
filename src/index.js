import './scss/'; // sass files to webpack build and generate a css file
import React, { Component } from 'react';
import ReactDom from "react-dom";
import App from './js/App'
// redux dependencias

ReactDom.render(
  <div>
    <App></App>
  </div>, document.querySelector('#app')
);