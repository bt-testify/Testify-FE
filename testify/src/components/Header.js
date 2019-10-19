import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <h1 className='initial'>Header</h1>
            <Link to='/'>Home</Link>
            <Link to='/login'>Sign in</Link>
            <Link to='/Teacher'>Teacher</Link>
            <Link to='/Student'>Student</Link>
        </div>
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