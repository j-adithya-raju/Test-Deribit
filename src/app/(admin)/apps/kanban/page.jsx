'use client'

import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { getAPI } from '@/app/api/auth/[...nextauth]/apihandler'
import { endpoints } from '@/app/api/auth/[...nextauth]/apiconfig'

const KanbanBoard = () => {
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState('')
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('future') // Changed to singular to match API

  // Fetch accounts list on component mount
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true)
      try {
        const response = await getAPI(endpoints.getAccountsList)
        console.log('Accounts response:', response)

        if (response && Array.isArray(response) && response.length > 0) {
          setAccounts(response)
          // Since response is array of strings, select first string directly
          setSelectedAccount(response[0])
          console.log(`Selected account: ${response[0]}`)
        } else {
          console.warn('No accounts found or invalid response format', response)
          setError('No trading accounts found')
        }
      } catch (error) {
        console.error('Error fetching accounts:', error)
        setError('Failed to load trading accounts')
      } finally {
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  // Fetch positions when selected account changes or active tab changes
  useEffect(() => {
    const fetchPositions = async () => {
      if (!selectedAccount) return

      setLoading(true)
      setError(null)

      // Use activeTab directly as the filter value
      // The API expects "future" (singular), "put", or "call"
      const filter = activeTab

      try {
        console.log(`Fetching positions for account: ${selectedAccount} with filter: ${filter}`)
        // Updated parameter name to match API (tradeAccount instead of Trade_Account)
        const response = await getAPI(`${endpoints.getFilter}?tradeAccount=${selectedAccount}&filter=${filter}`)
        console.log('Positions response:', response)

        if (response) {
          const positionsArray = Array.isArray(response) ? response : [response]
          setPositions(positionsArray)

          if (positionsArray.length === 0) {
            console.log(`No ${filter} positions found for this account`)
          }
        } else {
          setPositions([])
          setError(null) // Clear any previous errors
        }
      } catch (error) {
        console.error(`Error fetching ${filter} positions:`, error)

        // Don't show error for "no orders found" 404 responses
        if (error.status === 404 || (error.message && error.message.toLowerCase().includes('no orders found'))) {
          setPositions([])
          setError(null) // Clear any previous errors
          console.log('No positions found for the selected filter')
        } else {
          setPositions([])
          setError(`Failed to load positions: ${error.message}`)
        }
      } finally {
        setLoading(false)
      }
    }

    if (selectedAccount) {
      fetchPositions()
    }
  }, [selectedAccount, activeTab])

  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value)
  }

  const handleRefresh = async () => {
    if (selectedAccount) {
      try {
        setLoading(true)
        setError(null)

        // Use activeTab directly as the filter value
        const filter = activeTab

        // Updated parameter name to match API
        const response = await getAPI(`${endpoints.getFilter}?tradeAccount=${selectedAccount}&filter=${filter}`)
        const positionsArray = Array.isArray(response) ? response : [response]
        setPositions(positionsArray)
      } catch (error) {
        console.error('Error refreshing positions:', error)

        // Don't show error for "no orders found" 404 responses
        if (error.status === 404 || (error.message && error.message.toLowerCase().includes('no orders found'))) {
          setPositions([])
          setError(null) // Clear any previous errors
          console.log('No positions found for the selected filter')
        } else {
          setError(`Failed to refresh positions: ${error.message}`)
        }
      } finally {
        setLoading(false)
      }
    }
  }

  // Calculate total P&L for positions
  const calculateTotalPL = (positionsArray) => {
    return positionsArray.reduce((sum, position) => sum + (position.floating_profit_loss || 0), 0).toFixed(8)
  }

  const calculateTotalPLUSD = (positionsArray) => {
    return positionsArray.reduce((sum, position) => sum + (position.floating_profit_loss_usd || 0), 0).toFixed(2)
  }

  const totalPL = calculateTotalPL(positions)
  const totalPLUSD = calculateTotalPLUSD(positions)

  // Styles
  const styles = {
    container: {
      backgroundColor: '#121212',
      color: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
      padding: '16px 20px',
      backgroundColor: '#1e1e1e',
      borderBottom: '1px solid #333333',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: '18px',
      fontWeight: '500',
      margin: '0',
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    accountSelect: {
      backgroundColor: '#252525',
      color: '#ffffff',
      border: '1px solid #333333',
      borderRadius: '4px',
      padding: '8px 12px',
      fontSize: '14px',
      minWidth: '200px',
      appearance: 'none',
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center',
      backgroundSize: '16px',
      cursor: 'pointer',
    },
    refreshButton: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      border: '1px solid #333333',
      borderRadius: '4px',
      padding: '8px 16px',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background-color 0.2s',
    },
    refreshButtonHover: {
      backgroundColor: '#2a2a2a',
    },
    refreshButtonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
    },
    body: {
      padding: '20px',
    },
    tabsContainer: {
      display: 'flex',
      borderBottom: '1px solid #333333',
      marginBottom: '20px',
    },
    tab: {
      padding: '12px 20px',
      fontSize: '14px',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      color: '#a0a0a0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },
    tabHover: {
      color: '#ffffff',
    },
    activeTab: {
      color: '#ffffff',
      borderBottomColor: '#4a6cf7',
    },
    tabBadge: {
      backgroundColor: '#252525',
      color: '#ffffff',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '12px',
    },
    positiveBadge: {
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      color: '#22c55e',
    },
    negativeBadge: {
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      color: '#ef4444',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 0',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      borderTopColor: '#4a6cf7',
      animation: 'spin 1s linear infinite',
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 0',
      color: '#a0a0a0',
      fontSize: '15px',
    },
    errorMessage: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      padding: '12px 16px',
      borderRadius: '4px',
      marginBottom: '20px',
    },
    tableContainer: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
    },
    th: {
      textAlign: 'left',
      padding: '12px 16px',
      fontWeight: '500',
      fontSize: '13px',
      color: '#a0a0a0',
      borderBottom: '1px solid #333333',
      whiteSpace: 'nowrap',
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid #333333',
      fontSize: '14px',
      whiteSpace: 'nowrap',
    },
    trHover: {
      backgroundColor: '#2a2a2a',
    },
    checkboxWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkbox: {
      width: '16px',
      height: '16px',
      accentColor: '#4a6cf7',
      cursor: 'pointer',
    },
    instrumentCell: {
      display: 'flex',
      flexDirection: 'column',
    },
    instrumentName: {
      fontWeight: '500',
    },
    instrumentId: {
      fontSize: '12px',
      color: '#a0a0a0',
      marginTop: '4px',
    },
    directionBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
      textTransform: 'capitalize',
    },
    buyBadge: {
      backgroundColor: 'rgba(74, 108, 247, 0.2)',
      color: '#4a6cf7',
    },
    sellBadge: {
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      color: '#ef4444',
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
      textTransform: 'capitalize',
    },
    openBadge: {
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      color: '#22c55e',
    },
    plCell: {
      display: 'flex',
      flexDirection: 'column',
    },
    plValue: {
      fontWeight: '500',
    },
    plUsd: {
      fontSize: '12px',
      marginTop: '4px',
    },
    positive: {
      color: '#22c55e',
    },
    negative: {
      color: '#ef4444',
    },
    actionButton: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      border: '1px solid #333333',
      borderRadius: '4px',
      padding: '6px 12px',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    actionButtonHover: {
      backgroundColor: '#4a6cf7',
      borderColor: '#4a6cf7',
    },
    footer: {
      padding: '12px 20px',
      backgroundColor: '#1e1e1e',
      borderTop: '1px solid #333333',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '13px',
      color: '#a0a0a0',
    },
    spinningIcon: {
      animation: 'spin 1s linear infinite',
    },
    '@keyframes spin': {
      to: {
        transform: 'rotate(360deg)',
      },
    },
  }

  // Render position table
  const renderPositionTable = () => {
    if (positions.length === 0) {
      return <div style={styles.emptyState}>No positions found in this category</div>
    }

    return (
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {/* <th style={styles.th}>
                <div style={styles.checkboxWrapper}>
                  <input type="checkbox" style={styles.checkbox} />
                </div>
              </th> */}
              <th style={styles.th}>Instrument</th>
              <th style={styles.th}>Currency</th>
              <th style={styles.th}>Expiry</th>
              <th style={styles.th}>Strike</th>
              <th style={styles.th}>Direction</th>
              <th style={styles.th}>Size</th>
              <th style={styles.th}>Index Price</th>
              <th style={styles.th}>Mark Price</th>
              <th style={styles.th}>P&L</th>
              <th style={styles.th}>Status</th>
              {/* <th style={styles.th}>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => {
              const isProfitable = position.floating_profit_loss >= 0
              return (
                <tr
                  key={index}
                  style={styles.tr}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2a2a2a')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  {/* <td style={styles.td}>
                    <div style={styles.checkboxWrapper}>
                      <input type="checkbox" style={styles.checkbox} />
                    </div>
                  </td> */}
                  <td style={styles.td}>
                    <div style={styles.instrumentCell}>
                      <div style={styles.instrumentName}>{position.instrument_name}</div>
                      <div style={styles.instrumentId}>#{position.id}</div>
                    </div>
                  </td>
                  <td style={styles.td}>{position.currency}</td>
                  <td style={styles.td}>{position.expiry}</td>
                  <td style={styles.td}>{position.strike || '-'}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.directionBadge,
                        ...(position.direction === 'buy' ? styles.buyBadge : styles.sellBadge),
                      }}>
                      {position.direction}
                    </span>
                  </td>
                  <td
                    style={{
                      ...styles.td,
                      ...(position.size < 0 ? styles.negative : styles.positive),
                    }}>
                    {position.size}
                  </td>
                  <td style={styles.td}>{position.index_price?.toLocaleString()}</td>
                  <td style={styles.td}>{position.mark_price?.toLocaleString()}</td>
                  <td
                    style={{
                      ...styles.td,
                      ...(isProfitable ? styles.positive : styles.negative),
                    }}>
                    <div style={styles.plCell}>
                      <div style={styles.plValue}>{position.floating_profit_loss?.toFixed(8)}</div>
                      <div style={styles.plUsd}>{position.floating_profit_loss_usd ? `$${position.floating_profit_loss_usd?.toFixed(2)}` : '-'}</div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        ...styles.openBadge,
                      }}>
                      {position.status}
                    </span>
                  </td>
                  {/* <td style={styles.td}>
                    <button
                      style={styles.actionButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#4a6cf7"
                        e.currentTarget.style.borderColor = "#4a6cf7"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                        e.currentTarget.style.borderColor = "#333333"
                      }}
                    >
                      Details
                    </button>
                  </td> */}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4" style={{ color: '#ffffff' }}>
        Futures
      </h1>
      <Row>
        <Col xs={12}>
          <div style={styles.container}>
            <div style={styles.header}>
              <h2 style={styles.title}>Trading Positions</h2>
              <div style={styles.headerActions}>
                <select style={styles.accountSelect} value={selectedAccount} onChange={handleAccountChange}>
                  {accounts.map((account, idx) => (
                    <option key={idx} value={account}>
                      {account}
                    </option>
                  ))}
                </select>
                <button
                  style={{
                    ...styles.refreshButton,
                    ...(loading ? styles.refreshButtonDisabled : {}),
                  }}
                  onClick={handleRefresh}
                  disabled={loading}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#2a2a2a')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  {loading ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                      </svg>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Refresh</span>
                  )}
                </button>
              </div>
            </div>

            <div style={styles.body}>
              {/* {error && <div style={styles.errorMessage}>{error}</div>} */}

              <div style={styles.tabsContainer}>
                <div
                  style={{
                    ...styles.tab,
                    ...(activeTab === 'future' ? styles.activeTab : {}),
                  }}
                  onClick={() => setActiveTab('future')}
                  onMouseEnter={(e) => activeTab !== 'future' && (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => activeTab !== 'future' && (e.currentTarget.style.color = '#a0a0a0')}>
                  Futures
                  {positions.length > 0 && activeTab === 'future' && (
                    <span
                      style={{
                        ...styles.tabBadge,
                        ...(Number(totalPL) >= 0 ? styles.positiveBadge : styles.negativeBadge),
                      }}>
                      {positions.length}
                      {Number(totalPL) !== 0 && (
                        <span>
                          {' '}
                          ({Number(totalPL) >= 0 ? '+' : ''}
                          {totalPL})
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    ...styles.tab,
                    ...(activeTab === 'put' ? styles.activeTab : {}),
                  }}
                  onClick={() => setActiveTab('put')}
                  onMouseEnter={(e) => activeTab !== 'put' && (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => activeTab !== 'put' && (e.currentTarget.style.color = '#a0a0a0')}>
                  Put Options
                  {positions.length > 0 && activeTab === 'put' && (
                    <span
                      style={{
                        ...styles.tabBadge,
                        ...(Number(totalPL) >= 0 ? styles.positiveBadge : styles.negativeBadge),
                      }}>
                      {positions.length}
                      {Number(totalPL) !== 0 && (
                        <span>
                          {' '}
                          ({Number(totalPL) >= 0 ? '+' : ''}
                          {totalPL})
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    ...styles.tab,
                    ...(activeTab === 'call' ? styles.activeTab : {}),
                  }}
                  onClick={() => setActiveTab('call')}
                  onMouseEnter={(e) => activeTab !== 'call' && (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => activeTab !== 'call' && (e.currentTarget.style.color = '#a0a0a0')}>
                  Call Options
                  {positions.length > 0 && activeTab === 'call' && (
                    <span
                      style={{
                        ...styles.tabBadge,
                        ...(Number(totalPL) >= 0 ? styles.positiveBadge : styles.negativeBadge),
                      }}>
                      {positions.length}
                      {Number(totalPL) !== 0 && (
                        <span>
                          {' '}
                          ({Number(totalPL) >= 0 ? '+' : ''}
                          {totalPL})
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>

              {loading ? (
                <div style={styles.loadingContainer}>
                  <div style={styles.spinner}></div>
                </div>
              ) : (
                renderPositionTable()
              )}
            </div>

            <div style={styles.footer}>
              <div>Total Positions: {positions.length}</div>
              <div>Last updated: {new Date().toLocaleTimeString()}</div>
            </div>
          </div>

          <style jsx global>{`
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </Col>
      </Row>
    </>
  )
}

export default KanbanBoard
