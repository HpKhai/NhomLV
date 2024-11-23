import React, { Fragment, useEffect } from 'react'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { isJsonString } from './utils'
import { jwtDecode } from "jwt-decode"
import * as UserService from './service/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slides/userSlide'





function App() {
  const dispatch = useDispatch();
  const user = useSelector((State) => State.user)
  
  useEffect(() => {
    const { storageData, decoded } = handleDecode();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, [])
  

  const handleDecode = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if( storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
      }
      return { decoded, storageData}
    }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const {decoded} = handleDecode()
    if( decoded?.exp < currentTime.getTime() / 1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  })

  const handleGetDetailsUser = async (id, token) =>{
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token}))
  }


 
  return (
    <div>
  <Router>
    <Routes>
      {routes.map((route) => {
        const Page = route.page;
        const ischeckAuth = !route.isPrivate || user.role=="Admin";
        const Layout = route.isShowHeader ? DefaultComponent : Fragment;
        
        // Chỉ render Route khi ischeckAuth là true
        return (
          ischeckAuth && (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        );
      })}
    </Routes>
  </Router>
</div>

  )
}
export default App