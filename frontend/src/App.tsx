import { Login } from "./pages/Login"
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { Profile } from "./pages/Profile";
import { AccountsEdit } from "./pages/AccountsEdit";
import { Home } from "./pages/Home";
import {SignUp} from "./pages/SignUp";

function App() {
  return (
     <Router>
      <Routes>
          <Route 
           path="/login" 
           element={<Login />} 
          />

          <Route 
           path="/signup" 
           element={<SignUp/>} 
          />

          <Route 
           path="/" 
           element={<Home />} 
          />

          <Route 
           path="/profile" 
           element={<Profile />} 
          />

          <Route 
           path="/accounts/edit" 
           element={<AccountsEdit />} 
          />

          <Route path="*" element={<Login />} />

      </Routes>
     </Router>
  )
}

export default App
