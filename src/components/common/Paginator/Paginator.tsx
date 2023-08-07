import React, {FC, useState} from 'react';
import styles from "./paginator.module.css";

export type UsersPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}
const Paginator: FC<UsersPropsType> = ({currentPage, onPageChanged, pageSize, totalItemsCount, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize
    return (
        <div className={styles.paginator}>
            {portionNumber>1 &&
            <button onClick={()=>{setPortionNumber(portionNumber-1)}}>prev</button>}

            {pages.filter(t => t >=leftPortionPageNumber && t<=rightPortionPageNumber)
                .map((p)=><span onClick={(e) => {
                onPageChanged(p)
            }}
                                  className={currentPage === p ? styles.selectedPage : styles.unSelectedPage}
                                  key={p}>{p}</span>)}
            {portionCount>portionNumber &&
            <button onClick={()=>{setPortionNumber(portionNumber+1)}}>next</button>}
        </div>
    )
}

export default Paginator;
