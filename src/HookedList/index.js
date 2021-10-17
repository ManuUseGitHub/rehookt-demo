import React from 'react';
import HookedField from '../HookedField';

export default ( { hinting, cb, hooks } ) => {
    const { errors } = hinting;
    const uplog = ( { name, hook , value } ) => {
        
        const copy = Object.assign( {}, hooks );
        
        copy[ name ].val = value;

        cb( copy );
    }
    const showErrorBox = _ => {
        if( !errors.val ){ 
            return (
                <div  id="hooked-list" className="col-sm-12">
                    <h2> Hooked inputs list </h2>

                    <div className="row">
                        { Object.keys( hooks ).map( ( name, index ) => {
                            
                            const attr = { placeholder : name };

                            return (
                                <div className='hooked-input col-sm-6 col-md-3' key = { index }>
                                    <HookedField 
                                        name = { name }
                                        hook = { hooks[ name ] } 
                                        cb   = { uplog } 
                                        attr = { attr }
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>);
        }
    }
    
    return <React.Fragment>{ showErrorBox( ) }</React.Fragment>
}