import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import * as ROUTES from './constants/routes';
import React, {lazy, Suspense} from "react";
import UserContext from "./context/user";
import useAuthListener from "./hooks/useAuthListener";
import ProtectedRoute from "./helpers/protectedRoute";

const Login = lazy(() => import ('./pages/Login'))
const Signup = lazy(() => import ('./pages/Signup'))
const Dashboard = lazy(() => import ('./pages/Dashboard'))
const NotFound = lazy(() => import ('./pages/Notfound'))
const Profile = lazy(() => import ('./pages/Profile'))


function App() {
    const {user} = useAuthListener();

    return (
        <UserContext.Provider value={{user}}>
            <Router>
                <Suspense fallback={<p>...Loading</p>}>
                    <Switch>
                        <Route path={ROUTES.LOGIN} component={Login} />
                        <Route path={ROUTES.SIGN_UP} component={Signup} />
                        <Route path={ROUTES.PROFILE} component={Profile} />
                        <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                            <Dashboard />
                        </ProtectedRoute>
                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>
    );
}

export default App;