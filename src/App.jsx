
import { Link, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";

import { ToastContainer } from 'react-toastify';

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const App = () => {
  return (
    <div>

      <nav className="bg-gray-800"> 
        <div className="container mx-auto p-3"> 
          <Link to='/'> <h2 className="text-white text-2xl  font-bold"> React CRUD </h2> </Link>
        </div> 
      </nav>

      <div className='container mx-auto p-2 h-full'>
        <Routes>
          <Route index element = { <HomePage/> }/> 
          <Route path="/create" element =  { <CreatePage/> }/>   
          <Route path="/edit/:id" element = { <EditPage/> } />
        </Routes> 
      </div>
      <ToastContainer/>


    </div>
  )
};

export default App;

// container: Makes the box neatly center itself and adjust its width based on the screen size.
// mx-auto: Centers the box horizontally (auto margins on the left and right).
// p-3: Adds padding
