import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import '../test.css'

export default function Header() {
  const HDiv = styled.div`
  text-decoration: none;
  `;
  const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  :visited{
    color: black;
  }
  :hover{
    background-color: grey;
  }
  `;
  const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  :visited{
    color: black;
  }
  `;
  
  const [loggedIn, setLoggedIn] = useState(false)

    return (
        <HDiv className='headerDiv'>
            <StyledLink exact to='/'><h1 className='initial'>Testify</h1></StyledLink>

            {(()=>{
            if ( loggedIn === true){
              return <nav>
                <StyledNavLink exact to='/'>Home </StyledNavLink>
                <StyledNavLink to='/Login'>Sign in </StyledNavLink>
                <StyledNavLink to='/Teacher'>Teacher </StyledNavLink>
                <StyledNavLink to='/Student'>Student </StyledNavLink>
              </nav>
            }
            else if (loggedIn === false){
              return <nav>
                <StyledNavLink exact to='/'>Home </StyledNavLink>
                <StyledNavLink to='/Login'>Sign in </StyledNavLink>
              </nav>
            }
          })()}

          
        <div><button onClick={ ()=>{ 
          if (loggedIn){setLoggedIn(false)} 
          else{setLoggedIn(true)} 
          } }>Logged In: {`${loggedIn}`}</button></div>

            
        </HDiv>
    )
}


          {/* {(()=>{
            if (searchTerm !== ""){
              return <li>{searchTerm}</li>
            }
            else if (searchTermStatus !== ""){
              return <li>{searchTermStatus}</li>
            }
          })()} */}