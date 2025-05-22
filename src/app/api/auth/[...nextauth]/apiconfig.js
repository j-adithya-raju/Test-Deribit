// api/auth/[...nextauth]/apiconfig.js

export const BASE_URL = 'http://localhost:5000'
const ACCOUNTS = '/api/accounts'
const DYNAMIC = '/api/dynamic'
const POSITIONS = '/api/positions'

export const endpoints = {
  getPositions: `${POSITIONS}`,
  getOpenPositions: `${POSITIONS}/openpositions`,
  getClosedPositions: `${POSITIONS}/closedpositions`,
  getFilter: `${POSITIONS}/filter`,

  getAccountsList: `${ACCOUNTS}/list`,
  addAccount: `${ACCOUNTS}/add_account`,

  getStaticTokens: `${DYNAMIC}/tokens`,
  getStaticKinds: `${DYNAMIC}/kinds`,
}
