import React from 'react';
import {AppRootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    setCurrentPage,
    getUsersTC,
    unFollowTC,
    followTC,

} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingProgressValue,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from "../../redux/users-selectors";

type UsersClassType = UsersPropsType

class UsersAPIContainer extends React.Component<UsersClassType> {


    componentDidMount() {
        let {pageSize, currentPage, getUsers} = this.props
        getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {getUsers, pageSize} = this.props
        getUsers(pageNumber, pageSize)

    }


    render() {


        return (
            <>
                {this.props.isLoading ? <Preloader/> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    followingProgressValue={this.props.followingProgressValue}
                    followTC={this.props.followTC}
                    unFollowTC={this.props.unFollowTC}
                    portionSize={this.props.portionSize}
                />
            </>
        )
    }
}


type MapDispatchToPropsType = {
    setCurrentPage: (pageNumber: number) => void
    getUsers: (Page: number, pageSize: number) => void
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
}

export type MapStateToPropsType = ReturnType<typeof mapStateToProps>

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppRootStateType) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingProgressValue: getFollowingProgressValue(state),
        portionSize: state.usersPage.portionSize

    }
}

const UsersContainer = compose<React.ComponentType>(
    connect(mapStateToProps,
        {
            setCurrentPage,
            getUsers: getUsersTC,
            unFollowTC,
            followTC,
        }
    ),
    //WithAuthRedirect,
)
(UsersAPIContainer)
export default UsersContainer