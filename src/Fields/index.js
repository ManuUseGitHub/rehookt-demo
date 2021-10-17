import React, { useEffect } from 'react';

import ErrorBox from "../ErrorBox";
import HintBox from '../HintBox';
import HookedList from '../HookedList';

import "prismjs/themes/prism-solarizedlight.css";

const beautify  = require( 'js-beautify' ).js
const Prism     = require( 'prismjs' );

const { useStates, generate } = require( 'rehookt' );

export default ( { listing, hinting } ) => {

    // set the default value as empty string instead of undefined
    const prehooks = ( listing ).split( /\s/ ).map( l => {
        return l !== "" ? [ l, "" ] : undefined;
    } )

    let hooks = { };

    try{
        hooks = useStates( ...prehooks );
    }catch( e ){ hinting.errors.set( e.message ) }

    useEffect( _ => { log( hooks ) }, [] );

    const lineMarkJSCode = ( json ) => {

        // --- highlighting the code ---
        const beautifyOptions = { 
            indent_size : 2, 
            space_in_empty_paren : true 
        };

        const beautified    = beautify( `${ json }` , beautifyOptions );
        const highlighted   = Prism.highlight( beautified, Prism.languages.javascript, 'javascript' );

        // --- breaking the code down into lines ---
        const newLineMarker = "<span class='_newCodeLine'></span>"; 

        const withLines = highlighted
            .split( '\n' )
            .join( `\n${ newLineMarker }` );
        
        return newLineMarker + withLines;
    }

    const log = ( ) => {
        let hooks2 = { };
        
        // adding the set field to the resulting object because it is ignored
        Object.keys( hooks ).forEach( h => {  hooks2[ h ] = 
            { 
                val : hooks[ h ].val, 
                set : 'f ( new value )' 
            } 
        } );

        // splitting the string into a word list
        const textListing = listing.split( /\s/ );

        const json =  
            `// This call,\nconst hooks = useStates( ...${ JSON.stringify( textListing ) } );\n\n`+
            `// will create this object\nhooks = ${ JSON.stringify( hooks2 ) };`;
  
        // highlight and breacking down the code into lines
        const lineMarkedHTML = lineMarkJSCode( json );

        // Returns a highlighted HTML string
        const html = { __html : lineMarkedHTML };
 
        // setting the html as hinting
        hinting.hint.set( html );
    }

    return ( <div className='row'>
        <HookedList hinting={ hinting } cb={ log } hooks={ hooks }/>
        <ErrorBox   hinting={ hinting }/>
        <HintBox    hinting={ hinting }/>
    </div> )
}