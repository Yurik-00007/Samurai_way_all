import React, {Component, ComponentType, Suspense} from 'react';


export function withSuspense<T>(Component: ComponentType<T>) {
    //debugger
    return (props: T) => {
        //debugger
        return (
/*
            <Suspense fallback={<Preloader/>}>
*/
            <Suspense fallback={<div>Loading....</div>}>
                <Component {...props}/>
            </Suspense>
        )
    }
}

/*
export const withSuspense = <T>(Component: ComponentType<T>) => (props: T) => (
    <Suspense fallback={<Preloader />}>
        <Component {...props} />
    </Suspense>
)
*/
