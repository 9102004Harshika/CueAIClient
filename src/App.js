import { lazy } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
const Home = lazy(() => import('./pages/Home'));
const Login =lazy(()=>import('./pages/Login'))
const Signup=lazy(()=>import('./pages/Signup'))
const Profile=lazy(()=>import('./pages/Profile'))
const ForgotPassword=lazy(()=>import('./pages/ForgotPassword'))
const NewPassword=lazy(()=>import('./pages/NewPassword'))
const AdminPage=lazy(()=>import('./pages/Admin'))
const UserProfile=lazy(()=>import('./pages/UserProfile'))
const Prompt=lazy(()=>import('./pages/Prompt'))
const Cart=lazy(()=>import('./pages/Cart'))
const UserContextProvider=lazy(()=>import('./context/UserContextProvider'))
const PromptDetail=lazy(()=>import('./components/PromptDetail'))
const Edit=lazy(()=>import('./components/Edit'))
const ApprovePrompt=lazy(()=>import('./components/ApprovePrompt'))
const ManagePrompts=lazy(()=>import('./components/ManagePrompts'))
const Checkout=lazy(()=>import('./components/Checkout'))
const Success=lazy(()=>import('./pages/Sucess'))
const Cancel=lazy(()=>import('./pages/Cancel'))
const Orders=lazy(()=>import('./pages/Orders'))
const TermsAndConditions=lazy(()=>import ('./pages/TermsAndConditions'))
const PrivacyPolicy =lazy(()=>import("./pages/PrivacyPolicy")) ;
const FAQ =lazy(()=>import("./pages/Faq")) ;
function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='/resetPassword' element={<NewPassword/>}/>
      <Route path='/:username' element={<Profile/>}/>
      <Route path='/:username/prompt' element={<Prompt/>}/>
      <Route path='/prompt/:id' element={<PromptDetail/>}/>
      <Route path='/editprompt/:promptId' element={<Edit/>}/>
      <Route path='/:username/profile' element={<UserProfile/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path='/admin/approvePrompt' element={<ApprovePrompt/>}/>
      <Route path='/admin/managePrompts' element={<ManagePrompts/>}/>
      <Route path='/:username/cart' element={<Cart/>}/>
      <Route path ="/checkout" element ={<Checkout/>}/>
      <Route path ='/:username/success' element={<Success/>}/>
      <Route path ='/:username/orders' element={<Orders/>}/>
      <Route path ='/cancel' element={<Cancel/>}/>
      <Route path='/terms' element={<TermsAndConditions/>}/>
      <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
      <Route path='/faq' element={<FAQ/>}/>
      </Routes></BrowserRouter></UserContextProvider>
  );
}

export default App;
