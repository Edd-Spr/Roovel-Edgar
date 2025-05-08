import Styles from './Authentication.module.css'
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import ProfileCustomization from '../../Components/ProfileCustomization/ProfileCustomization';
import UserType from './Components/UserType';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { fromURLtoB64, apiRequest } from '../../utils';
import { API_URL_AUTH } from '../../env';

const Authentication = () => {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const signup = searchParams.get('signup');

  const [signInSignUp, setSignInSignUp] = useState( signup === 'true' ? false : true);
  const [authenticationIsLoading, setAuthenticationIsLoading] = useState(false);
  const [customizationStep, setCustomizationStep] = useState(false);

  const [ signUpEmail, setSignUpEmail ] = useState('')
  const [ signUpPassword, setSignUpPassword ] = useState('')
  const [ userType, setUserType ] = useState(0)// 0 = user, 1 = host
  const [ choosingRole, setChoosingRole ] = useState( false )

  const [ fullName, setFullName ] = useState('')
  const [ birthdate, setBirthdate ] = useState('')
  const [ gender, setGender ] = useState('')
  const [ pronouns, setPronouns ] = useState('')
  const [ lookingForDescription, setLookingForDescription ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ tags, setTags ] = useState([])
  const [ profilePhoto, setProfilePhoto ] = useState('')

  // if the user is looking for a roomie, the profile is public
  // roomie = public ( 1 )
  // room/home = private ( 2 )
  // both = public ( 3 )
  const [ isProfilePrivate, setIsProfilePrivate ] = useState(false)
  const [ userPics, setUserPics ] = useState([])

  const signInUpHandler = (e) => {
    e.preventDefault();
    setSignInSignUp(!signInSignUp);
  }

  function matchingPasswords(password, passwordConfirm){
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

    if ( password.value !== passwordConfirm.value ) {
      alert('Las contraseñas no coinciden')
      password.focus()
      return false
    }
    return true
  }

  function onFirstSUSubmit(e){
    e.preventDefault();

    const [ email, password, _, passwordConfirm ] = e.target
    const emailValue = email.value
    const passwordValue = password.value
    const passwordConfirmValue = passwordConfirm.value

    if ( !matchingPasswords(password, passwordConfirm) ) {
      alert('Las contraseñas no coinciden')
      password.focus()
      setCustomizationStep(false)
      return
    }
    
    if ( emailValue === '' || passwordValue === '' || passwordConfirmValue === '' ) {
      alert('Por favor completa todos los campos')
      email.focus()
    }

    async function validateEmail() {
      return apiRequest('get', `${ API_URL_AUTH }/validate-email?user_email=${ emailValue }`)
    }

    (async () => {
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
          setSignInSignUp(false)
          // setCustomizationStep(true)
          setChoosingRole(true)
        }
      } catch (error) {
        console.error(error)
        if ( error?.response?.status === 409 ) {
          alert('El email ya está en uso')
          email.focus()
          
          setCustomizationStep(false)
          return
        }
        if ( error?.code == 'ERR_NETWORK' ) {
          alert('Algo salió mal, por favor intenta de nuevo')
          setCustomizationStep(false)
          return
        }
        alert('Algo salió mal, por favor intenta de nuevo')
        setCustomizationStep(false)
        return
      }
    })
    ()

    setSignUpEmail(emailValue)
    setSignUpPassword(passwordValue)
    setUserType(0)
    setAuthenticationIsLoading( false )
  }

  function onFirstPersoSubmit(e, data) {
    e.preventDefault();
    const { imageFile, selectedTags, gender, pronouns } = data

    const fullName = e.target.form[0].value
    const birthdate = e.target.form[1].value
    const lookingForDescription = e.target.form[4].value
    const description = e.target.form[5].value

    if ( fullName === '' || birthdate === '' || lookingForDescription === '' || description === '' ) {
      alert('Por favor completa todos los campos')
      return
    }
    if ( imageFile === '' ) {
      alert('Por favor selecciona una imagen de perfil')
      return
    }
    if ( selectedTags.length === 0 ) {
      alert('Por favor selecciona al menos una etiqueta')
      return
    }

    setFullName(fullName)
    setBirthdate(birthdate)
    setTags(selectedTags)
    setGender(gender)
    setPronouns(pronouns)
    setProfilePhoto(imageFile)
    setLookingForDescription(lookingForDescription)
    setDescription(description)
  }

  function handleUserTypeChoice( type ) {
    setUserType( type )
    setChoosingRole( false )
    setCustomizationStep( true )
  }

  function onSecondPersoSubmit( option ) {
    setIsProfilePrivate( option === 2 )
  }

  async function onRegisterUser() {
    try {
        const response = await apiRequest('post', `${API_URL_AUTH}/register`, {
          user_email: signUpEmail,
          user_pass: signUpPassword,
          user_name: fullName,
          user_birthdate: birthdate,
          user_is_host: Boolean(userType),
        });

        if (response.status === 201) {
            const { token } = response.data; // Extrae el token del objeto

            if (!token) {
                console.error('El servidor no devolvió un token válido.');
                alert('Algo salió mal, por favor intenta de nuevo.');
                return false;
            }

            login({ token }); // Guarda el token en el contexto de autenticación
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

  async function onSaveProfile( data ) {
    const response = await apiRequest('post', `${ API_URL_AUTH }/profile`, {
      user_is_private: isProfilePrivate, 
      user_description: description, 
      user_personal_statement: lookingForDescription, 
      user_gender: gender, 
      user_pronouns: pronouns, 
      user_tags: tags,
      user_pics: data.imgs
    }, undefined, true)

    if ( response.status === 201 ) {
      return true
    } else {
      alert('Algo salió mal, por favor intenta de nuevo')
      return
    }
    
  }

  async function onThirdPersoSubmit( data ) {
    const listOfImages = [ profilePhoto, ...data ]

    if ( listOfImages.length === 0 ) {
      alert('Por favor selecciona al menos una imagen')
      return
    }

    if ( signUpEmail === '' || signUpPassword === '' || fullName === '' || birthdate === '' ) {
      alert('Por favor completa todos los campos')
      return
    }

    try {
      const serials = listOfImages.map( ( image ) => {
        return fromURLtoB64( image )
      })
  
      const registerUser = await onRegisterUser()
      if ( !registerUser ) return
  
      const imgs = await Promise.all( serials )
      const filteredImgs = imgs.filter( ( img ) => img !== null )
  
      const saveProfile = onSaveProfile( { imgs: filteredImgs } )
      if ( !saveProfile ) return
      
      setAuthenticationIsLoading( false )
      setCustomizationStep(false)
      setSignInSignUp(true)
      return true
    } catch (error) {
      console.error('Error in onThirdPersoSubmit:', error)
      alert('Algo salió mal, por favor intenta de nuevo')
      return
    }
  }

  return (
    <main className={Styles.authentication}>
      <article className={Styles.mainBoxContainer}>
        <AnimatePresence exitBeforeEnter>
          { ( !customizationStep && !choosingRole ) && (
            <>
              <motion.div
                key="signIn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <SignIn 
                  signInSignUp={signInSignUp} 
                  signInUpHandler={signInUpHandler}
                  authenticationIsLoading={authenticationIsLoading}
                  setAuthenticationIsLoading={setAuthenticationIsLoading}
                />
              </motion.div>
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
              <motion.div
                key="signUp"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <SignUp 
                  signInSignUp={signInSignUp} 
                  onSubmit={ onFirstSUSubmit }
                  goSignIn={ signInUpHandler }
                  authenticationIsLoading={authenticationIsLoading}
                />
              </motion.div>
            </>
          )}
          {
            ( customizationStep && !choosingRole ) && (
            <ProfileCustomization 
              userType={ userType }
              onFirstSubmit={ onFirstPersoSubmit }
              onSecondSubmit={ onSecondPersoSubmit }
              onThirdSubmit={ onThirdPersoSubmit }
              key="profileCustomization" />
            )
          }
          {
            ( !customizationStep && choosingRole ) && (
            <UserType onSubmit={ handleUserTypeChoice } />
          )
          }
        </AnimatePresence>
      </article>
    </main>
  );
};

export default Authentication;