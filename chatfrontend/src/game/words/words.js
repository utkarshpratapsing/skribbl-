function words({currentword,username,drawer}){
    return(
        <div>
        {username==drawer ?
            <div>
            <h2>
                {currentword}
            </h2>
        </div> :<div>
            <h2>Words not visible to you</h2>
        </div>
        }
        </div>
    )
}

export default words;