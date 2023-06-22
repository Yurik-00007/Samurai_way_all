import React, {lazy, Suspense} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {BrowserRouter, Route, RouteComponentProps, withRouter} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import HeaderConteiner from "./components/Header/HeaderConteiner";
import UsersContainer from "./components/Users/UserContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {AppRootStateType, store} from "./redux/redux-store";
import {initializeAppTC} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

//import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));

//import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component<OwnProps> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.isInitialized)
            return <Preloader/>
        return (
            <div className="appWrapper">
                <HeaderConteiner/>
                <Navbar/>
                <div className='app-wrapper-content'>

                    <Route path='/dialogs'
                           render={withSuspense<RouteComponentProps>(DialogsContainer)}


                        //return <Suspense fallback={<div>Загрузка диалогов...</div>}>
                        /*
                                                       return <Suspense fallback={<Preloader/>}>
                                                           <DialogsContainer/>
                                                       </Suspense>
                        */
                    />
                    <Route path="/profile/:userId?" render={withSuspense<RouteComponentProps>(ProfileContainer)}/>
                    {/*

                    <Route path="/profile/:userId?" render={() => {
                        //return <Suspense fallback={<div>Загрузка профиля...</div>}>
                        return <Suspense fallback={<Preloader/>}>
                            <ProfileContainer/>
                        </Suspense>
                    }}/>
*/}


                    <Route path='/users'
                           render={() => <UsersContainer/>}
                    />

                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/login' render={() => <LoginPage/>}/>

                </div>
            </div>


        );
    }
}


type MapDispatchPropsToType = {
    initializeApp: () => void
}

type WithRouterType = {
    history: any;
    location: any;
    match: any;
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type AppPropsType = MapDispatchPropsToType & MapStateToPropsType

type OwnProps = RouteComponentProps & AppPropsType //& WithRouterType


export const mapStateToProps = (state: AppRootStateType) => {
    return {
        isInitialized: state.app.isInitialized
    }
}


/*
//не работает
export default compose(
    connect(mapStateToProps, {initializeApp: initializeAppTC,}),
    withRouter
)(App)
*/
//export default connect(mapStateToProps, {initializeApp: initializeAppTC,})(App)
//export default withRouter(connect(mapStateToProps, {initializeApp: initializeAppTC,})(App))
const AppContainer = withRouter(connect(mapStateToProps, {initializeApp: initializeAppTC,})(App))

const SamuraiJSApp = (props: any) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>

    )
}

export default SamuraiJSApp


