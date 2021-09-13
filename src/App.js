import { BrowserRouter, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
