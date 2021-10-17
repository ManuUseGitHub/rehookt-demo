
import React from 'react';

const _ = ( { hook, name, attr, cb = null } ) => {
    
    let {
        placeholder ,
        style = {},
        disabled = false,
        classNames =""
    } = ( attr || {} );

    const onChange = ( e ) => {
        const newValue = e.target.value;
        
        hook.set( newValue );

        if( cb != null ){
            cb( { name, hook , value : newValue } );
        }
    }

    return ( 
        <input 
            value       = { hook.val } 
            placeholder = { placeholder } 
            onChange    = { onChange } 
            style       = { style } 
            className   = { "form-control " + classNames } 
            disabled    = { disabled } 
        /> 
    )
}

export default _;