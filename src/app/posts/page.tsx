"use client"

import React, { useEffect, useState } from 'react'
import { Amplify, Auth } from 'aws-amplify' // Combined import
import awsExports from '../../aws-exports' // Adjust this path if needed

Amplify.configure(awsExports)

Amplify.configure(awsExports)

const PostsPage = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('Auth:', Auth) // Log Auth to see if it's defined

    // Check if the user is authenticated
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user)
      })
      .catch(() => {
        // User is not authenticated, handle accordingly (e.g., redirect or show a message)
        console.error('User is not authenticated')
      })
  }, [])

  if (!user) {
    return <p>Please log in to see your posts.</p> // or redirect to login
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      {/* Your posts content goes here */}
    </div>
  )
}

export default PostsPage
