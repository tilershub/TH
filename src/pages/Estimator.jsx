import React, { useState, useEffect } from 'react'
import { Calculator } from 'lucide-react'

const Estimator = () => {
  const [tileSizes, setTileSizes] = useState([])
  const [formData, setFormData] = useState({
    area: '',
    tileSize: '',
    tilePrice: '',
    skirting: '',
    laborRate: ''
  })
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadTileSizes()
  }, [])

  const loadTileSizes = async () => {
    try {
      const response = await fetch('/data/tile-sizes.json')
      const data = await response.json()
      setTileSizes(data.tileSizes || [])
    } catch (error) {
      console.error('Error loading tile sizes:', error)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const calculateEstimate = () => {
    const area = parseFloat(formData.area)
    const tilePrice = parseFloat(formData.tilePrice)
    const userSkirting = parseFloat(formData.skirting)
    const userLaborRate = parseFloat(formData.laborRate)

    const selectedTileSize = tileSizes.find(t => t.value === formData.tileSize)

    if (!area || !selectedTileSize || !tilePrice) {
      alert('Please enter valid inputs')
      return
    }

    setLoading(true)

    // Calculations based on your original logic
    const skirting = isNaN(userSkirting) || userSkirting <= 0 ? Math.ceil(area * 0.2) : userSkirting
    const useDefaultLabor = isNaN(userLaborRate) || userLaborRate <= 0

    const floorTiles = Math.ceil(area / selectedTileSize.sqft)
    const skirtingTiles = Math.ceil(skirting / selectedTileSize.skirtingCoverage)
    const totalTiles = Math.ceil((floorTiles + skirtingTiles) * 1.05)

    // Material calculations
    const cementMin = Math.ceil(8 * area / 800)
    const cementMax = Math.ceil(8 * area / 600)
    const sandMin = Math.round((area / 800) * 4) / 4
    const sandMax = Math.round((area / 600) * 4) / 4
    const cementCostMin = cementMin * 1900
    const cementCostMax = cementMax * 1900
    const sandCostMin = sandMin * 25000
    const sandCostMax = sandMax * 25000

    const adhesiveMin = Math.ceil(area / 40)
    const adhesiveMax = Math.ceil(area / 30)
    const adhesiveCostMin = adhesiveMin * 2200
    const adhesiveCostMax = adhesiveMax * 2200

    const clips = Math.ceil(area / 100)
    const grout = Math.ceil(area / 175)
    const clipsCost = clips * 1500
    const groutCost = grout * 300
    const tileCost = totalTiles * tilePrice

    // Labor calculations
    let floorLaborMin, floorLaborMax, skirtingLaborMin, skirtingLaborMax, laborMin, laborMax

    if (useDefaultLabor) {
      floorLaborMin = area * selectedTileSize.laborMin
      floorLaborMax = area * selectedTileSize.laborMax
      skirtingLaborMin = skirting * selectedTileSize.laborMin
      skirtingLaborMax = skirting * selectedTileSize.laborMax
      laborMin = floorLaborMin + skirtingLaborMin
      laborMax = floorLaborMax + skirtingLaborMax
    } else {
      floorLaborMin = floorLaborMax = area * userLaborRate
      skirtingLaborMin = skirtingLaborMax = skirting * userLaborRate
      laborMin = laborMax = floorLaborMin + skirtingLaborMin
    }

    const materialMin = tileCost + cementCostMin + sandCostMin + adhesiveCostMin + clipsCost + groutCost
    const materialMax = tileCost + cementCostMax + sandCostMax + adhesiveCostMax + clipsCost + groutCost
    const totalMin = materialMin + laborMin
    const totalMax = materialMax + laborMax

    const calculationResult = {
      projectSummary: {
        area,
        skirting,
        tileSize: formData.tileSize
      },
      floorBed: {
        cement: { min: cementMin, max: cementMax, costMin: cementCostMin, costMax: cementCostMax },
        sand: { min: sandMin, max: sandMax, costMin: sandCostMin, costMax: sandCostMax }
      },
      tiling: {
        floorTiles,
        skirtingTiles,
        totalTiles,
        tileCost,
        adhesive: { min: adhesiveMin, max: adhesiveMax, costMin: adhesiveCostMin, costMax: adhesiveCostMax },
        clips: { count: clips, cost: clipsCost },
        grout: { count: grout, cost: groutCost }
      },
      labor: {
        floor: { min: Math.round(floorLaborMin), max: Math.round(floorLaborMax) },
        skirting: { min: Math.round(skirtingLaborMin), max: Math.round(skirtingLaborMax) },
        total: { min: Math.round(laborMin), max: Math.round(laborMax) }
      },
      totals: {
        materials: { min: Math.round(materialMin), max: Math.round(materialMax) },
        labor: { min: Math.round(laborMin), max: Math.round(laborMax) },
        total: { min: Math.round(totalMin), max: Math.round(totalMax) }
      }
    }

    setReport(calculationResult)
    setLoading(false)
  }

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '800px', margin: '20px auto' }}>
      <div className="card" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0 }}>
          <Calculator size={24} />
          Tiling Estimator
        </h2>

        <div style={{ display: 'grid', gap: '16px' }}>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            placeholder="Total Area (sqft)"
            style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
          />

          <select
            name="tileSize"
            value={formData.tileSize}
            onChange={handleInputChange}
            style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
          >
            <option value="">Select Tile Size</option>
            {tileSizes.map(size => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="tilePrice"
            value={formData.tilePrice}
            onChange={handleInputChange}
            placeholder="Tile Price (LKR per tile)"
            style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
          />

          <fieldset style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}>
            <legend style={{ fontWeight: 'bold', padding: '0 8px' }}>Optional Manual Inputs</legend>
            <div style={{ display: 'grid', gap: '12px' }}>
              <input
                type="number"
                name="skirting"
                value={formData.skirting}
                onChange={handleInputChange}
                placeholder="Skirting (ft) – optional"
                style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
              />
              <input
                type="number"
                name="laborRate"
                value={formData.laborRate}
                onChange={handleInputChange}
                placeholder="Labor rate (LKR/sqft) – optional"
                style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
              />
            </div>
          </fieldset>

          <button
            onClick={calculateEstimate}
            disabled={loading}
            style={{
              padding: '12px',
              background: '#003049',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Calculating...' : 'Calculate'}
          </button>
        </div>

        {report && (
          <div style={{ 
            background: '#f8fbfc', 
            padding: '20px', 
            borderRadius: '8px', 
            marginTop: '20px' 
          }}>
            <h3>📌 Project Summary</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <tbody>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Area</th>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.projectSummary.area} sqft</td>
                </tr>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Skirting</th>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.projectSummary.skirting} ft</td>
                </tr>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Tile Size</th>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.projectSummary.tileSize}</td>
                </tr>
              </tbody>
            </table>

            <h3>🧱 Floor Bed Estimate</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Material</th>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Qty</th>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Cost (LKR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Cement (50kg)</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.floorBed.cement.min} – {report.floorBed.cement.max}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.floorBed.cement.costMin.toLocaleString()} – {report.floorBed.cement.costMax.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Sand (1 cube)</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.floorBed.sand.min} – {report.floorBed.sand.max}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.floorBed.sand.costMin.toLocaleString()} – {report.floorBed.sand.costMax.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <h3>🧱 Tiling Estimate</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Floor Tiles</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.tiling.floorTiles}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>-</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Skirting Tiles</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.tiling.skirtingTiles}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>-</td>
                </tr>
                <tr style={{ fontWeight: 'bold' }}>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Total Tiles (5% wastage)</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.tiling.totalTiles}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.tiling.tileCost.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Adhesive (25kg)</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.tiling.adhesive.min} – {report.tiling.adhesive.max}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.tiling.adhesive.costMin.toLocaleString()} – {report.tiling.adhesive.costMax.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Clips (100 pcs)</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.tiling.clips.count}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.tiling.clips.cost.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Grout (1kg)</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.tiling.grout.count}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{report.tiling.grout.cost.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <h3>👷 Labor Cost</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Type</th>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Min</th>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Max</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Floor Labor</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>LKR {report.labor.floor.min.toLocaleString()}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>LKR {report.labor.floor.max.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Skirting Labor</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>LKR {report.labor.skirting.min.toLocaleString()}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>LKR {report.labor.skirting.max.toLocaleString()}</td>
                </tr>
                <tr style={{ fontWeight: 'bold' }}>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Total Labor</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>LKR {report.labor.total.min.toLocaleString()}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>LKR {report.labor.total.max.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <h3>💰 Total Cost Estimate</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Materials</th>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>LKR {report.totals.materials.min.toLocaleString()} – {report.totals.materials.max.toLocaleString()}</td>
                </tr>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Labor</th>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>LKR {report.totals.labor.min.toLocaleString()} – {report.totals.labor.max.toLocaleString()}</td>
                </tr>
                <tr style={{ fontWeight: 'bold' }}>
                  <th style={{ border: '1px solid #ddd', padding: '10px', background: '#e6f0f8' }}>Total</th>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>LKR {report.totals.total.min.toLocaleString()} – {report.totals.total.max.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Estimator