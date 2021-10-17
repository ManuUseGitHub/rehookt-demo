import './App.scss';

import React, { useEffect } from "react";
import HookedField from "./HookedField";
import Fields from "./Fields";

import 'bootstrap/dist/css/bootstrap.min.css';

const qs = require( "./QuerySelector" );
const { useStates, generate } = require( 'rehookt' );

function App( ) {
  
  const qo = qs.asObject( );
      
  const listingQS =  qo.listing;
  const listingV = listingQS || "";

  const { listing, timing, errors, hint } = useStates( [ "listing", listingV ], "timing", "errors", "hint" );

  const onListingChanged = ( {value} ) => {

      if( timing.val ){
          clearTimeout( timing.val );
      }
      
      timing.set( setTimeout( _=> {

          const newQuery = qs.putParameters( [ { name : "listing", val : value } ] );
          
          let newLocation = decodeURIComponent( '/?' + newQuery );
          const m = /(?:\/=\?)*.*\/=\?.+(&.+)$/.exec( newLocation );

          if( m ){
              newLocation = "/?" + m[ 1 ];
          }
          
          window.location = "/?redirect=" + encodeURIComponent( newLocation );
      }, 1000 ) )
  }

  return ( <div className="App">
      <header className="App-header">
        <div className="container">
          <div id="listing" className='row'>
            <div classNames="col-sm-12"><h2> Listing </h2>
              <label>hook list</label>
              <HookedField hook={ listing } cb={ onListingChanged }/>
              <div><h5 className='inputHints'>Input words separated by a space between each element. Enter only "REHOOKT_NONE" if you want to have an empty set of hooks</h5></div>
            </div>
          </div>
          <Fields listing={ listingV } hinting={ { errors, hint } } />
        </div>
      </header>  
      
      </div>
  ) ;
}

export default App;