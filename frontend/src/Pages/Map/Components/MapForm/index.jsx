import styles from './MapForm.module.css';

export default function Index({ onSubmit, inputPlaceholder, submitMessage }) {
  return (
    <form 
			className={ styles['map-form'] }
			onSubmit={ onSubmit }
		>
			<input 
				className={ styles['map-form__input'] }
				type="text" 
				name="map-form__place" 
				placeholder={ inputPlaceholder }
				id=""
			/>
			<button 
				className={ styles['map-form__button'] }
				type="submit"
			>{ submitMessage }</button>
		</form>
  )
}
