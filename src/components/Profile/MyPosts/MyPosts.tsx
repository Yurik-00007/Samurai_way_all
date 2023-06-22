import React, {memo, useState} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Posts/Post";
import {AddMassageFormRedux} from "./AddNewPostForm";

type PostsType = {
    id: number
    message: string | undefined
    likesCount: number
}

export type MyPostsPageType = {
    posts: PostsType[]
    addPost: (newPostElement: string) => void
}
export type FormDataType = {
    newPostText: string
}

/*
//export class MyPosts extends React.Component<MyPostsPageType> {
export class MyPosts extends React.PureComponent<MyPostsPageType> {

    componentDidMount() {
        setTimeout(() => {
            this.setState({a: 12})
        }, 3000)
    }

    /!*
        shouldComponentUpdate(nextProps: Readonly<MyPostsPageType>, nextState: Readonly<{}>, nextContext: any): boolean {
            return nextProps !== this.props || nextState !== this.state
        }
    *!/

    render() {
        console.log('RENDER')
        // console.log(props)
        let postsElements = this.props.posts.map(p => <Post key={p.id} message={p.message} like={p.likesCount}/>)


        const onAddPost = (formData: FormDataType) => {
            this.props.addPost(formData.newPostText)
        }
        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <AddMassageFormRedux onSubmit={onAddPost}/>
                New posts
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        )
    }
}
*/

export const MyPosts = React.memo((props: MyPostsPageType) => {
    /*
        let [state, setState] = useState({a: 0})
        setTimeout(() => {
            setState({a: 12})
        }, 3000)

        console.log('RENDER')
        // console.log(props)
        */
    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} like={p.likesCount}/>)


    const onAddPost = (formData: FormDataType) => {
        props.addPost(formData.newPostText)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddMassageFormRedux onSubmit={onAddPost}/>
            New posts
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

