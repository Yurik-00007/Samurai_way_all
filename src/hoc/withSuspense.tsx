import React, {Component, ComponentType, Suspense} from 'react';
import Preloader from "../components/common/Preloader/Preloader";


export function withSuspense<T>(Component: ComponentType<T>) {
    //debugger
    return (props: T) => {
        //debugger
        return (
            <Suspense fallback={<Preloader/>}>
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
