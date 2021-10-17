const {parse,stringify} = require( 'querystringify' );

const QueryManager = () => {
    const queryString = ( search = null ) => {
        
        let qString = search;
        
        if( search === null ){
            qString = window.location.search;
        }

        // Gets the real query string (nothing before the ?) or an empty string if no real query.
        return /^[^?]*([?].+|)$/.exec( qString )[ 1 ];
    }

    const asObject = ( search = null ) => {
        
        // Get the query string from the search
        let qString     = queryString( search )

        // Parse it to an object
        let queryObject = parse( qString );

        // If we detect a redirection, 
        if( queryObject.redirect ){

            // Get the redirection value (containing the query string)
            qString     = queryObject.redirect;

            // Re parse it to a query object
            queryObject = parse( qString );
        }

        return queryObject;
    }
    
    const putParameters = ( parameters, search = null ) => {
        
        // Get the query object
        let queryObject = asObject ( search );

        // For every element,
        parameters.forEach( ( { name, val } ) => {

            // search for an oldValue,
            const oldVal = JSON.stringify( queryObject[ name ] );
            
            // if the entry is found,
            if( oldVal !== undefined ){

                // log to the developer
                console.warn( `the query parameter ${name} as been overriden from \`${oldVal}\` to \`${val}\`` )
            }

            // then, add it to the object with its value
            queryObject[ name ] = val;
        } );
           
        // Return the new query string
        return decodeURIComponent( stringify( queryObject ) );
    }

    const removeParameters = ( parameters, search = null ) => {

        // Get the query object
        let queryObject = asObject ( search );

        // For every element,
        parameters.forEach( ( name ) => {

            // then, add it to the object with its value
            delete queryObject[ name ];
        } );
           
        // Return the new query string
        return decodeURIComponent( stringify( queryObject ) );
    }

    // returns functions
    return { putParameters, removeParameters, asObject, queryString }

} 
module.exports = ( QueryManager ).call( this )