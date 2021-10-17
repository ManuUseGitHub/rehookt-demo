import React from 'react';

export default ( { hinting } ) => {
    const { errors } = hinting;

    const showErrorBox = ( ) => {
        if( !errors.val ){ 

            return (
                <div id="code" className="col-sm-12">
                    <h2>Resulting code</h2>
                    <div id='code-wrapper'>
                        <pre dangerouslySetInnerHTML={ hinting.hint.val }/>
                    </div>
                </div>);
        }
    }
    
    return <React.Fragment>{ showErrorBox( ) }</React.Fragment>
}