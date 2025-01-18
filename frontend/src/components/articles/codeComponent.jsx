import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FaRegCopy } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";

import { useState } from 'react';

export default function Code({name, code, language}){

    const [copy, setCopy] = useState(false)

    const codeString = `
    ${code}
    `

  return (
        <div className='max-w-2xl min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden'>
            <div className='flex justify-between px-4 text-white text-xs items-center'>
                <p className='text-sm' name={name}>
                    {name}
                </p>
                {
                    copy ? (
                        <button className='py-1 inline-flex items-center gap-1'>
                        <span className='text-base mt-1'>
                            <IoIosCheckmark/>
                        </span>
                            Copied!
                        </button>
                    ) : 
                    (
                        <button 
                        className='py-1 inline-flex items-center gap-1'
                        onClick={() =>{
                            navigator.clipboard.writeText(codeString);
                            setCopy(true)
                            setTimeout( () =>{
                                setCopy(false)
                            }, 3000)
                        }}
                        >
                        <span className='text-base mt-1'>
                            <FaRegCopy/>
                        </span>
                        Copy code
                        </button>
                    )
                }
            </div>
            <SyntaxHighlighter
                language={language}
                style={atomOneDark}
                customStyle={{
                    padding: "25px",
                }}
                wrapLongLines={true}
                >
                {codeString}
            </SyntaxHighlighter>
        </div>
  );
}