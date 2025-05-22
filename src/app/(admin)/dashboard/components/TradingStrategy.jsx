'use client'

import { useState, useEffect } from 'react'
import { Info, ChevronDown, BarChart2, Table, Trash2 } from 'lucide-react'
import { getAPI } from '@/app/api/auth/[...nextauth]/apihandler'
import { endpoints } from '@/app/api/auth/[...nextauth]/apiconfig'

const Dropdown = ({ options, value, onChange, width = 'auto', label, loading = false }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div style={{ position: 'relative', width }}>
      {label && <div style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>{label}</div>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#1a1a1a',
          color: 'white',
          border: '1px solid #2a2a2a',
          borderRadius: '4px',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          cursor: 'pointer',
          minHeight: '32px',
        }}
        disabled={loading}>
        <span>{loading ? 'Loading...' : value?.name || value || 'Select'}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && options && options.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: '#252525',
            border: '1px solid #2a2a2a',
            borderRadius: '4px',
            marginTop: '4px',
            width: '100%',
            zIndex: 10,
            maxHeight: '200px',
            overflowY: 'auto',
          }}>
          {options.map((option, index) => (
            <div
              key={option.id || option.value || index}
              onClick={() => handleSelect(option)}
              style={{
                padding: '6px 8px',
                cursor: 'pointer',
                color: 'white',
                borderBottom: '1px solid #2a2a2a',
                backgroundColor: (value?.id && option.id === value.id) || value === option ? '#3a3a3a' : 'transparent',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#3a3a3a')}
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = (value?.id && option.id === value.id) || value === option ? '#3a3a3a' : 'transparent')
              }>
              {option.name || option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const TradingStrategy = () => {
  const [selectedTrades, setSelectedTrades] = useState(3)
  const [activeTab, setActiveTab] = useState('Payoff Graph')

  // Data from API
  const [tokens, setTokens] = useState([])
  const [kinds, setKinds] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [positions, setPositions] = useState([])
  const [selectedToken, setSelectedToken] = useState(null)
  const [selectedKind, setSelectedKind] = useState(null)
  const [selectedAccount, setSelectedAccount] = useState(null)

  // Inline styles to ensure they're applied
  const styles = {
    container: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '20px',
      color: 'white',
      minHeight: '38vh',
    },
    header: {
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #2a2a2a',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    niftyPrice: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    greenText: {
      color: '#4ade80',
    },
    redText: {
      color: '#f87171',
    },
    iconButton: {
      padding: '4px',
      backgroundColor: '#252525',
      border: '1px solid #2a2a2a',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    settingsButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px',
      backgroundColor: '#252525',
      border: '1px solid #2a2a2a',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    mainContent: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    leftSection: {
      flex: '1 1 50%',
      minWidth: '300px',
      padding: '16px',
      borderRight: '1px solid #2a2a2a',
    },
    rightSection: {
      flex: '1 1 50%',
      minWidth: '300px',
      padding: '16px',
    },
    navButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px',
    },
    blueButton: {
      color: '#60a5fa',
      cursor: 'pointer',
    },
    grayText: {
      color: '#9ca3af',
    },
    tradeSelection: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
    },
    filterSection: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px',
      flexWrap: 'wrap',
    },
    tradeTable: {
      backgroundColor: '#252525',
      borderRadius: '6px',
      padding: '8px',
      marginBottom: '16px',
    },
    tableHeader: {
      display: 'grid',
      gridTemplateColumns: '0.8fr 1.5fr 1.5fr 1.2fr 0.8fr 1fr 1.2fr',
      gap: '16px', // Added gap for spacing between columns
      color: '#9ca3af',
      fontSize: '14px',
      marginBottom: '12px',
      padding: '0 8px',
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '0.8fr 1.5fr 1.5fr 1.2fr 0.8fr 1fr 1.2fr',
      gap: '16px', // Added gap for spacing between columns
      alignItems: 'center',
      marginBottom: '12px',
      padding: '4px 8px',
      borderRadius: '4px',
      transition: 'background-color 0.2s',
    },
    tableRowHover: {
      backgroundColor: '#2a2a2a',
    },
    buyBadge: {
      backgroundColor: 'rgba(37, 99, 235, 0.2)',
      color: '#60a5fa',
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'inline-block',
      textAlign: 'center',
      fontWeight: '500',
      minWidth: '28px',
    },
    sellBadge: {
      backgroundColor: 'rgba(220, 38, 38, 0.2)',
      color: '#f87171',
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'inline-block',
      textAlign: 'center',
      fontWeight: '500',
      minWidth: '28px',
    },
    dropdown: {
      backgroundColor: '#1a1a1a',
      borderRadius: '4px',
      padding: '4px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginBottom: '24px',
    },
    metricLabel: {
      color: '#9ca3af',
      fontSize: '14px',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
    },
    metricValue: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    tabButtons: {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px',
    },
    activeTab: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    inactiveTab: {
      backgroundColor: '#252525',
      color: '#d1d5db',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    tabContent: {
      height: '192px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#252525',
      borderRadius: '6px',
    },
    button: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    },
    resetButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      color: '#60a5fa',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
    },
    strikeInput: {
      backgroundColor: '#1a1a1a',
      color: 'white',
      border: '1px solid #2a2a2a',
      borderRadius: '4px',
      padding: '4px 8px',
      width: '70px',
      textAlign: 'center',
    },
    strikeButton: {
      backgroundColor: '#1a1a1a',
      color: 'white',
      border: '1px solid #2a2a2a',
      borderRadius: '4px',
      padding: '4px 8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30px',
    },
    actionsCell: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '8px',
    },
  }

  async function fetchUserProfile() {
    try {
      if (!selectedAccount || !selectedToken || !selectedKind) {
        setPositions([]) // clear positions if filters incomplete
        return
      }

      // Build query string from selected options
      const params = new URLSearchParams()
      params.append('Trade_Account', selectedAccount.id || selectedAccount.name || selectedAccount)
      params.append('currency', selectedToken.symbol || selectedToken.id || selectedToken)
      params.append('kind', selectedKind.id || selectedKind.name || selectedKind)

      const url = `${endpoints.getPositions}?${params.toString()}`
      const data = await getAPI(url)
      console.log('User profile (positions):', data)

      setPositions(data.openPositions || [])
      setError(null)
    } catch (error) {
      console.error('Failed to fetch user profile', error)
      setError(error.message || 'Failed to fetch positions')
      setPositions([])
    }
  }

  async function fetchAll() {
    try {
      setLoading(true)
      setError(null)

      const [tokensData, kindsData, accountsData] = await Promise.all([
        getAPI(endpoints.getStaticTokens),
        getAPI(endpoints.getStaticKinds),
        getAPI(endpoints.getAccountsList),
      ])

      if (!tokensData || (Array.isArray(tokensData) && tokensData.length === 0)) {
        throw new Error('No tokens data found')
      }
      if (!kindsData || (Array.isArray(kindsData) && kindsData.length === 0)) {
        throw new Error('No kinds data found')
      }
      if (!accountsData || (Array.isArray(accountsData) && accountsData.length === 0)) {
        throw new Error('No accounts data found')
      }

      setTokens(tokensData)
      setKinds(kindsData)
      setAccounts(accountsData)
    } catch (err) {
      setError(err.message || 'Failed to fetch data')
      console.error('Error fetching initial data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handle dropdown changes
  const handleTokenChange = (token) => {
    setSelectedToken(token)
    console.log('Selected token:', token)
  }

  const handleKindChange = (kind) => {
    setSelectedKind(kind)
    console.log('Selected kind:', kind)
    // You can add additional logic here to update other data based on selection
  }

  const handleAccountChange = (account) => {
    setSelectedAccount(account)
    console.log('Selected account:', account)
    // You can add additional logic here to update other data based on selection
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchAll()
  }, [])

  // Fetch positions whenever any of the selected filters change
  useEffect(() => {
    fetchUserProfile()
  }, [selectedToken, selectedKind, selectedAccount])

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        {/* Left section */}
        <div style={styles.leftSection}>
          <div style={styles.navButtons}>
            <div style={{ display: 'flex', gap: '16px' }}>
              {/* <button style={{ ...styles.blueButton, borderBottom: "2px solid #60a5fa", paddingBottom: "4px" }}>
                New Strategy
              </button>
              <button style={styles.grayText}>Insights</button> */}
            </div>
            <button style={{ ...styles.button, backgroundColor: '#3b82f6' }}>Clear New Trades</button>
          </div>

          {/* Filter dropdowns */}
          <div style={styles.filterSection}>
            <Dropdown options={tokens} value={selectedToken} onChange={handleTokenChange} width="150px" label="Token" loading={loading} />
            <Dropdown options={kinds} value={selectedKind} onChange={handleKindChange} width="150px" label="Kind" loading={loading} />
            <Dropdown options={accounts} value={selectedAccount} onChange={handleAccountChange} width="150px" label="Account" loading={loading} />
          </div>

          {/* Display selected data */}
          {error && (
            <div
              style={{
                color: '#f87171',
                marginBottom: '16px',
                padding: '8px',
                backgroundColor: '#7f1d1d',
                borderRadius: '4px',
              }}>
              Error: {error}
            </div>
          )}

          {loading && <div>Loading...</div>}
          {!loading && positions.length === 0 && <div style={styles.tradeTable}>No positions found</div>}
          {positions.length > 0 && (
            <div style={styles.tradeTable}>
              <div style={styles.tableHeader}>
                <div>B/S</div>
                <div>Expiry</div>
                <div>Strike</div>
                <div>Type</div>
                <div>Lots</div>
                <div>Price</div>
                <div style={styles.actionsCell}>Actions</div>
              </div>

              {positions.map((pos, index) => (
                <div
                  key={index}
                  style={styles.tableRow}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2a2a2a'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px', marginRight: '8px' }} checked readOnly />
                    <span style={pos.size > 0 ? styles.buyBadge : styles.sellBadge}>{pos.size > 0 ? 'B' : 'S'}</span>
                  </div>
                  <div>
                    <div style={styles.dropdown}>
                      <span>{pos.expiry}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button style={styles.strikeButton}>—</button>
                    <input type="text" value={pos.strike} style={styles.strikeInput} readOnly />
                    <button style={styles.strikeButton}>+</button>
                  </div>
                  <div>
                    <div style={styles.dropdown}>
                      <span>{pos.option_type ? (pos.option_type.toUpperCase() === 'CALL' ? 'CE' : 'PE') : 'FUTURE'}</span>
                    </div>
                  </div>
                  <div>
                    <div style={styles.dropdown}>
                      <span>{Math.abs(pos.size)}</span>
                    </div>
                  </div>
                  <div>
                    <div style={styles.dropdown}>
                      <span>{pos.index_price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div style={styles.actionsCell}>
                    <button style={styles.iconButton}>
                      <Table size={14} />
                    </button>
                    <button style={styles.iconButton}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Multiplier</span>
              <div style={{ ...styles.dropdown, width: "64px" }}>
                <span>1</span>
                <ChevronDown size={14} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Price Pay</span>
              <span>49.25</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Premium Pay</span>
              <span>3,694</span>
            </div>
          </div> */}

          {/* Display selected filter information */}
          {!loading && selectedToken && selectedKind && selectedAccount && (
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#252525', borderRadius: '6px' }}>
              <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Selected Filters:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', rowGap: '4px' }}>
                <div>Token:</div>
                <div>{selectedToken.name || selectedToken.symbol || JSON.stringify(selectedToken)}</div>

                <div>Kind:</div>
                <div>{selectedKind.name || JSON.stringify(selectedKind)}</div>

                <div>Account:</div>
                <div>{selectedAccount.name || selectedAccount.id || JSON.stringify(selectedAccount)}</div>
              </div>
            </div>
          )}
        </div>

        {/* Right section */}
        {/* <div style={styles.rightSection}>
          <div style={styles.metricsGrid}>
            <div>
              <div style={styles.metricLabel}>Max Profit</div>
              <div style={styles.greenText}>+11,306</div>
            </div>
            <div>
              <div style={styles.metricLabel}>
                Max Loss <Info size={14} style={{ marginLeft: "4px" }} />
              </div>
              <div style={styles.redText}>-3,694</div>
            </div>
            <div>
              <div style={styles.metricLabel}>
                Risk / Reward <Info size={14} style={{ marginLeft: "4px" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>1/x</span>
                <span>0.33</span>
              </div>
            </div>
          </div>

          <div style={styles.metricsGrid}>
            <div>
              <div style={styles.metricLabel}>Breakeven</div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <button
                  style={{
                    backgroundColor: "#252525",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    border: "1px solid #3a3a3a",
                    cursor: "pointer",
                  }}
                >
                  Target
                </button>
                <button
                  style={{
                    backgroundColor: "#1a1a1a",
                    color: "#9ca3af",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Expiry
                </button>
              </div>
              <div>24699 (-0.7%)</div>
            </div>
            <div>
              <div style={styles.metricLabel}>
                POP <Info size={14} style={{ marginLeft: "4px" }} />
              </div>
              <div>78%</div>
            </div>
            <div>
              <div style={styles.metricLabel}>
                Time Value <Info size={14} style={{ marginLeft: "4px" }} />
              </div>
              <div style={styles.redText}>-11306.25</div>
            </div>
          </div>

          <div style={styles.metricsGrid}>
            <div>
              <div style={styles.metricLabel}>
                Intrinsic Value <Info size={14} style={{ marginLeft: "4px" }} />
              </div>
              <div style={styles.greenText}>15000.00</div>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <div style={styles.metricLabel}>Funds & Margins</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>Standalone Funds</span>
                <span>—</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Standalone Margin</span>
                <span>—</span>
              </div>
            </div>
          </div>

          <div>
            <div style={styles.tabButtons}>
              <button
                style={activeTab === "Payoff Graph" ? styles.activeTab : styles.inactiveTab}
                onClick={() => setActiveTab("Payoff Graph")}
              >
                Payoff Graph
              </button>
              <button
                style={activeTab === "P&L Table" ? styles.activeTab : styles.inactiveTab}
                onClick={() => setActiveTab("P&L Table")}
              >
                P&L Table
              </button>
              <button
                style={activeTab === "Greeks" ? styles.activeTab : styles.inactiveTab}
                onClick={() => setActiveTab("Greeks")}
              >
                Greeks
              </button>
              <button
                style={activeTab === "Strategy Chart" ? styles.activeTab : styles.inactiveTab}
                onClick={() => setActiveTab("Strategy Chart")}
              >
                Strategy Chart
              </button>
            </div>

            <div style={{ borderBottom: "1px solid #2a2a2a", marginBottom: "16px" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <button style={{ ...styles.blueButton, borderBottom: "2px solid #60a5fa", paddingBottom: "8px" }}>
                  Payoff Graph
                </button>
                <button style={{ ...styles.grayText, paddingBottom: "8px" }}>Payoff Table</button>
              </div>
            </div>

            <div style={styles.tabContent}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#9ca3af" }}>
                <BarChart2 size={48} style={{ marginBottom: "8px" }} />
                <span>Payoff graph will appear here</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default TradingStrategy
