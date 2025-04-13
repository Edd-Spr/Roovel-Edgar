import { useState, useEffect } from "react"

export default function useCard( imgs ) {
	const [ images, setImages ] = useState(imgs)
  	const [ currentImgIndex, setCurrentImgIndex ] = useState(0)
	const [ currentImg, setCurrentImg ] = useState('')

	function onPrevious() {
		setCurrentImgIndex( currentImgIndex - 1)
		if ( currentImgIndex <= 0 ) setCurrentImgIndex( images.length - 1 )
	}
	function onNext() {
		setCurrentImgIndex( currentImgIndex + 1 )
		if ( currentImgIndex >= images?.length - 1 ) setCurrentImgIndex( 0 )
	}

	useEffect(() => {
		if ( images?.length > 0 ) setCurrentImg(images[currentImgIndex])
	}, [ images, currentImgIndex ])

	useEffect(() => {
		if ( imgs?.length > 0 ) setImages(imgs)
	}, [ imgs ])

  return {
		currentImgIndex,
		currentImg,
		onPrevious,
		onNext,
	}
}
