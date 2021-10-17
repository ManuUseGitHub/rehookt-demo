import './App.scss';

import React, { useEffect } from "react";
import HookedField from "./HookedField";
import Fields from "./Fields";

import 'bootstrap/dist/css/bootstrap.min.css';

const qs = require("./QuerySelector");
const { useStates, generate } = require('rehookt');

function App() {

  const qo = qs.asObject();

  const listingQS = qo.listing;
  const listingV = listingQS || "";

  const { listing, timing, errors, hint } = useStates(["listing", listingV], "timing", "errors", "hint");

  const attr = { placeholder: "Type your hooks here all separated by spaces" };

  const onListingChanged = ({ value }) => {

    if (timing.val) {
      clearTimeout(timing.val);
    }

    timing.set(setTimeout(_ => {

      const newQuery = qs.putParameters([{ name: "listing", val: value }]);

      let newLocation = decodeURIComponent('/?' + newQuery);
      const m = /(?:\/=\?)*.*\/=\?.+(&.+)$/.exec(newLocation);

      if (m) {
        newLocation = "/?" + m[1];
      }

      window.location = "/?redirect=" + encodeURIComponent(newLocation);
    }, 1000))
  }

  return (<div className="App">
    <header className="App-header">
      <div className="container">
        <div className="row">
          <div classNames="col-sm-12">
            <h1>
            <img src="https://raw.githubusercontent.com/ManuUseGitHub/Rehookt/master/rehookt_logo.svg" ALT ="rehookt_logo.svg" />
            .Demo
            </h1>
            <br />
            <a href="https://badge.fury.io/js/rehookt" rel="nofollow">
              <img 
                src="https://camo.githubusercontent.com/6096efbe70c9003c6318e82e2425a6d31a12c67f82251985730514aa1f1d7670/68747470733a2f2f62616467652e667572792e696f2f6a732f7265686f6f6b742e737667" 
                alt="npm version" data-canonical-src="https://badge.fury.io/js/rehookt.svg" style={{maxWidth:"100%"}} />
            </a>
            <a href="https://travis-ci.com/ManuUseGitHub/Rehookt" rel="nofollow">
              <img src="https://camo.githubusercontent.com/b4e044c22e586cf172b294336cbf01476c58cadda65ae7c31c4329121e695dac/68747470733a2f2f7472617669732d63692e636f6d2f4d616e755573654769744875622f5265686f6f6b742e7376673f6272616e63683d6d6173746572" alt="Build Status" data-canonical-src="https://travis-ci.com/ManuUseGitHub/Rehookt.svg?branch=master" style={{maxWidth:"100%"}} />
            </a>
            <a href="https://coveralls.io/github/ManuUseGitHub/Rehookt?branch=master" rel="nofollow">
              <img src="https://camo.githubusercontent.com/12734da898fddfd06a03ea1544a3f2e633997c788bba4ea2225af66cc8318d2d/68747470733a2f2f636f766572616c6c732e696f2f7265706f732f6769746875622f4d616e755573654769744875622f5265686f6f6b742f62616467652e7376673f6272616e63683d6d6173746572" alt="Coverage Status" data-canonical-src="https://coveralls.io/repos/github/ManuUseGitHub/Rehookt/badge.svg?branch=master" style={{maxWidth:"100%"}} />
            </a>
            <a href="https://github.com/dwyl/goodparts" title="JavaScript The Good Parts">
              <img src="https://camo.githubusercontent.com/d743534f593e6529da251e237b55fc6c42e8edcdfa8929649f15ee583daaa2af/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d676f6f6470617274732d627269676874677265656e2e7376673f7374796c653d666c6174" alt="JavaScript Style Guide: Good Parts" data-canonical-src="https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat" style={{maxWidth:"100%"}} />
            </a>
            <a href="https://github.com/ManuUseGitHub/Rehookt/blob/master/LICENSE">
              <img src="https://camo.githubusercontent.com/35e872c0f315893ed4f871ffb3d1b6d9eaa481f97b8e40453498d510f538d87b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d3631646166622e737667" alt="License: MIT" data-canonical-src="https://img.shields.io/badge/License-MIT-61dafb.svg" style={{maxWidth:"100%"}} />
            </a>
          </div>
        </div>
      </div>

    </header>
    <div className="content">
      <div className="container">
        <div id="listing" className='row'>
          <div classNames="col-sm-12">
            <label>hook list</label>
            <HookedField hook={listing} cb={onListingChanged} attr={attr} />
            <div><h5 className='inputHints'>Input words separated by a space between each element. Enter only "REHOOKT_NONE" if you want to have an empty set of hooks</h5></div>
          </div>
        </div>
        <Fields listing={listingV} hinting={{ errors, hint, listing }} />
      </div>
    </div>
  </div>
  );
}

export default App;