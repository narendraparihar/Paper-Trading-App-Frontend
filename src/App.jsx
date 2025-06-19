import "./index.css";
import Navbar from "./page/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import Portfolio from "./page/Portfolio/Portfolio";
import Activity from "./page/Activity/Activity";
import Wallet from "./page/Wallet/Wallet";
import Withdrawawl from "./page/Withdrawal/Withdrawal";
import PaymentDetails from "./page/PaymentDetails/PaymentDetails";
import StockDetail from "./page/StockDetails.jsx/StockDetail";
import Watchlist from "./page/Watchlist/Watchlist";
import Profile from "./page/Profile/Profile";
import SearchCoin from "./page/Search/SearchCoin";
import NotFound from "./page/NotFound/NotFound";
import Auth from "./page/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";
function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);
  console.log(auth);
  return (
    <>
      {auth.user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/portfolio" element={<Portfolio />}></Route>
            <Route path="/activity" element={<Activity />}></Route>
            <Route path="/wallet" element={<Wallet />}></Route>
            <Route path="/withdrawal" element={<Withdrawawl />}></Route>
            <Route path="/payment-details" element={<PaymentDetails />}></Route>
            <Route path="/stock-details" element={<StockDetail />}></Route>
            <Route path="/watchlist" element={<Watchlist />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/search" element={<SearchCoin />}></Route>
            <Route path="/market/:id" element={<StockDetail />}></Route>
            <Route path="/" element={<StockDetail />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
