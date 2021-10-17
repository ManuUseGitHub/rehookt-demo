import React from 'react';

export default ( { hinting } ) => {
    const { errors } = hinting;

    const showErrorBox = ( ) => {
        if( errors.val ){ 
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