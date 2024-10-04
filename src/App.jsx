
import {Link,Route, Routes } from "react-router-dom"
import NewGame from "./pages/NewGame"
import HomePage from "./pages/HomePage";
import EndGame from "./pages/EndGame";
import { HowTo } from "./pages/HowTo";
import "./App.css";


function App() {
 

  return (
    <>
      
      <Routes>
        <Route path ="/" element={<HomePage/>}/> 
        <Route path="/newgame" element={<NewGame/>}/>
        <Route path="/howto" element={<HowTo/>}/>
        <Route path="/endgame" element={<EndGame/>}/>
      </Routes>

    </>
  );
}

export default App;
