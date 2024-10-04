
import {Link,Route, Routes } from "react-router-dom"
import NewGame from "./pages/NewGame"

import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
 

  return (
    <>
      
      <Routes>
        <Route path ="/" element={<HomePage/>}/> 
        <Route path="/newgame" element={<NewGame/>}/>
    
      </Routes>

    </>
  );
}

export default App;
