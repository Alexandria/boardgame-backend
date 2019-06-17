import * as yup from 'yup'

const loginSchema = yup.object().shape({
    email: yup.string()
        .email()
        .min(5)
        .required("You must enter a valid email address"),
    password: yup.string().min(5).required("You must enter a password")
})

export const validateLogin = (login: Request) => {
    return loginSchema.validate(login)
}