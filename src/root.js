// @flow
import React from 'react';
import {Helmet} from 'fusion-plugin-react-helmet-async';
import {Route, Switch} from 'fusion-plugin-react-router';

import Home from './pages/home.js';
import PageNotFound from './pages/pageNotFound.js';

class AdComponent extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: 'ca-pub-9060986956362826',
      enable_page_level_ads: true,
    });
  }
  render() {
    return null;
  }
}

const root = (
  <div>
    <Helmet>
      <title>AlienRides Electric Vehicles &amp; Green Transportation</title>
      <meta
        name="description"
        content="AlienRides is promoting electric vehicle use including electric scooters, electric skateboards, electric unicycles and any kind of electric vehicle."
      />
      <script
        async
        src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
    </Helmet>
    <AdComponent />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default root;
