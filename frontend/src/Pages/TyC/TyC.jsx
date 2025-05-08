import './TyC.css';
import NavBar from '../../Components/NavBar';
import NavProfile from '../../Components/NavProfile/NavProfile.jsx';

const TyC = () => {
  return (
    <div>
        <NavBar />
        <div className='tycPage'>
            <div className='left'>
                <div className='tycBar'>
                    <NavProfile />
                </div>
            </div>
            
            <div className='tyc'>
                
                
                <section className='tycContainer'>
                    <h1 className='tittle'>Términos y Condiciones</h1>
                    <h2 className='subtittle'>1. Información necesaria para usar Roovel</h2>
                    <p className='text'>De la recabación de datos personales</p>
                    <p className='text'>Recopilamos datos personales sobre usted cuando utiliza la Plataforma Roovel. Sin estos datos, es posible que no podamos proporcionar todos los servicios solicitados dentro de nuestra plataforma. Esta información incluye lo siguiente:</p>

                    <p className='text'>1.1 Información de Contacto, Cuenta y Perfil.</p>
                    <p className='text'>Tal como su nombre, apellidos, dirección postal, dirección de correo electrónico, fecha de nacimiento y fotografía, algunos de los cuales dependen de las características que utilice.</p>

                    <p className='text'>1.2 Información de Identidad.</p>
                    <p className='text'>Cuando corresponda, podemos solicitar una imagen de los documentos de identidad emitidos por el gobierno, pasaporte, tarjeta de identificación nacional, identificación fiscal o licencia de conducir (de acuerdo con las leyes aplicables) u otra información de verificación, como su fecha de nacimiento, dirección, dirección de correo electrónico o identidad digital, y/o una selfie cuando verifiquemos su identificación. Si se nos proporciona una copia de su identificación, obtendremos la información contenida en esta misma.</p>

                    <p className='text'>1.3 Información de Geolocalización.</p>
                    <p className='text'>Como su ubicación precisa o aproximada, determinada a partir de la dirección IP, el GPS de su celular u otro dispositivo, u otra información que comparta con nosotros, dependiendo de la configuración de su dispositivo.</p>
                </section>

                <section className='tycContainer'>
                    <h2 className='subtittle'>2. Información de cargos por servicio</h2>
                    <p className='text'>De la comisión por arrendar en nuestra plataforma</p>
                    <p className='text'>2.1 Toda la tarifa se resta del cobro que recibe el anfitrión. Esto se basa en los siguientes porcentajes dependiendo el tipo de sitio en alquiler: la tarifa por arrendamiento de una casa en su totalidad desde nuestra plataforma tiene un cargo del 12%, el cargo por alquilar un departamento es del 10% y por una habitación del 8%. Esta tarifa es obligatoria para los establecimientos antes mencionados.</p>
                </section>

                <section className='tycContainer'>
                    <h2 className='subtittle'>3. Políticas de publicación de alquileres</h2>
                    <p className='text'>Cuando usted acepta una solicitud de arrendamiento o recibe una confirmación de reservación a través de la Plataforma Roovel, usted está teniendo un contrato directamente con el arrendatario y es responsable de brindar el servicio de arrendador en los términos y al precio especificados en su publicación. Usted también acepta pagar las tarifas aplicables, como la tarifa de cargos por servicio.</p>
                    <p className='text'>3.1 Creación y administración de su anuncio</p>
                    <p className='text'>La plataforma Roovel ofrece herramientas que le ayudarán a configurar y administrar un anuncio. El anuncio debe incluir información completa y precisa sobre su inmueble en alquiler, su precio (incluidos cargos adicionales) y cualquier norma o requisito aplicable a sus huéspedes o a su anuncio. Usted es responsable de sus actos u omisiones, así como de mantener la información de su anuncio (incluida la disponibilidad del inmueble) y el contenido (como las fotos) actualizados y precisos en todo momento. Usted puede mantener solo un anuncio por alojamiento, sin embargo, podría tener varios anuncios para una sola propiedad si esta tiene varios espacios para compartir (renta de habitaciones individuales).</p>
                </section>

                <section className='tycContainer'>
                    <h2 className='subtittle'>4. Obligaciones Legales</h2>
                    <p className='text'>Usted es responsable de comprender y cumplir con todas las leyes, normas, reglamentos y contratos con terceros que se apliquen a su anuncio o servicios de arrendador. Por ejemplo: algunos propietarios y/o contratos, o reglas de asociación de propietarios y condominios, restringen o prohíben el subarrendamiento, o bien la prestación de alquiler de propiedades para estancias cortas y/o largas.</p>
                    <p className='text'>Algunas ciudades tienen leyes de zonificación u otras leyes similares que restringen el compartir espacios en zonas residenciales para estancias cortas. Algunas jurisdicciones exigen que los arrendadores se inscriban en un registro, obtengan un permiso o licencia antes de prestar determinados servicios de renta de alquileres.</p>
                    <p className='text'>En algunos lugares, es posible que los servicios de arrendador que desea ofrecer estén prohibidos por completo. Algunas jurisdicciones exigen que registre a los arrendatarios que se queden en su alojamiento. Algunas jurisdicciones tienen leyes que crean derechos de arrendamiento para los huéspedes y obligaciones adicionales para los arrendadores.</p>
                </section>
            </div>
        </div>
    </div>
  );
};

export default TyC;
