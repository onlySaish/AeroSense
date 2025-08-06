import React from 'react'
import ForgotPassword from '../features/auth/components/ForgotPassword';
import Popup from '../features/PopupBar'
import Loader from '../features/Loader'

function ForgotPasswordPage() : React.JSX.Element {
  return (
    <>
      <Popup/>
      <Loader/>
      <ForgotPassword/>
    </>
  )
}

export default ForgotPasswordPage