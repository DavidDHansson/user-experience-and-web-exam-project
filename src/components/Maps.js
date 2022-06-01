import React, { memo, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => {

    const [color, setColor] = useState(false);

    return (
        <div
            style={{ backgroundColor: color ? "blue" : "red", width: "15px", height: "15px" }}
            onMouseEnter={() => setColor(true)}
            onMouseLeave={() => setColor(false)}>
        </div>
    );
};

const Maps = () => {
    const defaultProps = {
        center: {
            lat: 55.6616636,
            lng: 12.5913907
        },
        zoom: 11
    };

    const handleApiLoaded = (map, maps) => {
        map.setOptions({
            styles: [
                [
                    {
                        elementType: "geometry",
                        stylers: [{ color: "#f5f5f5" }],
                    },
                    {
                        elementType: "labels.icon",
                        stylers: [{ visibility: "off" }],
                    },
                    {
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#616161" }],
                    },
                    {
                        elementType: "labels.text.stroke",
                        stylers: [{ color: "#f5f5f5" }],
                    },
                    {
                        featureType: "administrative.land_parcel",
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#bdbdbd" }],
                    },
                    {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [{ color: "#eeeeee" }],
                    },
                    {
                        featureType: "poi",
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#757575" }],
                    },
                    {
                        featureType: "poi.park",
                        elementType: "geometry",
                        stylers: [{ color: "#e5e5e5" }],
                    },
                    {
                        featureType: "poi.park",
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#9e9e9e" }],
                    },
                    {
                        featureType: "road",
                        elementType: "geometry",
                        stylers: [{ color: "#ffffff" }],
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#757575" }],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry",
                        stylers: [{ color: "#dadada" }],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#616161" }],
                    },
                    {
                        featureType: "road.local",
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#9e9e9e" }],
                    },
                    {
                        featureType: "transit.line",
                        elementType: "geometry",
                        stylers: [{ color: "#e5e5e5" }],
                    },
                    {
                        featureType: "transit.station",
                        elementType: "geometry",
                        stylers: [{ color: "#eeeeee" }],
                    },
                    {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{ color: "#c9c9c9" }],
                    },
                    {
                        featureType: "water",
                        elementType: "labels.text.fill",
                        stylers: [{ color: "#9e9e9e" }],
                    },
                ]
            ]
        });
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '80vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyBI0TZjF0Bbpk2rgPXzBM8dIf0cyEA7AA4"
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                <AnyReactComponent
                    lat={55.6616636}
                    lng={12.5913907}
                    text="Marker"
                />
            </GoogleMapReact>
        </div>
    );

};

export default Maps;