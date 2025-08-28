import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Routes,Route,Navigate } from 'react-router';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';  

const App = () => {
  return (
    <header>
     
      <SignedIn>
        <Routes>
         <Route path = "/" element={<HomePage />} />
         <Route path = "auth" element={<Navigate to ={"/"}replace />} />
        </Routes>
      </SignedIn>
       <SignedOut>
        <Routes>
          <Route path = "/auth" element={<AuthPage />} /> 
          <Route path = "*" element={<Navigate to ={"/auth"}replace />} />
          </Routes>
      </SignedOut>
    </header>
  )
}

export default App
