import { useState } from "react";
import { useAuthStore } from '../store/useAuthStore'
import { LoaderIcon, MessageCircleIcon, LockIcon, UserIcon, MailIcon } from "lucide-react";
import { BorderAnimatedContainer } from "../components/BorderAnimatedContainer";
import { Link } from "react-router";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const {signup, isSigningUp} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
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
                  <h2 className="text-3xl font-bold text-white mb-6">Create an account</h2>
                  <p className="text-slate-400">Join our chat community and connect with friends!</p>
                </div>

                {/* Signup form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        className="input"
                        placeholder="Name"
                      />
                    </div>
                  </div>

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
                    disabled={isSigningUp}
                  >
                    {
                      isSigningUp ? (
                        <LoaderIcon className="w-full h-5 animate-spin mx-auto text-center " />
                      ) : (
                        "Create Account"
                      )
                    }
                  </button>
                </form>


                <div className="mt-4 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Sign in
                  </Link>
                </div>
              </div>
            </div>

              {/* right side */}
              <div className="w-full md:w-1/2 p-0 flex items-center justify-center">
                <img
                  src="public/signup2.webp"
                  alt="Signup illustration"
                  className="w-4/5 h-4/5"
                />
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};
