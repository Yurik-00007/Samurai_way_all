import React from "react";
import s from './Post.module.css'

type PostType = {
    message: string | undefined
    like: number
}

export const Post = (props: PostType) => {
    return (
        <div className={s.item}>
            <img alt={'pic'}
                 src={'https://rus-pic.ru/wp-content/uploads/2021/12/avatarki-dlja-malchikov-41-foto-e7202eb.jpg'}/>
            {props.message}
            <div>like {props.like}</div>
        </div>
    )

}
