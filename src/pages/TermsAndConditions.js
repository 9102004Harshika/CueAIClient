import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="pl-20 pt-20">
      <h1 className="text-4xl mb-6">Terms and Conditions</h1>
      
      <p className='w-[700px] text-xl'>Welcome to CueAI, a marketplace for creative and AI-driven prompts. By using our services, you agree to the following Terms and Conditions, which govern your use of the platform.</p>
      
      <h2 className="text-3xl font-bold mt-8 mb-4">1. Introduction</h2>
      <p className='w-[700px] text-xl'>CueAI is a platform that facilitates the buying and selling of creative AI prompts. By accessing or using the platform, you agree to abide by these terms and all applicable laws.</p>
      
      <h2 className="text-3xl font-bold mt-8 mb-4">2. Definitions</h2>
      <p className='text-xl'>
        "Platform" refers to CueAI. <br />
        "User" refers to anyone using the platform, including "Buyers" and "Sellers." <br />
        "Prompts" refers to AI-driven or creative prompts available for purchase.
      </p>
      
      <h2 className="text-3xl font-bold mt-8 mb-4">3. Eligibility</h2>
      <p className='text-xl'>CueAI is open to all users globally, without strict eligibility restrictions. However, by using the platform, you confirm that:</p>
      <ul className="list-disc ml-8 text-sm">
        <li>You have the legal capacity to enter into a binding agreement according to the laws of your country or residence.</li>
        <li>If you are under the age of 18, you have obtained parental or legal guardian consent to use the platform.</li>
        <li>You will comply with all local laws and regulations regarding online content and intellectual property.</li>
        <li>You will not use the platform if you have been previously banned or restricted by CueAI for violating these terms.</li>
      </ul>

      <h2 className=" text-3xl font-bold mt-8 mb-4">4. User Accounts</h2>
      <p className='w-[700px] text-xl'>Users must create an account to access certain features of CueAI. You are responsible for maintaining the confidentiality of your login information and any activity that occurs under your account.</p>

      <h2 className="text-3xl font-bold mt-8 mb-4">5. Buying and Selling Prompts</h2>
      <p className='w-[700px] text-xl' >Sellers set their own prices for the prompts they list on CueAI. Buyers are required to pay the listed price to gain access to the prompt. CueAI takes a [X]% commission on each transaction.</p>

      <h2 className="text-3xl font-bold mt-8 mb-4">6. Intellectual Property Rights</h2>
      <p className='w-[700px] text-xl'>Sellers retain the intellectual property rights to the prompts they create and sell. Buyers are granted a limited, non-transferable license to use the purchased prompts for personal or commercial purposes, as defined by the seller.</p>

      <h2 className="text-3xl font-bold mt-8 mb-4">7. Prohibited Content and Activities</h2>
      <p className='w-[700px] text-xl'>Users are prohibited from uploading or selling content that is illegal, harmful, or infringes on intellectual property rights. Violating this policy may result in account suspension or legal action.</p>

      <h2 className="text-3xl font-bold mt-8 mb-4">8. Refunds and Cancellations</h2>
      <p className='w-[700px] text-xl'>All sales on CueAI are final. Refunds will only be issued in cases where the purchased prompt fails to meet the description provided by the seller. Disputes will be handled on a case-by-case basis.</p>

      <h2 className="text-3xl font-bold mt-8 mb-4">9. Privacy Policy</h2>
      <p className='w-[700px] text-xl' >Your privacy is important to us. Please refer to our <a href="/privacy-policy" className="text-blue-600">Privacy Policy</a> for details on how we collect, use, and protect your personal information.</p>

      <h2 className="text-3xl font-bold mt-8 mb-4">10. Liability and Disclaimers</h2>
      <p className='w-[700px] text-xl'>CueAI is not responsible for any damages arising from the use of the platform. The platform and all its content are provided "as is" without warranties of any kind. We do not guarantee the accuracy or availability of the prompts listed on the platform.</p>

      <h2 className="text-3xl font-bold mt-8 mb-4">11. Termination</h2>
      <p className='w-[700px] text-xl'>CueAI reserves the right to terminate or suspend your account at any time, with or without cause, if you violate these terms or engage in prohibited activities. Users may also terminate their accounts at any time by contacting support.</p>

      <h2 className="text-3xl font-bold mt-8 mb-4">12. Governing Law</h2>
      <p className='w-[700px] text-xl'>These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising from the use of CueAI will be subject to the jurisdiction of [Your Country/State] courts.</p>

      <h2 className="text-3xl font-bold mt-8 mb-4">13. Changes to Terms</h2>
      <p className='w-[700px] text-xl'>CueAI reserves the right to update these terms at any time. Users will be notified of any significant changes via email or through the platform. Continued use of the platform constitutes acceptance of any updated terms.</p>
    </div>
  );
};

export default TermsAndConditions;
