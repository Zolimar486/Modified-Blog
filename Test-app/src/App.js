import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Write from "./Pages/Write";
import Single from "./Pages/Single";
import Settings from "./Pages/Settings";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import {Context} from './Context/Context'
import {useContext} from 'react'
import Quiz from "./Pages/Quiz";



function App() {

  const {user} = useContext(Context)

  return(
    
     <Router>
       <Navbar/>
      <Switch>
        
       <Route exact path="/">
        <Home/>
       </Route>
       <Route path="/register">
        {user ? <Home/> :<Register/> }
        </Route>
        <Route path="/login">
         { user? <Home/> :<Login/>}
        </Route>
        <Route path="/write">
         {user? <Write/> :<Register/>}
        </Route>
        <Route path="/single/:postId">
          <Single/>
        </Route>
        <Route path="/settings">
         {  user? <Settings/> :<Register/>}
        </Route>
        
        <Route path="/quiz">
          <Quiz/>
        </Route>
      </Switch>
     </Router>
   
  );
}


export default App;
