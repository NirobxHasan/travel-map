import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
const MapDirection = () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoibmlyb2J4YWhhc2FuIiwiYSI6ImNrODVyMnJvZzA3cXMzZmxqbWZjY3VoZm8ifQ.E1-s6RIF6vy8vle7Lraj0A';
    useEffect(()=>{
        const geojson = {
            'type': 'FeatureCollection',
            'features': [
            {
            'type': 'Feature',
            'properties': {
            'message': 'Dhaka',
            'iconSize': [50, 50],
            'url':'https://lp-cms-production.imgix.net/2019-06/63a2f6d14bf52f127d2eb792f8df02fc-lalbagh-fort.jpg'
            },
            'geometry': {
            'type': 'Point',
            'coordinates': [90.38813813916822, 23.719106048720096]
           
            }
            },
            {
            'type': 'Feature',
            'properties': {
            'message': 'Cox bazar,laboni beach',
            'iconSize': [30, 30],
            'url': 'https://lh5.googleusercontent.com/p/AF1QipMBoNM-ybHfrbQ30gi09sJoji_TdNEmSio7ZdOi=w408-h306-k-no'
            },
            'geometry': {
            'type': 'Point',
            
            'coordinates': [91.97014680575315,21.429006023997644]
            }
            },
            {
            'type': 'Feature',
            'properties': {
            'message': 'Baz',
            'iconSize': [40, 40]
            },
            'geometry': {
            'type': 'Point',
            'coordinates': [-63.292236, -18.281518]
            }
            }
            ]
            };


        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [90.3563, 23.6850],
            zoom: 7
            });
             
            map.addControl(
            new MapboxDirections({
            accessToken: mapboxgl.accessToken
            }),
            'top-left'
            );

          

            // Add markers to the map.
            for (const marker of geojson.features) {
                // Create a DOM element for each marker.
                const el = document.createElement('div');
                const width = marker.properties.iconSize[0];
                const height = marker.properties.iconSize[1];
                el.className = 'marker';
                // el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
                el.style.backgroundImage = `url(${marker.properties.url})`;
                el.style.width = `${width}px`;
                el.style.height = `${height}px`;
                el.style.backgroundSize = '100%';
                 
                el.addEventListener('click', () => {
                window.alert(marker.properties.message);
                });
                 
                // Add markers to the map.
                new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
                }

                map.addControl(
                new mapboxgl.GeolocateControl({
                positionOptions: {
                enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true
                })
                );
            
    },[])
    return (
        <div>
            <div id="map"></div>
        </div>
    );
};

export default MapDirection;