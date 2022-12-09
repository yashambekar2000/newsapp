import React from 'react'
import  './css/Navbar.css';
import { Link } from "react-router-dom";

let hamburger = document.getElementsByClassName("hamburger");
let navMenu = document.getElementsByClassName("nav-menu");
let temp = true;

//*********function for nav items display or close while screen size is small************ */
function mobileMenu() {
  if(temp === true){
      hamburger[0].classList.add("active");
      navMenu[0].classList.add("active");
      temp=false;
  }else{
    hamburger[0].classList.remove("active");
      navMenu[0].classList.remove("active");
      temp=true;
  }
  }

 

// export default class Navbar extends Component {
//   render() {
  const Navbar = () =>{
    return (
      <div>
        <nav>
<div>
            <h3 className='head'>Newswala</h3>
            </div>
            <div className='listfield'>
            <ul className='nav-menu'>
                {/* This links are connected with route  */}
                <li className='nav-item'> <Link  className='nav-link' to="/" >Home</Link> </li>
                <li className='nav-item'> <Link  className='nav-link' to="/science">Science</Link> </li>
                <li className='nav-item'> <Link  className='nav-link' to="/sports">Sports</Link>  </li>
                <li className='nav-item'> <Link  className='nav-link' to="/entertainment">Entertainment</Link>  </li>
            </ul>
           
            </div>

            <div className='serchfield'>
                <input type="text" placeholder='Search News Here' />
                <button type='btn'>Search</button>
            </div>
            {/* this is for the menu in navbar while screen size is small */}
            <div className="hamburger" onClick={mobileMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
  </div>


    )
  }

  export default Navbar