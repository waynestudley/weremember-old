"use client"

import { Amplify } from 'aws-amplify'
import awsExports from '../../aws-exports'
import { useState, useEffect } from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { listMessages } from '../graphql/queries' // Import the generated query from Amplify
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { fetchAuthSession } from 'aws-amplify/auth';

Amplify.configure(awsExports)


// Message type based on your GraphQL schema
interface Message {
  id: string
  content: string
  imageUrl?: string
  createdAt: string
}

const session = await fetchAuthSession();
  

const userID = session.tokens.idToken.payload.sub
const userEmail = session.tokens.idToken.payload.email

const TestAuth = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [userID, setUserID] = useState<string | null>(null)

  useEffect(() => {
    // Fetch messages when we have a valid userID
    const fetchMessages = async () => {
      if (!userID) return // Only run if userID is available

      try {
        setLoading(true)
        const response = await API.graphql(graphqlOperation(listMessages, {
          filter: { userID: { eq: userID } }
        }))

        const messageData = response.data.listMessages.items as Message[]
        setMessages(messageData)
      } catch (error) {
        console.error('Error fetching messages:', error)
        setError('Failed to load messages')
      } finally {
        setLoading(false)
      }
    }

    console.log(messages)

    fetchMessages()
  }, [userID]) // Re-run the query when userID changes


  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       setDebugInfo(prev => prev + 'Checking user authentication...\n')
        
  //       const userData = await Auth.currentAuthenticatedUser()
  //       setDebugInfo(prev => prev + 'User data received\n')
  //       console.log('User data:', userData)
  //       setUser(userData)

  //       const session = await Auth.currentSession()
  //       setDebugInfo(prev => prev + `Session valid: ${session.isValid()}\n`)
  //       setDebugInfo(prev => prev + `ID Token: ${session.getIdToken().getJwtToken().substring(0, 20)}...\n`)
  //     } catch (err) {
  //       setDebugInfo(prev => prev + `Error in authentication: ${JSON.stringify(err)}\n`)
  //     }

  //     setIsLoading(false)
  //   }

  //   checkUser()
  // }, [])

  return (
    <div>
      <div>{session.tokens.idToken ? `Logged in as ${userEmail}` : 'Not logged in'}</div>
    </div>
  )
}

export default TestAuth





// "use client"

// import { useState, useEffect } from 'react'
// import { API, graphqlOperation, Auth } from 'aws-amplify'
// import { listMessages } from '../graphql/queries' // Import the generated query from Amplify
// import { withAuthenticator } from '@aws-amplify/ui-react'
// import '@aws-amplify/ui-react/styles.css'

// // Message type based on your GraphQL schema
// interface Message {
//   id: string
//   content: string
//   imageUrl?: string
//   createdAt: string
// }

// const PostsPage = () => {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [userID, setUserID] = useState<string | null>(null)

//   useEffect(() => {
//     // Fetch the authenticated user's ID
//     const fetchUserID = async () => {
//       try {
//         const user = await Auth.currentAuthenticatedUser()
//         setUserID(user.attributes.sub) // Set the user's Cognito sub (unique ID)
//       } catch (error) {
//         console.error('Error fetching user ID:', error)
//         setError('Unable to get user ID')
//       }
//     }

//     fetchUserID()
//   }, [])

//   useEffect(() => {
//     // Fetch messages when we have a valid userID
//     const fetchMessages = async () => {
//       if (!userID) return // Only run if userID is available

//       try {
//         setLoading(true)
//         const response = await API.graphql(graphqlOperation(listMessages, {
//           filter: { userID: { eq: userID } }
//         }))

//         const messageData = response.data.listMessages.items as Message[]
//         setMessages(messageData)
//       } catch (error) {
//         console.error('Error fetching messages:', error)
//         setError('Failed to load messages')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchMessages()
//   }, [userID]) // Re-run the query when userID changes

//   if (loading) return <p>Loading messages...</p>
//   if (error) return <p>{error}</p>
//   if (messages.length === 0) return <p>No messages found for this user</p>

//   return (
//     <div>
//       <h1>User Posts</h1>
//       <ul>
//         {messages.map((message) => (
//           <li key={message.id}>
//             <p><strong>Content:</strong> {message.content}</p>
//             {message.imageUrl && <img src={message.imageUrl} alt="Message Image" style={{ width: '200px', height: 'auto' }} />}
//             <p><strong>Posted At:</strong> {new Date(message.createdAt).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default withAuthenticator(PostsPage)
