import styles from './CardImageSlider.module.css';
import rightArrow from '../../../../../public/Graphics/Icons/arrow_forward.png';
import leftArrow from '../../../../../public/Graphics/Icons/arrow_back.png';

export default function index({ Title, img, onPrevious, onNext }) {
  return (
    <figure className={ styles[`card-figure`] }>
			<button 
				className={ `${ styles[`card-button`] } ${ styles[`card-back`] }` } 
				onClick={ onPrevious }
				>
				<img 
					className={ styles[`card-arrow`] }
					src={ leftArrow }
					alt='back'
				/>
			</button>
			<img 
				className=''
				src={ img } 
				alt={`${ Title } : Imagen {i}`} 
			/>
			<button 
				className={ `${ styles[`card-button`] } ${ styles[`card-forward`] }` }
				onClick={ onNext }
				>
				<img 
					className={ styles[`card-arrow`] }
					src={ rightArrow }
					alt='back'
				/>
			</button>
		</figure>
  )
}
