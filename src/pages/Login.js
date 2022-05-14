import {Link, useHistory} from "react-router-dom"
import FirebaseContext from "../context/firebase";
import {useContext, useEffect, useState} from "react";
import * as ROUTES from "../constants/routes";

export default function Login() {
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD)
        } catch (err) {
            setEmailAddress('');
            setPassword('');
            setError(err.message)
        }
    };

    useEffect(() => {
        document.title = 'Login - 100Gram';
    }, []);


    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app"/>
            </div>
            <div className='flex flex-col w-2/5'>
                <div className='flex flex-col bg-white items-center mb-4 p-4'>
                    <h1 className='flex justify-center w-full'>
                        <img src="/images/logo.png" alt="stogram-logo" className='mt-2 w-6/12 mb-4'/>
                    </h1>
                    {error && <p className='mb-4 text-xs text-red-500'>{error}</p>}
                    <form onSubmit={handleLogin} method='POST'>
                        <input type="text"
                               placeholder='введите почту'
                               onChange={event => setEmailAddress(event.target.value)}
                               value={emailAddress}
                               className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        />
                        <input type="password"
                               placeholder='введите пароль'
                               onChange={event => setPassword(event.target.value)}
                               value={password}
                               className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        />
                        <button disabled={isInvalid} type='submit' className={`bg-purple-500 text-white w-full font-bold border h-8 rounded
                    ${isInvalid && 'opacity-50'}`}
                        >
                            Войти
                        </button>
                    </form>
                </div>
                <div className='flex justify-center items-center flex-col w-full bg-white p-4'>
                    <p className='text-sm'> Нет аккаунта?{` `}
                        <Link to={ROUTES.SIGN_UP} className='font-bold text-purple-500'>Зарегистрироваться</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}