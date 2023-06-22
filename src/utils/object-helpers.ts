type UserType = {
    followed: boolean
    id: number
    name: string
    photos: { small: null | string, large: null | string }
    status: null | string
    uniqueUrlName: null
    [key: string]: any;
}

type NewObjPropsType = {
    followed: boolean
}
type ObjPropNameType = keyof UserType;

export const updateObjectInArrayFollUnFoll = (items: UserType[], itemId: number, objPropName: ObjPropNameType, newObjProps: NewObjPropsType) => {
    return items.map((u) => u[objPropName] === itemId ? {...u, ...newObjProps} : u)
}