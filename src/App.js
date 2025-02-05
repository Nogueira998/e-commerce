import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Home from "./components/Home";
import ManagerProducts from "./components/ManagerProducts";
import Footer from "./components/Footer";
import Login from "./components/Login";
import FakeAutentication from "./components/FakeAutentication";
import { useStateValue } from "./components/StateProvider";
import { auth } from "./components/firebase";
import Payment from "./components/Payment";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/fakeautentication" component={FakeAutentication} />
        <Route exact path="/restricted" component={ManagerProducts} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/Login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
