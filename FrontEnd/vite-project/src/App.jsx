import react from 'react'
import {useState } from 'react'
import {Routes, Route} from 'react-router'
import Home from './MarkUp/Pages/Home'
import Login from './MarkUp/Pages/Login'
import AddEmployee from './MarkUp/Pages/admin/AddEmployee'
import AddCustomer from './MarkUp/Pages/admin/AddCustomer'
import AddOrder from './MarkUp/Pages/admin/AddOrder'
import Unauthorized from './MarkUp/Pages/Unauthorized'
import PrivateAuthRoute from './MarkUp/Component/Auth/PrivateAuth'
import Customers from './MarkUp/Component/Admin/Customers'
import Employees from './MarkUp/Component/Admin/Employees'
import Order from './MarkUp/Component/Admin/Order'
import AdminMenu from './MarkUp/Component/Admin/AdminMenu'
import Orders from './MarkUp/Pages/Orders'
import Adminstarator from './MarkUp/Component/Adminstarator'
import AdminService from './MarkUp/Component/Admin/AdminService'
import ServiceDetails from './MarkUp/Component/Admin/Servicesdetails'
import OrderEdit from './MarkUp/EditPage/OrderEdit'
import CustomerEdit from './MarkUp/EditPage/CustomerEdit' 
import EmployeeEdit from './MarkUp/EditPage/EmployeeEdit'

//import css
import '../src/assets/Template-asset/css/bootstrap.css'
import '../src/assets/Template-asset/css/style.css'
import '../src/assets/Template-asset/css/responsive.css'
import '../src/assets/Template-asset/css/color.css'
import '../src/assets/style/Custom.css'
import Header from '../src/MarkUp/Component/Header/Header'
import Footer from '../src/MarkUp/Component/Footer/Footer'
import Services from '../src/MarkUp/Pages/Services'
import Contact from '../src/MarkUp/Pages/Contact'
import About from '../src/MarkUp/Pages/About'
import VehicleInfo from './MarkUp/Component/VehicleInfo'

function App() {
return (
  <>
  < Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/services' element={<Services />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={<Adminstarator />} />
      <Route path ='/orders' element={<Orders />} />
      <Route path="/admin/ServiceDetails" element={<ServiceDetails />} />
            
      <Route path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          } />
          <Route path="/admin/Order"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Order />
            </PrivateAuthRoute>
          } />
          <Route path="/admin/AddEmployee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          } />
          <Route path="/admin/AddCustomer"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <AddCustomer />
            </PrivateAuthRoute>
          } />
          <Route path="/admin/AddOrder"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <AddOrder />
            </PrivateAuthRoute>
          } />
           <Route path="/admin/AdminService"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AdminService />
            </PrivateAuthRoute>
          } />
          <Route path="/admin/VehicleInfo"
          element={
            <PrivateAuthRoute roles={[1,2,3]}>
              <VehicleInfo/>
            </PrivateAuthRoute>
          } />
          <Route path="/admin/order/edit/:id"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <OrderEdit />
            </PrivateAuthRoute>
          } />
          <Route path="/admin/customer/edit/:id"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <CustomerEdit />
            </PrivateAuthRoute>
          } />
          <Route path="/admin/employee/edit/:id"
          element={
            <PrivateAuthRoute roles={[2,3]}>
              <EmployeeEdit />
            </PrivateAuthRoute>
          } />
      <Route path='/admin/employees' element={<Employees />} />
      <Route path='/unauthorized' element={<Unauthorized />} />
    </Routes>
    < Footer />
    </>
  )
}

export default App
