import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}
