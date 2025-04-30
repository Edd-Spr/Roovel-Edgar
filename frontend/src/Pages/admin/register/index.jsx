import Styles from './Authentication.module.css'
import SignUp from './sign-up';
import AdminProfileCustomization from '../AdminProfileCustomization';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';

import { useAuth } from '../../../hooks/auth';

import { apiRequest } from '../../../utils/api';
import { API_URL_AUTH } from '../../../env';

const Authentication = () => {
  const { login } = useAuth();

  const [authenticationIsLoading, setAuthenticationIsLoading] = useState(false);
  const [customizationStep, setCustomizationStep] = useState(false);

  const [ signUpEmail, setSignUpEmail ] = useState('')
  const [ signUpPassword, setSignUpPassword ] = useState('')

  const [ fullName, setFullName ] = useState('')
  const [ birthdate, setBirthdate ] = useState('')
  const [ gender, setGender ] = useState('')
  const [ pronouns, setPronouns ] = useState('')
  const [ profilePhoto, setProfilePhoto ] = useState('')

  function enoughLength( password ){
    if ( password.value.trim().length < 8 ) {
      alert('La contraseña debe tener al menos 8 caracteres')
      password.focus()
      return false
    }
    if ( password.value.trim().length > 20 ) {
      alert('La contraseña no puede tener más de 20 caracteres')
      password.focus()
      return false
    }
    return true
  }

  function passwordValidation( password, passwordConfirm ){
    const res = enoughLength( password )
    const res2 = matchingValues( password, passwordConfirm )

    if ( !res || !res2 ) {
      alert('La contraseña no es válida')
      password.focus()
      return false
    }
    return true
  }

  function matchingValues( val, valConfirm ){
    if ( val.value !== valConfirm.value ) {
      alert('Los valores no coinciden')
      val.focus()
      return false
    }
    return true
  }
  
  async function validateEmail() {
    return apiRequest('get', `${ API_URL_AUTH }/validate-email?user_email=${ emailValue }`)
  }

  async function emailValidation( email ) {
    try {
      setAuthenticationIsLoading( true )
      const response = await validateEmail()

      if ( response.status === 409 ) {
        alert('El email ya está en uso')
        email.focus()
        
        setCustomizationStep(false)
        return
      }

      if ( response.status === 400 ) {
        alert('Algo salió mal, por favor intenta de nuevo')
        email.focus()

        setCustomizationStep(false)
        return
      }

      if ( response.status === 200 ) {
        setCustomizationStep(true)
      }
    } catch (error) {
      console.error(error)
      if ( error.response.status === 409 ) {
        alert('El email ya está en uso')
        email.focus()
        
        setCustomizationStep(false)
        return
      }
      alert('Algo salió mal, por favor intenta de nuevo')
      setCustomizationStep(false)
      return
    }
  }
  
  function onSignUpSubmit(e){
    e.preventDefault();

    const [ email, password, _, passwordConfirm, __, pin, ___, pinConfirm ] = e.target
    const emailValue = email.value
    const passwordValue = password.value
    const passwordConfirmValue = passwordConfirm.value
    const pinValue = pin.value
    const pinConfirmValue = pinConfirm.value

    if ( !passwordValidation(password, passwordConfirm) ) {
      alert('La contraseña no es valida')
      password.focus()
      setCustomizationStep(false)
      return
    }

    if ( !matchingValues(pin, pinConfirm) ) {
      alert('Los valores no coinciden')
      pin.focus()
      setCustomizationStep(false)
      return
    }
    
    if ( emailValue === '' || passwordValue === '' || passwordConfirmValue === '' ) {
      alert('Por favor completa todos los campos')
      email.focus()
    }


    return setCustomizationStep(true);
    (async () => {
      emailValidation( email )
    })
    ()

    setSignUpEmail( emailValue )
    setSignUpPassword( passwordValue )
    setAuthenticationIsLoading( false )
  }
  
  function fromURLtoB64( url ) {
    const fetchAndConvert = async () => {
      const response = await fetch( url );
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL( blob );

      return new Promise( ( resolve ) => {
        reader.onloadend = () => {
          resolve( reader.result );
        };
        reader.onerror = ( error ) => {
          console.error( 'Error converting URL to base64:', error );
          resolve( null );
        }
      });
    }

    return fetchAndConvert()
  }

  function onPersoSubmit(e, data) {
    e.preventDefault();
    alert('oa')
    const { imageFile, gender, pronouns } = data

    if ( !imageFile || !gender || !pronouns ) {
      alert('Asegurate de llenar todos los campos')
      return false
    }

    const fullName = e.target.form[0].value
    const birthdate = e.target.form[1].value

    setFullName(fullName)
    setBirthdate(birthdate)
    setGender(gender)
    setPronouns(pronouns)
    setProfilePhoto( fromURLtoB64( imageFile ) )
  }


  async function onSubmit() {
    try {
      const response = await apiRequest('post', `${API_URL_AUTH}/register`, {
        user_email: signUpEmail,
        user_pass: signUpPassword,
        // TODO: implement user_type and user_pin in the backend
        user_name: fullName,
        user_birthdate: birthdate,
      });

      if (response.status === 201) {
        const { token } = response.data; // Extrae el token del objeto

        if (!token) {
          console.error('El servidor no devolvió un token válido.');
          alert('Algo salió mal, por favor intenta de nuevo.');
          return false;
        }

        login({ token }); // Guarda el token en el contexto de autenticación
        const res = onSaveProfile()
        
        // TODO: update http code for consistency
        if ( res.status !== 200 ) {
          alert('Algo salió mal, por favor intenta de nuevo.')
          return
        }

        if ( res.status === 200) {
          // TODO: Redirects
          return
        }
        
        return true;
      } else {
        alert('Algo salió mal, por favor intenta de nuevo.');
        return false;
      }
    } catch (error) {
      console.error('Error en onRegisterUser:', error);
      alert('Algo salió mal, por favor intenta de nuevo.');
      return false;
    }
  }

  async function onSaveProfile() {
    const response = await apiRequest('post', `${ API_URL_AUTH }/profile`, {
      user_gender: gender, 
      user_pronouns: pronouns,
      user_pics: profilePhoto
    }, undefined, true)

    if ( response.status === 201 ) {
      return true
    } else {
      alert('Algo salió mal, por favor intenta de nuevo')
      return
    }
    
  }

  return (
    <main className={Styles.authentication}>
      <article className={Styles.mainBoxContainer}>
        <AnimatePresence exitBeforeEnter>
          {customizationStep === false ? (
            <>
              <motion.section
                key="photoTitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={Styles.photoTitleAuthenticationContainer}
              >
                <img 
                  src="/Graphics/authentication-photo.png" 
                  alt="" 
                  draggable="false"
                  className={Styles.photoTitleAuthentication}
                />
                <div className={Styles.blurphotoTitleAuthentication}></div>
                <p className={Styles.titleImageAuthentication}>
                  <span className={Styles.logoTitle}>Roovel</span><br />
                  Tu próximo roomie a un click de distancia
                </p>
              </motion.section>
              <SignUp 
                onSubmit={ onSignUpSubmit }
                loading={ authenticationIsLoading }
              />
            </>
          ) : (
            <AdminProfileCustomization
              onSubmit={ onPersoSubmit }
              key="profileCustomization" />
          )}
        </AnimatePresence>
      </article>
    </main>
  );
};

export default Authentication;