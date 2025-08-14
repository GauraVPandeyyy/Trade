
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ReferAndEarn from './components/ReferAndEarn';

function App() {
  return (
    <div>
      <Dashboard />
      <ReferAndEarn
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // theme="dark"
      />
    </div>

  )
}
export default App;