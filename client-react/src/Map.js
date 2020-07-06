import React from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api'
import { formatRelative } from 'date-fns'
import mapStyles from './mapstyles'

// globals
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}

// come back and set this to user's browser location
const center = {
  lat: 45.512230,
  lng: -122.658722
}

const options = {
  styles: mapStyles,
  disabledDefaultUI: true,
  zoomControl: true
}

export default function Map () {
  // const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY })
  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: 'AIzaSyD2vjZM0TdZBTQ9vBBcnk48dD5fWCSWks' })

  const mapRef = React.useRef()

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])

  if (loadError) return 'Load Error loading Maps.'
  if (!isLoaded) return 'Loading..'

  return (
    <div>
      <h1>Incidents by Districts</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      />
    </div>
  )
}
