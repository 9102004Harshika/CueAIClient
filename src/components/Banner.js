import React from 'react'


const Banner = ({imageLink,mainText,description,colorText,buttonText}) => {
  return (
    <>
    <div className='flex align-center justify-center  mt-10 relative '>
        <div className='brightness-50 '><img src={imageLink} className=' object-cover w-[1250px] h-[400px] rounded-md' alt="banner" /></div>
    <div className='absolute mt-[130px] mr-[600px] ml-[50px] '>
        <p className='font-bold text-[50px] '>{mainText}</p>
         <p className='text-[25px] font-bold mt-2'>{description}</p>
         <p className='text-[30px] font-bold bg-gradient-to-r from-[rgb(214,133,134)] via-[rgb(153,204,153)] to-[rgb(108,127,188)] text-transparent  bg-clip-text'>{colorText}</p>
         <button className='mt-3 bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] font-bold text-slate-900 p-2 rounded-md'>{buttonText}</button>
        </div>
        
        
        
    </div>
    
    
    </>
    
        
  )
}

export default Banner