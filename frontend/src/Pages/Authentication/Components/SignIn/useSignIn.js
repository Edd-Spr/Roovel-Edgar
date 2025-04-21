import { apiRequest } from '../../../../utils/api';
import { useState } from 'react';

import { useAuth } from '../../../../hooks/auth';

import { API_URL } from '../../../../env';

export default function useSignIn() {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const signIn = async (e) => {
    e.preventDefault()
    const [ email, password ] = e.target.elements

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await apiRequest('post', `${ API_URL }/auth/login`, { user_email: email.value, user_pass: password.value }, {}, false)

      if ( response.status === 200 ) {
        setLoading(false)
        setSuccess(true)
        setError(null)
        const { token } = response.data
        login( { token } )
      }

      return 
    } catch (error) {
      setError(error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  
  return {
    loading,
    error,
    success,
    signIn
  }
}
