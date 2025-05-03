import { useState } from "react";

export default function useInfoProperty() {
    const [propertyName, setPropertyName] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [propertyPrice, setPropertyPrice] = useState('');
    const [propertyDescription, setPropertyDescription] = useState('');
    const [propertyTags, setPropertyTags] = useState([]);

    function handlePropertyNameChange(e) {
        setPropertyName(e.target.value);
    }

    function handlePropertyTypeChange(e) {
        setPropertyType(e.target.value);
    }

    function handlePropertyPriceChange(e) {
        setPropertyPrice(e.target.value);
    }

    function handlePropertyDescriptionChange(e) {
        setPropertyDescription(e.target.value);
    }

    function handleTagsChange(e) {
        e.preventDefault();
        const tagValue = e.target.value;

        setPropertyTags((prev) =>
            prev.includes(tagValue) ? prev.filter((n) => n !== tagValue) : [...prev, tagValue]
        );
    }
    
    return {
        propertyName,
        propertyType,
        propertyPrice,
        propertyDescription,
        propertyTags,
        handlePropertyNameChange,
        handlePropertyTypeChange,
        handlePropertyPriceChange,
        handlePropertyDescriptionChange,
        handleTagsChange
    }
}
