import styles from './CardHeader.module.css'

export default function index({ title, address, roomsNumber, onSale }) {
  return (
    <section className={ styles[`card-header`] }>
			<section className={ styles[`card-header__location`] }>
				<h3>{ title }</h3>
				<p>{ address }</p>
			</section>

			{
				(roomsNumber && !onSale ) ?
				(
					<section className={ styles[`card-header__logistics`] }>
						<h4>{ roomsNumber }</h4>
						<p>{ ( roomsNumber > 1 ) ? `Habitaciones libres` : `Habitación libre` }</p>
					</section>
				) : null
			}
			{
				( onSale ) ? <p>traka, todo en uno</p> : null
			}
		</section>
  )
}