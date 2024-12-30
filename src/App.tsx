import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IRoute, routes } from './routes/AppRoutes';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  return (
    // <Dashboard />
    <BrowserRouter>
      <Routes>
        {routes.map((route: IRoute) => {
          return (
            <Route 
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute isProtected={route.protected}>
                  <route.component />
                </ProtectedRoute>
              }
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
