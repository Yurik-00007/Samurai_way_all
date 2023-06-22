import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormDataType} from "./Dialogs";
import {Textarea} from "../common/FormControles/FormsControles";
import {maxLenghtCreater, required} from "../../utils/validators/validators";

const maxLength100 = maxLenghtCreater(100)
const AddMassageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={'newMessageBody'}
                       validate={[required, maxLength100]}
                       placeholder={'Enter your text'}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMassageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMassageForm'})(AddMassageForm)