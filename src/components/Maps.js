import React, { memo, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, TrafficLayer, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: "100%",
    height: "600px",
    marginTop: "-30px"
};

const center = {
    lat: 55.6616636,
    lng: 12.5913907
};

const Maps = () => {
    const [markers, setMarkers] = useState([]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: ""
    })

    useEffect(() => {
        if (isLoaded) {
            setMarkers([{ lat: 55.6616636, lng: 12.7913907 }, { lat: 55.6616636, lng: 12.2913907 }, { lat: 55.9616636, lng: 12.5913907 }])
        }
    }, [isLoaded])

    const didTapMarker = (index) => {
        console.log(index);
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
        >
            {markers.map((pos, index) => (
                <Marker
                    icon={"https://firebasestorage.googleapis.com/v0/b/ux-and-web-exam-project.appspot.com/o/Vector.png?alt=media&token=4edfb327-f1bd-4aaf-84c0-1c82aec9cbde"}
                    position={pos}
                    onClick={() => didTapMarker(index)}
                />
            ))}
            {/* <TrafficLayer /> */}
        </GoogleMap>
    ) : <></>
};


export default memo(Maps)