"use client"

import { useState, useEffect } from "react"
import { Button, Card, CardBody, Col, Row } from "react-bootstrap"
import PageTitle from "@/components/PageTitle"
import { getAPI } from "@/app/api/auth/[...nextauth]/apihandler"
import { endpoints } from "@/app/api/auth/[...nextauth]/apiconfig"

const ClosedPositions = ({ params }) => {
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState("")
  const [closedPositions, setClosedPositions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch accounts list on component mount
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true)
      try {
        const response = await getAPI(endpoints.getAccountsList)
        console.log("Accounts response:", response)

        if (response && Array.isArray(response) && response.length > 0) {
          setAccounts(response)
          // Since response is array of strings, select first string directly
          setSelectedAccount(response[0])
          console.log(`Selected account: ${response[0]}`)
        } else {
          console.warn("No accounts found or invalid response format", response)
          setError("No trading accounts found")
        }
      } catch (error) {
        console.error("Error fetching accounts:", error)
        setError("Failed to load trading accounts")
      } finally {
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  // Fetch closed positions when selected account changes
  useEffect(() => {
    const fetchClosedPositions = async () => {
      if (!selectedAccount) return

      setLoading(true)
      setError(null)
      try {
        console.log(`Fetching closed positions for account: ${selectedAccount}`)
        // Use the closedpositionsAttachment endpoint
        const response = await getAPI(`${endpoints.getClosedPositions}?Trade_Account=${selectedAccount}`)
        console.log("Closed positions response:", response)

        if (response) {
          const positionsArray = Array.isArray(response) ? response : [response]
          setClosedPositions(positionsArray)

          if (positionsArray.length === 0) {
            console.log("No closed positions found for this account")
          }
        } else {
          setClosedPositions([])
          setError("No positions data received")
        }
      } catch (error) {
        console.error("Error fetching closed positions:", error)
        setClosedPositions([])
        setError(`Failed to load positions: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    if (selectedAccount) {
      fetchClosedPositions()
    }
  }, [selectedAccount])

  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value)
  }

  const handleRefresh = async () => {
    if (selectedAccount) {
      try {
        setLoading(true)
        setError(null)
        const response = await getAPI(`${endpoints.getClosedPositions}?Trade_Account=${selectedAccount}`)
        const positionsArray = Array.isArray(response) ? response : [response]
        setClosedPositions(positionsArray)
      } catch (error) {
        console.error("Error refreshing positions:", error)
        setError(`Failed to refresh positions: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }
  }

  // Calculate total P&L with null checks
  const totalPL = closedPositions.reduce((sum, position) => sum + (position.total_profit_loss || 0), 0).toFixed(8)
  const totalPLUSD = closedPositions
    .reduce((sum, position) => sum + (position.total_profit_loss_usd || 0), 0)
    .toFixed(2)
  const isPLPositive = Number.parseFloat(totalPL) >= 0

  // Inline styles
  const styles = {
    container: {
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
      padding: "20px",
    },
    card: {
      backgroundColor: "#111",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      overflow: "hidden",
    },
    cardBody: {
      padding: "24px",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    title: {
      fontSize: "20px",
      fontWeight: "500",
      margin: "0",
    },
    positionCount: {
      backgroundColor: "#333",
      color: "#fff",
      fontSize: "13px",
      padding: "4px 12px",
      borderRadius: "20px",
      marginLeft: "12px",
    },
    plSection: {
      display: "flex",
      alignItems: "center",
      marginBottom: "24px",
    },
    plLabel: {
      color: "#888",
      fontSize: "14px",
      marginRight: "8px",
    },
    plValue: {
      fontSize: "14px",
      fontWeight: "500",
      color: isPLPositive ? "#22c55e" : "#ef4444",
    },
    usdValue: {
      color: "#888",
      marginLeft: "4px",
    },
    controlsSection: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "24px",
    },
    accountSelect: {
      backgroundColor: "#222",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      width: "300px",
      outline: "none",
    },
    refreshButton: {
      backgroundColor: "transparent",
      color: "#fff",
      border: "1px solid #333",
      padding: "8px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    refreshIcon: {
      marginRight: "8px",
    },
    tableContainer: {
      backgroundColor: "#111",
      borderRadius: "8px",
      overflow: "hidden",
    },
    tableHeader: {
      backgroundColor: "#222",
      padding: "12px 16px",
      borderBottom: "1px solid #333",
    },
    tableHeaderRow: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr",
      gap: "8px",
    },
    tableHeaderCell: {
      color: "#888",
      fontSize: "13px",
      fontWeight: "normal",
      textAlign: "left",
    },
    tableBody: {
      display: "flex",
      flexDirection: "column",
    },
    tableRow: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr",
      gap: "8px",
      padding: "16px",
      borderBottom: "1px solid #222",
      transition: "background-color 0.2s",
    },
    tableRowHover: {
      backgroundColor: "#1a1a1a",
    },
    tableCell: {
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
    },
    instrumentCell: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    instrumentName: {
      fontWeight: "500",
    },
    instrumentId: {
      color: "#888",
      fontSize: "12px",
      marginTop: "4px",
    },
    currencyCell: {
      display: "flex",
      alignItems: "center",
    },
    pill: {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "500",
      textAlign: "center",
    },
    putPill: {
      backgroundColor: "rgba(6, 182, 212, 0.2)",
      color: "#06b6d4",
    },
    callPill: {
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      color: "#3b82f6",
    },
    sellPill: {
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      color: "#ef4444",
    },
    buyPill: {
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      color: "#22c55e",
    },
    closedPill: {
      backgroundColor: "rgba(245, 158, 11, 0.2)",
      color: "#f59e0b",
    },
    sizeNegative: {
      color: "#ef4444",
    },
    sizePositive: {
      color: "#22c55e",
    },
    plCell: {
      display: "flex",
      flexDirection: "column",
    },
    plCrypto: {
      fontWeight: "500",
    },
    plFiat: {
      fontSize: "12px",
      marginTop: "4px",
    },
    positive: {
      color: "#22c55e",
    },
    negative: {
      color: "#ef4444",
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 0",
    },
    spinner: {
      width: "24px",
      height: "24px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      borderTop: "2px solid #fff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    emptyMessage: {
      padding: "40px 0",
      textAlign: "center",
      color: "#888",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "24px",
    },
    exportButton: {
      backgroundColor: "#333",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
    },
    printButton: {
      backgroundColor: "#222",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
    },
  }

  if (loading && accounts.length === 0) {
    return (
      <div style={styles.container}>
        <PageTitle title="Closed Positions" />
        <Row>
          <Col xs={12}>
            <Card style={styles.card}>
              <CardBody style={styles.cardBody}>
                <div style={styles.loadingContainer}>
                  <div
                    style={{
                      ...styles.spinner,
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  if (error && accounts.length === 0) {
    return (
      <div style={styles.container}>
        <PageTitle title="Closed Positions" />
        <Row>
          <Col xs={12}>
            <Card style={styles.card}>
              <CardBody style={styles.cardBody}>
                <div
                  style={{
                    color: "#ef4444",
                    padding: "16px",
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    borderRadius: "4px",
                  }}
                >
                  {error}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <>
      <PageTitle title="Closed Positions" />
      <Row>
        <Col xs={12}>
          <Card style={styles.card}>
            <CardBody style={styles.cardBody}>
              <div className="clearfix">
                <div style={styles.header}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h4 style={styles.title}>Closed Positions</h4>
                    <div style={styles.positionCount}>{closedPositions.length} Positions</div>
                  </div>
                </div>
              </div>

              <Row>
                <Col sm={6}>
                  <div style={styles.plSection}>
                    <div style={styles.plLabel}>Total P&L:</div>
                    <div style={styles.plValue}>
                      {isPLPositive ? "↑" : "↓"} {totalPL} <span style={styles.usdValue}>({totalPLUSD} USD)</span>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <select style={styles.accountSelect} value={selectedAccount} onChange={handleAccountChange}>
                      {accounts.map((account, idx) => (
                        <option key={idx} value={account}>
                          {account}
                        </option>
                      ))}
                    </select>

                    <button
                      style={{ ...styles.refreshButton, marginLeft: "12px" }}
                      onClick={handleRefresh}
                      disabled={loading}
                    >
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
                        style={{
                          ...styles.refreshIcon,
                          animation: loading ? "spin 1s linear infinite" : "none",
                        }}
                      >
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                      </svg>
                      <span>{loading ? "Refreshing..." : "Refresh"}</span>
                    </button>
                  </div>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col xs={12}>
                  <div className="table-responsive" style={styles.tableContainer}>
                    <div style={styles.tableHeader}>
                      <div style={styles.tableHeaderRow}>
                        <div style={styles.tableHeaderCell}>Instrument</div>
                        <div style={styles.tableHeaderCell}>Currency</div>
                        <div style={styles.tableHeaderCell}>Expiry</div>
                        <div style={styles.tableHeaderCell}>Strike</div>
                        <div style={styles.tableHeaderCell}>Type</div>
                        <div style={styles.tableHeaderCell}>Direction</div>
                        <div style={styles.tableHeaderCell}>Size</div>
                        <div style={styles.tableHeaderCell}>Close Price</div>
                        <div style={styles.tableHeaderCell}>Total P&L</div>
                      </div>
                    </div>

                    {loading && selectedAccount ? (
                      <div style={styles.loadingContainer}>
                        <div
                          style={{
                            ...styles.spinner,
                            animation: "spin 1s linear infinite",
                          }}
                        ></div>
                      </div>
                    ) : closedPositions.length === 0 ? (
                      <div style={styles.emptyMessage}>No closed positions found</div>
                    ) : (
                      <div style={styles.tableBody}>
                        {closedPositions.map((position, idx) => {
                          const isProfitable = position.total_profit_loss >= 0
                          return (
                            <div
                              style={styles.tableRow}
                              key={idx}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#1a1a1a"
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent"
                              }}
                            >
                              <div style={styles.tableCell}>
                                <div style={styles.instrumentCell}>
                                  <div style={styles.instrumentName}>{position.instrument_name}</div>
                                  <div style={styles.instrumentId}>#{position.id}</div>
                                </div>
                              </div>
                              <div style={styles.tableCell}>
                                <div style={styles.currencyCell}>
                                  <div>{position.currency}</div>
                                </div>
                              </div>
                              <div style={styles.tableCell}>{position.expiry}</div>
                              <div style={styles.tableCell}>{position.strike}</div>
                              <div style={styles.tableCell}>
                                <div
                                  style={{
                                    ...styles.pill,
                                    ...(position.option_type === "put" ? styles.putPill : styles.callPill),
                                  }}
                                >
                                  {position.option_type}
                                </div>
                              </div>
                              <div style={styles.tableCell}>
                                <div
                                  style={{
                                    ...styles.pill,
                                    ...(position.direction === "sell" ? styles.sellPill : styles.buyPill),
                                  }}
                                >
                                  {position.direction}
                                </div>
                              </div>
                              <div
                                style={{
                                  ...styles.tableCell,
                                  ...(position.size < 0 ? styles.sizeNegative : styles.sizePositive),
                                }}
                              >
                                {position.size}
                              </div>
                              <div style={styles.tableCell}>
                                {position.close_price ? position.close_price.toLocaleString() : "N/A"}
                              </div>
                              <div style={styles.tableCell}>
                                <div style={styles.plCell}>
                                  <div
                                    style={{
                                      ...styles.plCrypto,
                                      ...(isProfitable ? styles.positive : styles.negative),
                                    }}
                                  >
                                    {position.total_profit_loss !== undefined
                                      ? position.total_profit_loss.toFixed(8)
                                      : "0.00000000"}
                                  </div>
                                  <div
                                    style={{
                                      ...styles.plFiat,
                                      ...(isProfitable ? styles.positive : styles.negative),
                                    }}
                                  >
                                    $
                                    {position.total_profit_loss_usd !== undefined
                                      ? position.total_profit_loss_usd.toFixed(2)
                                      : "0.00"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Col>
              </Row>

            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Add global style for spinner animation */}
      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}

const AllInvoiceReport = () => {
  return <ClosedPositions />
}

export default AllInvoiceReport
