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

import Swal from 'sweetalert2'

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La contraseña debe tener al menos 8 caracteres',
        confirmButtonText: 'Ok'
      })
      password.focus()
      return false
    }
    if ( password.value.trim().length > 20 ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La contraseña no puede tener más de 20 caracteres',
        confirmButtonText: 'Ok'
      })
      password.focus()
      return false
    }

    if ( password.value !== passwordConfirm.value ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Ok'
      })
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Ok'
      })
      password.focus()
      setCustomizationStep(false)
      return
    }
    
    if ( emailValue === '' || passwordValue === '' || passwordConfirmValue === '' ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor completa todos los campos',
        confirmButtonText: 'Ok'
      })
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
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El email ya está en uso',
            confirmButtonText: 'Ok'
          })
          email.focus()
          
          setCustomizationStep(false)
          return
        }

        if ( response.status === 400 ) {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal, por favor intenta de nuevo',
            confirmButtonText: 'Ok'
            })
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
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El email ya está en uso',
            confirmButtonText: 'Ok'
            })
          email.focus()
          
          setCustomizationStep(false)
          return
        }
        if ( error?.code == 'ERR_NETWORK' ) {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal, por favor intenta de nuevo',
            confirmButtonText: 'Ok'
            })
          setCustomizationStep(false)
          return
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal, por favor intenta de nuevo',
          confirmButtonText: 'Ok'
        })
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor completa todos los campos',
        confirmButtonText: 'Ok'
      })
      return
    }
    if ( imageFile === '' ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor selecciona una imagen de perfil',
        confirmButtonText: 'Ok'
      })
      return
    }
    if ( selectedTags.length === 0 ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor selecciona al menos una etiqueta',
        confirmButtonText: 'Ok'
      })
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
    return true
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
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Algo salió mal, por favor intenta de nuevo.',
                  confirmButtonText: 'Ok'
                });
                return false;
            }

            login({ token }); // Guarda el token en el contexto de autenticación
            return true;
        } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salió mal, por favor intenta de nuevo.',
              confirmButtonText: 'Ok'
            });
            return false;
        }
    } catch (error) {
        console.error('Error en onRegisterUser:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal, por favor intenta de nuevo.',
          confirmButtonText: 'Ok'
        });
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal, por favor intenta de nuevo',
        confirmButtonText: 'Ok'
      })
      return
    }
    
  }

  async function onThirdPersoSubmit( data ) {
    const listOfImages = [ profilePhoto, ...data ]

    if ( listOfImages.length === 0 ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor selecciona al menos una imagen',
        confirmButtonText: 'Ok'
      })
      return
    }

    if ( signUpEmail === '' || signUpPassword === '' || fullName === '' || birthdate === '' ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor completa todos los campos',
        confirmButtonText: 'Ok'
      })
      return
    }

    try {
      const serials = listOfImages.map( ( image ) => {
        const imgRes = fromURLtoB64( image )
        console.log( 'imgRes', imgRes )
        if (imgRes.startsWith('data:text/html')) {
          console.warn('Skipping image as it is of type HTML:', imgRes);
          return null;
        }
        return imgRes
      }).filter((serial) => serial !== null);

      if ( serials.length === 0 ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor selecciona al menos una imagen',
          confirmButtonText: 'Ok'
        })
        return
      }
  
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal, por favor intenta de nuevo',
        confirmButtonText: 'Ok'
      })
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