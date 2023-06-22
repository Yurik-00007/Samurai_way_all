import s from '../Dialogs.module.css'

type MessageType = {
    message: string|undefined
}

export const Message = (props: MessageType) => {
    return (
        <div className={ s.message }>
            { props.message }
        </div>
    )
}

