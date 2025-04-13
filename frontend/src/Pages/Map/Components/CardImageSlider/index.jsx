import styles from './CardImageSlider.module.css';
import rightArrow from '../../../../../public/Graphics/Icons/arrow_forward.png';
import leftArrow from '../../../../../public/Graphics/Icons/arrow_back.png';

export default function CardImageSlider({ Title, img, onPrevious, onNext, currentImgIndex }) {
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
				className={ styles[`card-image`] }
				src={ img } 
				alt={`${ Title } : Imagen ${ currentImgIndex + 1 }`} 
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
