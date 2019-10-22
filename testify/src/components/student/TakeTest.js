import React from 'react'

export default function TakeTest() {
    return (
        <div>
            <h1 className='initial'>Take Test</h1>
            {(() => {
                if(loggedIn){
                    if (isTeacher){
                        return <AccessDenied {...props}/>
                    }
                    else {
                        return <h2>You are authorized to be here. Render this component</h2>
                    }
                }
                else{
                    return <AccessDenied {...props}/>
                }
            })()} 
        </div>
    )
}
