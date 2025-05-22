// api/auth/[...nextauth]/apihandler.js

import { BASE_URL } from './apiconfig'

export async function getAPI(url, options = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })
  console.log(response, "response");
  if (!response.ok) {
    throw new Error(`GET ${url} failed with status ${response.status}`)
  }

  return response.json()
}

export async function postAPI(url, data, options = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: JSON.stringify(data),
    ...options,
  })

  if (!response.ok) {
    throw new Error(`POST ${url} failed with status ${response.status}`)
  }

  return response.json()
}
