// @flow
import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';

const FullHeightDiv = styled('div', {
  height: '100%',
  backgroundColor: '#FFFFFF',
});

const Home = () => (
  <FullHeightDiv>
    <style>
      {`
        html,body,#root{height:100%;}
        html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
        body{margin:0;}
        button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}
        input::-webkit-inner-spin-button,input::-webkit-outer-spin-button,input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}
        `}
    </style>
    <h1>AlienRides</h1>
    <ul>
      <li>
        <a href="https://www.youtube.com/alienrides">YouTube</a>
      </li>
      <li>
        <a href="https://twitter.com/alienrides">Twitter</a>
      </li>
      <li>
        <a href="http://instagram.com/alienrides/">Instagram</a>
      </li>
      <li>
        <a href="https://www.facebook.com/AlienRides/">Facebook</a>
      </li>
      <li>
        <a href="https://www.patreon.com/AlienRides">Patreon</a>
      </li>
      <li>
        <a href="https://alienrides.storenvy.com/">Apparel</a>
      </li>
      <li>
        <a href="https://ewheels.com/alien">Shop</a>
      </li>
    </ul>
  </FullHeightDiv>
);

export default Home;
