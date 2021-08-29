import FacePayBar from './components/FacePayBar'
import 
{ Switch, Route } from 'react-router-dom'
import Payment from './Routes/Payment'
import MerchantRegister from './Routes/MerchantRegister'
import UserRegister from './Routes/UserRegister'

const App = () => {
  return (
    <div className="App">
      <FacePayBar />
      <Switch>
        <Route exact path="/" component={Payment}/> 
        <Route exact path="/merchantRegister" component={MerchantRegister}/> 
        <Route exact path="/userRegsiter" component={UserRegister}/> 
      </Switch>
    </div>
  );
}

export default App;
