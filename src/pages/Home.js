import React, { lazy, useEffect, useState } from 'react'
import banner1 from '../assets/banner1.png'
import banner2 from '../assets/banner2.png'
import banner3 from '../assets/banner3.png'
import banner4 from '../assets/banner4.png'
import ai from '../assets/ai.png'
import ai3 from '../assets/ai3.png'
import logo from '../assets/logo.png'
import {BiSolidUpArrow}  from 'react-icons/bi'
import { FaHandHoldingHeart } from "react-icons/fa";
const Navbar=lazy(()=>import('../components/Navbar'));
const Banner=lazy(()=>import('../components/Banner'));
const ImageBand=lazy(()=>import('../components/ImageBand'))
const Home = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  // Show the button when scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to the top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

   
  return (
   <> <Navbar />
    <Banner imageLink={banner1} mainText="Prompt Marketplace" description="Search for AI prompts from the world's best AI " colorText="Midjourney, ChatGPT, DALL·E, Stable Diffusion & more"  buttonText="Explore Prompts"/>
    <ImageBand/>
    <div className='flex ml-12 mr-12 justify-between mt-18'>
     <div className='p-20'>
       <button className='mt-5 bg-slate-950 text-[13px]  text-white p-1   rounded-md'>AI Image</button>
       <h1 className='text-[35px] font-bold'>Struggling to spark that perfect creative idea? </h1>
       <h1 className='text-[35px] font-bold'> CueAI can help!...</h1>
       <span className='text-gray-400 font-bold text-[20px]'><p > This innovative marketplace connects creators with inspiring prompts, </p>
         <p>igniting imaginations and fueling projects. Whether you're a seasoned writer</p> 
         <p>in search of a fresh story concept or a budding artist seeking a captivating</p>
         <p>visual prompt, CueAI offers a vast collection to jumpstart your creative journey.</p></span>
         <button className='mt-5 bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] font-bold text-slate-900 p-3 rounded-md'>Visit Shop</button>
     </div>
     <div className='mt-20'><img src={ai} width={400} alt='ai'/></div>
    </div>
   
    <Banner imageLink={banner2} mainText="Sell your prompts on CueAI" description="Upload your prompt, connect with Stripe, become a seller"  buttonText="Sell a prompt"/>
    
    <div className='flex ml-12 mr-12 justify-between mt-18'>
     <div className='p-20'>
       <button className='mt-5 bg-slate-950 text-[13px]  text-white p-1   rounded-md'>Future</button>
       <h1 className='text-[35px] font-bold'>Unleash your inner idea machine and  </h1>
       <h1 className='text-[35px] font-bold'> turn your creativity into cash with CueAI!...</h1>
       <span className='text-gray-400 font-bold text-[18px]'>
        <p>This booming marketplace connects creators hungry for inspiration with the<br/>
          sparks you ignite.  Whether you craft captivating writing prompts, dream up<br/>
          thought-provoking photography themes, or weave enchanting storylines for<br/>
           artists, CueAI provides the perfect platform to showcase your talent and <br/>
           earn from your passion. Upload your prompts with ease, set your price,<br/>
            and watch as your ideas fuel countless creative projects.
            <br/> CueAI - where your creative genius meets a global audience.</p></span>
         <button className='mt-5 bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] font-bold text-slate-900 p-3 rounded-md'>Become a Seller</button>
     </div>
     <div className='mt-20 pt-5 mr-10'><img src={ai3} width={450} alt='ai3' /></div>
    </div>
     <Banner imageLink={banner3} mainText="Create an app using prompts" description="Build apps by generating any image"  buttonText="Let's Build"/>
     <div className='text-center mt-20 '>
       <h1 className='text-[35px] font-bold '>Prompt Marketplace for Artificial Intelligence</h1>
       <div className='  text-slate-400'>----------------------</div>
       <p className='text-gray-400 font-bold text-[20px] ml-44 mr-44 mt-5'>Unleash your creative potential and ignite imaginations with CueAI,
        the groundbreaking marketplace for prompts! Struggling for inspiration? Browse our vast library, meticulously curated for writers, artists, 
        and creators of all stripes. From captivating story starters to thought-provoking design challenges, CueAI provides the perfect spark to
         jumpstart your next masterpiece. Whether you're a seasoned professional or a budding talent, CueAI empowers you to take your creativity to the next level.
          So, dive in, unlock a world of inspiration, and watch your creative vision come alive!...</p>
     </div>
     
 
     <section class="overflow-hidden">
 <div class="max-w-screen-xl 2xl:max-w-screen-3xl mx-44 md:mx-44 lg:mb-10 lg:mt-12  flex flex-col justify-center">
 <div class="flex flex-col sm:flex-row mx-auto">
  <a href="#_"> 
  <img src="https://images.unsplash.com/photo-1530035415911-95194de4ebcc?q=80&amp;w=2670&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="rounded-xl  rotate-6 hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-100 transform origin-bottom" alt="#_"/>
   </a><a href="#_"> <img src="https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&amp;w=2672&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D " class="rounded-xl  -rotate-12 hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-100 transform origin-bottom" alt="#_"/> 
   </a><a href="#_"> <img src="https://images.unsplash.com/photo-1586996292898-71f4036c4e07?q=80&amp;w=2670&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="rounded-xl  rotate-6 hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-100 transform origin-bottom" alt="#_"/> 
   </a><a href="#_"> <img src="https://images.unsplash.com/photo-1522775417749-29284fb89f43?q=80&amp;w=2574&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="rounded-xl  -rotate-12 hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-100 transform origin-bottom" alt="#_"/> </a>
  
 </div> 
  </div>
 </section>
    
    <Banner imageLink={banner4} mainText="Explore the Store" description="Use CueAI to easily generate stunning designs, prints and more"  buttonText="Explore Store"/> 
  
   {/* footer */}
   <div className='border-t-2 border-slate-600 bg-[rgb(69,69,102)] mt-5 pb-5 pt-8'>
  <div className='flex justify-between items-center'>
    <div className='ml-12'>
      <div className='flex items-center'>
        <img src={logo} className='w-10 h-10' alt='logo'/>
        <span className="text-3xl text-white ml-3">CueAI</span>
      </div>
      <p className='text-sm text-slate-300 mt-2'>We spark creativity, you spark sales.</p>
    </div>

    <div className='flex justify-between gap-5 mr-12 text-slate-300'>
      <a href='/login' className='hover:text-white'>Login</a>
      <a href='/signup' className='hover:text-white'>Signup</a>
      <a href='/terms' className='hover:text-white'>Terms and Conditions</a>
      <a href='/privacy-policy' className='hover:text-white'>Privacy Policy</a>
      <a href='/faq' className='hover:text-white'>FAQ</a>
    </div>
  </div>

  <div className='text-center mt-5 text-slate-300'>
    <h4 className='flex justify-center items-center gap-2'>
      Built with 
      <span className='text-[rgb(214,133,134)]'>
        <FaHandHoldingHeart />
      </span>  
      by 
      <a href="https://github.com/9102004Harshika" className='underline hover:text-white'>Harshika Gawade</a>
    </h4>

    <p className='mt-3 text-xs'>
      © {new Date().getFullYear()} CueAI. All rights reserved.
    </p>
  </div>
</div>


   {showTopButton && (
        <button
          onClick={scrollToTop}
          className="bg-gradient-to-r from-[rgb(219,194,144)] to-[rgb(214,133,134)] text-slate-900 fixed bottom-3 right-10  p-3 rounded-full hover:bg-slate-800 transition-all duration-300"
        >
          <BiSolidUpArrow/>
        </button>
      )}
   </>
  
  )
}

export default Home