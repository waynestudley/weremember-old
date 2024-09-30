"use client"

import React from 'react'
import {Amplify} from 'aws-amplify'
import { ThemeProvider, Authenticator, withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsExports from '../aws-exports'
import './customStyles.css' 

Amplify.configure(awsExports)


const theme = {
  name: 'custom-theme',
  tokens: {
    colors: {
      background: {
        primary: { value: '#f0f0f0' }, // Background color for the modal
      },
      brand: {
        primary: { value: '#FF6F61' }, // Primary button color
        secondary: { value: '#FFCCCB' }, // Secondary button color
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: '#FC0' }, // Button background color
          color: { value: '#ffffff' }, // Button text color
        },
      },
      card: {
        backgroundColor: { value: '#FC9' }, // Card background
        boxShadow: { value: '0px 0px 10px rgba(0, 0, 0, 0.1)' }, // Card shadow
      },
    },
  },
}

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Authenticator>
        {({ signOut }) => (
          <main>
            <header className='App-header'>
              {/* Quiz Component */}
              {/* <Quiz /> */}
              {/* Sign Out Button */}
              <button 
                onClick={signOut} 
                style={{ 
                  margin: '20px', 
                  fontSize: '0.8rem', 
                  padding: '5px 10px', 
                  marginTop: '20px'
                }}
              >
                Sign Out
              </button>
            </header>
          </main>
        )}
      </Authenticator>
      </ThemeProvider>
    </div>
  );
}

export default withAuthenticator(App);