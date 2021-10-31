import React, {useState, useRef} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { setName } from '../redux/states.js';
import '../styles/app.styl'
import logo from '../../public/images/logo.png';

export default function Welcome () {
    const [name, inputName] = useState(null);
    const dispatch = useDispatch()
    const user = useSelector((state: RootStateOrAny) => state.user.value)

     const enterUsername = async(e) => {
         e.preventDefault();
         await dispatch(setName(name))
     }

    if (user) {
        return <Redirect to="/room/" />
    }

    return (
        <div className="home-container">
            
            <div className="boxContainer">
                <img src={logo} alt="logo" className="logo"/>
             <div className="box1"><span>REFLECT</span></div>   
             <div className="box2"><span>IMPROVE</span></div>
                         <form onSubmit={enterUsername}>
                   <input placeholder="Enter a nickname" pattern="[A-Za-z]{3,10}" title="Letters only 3-10 characters" onChange={(e) => inputName(e.target.value)} /> 
                   <button type="submit">Enter</button>
            </form>
            </div>
            

            
        </div>
    )
}
