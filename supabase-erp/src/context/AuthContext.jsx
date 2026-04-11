import { createContext, useState, useContext, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        // Add timeout to session check to prevent hanging
        const sessionPromise = supabase.auth.getSession()
        const timeoutPromise = new Promise((resolve) => 
          setTimeout(() => resolve({ data: { session: null }, error: null }), 3000)
        )
        
        const { data: { session }, error: sessionError } = await Promise.race([
          sessionPromise,
          timeoutPromise
        ])
        
        if (!isMountedRef.current) return

        if (sessionError) {
          console.error('Session check error:', sessionError)
          if (isMountedRef.current) setLoading(false)
          return
        }

        if (session?.user) {
          if (isMountedRef.current) setUser(session.user)
          // Defer profile fetch to avoid blocking initial load
          if (isMountedRef.current) setLoading(false)
          
          try {
            const { data, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (profileError && profileError.code !== 'PGRST116') {
              console.error('Profile fetch error:', profileError)
            }
            if (data && isMountedRef.current) setProfile(data)
          } catch (err) {
            console.error('Error fetching profile:', err)
          }
        } else {
          if (isMountedRef.current) setLoading(false)
        }
      } catch (error) {
        console.error('Error checking user:', error?.message || 'Unknown error')
        if (isMountedRef.current) setLoading(false)
      }
    }

    checkUser()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMountedRef.current) return
        
        if (session?.user) {
          setUser(session.user)
          try {
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
            
            if (isMountedRef.current) setProfile(data)
          } catch (err) {
            console.error('Error fetching profile on auth change:', err)
          }
        } else {
          setUser(null)
          setProfile(null)
        }
      }
    )

    return () => {
      isMountedRef.current = false
      subscription?.unsubscribe()
    }
  }, [])

  const signUp = async (email, password, fullName) => {
    try {
      setError(null)
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) throw signUpError

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email,
            full_name: fullName,
            role: 'user',
          }
        ])

      if (profileError) throw profileError
      return user
    } catch (error) {
      setError(error?.message || 'Signup failed')
      throw error
    }
  }

  const signIn = async (email, password) => {
    try {
      setError(null)
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError
      return user
    } catch (error) {
      setError(error?.message || 'Sign in failed')
      throw error
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      setError(error?.message || 'Sign out failed')
      throw error
    }
  }

  const updateProfile = async (updates) => {
    try {
      setError(null)
      if (!user) throw new Error('No user logged in')
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      setProfile(data)
      return data
    } catch (error) {
      setError(error?.message || 'Profile update failed')
      throw error
    }
  }

  const value = {
    user,
    profile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
