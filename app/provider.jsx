"use client"
import { UserDetailContext } from "@/context/UserDetailContext"
import { supabase } from "@/services/supabaseClient"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import React, { useContext, useEffect, useState } from "react"

function Provider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    CreateNewUser()
  }, [])

  const CreateNewUser = async () => {
    try {
      // Get the logged-in user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError) {
        console.error("Auth error:", authError)
        return
      }

      if (!user) {
        console.log("No authenticated user found")
        setUser(null)
        return
      }

      // Check if user already exists in Users table
      const { data: Users, error: selectError } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user.email)

      if (selectError) {
        console.error("Select error:", selectError)
        return
      }

      if (!Users || Users.length === 0) {
        // Insert new user if not found
        const { data: insertedUsers, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name: user.user_metadata?.name || "",
              email: user.email,
              picture: user.user_metadata?.picture || "",
            },
          ])
          .select() // 👈 ensures the inserted row is returned

        if (insertError) {
          console.error("Insert error:", insertError)
          return
        }

        if (insertedUsers && insertedUsers.length > 0) {
          setUser(insertedUsers[0])
        } else {
          console.warn("Insert succeeded but no data returned")
          setUser(null)
        }
      } else {
        // User already exists
        setUser(Users[0])
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      setUser(null)
    }
  }

  return (
    <PayPalScriptProvider options={{clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}}>
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
    </PayPalScriptProvider>
  )
}

export default Provider

export const useUser = () => {
  const context = useContext(UserDetailContext)
  return context
}
