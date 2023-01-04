import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  Route,
  Navigate,
  BrowserRouter,
  Routes

} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import "./style.scss"
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import Landingpage from './pages/landingPage/Landingpage';
import { useSelector } from 'react-redux';
import Chat from './pages/Chat/Chat';



function App() {
  const user =useSelector(state=>state?.authReducer?.authData?.user)

  const {darkMode} = useContext(DarkModeContext);
   
  const Layout = ({children}) => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{  display: "flex" }}>
        <LeftBar />
        <div style={{flex: 6 }}>
        {children}
        </div>
        <RightBar />
        </div>

      </div> 
    );
  }; 

  const Layout1 = ({children}) => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{  display: "flex"  }}>
        <LeftBar />
       <div style={{flex:10}} >
        {children}
        </div>
       
        </div>

      </div> 
    );
  }; 

  


  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage />} />
      <Route path='/home' element={user ? <Layout><Home /></Layout> : <Navigate to="/login" />} />
      <Route path='/home/profile/:id' element={user ? <Layout><Profile /></Layout> : <Navigate to="/login" />} />
      <Route path='/login' element={user ? <Navigate to="/home" /> :<Login />} />
      <Route path='/register' element={user ? <Navigate to="/home" /> :<Register />} />
      <Route path='/chat' element={user ? <Layout1><Chat /></Layout1> : <Navigate to="/login" />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
