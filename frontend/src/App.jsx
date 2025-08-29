import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Routes,Route,Navigate } from 'react-router';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';  
import * as Sentry from "@sentry/react";
 const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);
const App = () => {
 

  return (
    <>
    <button
      onClick={()=>{
        throw new Error("Test Sentry Error");
      }}
      >Throw Error
    </button>
     
      <SignedIn>
        <SentryRoutes>
         <Route path = "/" element={<HomePage />} />
         <Route path = "auth" element={<Navigate to ={"/"}replace />} />
        </SentryRoutes>
      </SignedIn>
       <SignedOut>
        <SentryRoutes>
          <Route path = "/auth" element={<AuthPage />} /> 
          <Route path = "*" element={<Navigate to ={"/auth"}replace />} />
          </SentryRoutes>
      </SignedOut>
    </>
  )
}

export default App
