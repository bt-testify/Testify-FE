import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import '../test.css';

export default function Header({ loggedIn, setLoggedIn }) {
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
      <StyledLink to='/'>
        <h1 className='initial'>Testify</h1>
      </StyledLink>

      {(() => {
        if (loggedIn === true) {
          return (
            <nav className='loggedIn'>
              <StyledNavLink exact to='/'>
                Home{' '}
              </StyledNavLink>

              <StyledNavLink to='/Teacher'>Teacher </StyledNavLink>
              <StyledNavLink to='/Student'>Student </StyledNavLink>
            </nav>
          );
        } else if (loggedIn === false) {
          return (
            <nav className='notLoggedIn'>
              <StyledNavLink exact to='/'>
                Home{' '}
              </StyledNavLink>
              <StyledNavLink to='/Login'>Login </StyledNavLink>
            </nav>
          );
        }
      })()}

    </HDiv>
    <div>
      <button
        onClick={() => {
          if (loggedIn) { 
            setLoggedIn(false);
          } else {
            setLoggedIn(true);
          }
        }}>Logged In: {`${loggedIn}`}
      </button>
    </div>
    </>
  );
}

{
  /* {(()=>{
            if (searchTerm !== ""){
              return <li>{searchTerm}</li>
            }
            else if (searchTermStatus !== ""){
              return <li>{searchTermStatus}</li>
            }
          })()} */
}
