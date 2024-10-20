import { useState, useRef, useEffect } from 'react';
import image1 from '../assets/carousel1/1.png'
import image2 from '../assets/carousel1/2.png'
import image3 from '../assets/carousel1/3.png'
import image4 from '../assets/carousel1/4.png'


const ImageBand = () => {
  return (
    <>
    <div className="carousel my-0 mx-0 ml-12 mt-[-30px] mb-2 mr-12">
      <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
       
      </h2>
      <div className="relative overflow-hidden">
       
        <div
         
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
              <div
                
                className="carousel-item text-center relative  snap-start"
              >
                <a
                  href="https://robkendal.co.uk"
                  className="  cover bg-left-top  bg-no-repeat "
                  
                >
                  
                  <img
                    src={image1 }
                    alt="A personal site perhaps?"
                    className="w-68 h-44 rounded-md  "
                  />
                 
                </a>
                
                <a 
                  href="https://robkendal.co.uk"
                  className=" transform transition duration-1 
                  hover:scale-x-100 h-full w-full absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-slate-800/75 z-10"
                >
                  
                  <h3 className=" transform transition duration-1 
                  hover:scale-110 text-white mt-20 px-3 mx-auto text-xl font-bold ">
                  Expressive Animal Outlines
                  </h3>
                  <p >Prints on wild side</p>
                 
                </a>
              </div>



              <div
                
                className="text-center relative  snap-start"
              >
                <a
                  href="https://robkendal.co.uk"
                  className=" bg-left-top  bg-no-repeat "
                  
                >
                  
                  <img
                    src={image2 }
                    alt="A personal site perhaps?"
                    className="w-68 h-44 rounded-md  cover "
                  />
                 
                </a>
                
                <a
                  href="https://robkendal.co.uk"
                  className=" transform transition duration-1 
                  hover:scale-x-100 h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-slate-800/75 z-10"
                >
                  <h3 className=" transform transition duration-5
                  hover:scale-110 text-white mt-20 px-3 mx-auto text-xl font-bold ">
                 Classic Western Tee Prints
                  </h3>
                  <p>Saddle-up for some gunslingin' designs</p>
                </a>
              </div>
           


              <div
                
                className="carousel-item text-center relative  snap-start"
              >
                <a
                  href="https://robkendal.co.uk"
                  className=" bg-left-top  bg-no-repeat "
                  
                >
                  
                  <img
                    src={image3 }
                    alt="A personal site perhaps?"
                    className="w-68 h-44 rounded-md  cover "
                  />
                 
                </a>
                
                <a
                  href="https://robkendal.co.uk"
                  className=" transform transition duration-1 
                  hover:scale-x-100 h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-slate-800/75 z-10"
                >
                  <h3 className=" transform transition duration-5
                  hover:scale-110 text-white mt-20 px-3 mx-auto text-xl font-bold ">
                 Whimsical StoryBook Collages
                  </h3>
                  <p>Fanstatic characters in creative collages</p>
                </a>
              </div>
           

              <div
                
                className="carousel-item text-center relative  snap-start"
              >
                <a
                  href="https://robkendal.co.uk"
                  className=" bg-left-top  bg-no-repeat "
                  
                >
                  
                  <img
                    src={image4 }
                    alt="A personal site perhaps?"
                    className="w-68 h-44 rounded-md  cover "
                  />
                 
                </a>
                
                <a
                  href="https://robkendal.co.uk"
                  className=" transform transition duration-1 
                  hover:scale-x-100 h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-slate-800/75 z-10"
                >
                  <h3 className=" transform transition duration-5
                  hover:scale-110 text-white mt-20 px-3 mx-auto text-xl font-bold ">
                 Quirky Stick Figure Doodles
                  </h3>
                  <p>Doodles with oodles of personality</p>
                </a>
              </div>
              



              
           
        </div>
      </div>
    </div>
    </>
  );
};

export default ImageBand;