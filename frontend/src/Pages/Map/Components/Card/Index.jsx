import styles from './Card.module.css'
import CardImageSlider from '../CardImageSlider/index.jsx'
import CardHeader from '../CardHeader/index.jsx'
import CardButton from '../CardButton/index.jsx'

import Tag from '../Tag/index.jsx'
import likeImage from '../../../../../public/Graphics/Icons/like.png'
import chatBubble from '../../../../../public/Graphics/Icons/chat_bubble.png'

export default function Card({ 
  title, 
  address, 
  img, 
  showingState, 
  showMoreHandler, 
  showLessHandler, 
  roomsNumber, 
  onSale,
  tags, 
  rooms 
}) {
	return (
		<article className={ `${ styles[`card-article`] } ${ ( showingState >= 2) ? styles[`card-article--full`] : '' }` }>
      <CardImageSlider Title={ title } img={ img } />

			<section className={ styles[`card-description`] }>
        <CardHeader title={ title } address={ address } roomsNumber={ roomsNumber } onSale={ onSale } />
        {
          showingState >= 2 &&
          ( 
            <>
              <section className={ styles[`card__tags`] }>
                { tags?.map((tag) => ( <Tag key={ tag } tag={ tag } /> ) ) }
              </section>
              
              <section className={ styles[`card__options`] }>
                <CardButton>
                  <img src={ chatBubble } alt="Chatear con el ofertante" />
                </CardButton>
                <CardButton>Email?</CardButton>
                <CardButton>
                  <img src={ likeImage } alt="Guardar en favoritos" />
                </CardButton>
                <CardButton>Compartir</CardButton>
              </section>

              <section className={ styles[`card__rooms-section`] }>
                <h2>Habitaciones</h2>
                <section className={ styles[`card__rooms`] }>
                  { rooms?.map((room, i) => (
                    <figure 
                      key={ `room-${ i }--home` }
                      className={ `${ styles[`card__room`] } ${ (room.room_ocupied) ? styles[`card__room--ocupied`] : '' }` }
                      >
                      <h3 className={ styles[`card__room-name`] } >{ `Habitación ${ i + 1 }` }</h3>
                      <img 
                        src={ room.img } 
                        alt={ room.room_name } 
                        className={ styles[`card__room-img`] }
                        />
                    </figure>
                  )) }
                </section>
              </section>
            </>
          )
        }
        <section className={ styles[`card__showing-options`] }>
          <button onClick={ showMoreHandler }>Ver más</button>
          <button onClick={ showLessHandler }>Mostrar menos</button>
        </section>
			</section>

		</article>
	)
}
