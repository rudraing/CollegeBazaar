import React, { forwardRef, useId } from 'react';

const Input = forwardRef(function Input({
    label,
    type = 'text',
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <>
            {label && <label htmlFor={id} className='inline-block mb-1 pl-1'>{label}</label>}
            <input
                className={`px-1 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                type={type}
                ref={ref}
                {...props}
                id={id}
            />
        </>
    );
});

export default Input;
