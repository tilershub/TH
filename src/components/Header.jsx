import React from 'react'
import { MapPin, Bell, Search, SlidersHorizontal } from 'lucide-react'

const Header = () => {
  return (
    <header className="mobile-header" role="banner">
      <div className="container">

        {/* Location + notifications */}
        <div className="header-top">
          <div className="loc">
            <MapPin size={18} />
            <div className="loc-text">
              <span className="muted">Current Location</span>
              <strong>Colombo, Sri Lanka</strong>
            </div>
          </div>

          <button className="bell" aria-label="Notifications">
            <Bell size={20} />
            <span className="badge">3</span>
          </button>
        </div>

        {/* Rounded search */}
        <form className="searchbar" role="search" onSubmit={(e)=>e.preventDefault()}>
          <div className="search-left">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search tilers, services, or location..."
              aria-label="Search tilers, services, or location"
            />
          </div>
          <button type="button" className="filter-btn" aria-label="Filters">
            <SlidersHorizontal size={18} />
          </button>
        </form>

      </div>
    </header>
  )
}

export default Header