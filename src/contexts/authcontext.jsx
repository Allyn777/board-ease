import { createContext } from 'react'

// Create Auth Context
const AuthContext = createContext({})

// Custom Hook - returns minimal UI-only auth object
export const useAuth = () => {
  return {
    signIn: async (email, password) => {
      // UI-only: simulate success
      return { data: { user: { email } }, error: null }
    },
    signUp: async (email, password) => {
      // UI-only: simulate success
      return { data: { user: { email } }, error: null }
    },
    resetPassword: async (email) => {
      // UI-only: simulate success
      return { data: null, error: null }
    },
  }
}

// Auth Provider - pass-through for UI-only
export const AuthProvider = ({ children }) => {
  return children
}

export default AuthContext