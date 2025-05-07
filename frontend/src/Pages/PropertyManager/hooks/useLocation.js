import { useState } from "react"

export default function useLocation() {
    const [propertyLocation, setPropertyLocation] = useState('');
    const [propertyCoordinates, setPropertyCoordinates] = useState({});
    
    function handlePropertyLocationChange(e) {
        setPropertyLocation(e.target.value);
    }
    function handleCoordinatesChange(coordinates, readableLoc) {
        setPropertyCoordinates( coordinates );
        setPropertyLocation( readableLoc );
    }

    return {
        propertyLocation,
        propertyCoordinates,
        setPropertyLocation,
        setPropertyCoordinates,
        handlePropertyLocationChange,
        handleCoordinatesChange
    }
}
