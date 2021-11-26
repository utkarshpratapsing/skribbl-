import React,{useState} from 'react';

const worddict = require('./words.json');

var cw="kaddu";

function Words({username,drawer}){
    
    const [currentword,setcurrentword] = useState("");
    const [popup,setpopup] = useState(true);
    
    function generate_random_word(){
        return worddict.english[parseInt(Math.random()*worddict.english.length)];
    }

    function set_random_word(s){
        setcurrentword(s);
        cw = s;
        setpopup(false);
    }
    var s1 = generate_random_word();
    var s2 = generate_random_word();
    var s3 = generate_random_word();
    
    return(
        <div>
        {username===drawer && popup ?
                <div>
                <button onClick={()=>set_random_word(s1)}>{s1}</button>
                <button onClick={()=>set_random_word(s2)}>{s2}</button>
                <button onClick={()=>set_random_word(s3)}>{s3}</button>
                </div>:null}
            {username===drawer ?
            <div>
            <h2>
                {currentword}   
            </h2>
        </div>:null}

        </div>
    )
}

export default Words;
export {cw};