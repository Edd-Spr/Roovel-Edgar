import styles from './CardHeader.module.css'

export default function index({ title, address, roomsNumber }) {
  return (
    <section className={ styles[`card-header`] }>
			<section className={ styles[`card-header__location`] }>
				<h3>{ title }</h3>
				<p>{ address }</p>
			</section>

			{
				roomsNumber &&
				(
					<section className={ styles[`card-header__logistics`] }>
						<h4>{ roomsNumber }</h4>
						<p>Habitaciones</p>
					</section>
				)
			}
		</section>
  )
}