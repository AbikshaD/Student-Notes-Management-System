import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateNote from './pages/CreateNote';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/dashboard" />;
};

const App = () => {
  return (
    <Router>
      <div style={styles.app}>
        <Navbar />
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            <Route path="/create" element={
              <PrivateRoute>
                <CreateNote />
              </PrivateRoute>
            } />
            
            <Route path="/edit/:id" element={
              <PrivateRoute>
                <CreateNote />
              </PrivateRoute>
            } />
            
            <Route path="*" element={
              <div style={styles.notFound}>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
              </div>
            } />
          </Routes>
        </main>
        
        
      </div>
    </Router>
  );
};

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: '20px 0',
  },
  notFound: {
    textAlign: 'center',
    padding: '100px 20px',
  },
  footer: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '20px 0',
    marginTop: 'auto',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    textAlign: 'center',
  },
};

export default App;