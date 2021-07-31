import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './bootstrap'

export function AppProviders({ children }) {
  return <Router>{children}</Router>
}
