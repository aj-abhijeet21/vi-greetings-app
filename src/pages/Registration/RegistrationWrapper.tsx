import React from 'react'
import DesktopView from '../../components/DesktopView'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { RegistrationFormType, RegistrationSchema, initValues } from './FormHelper'
import { useNavigate } from 'react-router-dom'

function RegistrationWrapper() {
  const navigate = useNavigate()

  // navigate to profile page after success
  const handleSubmit = (values: RegistrationFormType) => {
    navigate('/profile', { state: { ...values } })
  }
  return (
    <>
      <div className='invisible md:visible'>
        <DesktopView />
      </div>
      <div className='text-xl md:invisible flex-col h-screen justify-start p-4'>
        <div className='text-3xl text-primary mt-8'>Registration Details</div>
        <div className='text-left p-4'>
          <Formik
            initialValues={initValues}
            validationSchema={RegistrationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <label htmlFor='Name' className='text-lg text-black text-left mb-2'>
                Name
              </label>
              <Field
                type='text'
                name='name'
                className='text-lg border-gray-300 border-2 rounded-md w-full mb-2 px-2'
              />
              <div className='text-primary text-sm mb-2'>
                <ErrorMessage name='name' />
              </div>{' '}
              <label htmlFor='City' className='text-lg text-black text-left mb-2'>
                City
              </label>
              <Field
                type='text'
                name='city'
                className='text-lg border-gray-300 border-2 rounded-md w-full mb-2 px-2'
              />
              <div className='text-primary text-sm mb-2'>
                <ErrorMessage name='city' />
              </div>
              <label htmlFor='Email' className='text-lg text-black text-left mb-2'>
                Email
              </label>
              <Field
                type='text'
                name='email'
                className='text-lg border-gray-300 border-2 rounded-md w-full mb-2 px-2'
              />
              <div className='text-primary text-sm mb-2'>
                <ErrorMessage name='email' />
              </div>
              <label htmlFor='Mobile' className='text-lg text-black text-left mb-2'>
                Mobile
              </label>
              <Field
                type='number'
                name='phone'
                className='text-lg border-gray-300 border-2 rounded-md w-full mb-2 px-2'
              />
              <div className='text-primary text-sm mb-2'>
                <ErrorMessage name='phone' />
              </div>
              <span className='text-left inline-flex'>
                <Field
                  type='checkbox'
                  name='tnc'
                  className='border-gray-400 border-2 text-lg mb-2'
                />
                <span className='text-lg text-black text-left ml-2'>
                  I agree to Terms and Conditions
                </span>
              </span>
              <div className='text-primary text-sm'>
                <ErrorMessage name='tnc' />
              </div>
              <div className='text-center mt-4'>
                <button
                  type='submit'
                  className='bg-secondary text-lg text-dark px-8 py-2 rounded-full text-center'
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  )
}

export default RegistrationWrapper
