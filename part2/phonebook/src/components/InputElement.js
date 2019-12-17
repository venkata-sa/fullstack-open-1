import React from 'react';

const InputElement = ({text, onChange, value}) => {
    
    return (
        <div>
            {text}: <input 
                onChange = {onChange}
                value = {value} />
        </div>
    )
}

export default InputElement;