import {Routes, Route, BrowserRouter} from "react-router-dom"
import './App.css'
import Navbar from "./Navbar/Navbar"
import Home from './Components/Home'
import NotFound from "./Util/NotFound"
import CommentComponent from "./Components/CommentComponent"
import SuggestedRestaurantsComponent from "./Components/SuggestedRestaurantsComponent"
import ListComents from "./Components/ListComments"

function App() {

    let user = {
      id: "f542c191-bbe3-4267-b6cd-beae01f9f146",
      name: "Polina",
      surname: "Williams",
      email: "polina.williams@example.com",
      createdAt: "2024-03-14T03:56:14.158645",
      latitude: 46.417,
      longitude: 7.2133
  };
  localStorage.setItem("user", JSON.stringify(user)) ;

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/Comment/:restaurantId" element={<CommentComponent/>} />
          <Route path="/all-comments/:restaurantId" element={<ListComents/>} /> 
          <Route path="/Suggestions" element={<SuggestedRestaurantsComponent/>} /> 
          <Route path="/*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
