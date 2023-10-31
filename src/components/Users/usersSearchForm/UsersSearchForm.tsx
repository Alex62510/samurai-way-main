import {FilterType} from "../../../redux/users-reducer";
import React, {FC} from "react";
import {Field, Form, Formik} from "formik";

const userSearchFormValidate = (value: any) => {
    const errors = {}

    return errors
}
type Propstype = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm: FC<Propstype> = React.memo(({onFilterChanged}) => {
    const submit = (values: FilterType, {setSubmitting}: {
        setSubmitting: (isSubmitting: boolean) => void
    }) => {
        onFilterChanged(values)
        setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: null}}
            validate={userSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="red">All</option>
                        <option value="green">Only followed</option>
                        <option value="blue">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})