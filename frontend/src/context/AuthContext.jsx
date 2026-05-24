import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axiosInstance from '../axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [signInRequested, setSignInRequested] = useState(false)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth/verify')
        if (response.data.success) {
          setUser(response.data.user)
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
  }, [])

  const register = async (name, email, password) => {
    try {
      setError(null)
      const response = await axiosInstance.post('/auth/register', {
        name,
        email,
        password,
      })
      if (response.data.success) {
        setUser(response.data.user)
        return { success: true }
      }
      const message = response.data.message || 'Registration failed'
      setError(message)
      return { success: false, message }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed'
      setError(message)
      return { success: false, message }
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      })
      if (response.data.success) {
        setUser(response.data.user)
        return { success: true }
      }
      const message = response.data.message || 'Login failed'
      setError(message)
      return { success: false, message }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed'
      setError(message)
      return { success: false, message }
    }
  }

  const requestSignIn = useCallback(() => setSignInRequested(true), [])

  const clearSignInRequest = useCallback(() => setSignInRequested(false), [])

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout')
      setUser(null)
      setError(null)
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInRequested,
        requestSignIn,
        clearSignInRequest,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
