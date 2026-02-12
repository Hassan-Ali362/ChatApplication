import { useAuthStore } from '../store/useAuthStore.jsx';

export const ChatApp = () => {
  const { logout } = useAuthStore();

  return (
    <div className='z-10 text-white'>   
        <h1>Chat Application</h1>


        <button onClick={logout} className='text-white'>Logout</button>

    </div>
  )
}