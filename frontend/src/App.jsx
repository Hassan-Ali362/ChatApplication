import './App.css'
import { Routes, Route } from 'react-router'

import { SignupPage } from './pages/SignupPage'
import { LoginPage } from './pages/LoginPage'
import { ChatApp } from './pages/ChatApp'

import { useAuthStore } from './store/useAuthStore'

function App() {

  const { authUser, isLoggedIn, Login } = useAuthStore();

  console.log("Auth User:", authUser);
  console.log("Is Logged In:", isLoggedIn);

  return (
    <>
    <div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>
      
      {/* background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px), linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px]"/>
      <div className='absolute top-0 left-4 size-80 bg-pink-500 opacity-20 blur-[100px]'/>
      <div className='absolute bottom-0 right-4 size-80 bg-cyan-500 opacity-20  blur-[100px]'/>

      <button onClick={Login} className='text-white z-10'>Login</button>

      <Routes>
        <Route path='/' element={<ChatApp />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />  
      </Routes>

    </div>
    </>
  )
}

export default App
