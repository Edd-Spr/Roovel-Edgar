import { useState, useEffect } from "react";
import axios from "axios";

import { useMap as useMapLeaflet, useMapEvents } from "react-leaflet";

export default function useMap(vagueReadableDirection) {
  const [position, setPosition] = useState([0, 0]); // 20.6597586, -103.324082
  const [readableDirection, setReadableDirection] = useState(vagueReadableDirection || "");
  const [home, setHome] = useState({});
  const [searched, setSearched] = useState(false);

  const [dirTyped, setDirTyped] = useState(vagueReadableDirection);
  const [possiblePlaces, setPossiblePlaces] = useState([]);

  async function getReadableDirection(position) {
    const url = "https://nominatim.openstreetmap.org/reverse";
    const params = `format=json&lat=${position[0]}&lon=${position[1]}&zoom=18&addressdetails=1`;
    const response = await axios.get(`${url}?${params}`);

    if (response && response.data) return response.data.display_name;
  }

  async function getSimilarPlaces(readable_location) {
    const url = "https://nominatim.openstreetmap.org/search";
    const params = `q=${readable_location}&format=json&addressdetails=1`;
    const response = await axios.get(`${url}?${params}`);

    if (response && response.data) return response.data;
  }

  async function getLatLng(readable_location) {
    const url = "https://nominatim.openstreetmap.org/search";
    const params = `q=${readable_location}&format=json`;
    const response = await axios.get(`${url}?${params}`);

    if (response && response.data[0])
      return [response.data[0].lat, response.data[0].lon, response.data[0].display_name];
  }

  const eventHandlers = {
    click: (e) => {
      const { lat, lng } = e.latlng;

      if (lat === position[0] && lng === position[1]) return;

      (async () => {
        const display_name = await getReadableDirection([lat, lng]);
        setReadableDirection(display_name);
        setDirTyped(display_name);
        setSearched(true);
        setPosition([lat, lng]);
      })();

      // Aquí asumimos que setDisplayCard estaba definido antes. Si no, elimínalo o define la función.
      // setDisplayCard(1);
    },
  };

  function MapLocator() {
    const map = useMapLeaflet();
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        map.setView([lat, lng], map.getZoom());
        setPosition([lat, lng]);
        setReadableDirection(readableDirection);
      },
    });

    return null;
  }

  function SetViewOnUpdate() {
    const map = useMapLeaflet();
    useEffect(() => {
      if (!position) return;
      map.setView(position, 15);
    }, [position, map]);

    return null;
  }

  function onPositionUpdate(e) {
    const userDirectionTyped = e.target.value;
    setSearched(false);
    setDirTyped(userDirectionTyped);
  }

  function onOptionSelected(e) {
    const selectedOption = e.target.textContent;

    const place = possiblePlaces.find((place) => place.display_name === selectedOption);
    if (!place || !place.ubication) return;

    setPosition(place.ubication);
    setReadableDirection(selectedOption);
    setDirTyped(selectedOption);
    setPossiblePlaces([]);
    setSearched(true);
  }

  function cleanPlaces(places) {
    return places.map((place) => {
      return {
        ubication: [place.lat, place.lon],
        display_name: place.display_name,
      };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    setSearched(true);
  }

  useEffect(() => {
    if (dirTyped) {
      const timeout = setTimeout(async () => {
        const res = await getSimilarPlaces(dirTyped);
        if (!res) return;

        if (res.length > 0) {
          setPossiblePlaces(cleanPlaces(res));
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [dirTyped]);

  useEffect(() => {
    (async () => {
      const readableDirection = await getReadableDirection(position);
      setReadableDirection(readableDirection);
    })();
  }, [position]);

  return {
    position,
    readableDirection,
    home,
    dirTyped,
    possiblePlaces,
    searched,
    SetViewOnUpdate,
    MapLocator,
    onPositionUpdate,
    onOptionSelected,
    onSubmit,
    eventHandlers,
  };
}