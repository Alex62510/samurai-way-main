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
export const UsersSearchForm: FC<Propstype> = ({onFilterChanged}) => {
    const submit = (values: FilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        onFilterChanged(values)
        setSubmitting(false)
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