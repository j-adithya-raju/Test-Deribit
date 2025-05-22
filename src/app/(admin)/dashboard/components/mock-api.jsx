// Mock API data and handlers
export const mockTokens = [
    { id: "NIFTY", name: "NIFTY 50", symbol: "NIFTY", exchange: "NSE" },
    { id: "BANKNIFTY", name: "BANK NIFTY", symbol: "BANKNIFTY", exchange: "NSE" },
    { id: "FINNIFTY", name: "FIN NIFTY", symbol: "FINNIFTY", exchange: "NSE" },
    { id: "SENSEX", name: "SENSEX", symbol: "SENSEX", exchange: "BSE" },
    { id: "MIDCPNIFTY", name: "MIDCAP NIFTY", symbol: "MIDCPNIFTY", exchange: "NSE" },
  ]
  
  export const mockKinds = [
    { id: "EQ", name: "Equity" },
    { id: "FUT", name: "Futures" },
    { id: "OPT", name: "Options" },
    { id: "CE", name: "Call Options" },
    { id: "PE", name: "Put Options" },
  ]
  
  export const mockAccounts = [
    { id: "ACC001", name: "Primary Trading", broker: "Zerodha" },
    { id: "ACC002", name: "Options Account", broker: "Upstox" },
    { id: "ACC003", name: "Long-term Investments", broker: "ICICI Direct" },
  ]
  
  // Mock API endpoints
  export const mockEndpoints = {
    getStaticTokens: "tokens",
    getStaticKinds: "kinds",
    getAccountsList: "accounts",
    getPositions: "positions",
  }
  
  // Mock API handler function
  export const mockAPI = async (endpoint) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    // Return mock data based on endpoint
    switch (endpoint) {
      case mockEndpoints.getStaticTokens:
        return mockTokens
      case mockEndpoints.getStaticKinds:
        return mockKinds
      case mockEndpoints.getAccountsList:
        return mockAccounts
      case mockEndpoints.getPositions:
        return { positions: [] }
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`)
    }
  }
  