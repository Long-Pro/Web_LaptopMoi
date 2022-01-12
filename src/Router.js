import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Product from './screens/Product/Product'
import Dashboard from './screens/Dashboard/Dashboard'
import Login from './screens/Login/Login'
import App from './App'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default Router;
