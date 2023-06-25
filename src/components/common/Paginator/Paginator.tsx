import React, {useState} from 'react';
import s from "./Paginator.module.css";
import cn from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

const Paginator = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}: PropsType) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    //pagesCount = (pagesCount <= 30) ? pagesCount : 30
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    //debugger
    //console.log(totalItemsCount, pageSize, onPageChanged, currentPage, portionSize)
    return (
        <div className={s.paginator}>
            {portionNumber !== 1 &&
                <button className={s.button} onClick={() => {
                    setPortionNumber(1)
                }}>FIRST</button>}
            {portionNumber > 1 &&
                <button className={s.button} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>PREV</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)

                .map((p) => {
                    return (
                        <span
                            className={`${s.pageNumber} ${currentPage === p ? s.selectedPage : ''}`}
                            // className={cn ({[s.selectedPage]: currentPage === p}, s.pageNumber) }
                            key={p}
                            onClick={() => onPageChanged(p)
                            }
                            /*className={currentPage === p ? s.selectedPage : s.page}*/>
                            {p}
                        </span>
                    )
                })}

            {portionNumber < portionCount &&
                <button className={s.button} onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>NEXT</button>}
            {portionNumber !== portionCount &&
                <button className={s.button} onClick={() => {
                    setPortionNumber(portionCount)
                }}>END</button>}

        </div>
    );
};


export default Paginator;