import React from 'react';
import {UserType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    followingProgressValue: number[]
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
    portionSize: number

}

const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize, ...props}: PropsType) => {
    return (
        <div>
            <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                portionSize={portionSize}
            />
            {props.users.map(u => <User
                    key={u.id}
                    user={u}
                    followingProgressValue={props.followingProgressValue}
                    followTC={props.followTC}
                    unFollowTC={props.unFollowTC}
                />
            )}
        </div>
    )
}


export default Users;