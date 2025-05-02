import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { API_URL_MAP__NEAREST_PLACES, API_URL_MAP__HOME } from "../../../env";

import { useMap as useMapLeaflet, useMapEvents } from "react-leaflet";

export default function useMap() {
  const [position, setPosition] = useState([20.6597586, -103.324082]); // CUCEI location por defecto
  const [readableDirection, setReadableDirection] = useState("");
  const [displayCard, setDisplayCard] = useState(0);
  const [places, setPlaces] = useState([]);
  const [home, setHome] = useState({});
  const [searched, setSearched] = useState(false);

  const [dirTyped, setDirTyped] = useState("");
  const [possiblePlaces, setPossiblePlaces] = useState([]);

  const [searchParams] = useSearchParams(); // Hook para leer los parámetros de la URL
  
  async function getNearestPlaces({ params }) {
    if (!params) return;
    try {
      const response = await axios.get(API_URL_MAP__NEAREST_PLACES, { params });
      console.log("Datos obtenidos de la API:", response.data);
  
      if (response && response.data && response.data.homes) {
        setPlaces(response.data.homes); // Actualizar el estado con las habitaciones
      }
    } catch (error) {
      console.error("Error al obtener los lugares más cercanos:", error);
    }
  }
  async function getPlace({ params }) {
    if (!params) return;
    return await axios.get(API_URL_MAP__HOME, { params });
  }

  async function getReadableDirection(position) {
    const url = `https://nominatim.openstreetmap.org/reverse`;
    const params = `format=json&lat=${position[0]}&lon=${position[1]}&zoom=18&addressdetails=1`;
    const response = await axios.get(`${url}?${params}`);

    if (response && response.data) return response.data.display_name;
  }

  async function getSimilarPlaces(readable_location) {
    const url = `https://nominatim.openstreetmap.org/search`;
    const params = `q=${readable_location}&format=json&addressdetails=1`;
    const response = await axios.get(`${url}?${params}`);

    if (response && response.data) return response.data;
  }

  async function getLatLng(readable_location) {
    const url = `https://nominatim.openstreetmap.org/search`;
    const params = `q=${readable_location}&format=json`;
    const response = await axios.get(`${url}?${params}`);

    if (response && response.data[0])
      return [response.data[0].lat, response.data[0].lon, response.data[0].display_name];
  }

  async function getPlaces(latlng) {
    if (!latlng) return;
    const [lat, lng] = latlng;

    const res = await getNearestPlaces({ params: { currentLat: lat, currentLon: lng } });

    if (!res || !res.data) return;
    setPlaces(res.data.homes);
  }

  const eventHandlers = {
    click: (e) => {
      const { lat, lng } = e.latlng;

      if (lat === position[0] && lng === position[1]) return;

      (async () => {
        const display_name = await getReadableDirection([lat, lng]);
        const res2 = await getPlace({ params: { lat, lon: lng } });

        if (!display_name || !res2) return;

        setHome({ ...res2.data.home, home_address: display_name });
      })();
      setDisplayCard(1);
    },
  };

  function showMoreHandler(current) {
    if (current !== 2) setDisplayCard(current + 1);
  }

  function showLessHandler(current) {
    if (current !== 0) setDisplayCard(current - 1);
  }

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

    const { ubication } = possiblePlaces.find((place) => place.display_name === selectedOption);
    if (!ubication) return;

    setPosition(ubication);
    setReadableDirection(selectedOption);

    setDirTyped(selectedOption);
    getPlaces(ubication);
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

    getPlaces(position);
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

  // Configurar posición inicial basada en parámetros de la URL o ubicación actual
  useEffect(() => {
    const lat = parseFloat(searchParams.get("lat"));
    const lon = parseFloat(searchParams.get("lon"));
    const pets = parseFloat(searchParams.get("pets"));
    const gender = parseFloat(searchParams.get("gender"));
    const minAge = parseFloat(searchParams.get("minAge"));
    const maxAge = parseFloat(searchParams.get("maxAge"));
  
    if (lat && lon) {
      setPosition([lat, lon]);
  
      // Llamar a getNearestPlaces con los parámetros adicionales
      getNearestPlaces({
        params: {
          currentLat: lat,
          currentLon: lon,
          pets,
          gender,
          minAge,
          maxAge,
        },
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLat = position.coords.latitude;
          const currentLon = position.coords.longitude;
  
          setPosition([currentLat, currentLon]);
  
          // Llamar a getNearestPlaces con los parámetros adicionales y ubicación actual
          getNearestPlaces({
            params: {
              currentLat,
              currentLon,
              pets,
              gender,
              minAge,
              maxAge,
            },
          });
        },
        (error) => {
          console.error("Error al obtener la ubicación actual:", error);
        }
      );
    }
  }, [searchParams]);

  // Actualizar dirección legible cuando cambie la posición
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
    places,
    displayCard,
    dirTyped,
    possiblePlaces,
    searched,
    SetViewOnUpdate,
    MapLocator,
    onPositionUpdate,
    onOptionSelected,
    onSubmit,
    getPlaces,
    showMoreHandler,
    showLessHandler,
    eventHandlers,
  };
}