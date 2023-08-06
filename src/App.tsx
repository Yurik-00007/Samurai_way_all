import React, {lazy} from 'react';
import './App.module.css';
import {Navbar} from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import {Photos} from "./components/Photos/Photos";
import {Settings} from "./components/Settings/Settings";
import HeaderConteiner from "./components/Header/HeaderConteiner";
import UsersContainer from "./components/Users/UserContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {AppRootStateType, store} from "./redux/redux-store";
import {initializeAppTC} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import s from './App.module.css'

const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component<OwnProps> {
catchAllUnhandledErrors=(promiseRejectionEvent:any)=>{
    alert('Some error occurred')
}
    componentDidMount() {
        this.props.initializeApp()

        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors );
    }
componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors );

}

    render() {
        if (!this.props.isInitialized) {
            return <Preloader/>
        }

        return (
            <div className={s.appWrapper}>
                <HeaderConteiner/>
                <Navbar/>
                <div className={s.appWrapperContent}>
                    <Switch>
                        <Route exact path="/"render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/dialogs'
                               render={withSuspense<RouteComponentProps>(DialogsContainer)}
                        />
                        <Route path="/profile/:userId?" render={withSuspense<RouteComponentProps>(ProfileContainer)}/>
                        <Route path='/users'
                               render={() => <UsersContainer/>}
                        />
                        <Route path='/photos' render={() => <Photos/>}/>
                        <Route path='/music' render={() => <Photos/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                        <Route path='/404' render={() => <div>404 NOT FOUND</div>}/>
                        <Route path='*' render={() => <Redirect to={'/404'}/>}/>
                        {/*<Route path='/login/facebook' render={() => <div>Facebook</div>}/>*/}
                        {/*<Route exact path='/login' render={() => <LoginPage/>}/>*/}
                    </Switch>
                </div>
            </div>


        );
    }
}


type MapDispatchPropsToType = {
    initializeApp: () => void
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type AppPropsType = MapDispatchPropsToType & MapStateToPropsType

type OwnProps = RouteComponentProps & AppPropsType //& WithRouterType


export const mapStateToProps = (state: AppRootStateType) => {
    return {
        isInitialized: state.app.isInitialized
    }
}


const AppContainer = withRouter(connect(mapStateToProps, {initializeApp: initializeAppTC,})(App))

const SamuraiJSApp = () => {
    return (
/*
        <BrowserRouter>
*/
            <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
            </HashRouter>
/*
        </BrowserRouter>
*/

    )
}

export default SamuraiJSApp


