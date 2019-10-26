import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';


export default function Header({ currentUser, populateUser, loggedIn, setLoggedIn }) {
  const HDiv = styled.div`
    text-decoration: none;
  `;
  const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    :visited {
      color: black;
    }
    :hover {
      background-color: grey;
    }
  `;
  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    :visited {
      color: black;
    }
  `;

  return (
    <>
    <HDiv className='headerDiv'>
      <div className='semicircle'>
      <StyledLink to='/'>
        <h1 className='initial'>Testify</h1>
      </StyledLink>
      </div>
      
      {(() => {
        if (loggedIn === true) {
          return (
            <>
            <h1>Welcome {currentUser.name}!</h1>
            <nav className='loggedIn'>
              <NavLink exact to='/'>
                Home{' '}
              </NavLink>

              <NavLink id='login' to='/Teacher'>Teacher </NavLink>
              <NavLink id='login' to='/Student'>Student </NavLink>
            </nav>
            
            
            </>
          );
        } else if (loggedIn === false) {
          return (
            <nav className='notLoggedIn'>
              <NavLink exact to='/'>
                Home{' '}
              </NavLink>
              <NavLink id='login' to='/About'>About </NavLink>
              <NavLink id='login' to='/Login'>Login </NavLink>
            </nav>
          );
        }
      })()}

    </HDiv>
    </>
  );
}
