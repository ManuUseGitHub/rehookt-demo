import React from 'react';

const _ = ( { hinting } ) => {
    const { errors, listing } = hinting;

    console.log(listing)
    const showErrorBox = ( ) => {
        if( errors.val && listing.val !== ""){ 
            return (
                <div  id="error" className="col-sm-12">
                    <h3>Error box :</h3>

                    <p>
                        { errors.val }
                    </p>
                </div>);
        }
    }
    return <React.Fragment>{ showErrorBox( ) }</React.Fragment>
}

export default _;