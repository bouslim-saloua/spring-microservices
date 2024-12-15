import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCar from './components/car-components/AddCar';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarList from "./components/car-components/CarList";
import ClientList from "./components/client-components/ClientList";
import AddClient from "./components/client-components/AddClient";
import Footer from "./components/Footer";

function App() {
  return (
      <div>
        <Router>
          <Routes>
              <Route path="/add-car" element={<AddCar />} />
              <Route path="/" element={<CarList />} />
              <Route path="/client-list" element={<ClientList />} />
              <Route path="/add-client" element={<AddClient />} />
          </Routes>
      </Router>
      <Footer/>
      </div>
  );
}
export default App;
