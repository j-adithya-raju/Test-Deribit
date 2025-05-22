'use client'

import { useState } from 'react'
import { postAPI } from '@/app/api/auth/[...nextauth]/apihandler'
import { endpoints } from '@/app/api/auth/[...nextauth]/apiconfig'

const CalendarPage = () => {
  const [formData, setFormData] = useState({
    Trade_Account: '',
    Api_Key: '',
    Secret_Key: '',
    Exchange: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.Trade_Account || !formData.Api_Key || !formData.Secret_Key || !formData.Exchange) {
      setError('All fields are mandatory')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Use the provided postAPI function to submit the form data
      const response = await postAPI(endpoints.addAccount, formData)
      console.log('Account added successfully:', response)

      setSuccess('Account added successfully')
      // Reset form after successful submission
      setFormData({
        Trade_Account: '',
        Api_Key: '',
        Secret_Key: '',
        Exchange: '',
      })
    } catch (err) {
      console.error('Failed to add account:', err)
      setError(err instanceof Error ? err.message : 'Failed to add account')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Styles as objects for direct inline application
  const styles = {
    container: {
      backgroundColor: '#121212',
      borderRadius: '8px',
      padding: '32px',
      width: '100%',
      maxWidth: '900px',
      margin: '0 auto',
    },
    formContainer: {
      width: '100%',
    },
    formHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px',
    },
    iconContainer: {
      width: '32px',
      height: '32px',
      backgroundColor: '#6366f1',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    formTitle: {
      fontSize: '18px',
      fontWeight: 500,
      color: '#fff',
      margin: 0,
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    formLabel: {
      fontSize: '14px',
      color: '#e0e0e0',
      fontWeight: 500,
    },
    inputContainer: {
      position: 'relative',
    },
    formInput: {
      width: '100%',
      padding: '10px 12px',
      backgroundColor: '#1e2130',
      border: '1px solid #2a2a3c',
      borderRadius: '4px',
      color: '#fff',
      fontSize: '14px',
    },
    eyeButton: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '28px',
      height: '28px',
      backgroundColor: '#2a2a3c',
      border: 'none',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0,
    },
    helpText: {
      fontSize: '12px',
      color: '#666',
      marginTop: '4px',
    },
    formActions: {
      marginTop: '24px',
    },
    addAccountButton: {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: '#2a2a3c',
      color: 'white',
      border: '1px solid #3a3a4c',
      borderRadius: '4px',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
    },
    buttonIcon: {
      marginLeft: '8px',
    },
    errorMessage: {
      color: '#ef4444',
      fontSize: '14px',
      marginBottom: '16px',
    },
    successMessage: {
      color: '#10b981',
      fontSize: '14px',
      marginBottom: '16px',
    },
  }

  return (
    <div style={styles.formContainer}>
      {error && <div style={styles.errorMessage}>{error}</div>}
      {success && <div style={styles.successMessage}>{success}</div>}

      <div style={styles.formHeader}>
        <div style={styles.iconContainer}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <h2 style={styles.formTitle}>Add Account</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label htmlFor="Trade_Account" style={styles.formLabel}>
              Trading Account Name
            </label>
            <div style={styles.inputContainer}>
              <input
                type="text"
                id="Trade_Account"
                name="Trade_Account"
                style={styles.formInput}
                value={formData.Trade_Account}
                onChange={handleChange}
                placeholder="Enter account name"
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="Exchange" style={styles.formLabel}>
              Exchange
            </label>
            <div style={styles.inputContainer}>
              <input
                type="text"
                id="Exchange"
                name="Exchange"
                style={styles.formInput}
                value={formData.Exchange}
                onChange={handleChange}
                placeholder="Select an exchange"
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="Api_Key" style={styles.formLabel}>
              API Key
            </label>
            <div style={styles.inputContainer}>
              <input
                type="text"
                id="Api_Key"
                name="Api_Key"
                style={styles.formInput}
                value={formData.Api_Key}
                onChange={handleChange}
                placeholder="Enter API key"
                required
              />
            </div>
            <div style={styles.helpText}>Your API key will be encrypted before storage</div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="Secret_Key" style={styles.formLabel}>
              Secret Key
            </label>
            <div style={styles.inputContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="Secret_Key"
                name="Secret_Key"
                style={styles.formInput}
                value={formData.Secret_Key}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                style={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            <div style={styles.helpText}>Your secret key will be encrypted before storage</div>
          </div>
        </div>

        <div style={styles.formActions}>
          <button
            type="submit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#2a2a3c',
              color: 'white',
              border: '1px solid #3a3a4c',
              borderRadius: '4px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
            }}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg
                  style={{
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px',
                  }}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Add Account
                <svg
                  style={{ marginLeft: '8px' }}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CalendarPage
