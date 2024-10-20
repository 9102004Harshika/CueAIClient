import React, { lazy,Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RingLoader } from 'react-spinners';
const App = lazy(() => import('./App.js'));
const renderLoader = () => <p ><RingLoader
color="#fad489"
cssOverride={{
  'alignItems': 'center',
  'display': 'flex',
  'justifyContent': 'center',
  'textAlign': 'center',
  'marginTop':'20%',
  'marginLeft':'45%',
  
}} size={80}
/>
</p>
ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={renderLoader()}>
    <React.StrictMode>
      <App />
    </React.StrictMode></Suspense>

);
