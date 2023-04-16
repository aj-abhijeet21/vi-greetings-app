import * as Yup from 'yup'
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export type RegistrationFormType = {
  name: string
  city: string
  email: string
  phone: string
  tnc: boolean
}

export const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  city: Yup.string().required('City is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'Phone number too short')
    .max(10, 'Phone number  too long'),
  tnc: Yup.boolean().oneOf([true], 'You must agree to Terms and Conditions'),
})

export const initValues: RegistrationFormType = {
  name: '',
  city: '',
  email: '',
  phone: '',
  tnc: false,
}
