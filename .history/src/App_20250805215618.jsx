
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <div>
      <Dashboard />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>

  )
}
export default App;