import {FilterType} from "../../../redux/users-reducer";
import React, {FC} from "react";
import {Field, Form, Formik} from "formik";

const userSearchFormValidate = (value: any) => {
    const errors = {}

    return errors
}
type FormType={
    term:string
    friend:'true'|'false'|'null'
}
type Propstype = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm: FC<Propstype> = React.memo(({onFilterChanged}) => {
    const submit = (values: FormType, {setSubmitting}: {
        setSubmitting: (isSubmitting: boolean) => void
    }) => {
        const filter: FilterType = {
            term:values.term,
            friend:values.friend==="null"? null : values.friend==="true"? true : false

        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: "null"}}
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