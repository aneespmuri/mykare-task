import React, { createContext } from 'react';
import { StyleSheet } from 'react-native';
import Navigation from './src/navigation';

// Create a context for authentication state
const SignInContext = createContext();

// Custom hook to check if the user is signed in
function useIsSignedIn() {
  const isSignedIn = React.useContext(SignInContext);
  return isSignedIn;
}

// Custom hook to check if the user is signed out
function useIsSignedOut() {
  const isSignedIn = React.useContext(SignInContext);
  return !isSignedIn;
}

// Main App Component
export default function App() {
  const isSignedIn = true; // Static value for demonstration

  return (
    <SignInContext.Provider value={isSignedIn}>
      <Navigation />
    </SignInContext.Provider>
  );
}

// Styles (if needed)
const styles = StyleSheet.create({});