import {Link, useHistory} from "react-router-dom"
import FirebaseContext from "../context/firebase";
import {useContext, useEffect, useState} from "react";
import * as ROUTES from "../constants/routes";
import {doesUserExists} from "../services/useFirebase";

export default function Signup() {
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleSignup = async (event) => {
        event.preventDefault();

        const userExist = await doesUserExists(userName);
        if (!userExist) {
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password)

                await createdUserResult.user.updateProfile({
                    displayName: userName
                });
                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: userName.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                });
                history.push(ROUTES.DASHBOARD);
            } catch (err) {
                setError(err.message);
                setFullName('');
                setEmailAddress('');
                setPassword('');
            }
        } else {
            setUserName('');
            setError('Пользователь с таким ником уже существует')
        }
    };

    useEffect(() => {
        document.title = 'Signup - 100Gram';
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
                    <form onSubmit={handleSignup} method='POST'>
                        <input type="text"
                               placeholder='введите Никнейм'
                               onChange={event => setUserName(event.target.value)}
                               value={userName}
                               className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        />
                        <input type="text"
                               placeholder='введите Имя и Фамилию'
                               onChange={event => setFullName(event.target.value)}
                               value={fullName}
                               className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                        />
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
                            Зарегистрироваться
                        </button>
                    </form>
                </div>
                <div className='flex justify-center items-center flex-col w-full bg-white p-4'>
                    <p className='text-sm'> Есть аккаунт?{` `}
                        <Link to={ROUTES.LOGIN} className='font-bold text-purple-500'>Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}