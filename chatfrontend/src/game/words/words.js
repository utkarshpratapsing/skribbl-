import React from 'react';

function Words({user,drawer,currentword}){    
    return(
        <div>
        {user.id===drawer.id ?
            <div>
                <h2>
                    {currentword}   
                </h2>
            </div>
            :null
        }
        </div>
    )
}

export default Words;