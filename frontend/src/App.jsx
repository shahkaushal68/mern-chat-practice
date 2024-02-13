
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import routeList from './routes';
import ProtectedRoute from './routes/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { doGetLoginUserDetail } from './actions/authActions';
import { loginUser } from './redux/features/chatSlice';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('_token');
    //console.log("token---", token);
    if (token) {
      const getLoginUserDetils = async () => {
        try {
          const getLoginUserDetailResponse = await doGetLoginUserDetail();
          //console.log({ getLoginUserDetailResponse });
          if (getLoginUserDetailResponse?.status === 200) {
            dispatch(loginUser(getLoginUserDetailResponse?.data?.data))
          }
        } catch (error) {
          console.log("error", error);
        }
      }
      getLoginUserDetils();
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {routeList &&
          routeList?.map((routeItem, routeIndex) => {
            //console.log("routeItem----------", routeItem);
            return (
              <Route
                path={routeItem.path}
                //element={routeItem.element} 
                key={routeIndex}
                element={
                  <ProtectedRoute
                    isAuth={routeItem.isAuth}
                  // roles={routeItem.accessRoles}
                  //isVisible={routeItem?.isVisible}
                  >
                    {routeItem.element}
                  </ProtectedRoute>
                }
              />
            )
          })
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
