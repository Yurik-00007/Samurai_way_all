import React, {HTMLInputTypeAttribute} from "react";
import s from './FormsControls.module.css'
import {Field, WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";
import {required} from "../../../utils/validators/validators";


type FormsControls = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    placeholder?: string
    type?: HTMLInputTypeAttribute
    autoFocus?: boolean
}

const FormControl = ({input, meta: {touched, error}, children}: any) => {

    const hasError = touched && error
    return (
        <div className={s.formControle + ' ' + (hasError ? s.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props: FormsControls) => {
    const {input, meta, ...rest} = props
    return (
        <FormControl {...props}>
            <textarea   {...input} {...rest}/>
        </FormControl>
    )
}

export const Input = (props: FormsControls) => {
    const {input, meta, ...rest} = props
    return (
        <FormControl{...props}>
            <input {...input} {...rest}/>
        </FormControl>
    )
}

export const createField = (name: string, placeholder: string, validate: any, component: any, props = {}, text: string = '') => (
    <div>
        <Field
            name={name}
            placeholder={placeholder}
            validate={validate}
            component={component}
            {...props}
        />{text}
    </div>
)

