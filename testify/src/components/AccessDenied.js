import React from 'react';

export default function AccessDenied(props) {
  console.log('AccessDenied.js props: ', props);
  return (
    <div>
      {(() => {
        if (props.loggedIn) {
          if (props.currentUser.isTeacher) {
            return (
              <div>
                <h1>Access Denied.</h1>
                <h2>This page is not accessible by Teachers.</h2>
              </div>
            );
          } else {
            return (
              <div>
                <h1>Access Denied.</h1>
                <h2>This page is not accessible by Students.</h2>
              </div>
            );
          }
        } 
        else {
          alert(
            "You must be logged in to access this page. Redirecting you now."
          );
          props.history.push('/Login');
          return (
            <div>
              <h1>Access Denied.</h1>
              <h2>You must be logged in to view this page.</h2>
            </div>
          );
        }
      })()}
    </div>
  );
}
