import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { TilersPage, TilerProfile, AdminPanel } from './pages/MissingPages'
import Estimator from './pages/Estimator'
import { About, Contact, PrivacyPolicy, Terms, Disclaimer } from './pages/BasicPages'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tilers" element={<TilersPage />} />
            <Route path="/tilers/tiler/:id" element={<TilerProfile />} />
            <Route path="/estimator" element={<Estimator />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App