export const required = (value: string) => {
    if (value) {
        return undefined
    }
    return 'Field is required'

}

export const maxLenghtCreater = (maxlength: number) => (value: string) => {
    if (value.length > maxlength) {
        return `Max length is ${maxlength} symbol`
    }
    return undefined
}