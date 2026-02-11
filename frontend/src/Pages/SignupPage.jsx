// import { useState } from 'react'
// import { useAuthStore } from '../store/useAuthStore'
import { MessageCircleIcon } from 'lucide-react';
import { BorderAnimatedContainer } from '../components/BorderAnimatedContainer';

export const SignupPage = () => {

  // const [formData, setFormData] = useState({ username: "", email: "", password: ""});
  // const {signup, isSigningUp} = useAuthStore();

  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900'>   
      <div className='relative w-full max-w-6xl md:h-200 h-162.5'>
        <BorderAnimatedContainer>
          <div className='w-full flex flex-col md:flex-row'>

            {/* left side */}
            <div className='w-full md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30'>
                {/* Heading text */}
                <div className='text-center mb-8'>
                  <MessageCircleIcon className="w-12 h-12 text-indigo-400 mx-auto mb-4"/>
                  <h2 className='text-3xl font-bold text-white mb-6'>Create an account</h2>
                  <p className='text-slate-400'>Join our chat community and connect with friends!</p>
                </div>

                {/* Signup form */}
                <form className='space-y-6'>
                  <div>
                    <label htmlFor="auth-input-label" className=''>Full Name</label>
                    <div className='relative'>

                      <UserIcon className="auth-input-icon" />

                    </div>
                  </div>
                </form>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  )
}