
import React, {useEffect, useState} from 'react';
import '../App.css';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "../components/Loading";
import {getConfig} from "../config";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export const GeoMapToolComponent = () =>
{
  const { user } = useAuth0();
  const position = [51.505, -0.09]
  const [coordinates, setCoordinates] = useState(null)
  const { apiOrigin = "http://127.0.0.1:9906/v1", audience } = getConfig();

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });

  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token)
      const response = await fetch(`${apiOrigin}/content/fetch-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (response.ok) {
        const data = await response.json();
        let positions = []
        data.Records.forEach(record => {
            if (record.ContentLatitude && record.ContentLongitude) {
                record.Position = [record.ContentLatitude, record.ContentLongitude]
                positions.push(record)
            }
        })
        setCoordinates(positions);
    }
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

  };

    useEffect(() => {
        callApi()
    async function fetchData() {
            await callApi()
      }
      fetchData();
    }, []);


  return (
      <>
          <MapContainer
              center={position}
              zoom={1}
              scrollWheelZoom={true}
              style={{ height: "100vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
              {coordinates &&
                coordinates.map((record) => (
                <Marker position={record.Position}>
                  <Popup>
                      <p>Details:</p>
                      <dl>
                        <dt>Event Started On:</dt>
                            <dd>{record.ContentStartedOn ?? 'Not Available'}</dd>
                        <dt>Event Ended On:</dt>
                            <dd>{record.ContentEndedOn ?? 'Not Available'}</dd>
                        <dt>Coordinates</dt>
                            <dd>{record.Position}</dd>
                        </dl>
                  </Popup>
                </Marker>
                ))}
          </MapContainer>
      </>
  )

}

export default withAuthenticationRequired(GeoMapToolComponent, {
  onRedirecting: () => <Loading />,
});