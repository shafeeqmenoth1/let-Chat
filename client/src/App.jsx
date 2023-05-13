import axios from 'axios'
import Routes from './components/Routes';
import { UserContextProvider } from './UserContxt';


function App() {
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true
  return (
    <UserContextProvider>
  <Routes/>
    </UserContextProvider>
  
    
  )
}

export default App
