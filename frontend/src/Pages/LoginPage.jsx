import { useState } from "react";
import { useAuthStore } from '../store/useAuthStore'
import { LoaderIcon, MessageCircleIcon, LockIcon, MailIcon } from "lucide-react";
import { BorderAnimatedContainer } from "../components/BorderAnimatedContainer";
import { Link } from "react-router";
import loginImg from "../../public/login.webp"

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-2 bg-slate-900">
      <div className="relative w-full max-w-6xl">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* left side */}
            <div className="w-full md:w-1/2 p-6 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* Heading text */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-6">Login to your account</h2>
                  <p className="text-slate-400">Join our chat community and connect with friends</p>
                </div>

                {/* Login form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Email */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer py-2 rounded-lg font-semibold"
                    disabled={isLoggingIn}
                  >
                    {
                      isLoggingIn ? (
                        <LoaderIcon className="w-full h-5 animate-spin mx-auto text-center " />
                      ) : (
                        "Logins"
                      )
                    }
                  </button>
                </form>


                <div className="mt-4 text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Sign up
                  </Link>
                </div>
              </div>
            </div>

              {/* right side */}
              <div className="w-full md:w-1/2 p-0 flex items-center justify-center">
                <img
                  src={loginImg}
                  alt="Login illustration"
                  className="w-4/5 h-4/5"
                />
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};
