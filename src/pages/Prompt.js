import React from 'react'
import { BuyPrompt,EditPrompt,CreatePrompt,DeletePrompt } from '../components/EditPrompt';
const Prompt = () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const action = params.get('action');
  
  return (
    <>
    <div>
        {action === 'create' && <CreatePrompt />}
        {action === 'edit' && <EditPrompt />}
        {action === 'delete' && <DeletePrompt />}
        {action === 'buy' && <BuyPrompt />}
        </div>
    </>
  )
}

export default Prompt