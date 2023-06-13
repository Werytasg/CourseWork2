import HeapVisualization from './comp/minHeap';
import './App.css';
import Header from './comp/header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './comp/footer';
import Home from './comp/home';



function App() {
  return (
    <div>
         <BrowserRouter>
         <Header/>
         <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/minHeap" element={<HeapVisualization/>}/>
         </Routes>
         <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;