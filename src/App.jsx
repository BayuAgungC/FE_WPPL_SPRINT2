import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./css/output.css";
import "./css/additional.css";
import Login from "./components/login/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/landingPage/Dashboard";
import BarangMasuk from "./components/landingPage/BarangMasuk";
import BarangKeluar from "./components/landingPage/BarangKeluar";
import ItemsList from './components/ListItems/ItemsList';
import LocationPage from "./components/landingPage/LocationPage";
import HelpPage  from './components/landingPage/HelpPage';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Sidebar />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/received' element={ <BarangMasuk />} />
            <Route path='/issued' element={<BarangKeluar />} />
            <Route path='/items' element={<ItemsList />} />
            <Route path='/LocationPage' element={<LocationPage />} />
            <Route path='/HelpPage' element={<HelpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
