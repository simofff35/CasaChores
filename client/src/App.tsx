import { BrowserRouter, Routes, Route } from "react-router-dom";
import E404 from "./pages/404";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Loading from "./pages/loading";
import Home from "./pages/home";
import Profile from "./pages/profileSettings";
import Logout from "./pages/logout";
import Account from "./components/profile/settings/settingNav";
import SettingNav from "./components/profile/settings/settingNav";
import BecomeSeller from "./pages/becomeSeller";
import EditAccount from "./pages/editAccout";
import NewPost from "./pages/newPost";

export default function App(): React.ReactElement {
  const [loged, setLoged] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/jwt", { withCredentials: true })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setLoged(true);
          setUserData(response.data.userData);
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        setLoged(false);
        setUserData(null);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loged]);

  if (loading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Index */}
        <Route path="/">
          <Route index element={<Home userData={userData} loged={loged} />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* Testing */}
        <Route path="/test" />
        {/* Settings */}
        <Route path="settings">
          <Route
            path="profile/:id?"
            element={
              <Profile
                loading={loading}
                setLoading={setLoading}
                userData={userData}
                setUserData={setUserData}
                loged={loged}
              />
            }
          />
          <Route path="user">
            <Route
              path="nav/:id?"
              index
              element={
                <SettingNav
                  userData={userData}
                  loged={loged}
                  setUserData={setUserData}
                />
              }
            />
            <Route
              path="edit/account/:id"
              element={<EditAccount loged={loged} userData={userData} />}
            />
          </Route>

          <Route
            path="account/:id"
            element={
              <Account
                loged={loged}
                userData={userData}
                setUserData={setUserData}
              />
            }
          />
          <Route
            path="notification/:id"
            //todo
          />
        </Route>
        <Route
          path="/logout"
          element={
            <Logout
              loading={loading}
              setLoading={setLoading}
              userData={userData}
            />
          }
        />
        <Route
          path="/becomeseller/:id"
          element={
            <BecomeSeller
              userData={userData}
              setUserData={setUserData}
              loged={loged}
            />
          }
        />
        <Route
          path="/new/post"
          element={<NewPost loged={loged} userData={userData} />}
        />
        <Route path="*" element={<E404 />} />
      </Routes>
    </BrowserRouter>
  );
}
