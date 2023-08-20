import { useState, useRef, useEffect, Component } from 'react';
import { GeoJSON, MapContainer, LayersControl, LayersGroup, LayerGroup, Circle, FeatureGroup, Rectangle, TileLayer, useMap, useMapEvent, Marker, Popup, useMapEvents } from 'react-leaflet'
import { publish } from './events'
import IconAntenna from './IconAntenna'

import './LeafletMap.css'

import antennas from './data/layer.json'

const positionHome = [52.111880220364064, 5.087148892650096]

const SetViewOnClick = ({ animateRef }) => {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    })
  })
  return null
}

const FeatureFilter = (geoJsonFeature) => {
  const map = useMap()
  const coords = geoJsonFeature.geometry.coordinates
  const bbox = map.getBounds().toBBoxString().split(',').map(x => Number(x))
  return bbox[0] <= coords[0] && bbox[2] >= coords[0] && bbox[1] <= coords[1] && bbox[3] >= coords[1]
}

const PointToLayer = (geoJsonPoint, latlng) => {
  return (
    <Marker position={latlng} />
  )
}

const OnEachFeature = (feature, layer) => {
  console.log(layer)
  const map = useMap()
  const bands = feature.properties.bands || []
  const angles = feature.properties.angles || []
  const AntennaString = `<div class="antenna-popup"><a><span>id:&nbsp;</span>${feature.properties.location_id}</a><a><span>provider:&nbsp;</span>${feature.properties.provider_slug}</a><a><span>bands:&nbsp;</span>${bands.join(', ')}</a><a><span>angles:&nbsp;</span>${angles.join(', ')}</a>`
  const mastLatLng = layer.getLatLng()
  const pixelMastPosition = map.latLngToLayerPoint(mastLatLng)
 
  // Mod home position by -0.00002 - +0.00002 to simulate mast beam angle deviations 
  const homePositionLatitude = positionHome[0] - 0.00001 + ((Math.random() * 2) / 100000)
  const homePositionLongitude = positionHome[1] - 0.00001 + ((Math.random() * 2) / 100000)
  const homePositionModded = [homePositionLatitude, homePositionLongitude]

  const pixelHomePosition = map.latLngToLayerPoint(positionHome)
  const pixelHomePositionBB = [map.latLngToLayerPoint([positionHome[0] - 0.00001, positionHome[1] - 0.00001]), map.latLngToLayerPoint([positionHome[0] + 0.00001, positionHome[1] + 0.00001])]
  const pixelHomePositionModded = map.latLngToLayerPoint(homePositionModded)

  layer.setIcon(IconAntenna)
  layer.bindPopup(AntennaString)
  layer.on('click', () => {
    publish('onBodyHit', {hits: [{id: feature.properties.location_id, geography: {
      mastPosition: pixelMastPosition,
      homePosition: pixelHomePosition,
      homePositionModded: pixelHomePositionModded,
      homePositionBB: pixelHomePositionBB,
      angle: Math.atan2(pixelHomePositionModded.y-pixelMastPosition.y, pixelHomePositionModded.x-pixelMastPosition.x) * (180 / Math.PI),
      distance: map.distance(homePositionModded, mastLatLng)
    }}]})
  })
}

export default function LeafletMap() {
  const animateRef = useRef(false)

  return (
    <MapContainer className="map-container" center={positionHome} zoom={14} scrollWheelZoom={true}>

      <TileLayer attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>'
                 url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
	         maxZoom="20"/>

      <LayersControl position="topright">

        <LayersControl.Overlay checked name="Home">
          <LayerGroup>
            <Marker position={positionHome}>
              <Popup>Home</Popup>
            </Marker>
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Antennas">
          <GeoJSON onEachFeature={OnEachFeature} filter={FeatureFilter} data={antennas}/>
        </LayersControl.Overlay>

      </LayersControl>

      <SetViewOnClick animateRef={animateRef}/>

    </MapContainer>
  )
}
