import React from 'react'
import * as Icons from "react-icons/fi";


const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    iconName,
    outline=false,
    customClasses,
    type,
}) => {
    const Icon = Icons[iconName];

  return (

    <button
        disabled={disabled}
        onClick={onclick}
        type={type}
        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
                ${customClasses} text-black hover:scale-95 trasition-all duration-200`}
    >
        {
            children ? (
                <div className='flex gap-2 items-center text-[14px]'>
                    <span>
                        {text}
                    </span>
                    {children}
                    
                </div>
            ) : (
                <div className='flex gap-2 items-center text-[14px]'>
                    {text}
                    {iconName ? <Icon fontSize={19}/> : ""}
                </div>
            )
        }
    </button>
  )
}

export default IconBtn