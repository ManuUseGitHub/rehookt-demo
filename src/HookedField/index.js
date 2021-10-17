
import React from 'react';

export default ( { hook, name, attr, cb = null } ) => {
    
    const {
        placeholder = "",
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