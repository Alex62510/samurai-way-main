import React, {FC} from 'react';
import {ApiUsersType, FilterType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {Formik, Form, Field} from "formik";

export type UsersPropsType = {
    totalItemsCount: number
    pageSize: number
    usersPage: ApiUsersType
    currentPage: number
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    followInProgress: number[]
}

const Users: FC<UsersPropsType> = ({
                                       usersPage,
                                       onPageChanged,
                                       pageSize,
                                       totalItemsCount,
                                       currentPage,
                                       followInProgress,
                                       follow,
                                       unfollow,
                                       ...props
                                   }) => {
    const portionSize = 10
    return (
        <div>
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
            <Paginator
                portionSize={portionSize}
                onPageChanged={onPageChanged}
                pageSize={pageSize}
                currentPage={currentPage}
                totalItemsCount={totalItemsCount}
            />
            {usersPage.map((u, index) =>
                <div key={u.id}>
                    <User user={u} unfollow={unfollow} follow={follow} followInProgress={followInProgress}/>
                </div>
            )
            }
        </div>
    );
}
const userSearchFormValidate = (value: any) => {
    const errors = {}

    return errors
}
type Propstype = {
    onFilterChanged: (filter: FilterType) => void
}
const UsersSearchForm: FC<Propstype> = ({onFilterChanged}) => {
    const submit = (values: FilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        onFilterChanged(values)
    }

    return <div>
        <Formik
            initialValues={{term: ''}}
            validate={userSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}
export default Users