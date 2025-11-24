
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState('user')
  const [loading, setLoading] = useState(true)

  // Simple function to get or create user profile
  const ensureUserProfile = async (userId) => {
    try {
      // Check if profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (checkError) {
        // Profile doesn't exist, create one
        console.log('Creating new profile for user:', userId)
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: userId, 
              role: 'user',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ])
          .select()
          .single()

        if (createError) {
          console.error('Error creating profile:', createError)
          return 'user'
        }
        
        return newProfile?.role || 'user'
      }

      return existingProfile?.role || 'user'
    } catch (error) {
      console.error('Error in ensureUserProfile:', error)
      return 'user'
    }
  }

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          setLoading(false)
          return
        }

        if (session?.user) {
          const role = await ensureUserProfile(session.user.id)
          setUser(session.user)
          setUserRole(role)
          console.log('User logged in:', session.user.email, 'Role:', role)
        } else {
          setUser(null)
          setUserRole('user')
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event)
        
        if (session?.user) {
          const role = await ensureUserProfile(session.user.id)
          setUser(session.user)
          setUserRole(role)
          console.log('User state updated:', session.user.email, 'Role:', role)
        } else {
          setUser(null)
          setUserRole('user')
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Sign Up
  const signUp = async (email, password) => {
    try {
      console.log('Signing up user:', email)
      const cleanEmail = email.trim()
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      })
      
      if (error) {
        console.error('Signup error:', error)
        throw error
      }
      
      console.log('Signup successful, user created:', data.user?.id)
      return { data, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { data: null, error }
    }
  }

  // Sign In
  const signIn = async (email, password) => {
    try {
      console.log('Signing in user:', email)
      const cleanEmail = email.trim()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      })
      
      if (error) {
        console.error('Signin error:', error)
        throw error
      }
      
      console.log('Signin successful:', data.user?.email)
      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error }
    }
  }

  // Sign Out
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUserRole('user')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Reset Password
  const resetPassword = async (email) => {
    try {
      const cleanEmail = email.trim()
      const { data, error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Reset password error:', error)
      return { data: null, error }
    }
  }

  const value = {
    user,
    userRole,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}  {/* ← Always render children! */}
    </AuthContext.Provider>
  )
}
export default AuthContext