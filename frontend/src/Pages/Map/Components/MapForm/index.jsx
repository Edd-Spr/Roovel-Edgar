import styles from './MapForm.module.css';

export default function Index({ 
  options,
  alreadySelected,
	searchBarValue,
	inputPlaceholder, 
	onSubmit, 
	submitMessage,
	onSearchBarUpdate,
  onOptionSelected
}) {
  return (
    <form 
		className={ styles['map-form'] }
		onSubmit={ onSubmit }
	>
		<input 
			className={ styles['map-form__input'] }
			type="text" 
			name="map-form__place" 
			value={ searchBarValue }
			onChange={ onSearchBarUpdate }
			placeholder={ inputPlaceholder }
			id="map-form__place"
		/>

    {
      ( !alreadySelected && (options && options.length > 0) ) && (      
        <section
          className={ styles['map-form__select'] }
          id="map-form__select" name="map-form__select">
          { options.map( (option, index) => {
            return (
              <div
                className={ styles['map-form__option'] }
                key={ `map-form__option--${ index }` } 
                id={`map-form__option--${ option.display_name }`}
                value={ option.display_name } 
                onClick={ onOptionSelected }
              >{ option.display_name }</div>
            )
          })}
        </section>
      )
    }


		<button 
			className={ styles['map-form__button'] }
			type="submit"
		>{ submitMessage }</button>
	</form>
  )
}
