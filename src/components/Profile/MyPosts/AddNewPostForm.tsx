import {maxLenghtCreater, required} from "../../../utils/validators/validators";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormControles/FormsControles";
import {FormDataType} from "./MyPosts";

const maxLength10 = maxLenghtCreater(10)
export const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>

                <Field
                    component={Textarea}
                    validate={[required, maxLength10]}
                    name={"newPostText"}
                    placeholder={'Post message'}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
export const AddMassageFormRedux = reduxForm<FormDataType>({form: 'postAddMassageForm'})(AddNewPostForm)