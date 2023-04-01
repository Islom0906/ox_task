import {Home, Login} from "./Pages";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function App() {
const navigate=useNavigate()
  useEffect(()=>{
    const token=localStorage.getItem('jwt')
    if(token){
      navigate('/')
    }else{
      navigate('/login')
    }
  },[])

  return (
    <>
    <main>
    <Routes>
      <Route path={'/'} element={<Home/>}/>
      <Route path={'/login'} element={<Login/>}/>
    </Routes>
    </main>
    </>
  );
}

export default App;
