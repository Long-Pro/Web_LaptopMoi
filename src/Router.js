import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,Navigate
} from "react-router-dom";
import Product from './screens/Product/Product'
import Dashboard from './screens/Dashboard/Dashboard'
import Customer from './screens/Customer/Customer'
import Bill from './screens/Bill/Bill'
import Staff from './screens/Staff/Staff'
import Statistic from './screens/Statistic/Statistic'




import Login from './screens/Login/Login'
import App from './App'
import { useSelector, useDispatch } from 'react-redux'
function ProtectedRoutes() {
  const isLogin = useSelector(state => state.isLogin.value)
  return (
    isLogin?<Outlet/>:<Navigate to='/login'/>
  );
}

function Router() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />} >
        <Route path="/" element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/statistic" element={<Statistic />} />


        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default Router;

