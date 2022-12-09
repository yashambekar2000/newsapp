
import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

//************this imports everything for routing purpose********************* */
import {
  BrowserRouter as Router,
  Switch,
  Route
 } from "react-router-dom";

 //*****************Class Based Components routing*************** */
const App =()=> {
  const apiKey = process.env.REACT_APP_NEWS_API
  const pageSize=10;
const [progress, setProgress] = useState(10);
  //  state={
  //   progress:10
  //  }
  //  setProgress=(progress)=>{
  //   this.setState({progress:progress})
  //  }
 //**********render is life cycle function ,first on screen compiule jsx in html then render html  */
  // render() {
   
    return (
//***********************In Return there is only one div which includes other divs*************** */
      <div>
<Router>
        <Navbar />
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      
      />
        {/* All the routing components are inclosed in switch and routing div */}
        <Switch>
        
         {/* News is the component class which has given props inside it ex. country , category etc
         it is used because reusable code we cant change it everytime in component instead we simply change it here */}

          <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="In" category="general" /></Route>

          <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="In" category="science" /></Route>

          <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="In" category="sports" /></Route>

          <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} country="In" category="entertainment" /></Route>
        </Switch>

        </Router>
      </div>
    ) 
  }

  export default App;