import {FilterType} from "../../../redux/users-reducer";
import React, {FC} from "react";
import {Field, Form, Formik} from "formik";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../../redux/users-selectors";

const userSearchFormValidate = (value: any) => {
    const errors = {}

    return errors
}
type Friend = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friend: Friend
}
type Propstype = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm: FC<Propstype> = React.memo(({onFilterChanged}) => {
    const filter = useSelector(getUsersFilter)
    const submit = (values: FormType, {setSubmitting}: {
        setSubmitting: (isSubmitting: boolean) => void
    }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false

        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as Friend}}
            validate={userSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})