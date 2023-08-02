import React, {FC} from 'react';
import styles from "./paginator.module.css";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void

}
const Paginator:FC<UsersPropsType> = ({currentPage,onPageChanged, pageSize,totalUsersCount}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            {pages.map(t => <span onClick={(e) => {
                onPageChanged(t)}}
                                  className={currentPage === t ? styles.selectedPage : ""}
                                  key={t}>{t}</span>)}
        </div>
    )
}

export default Paginator;
