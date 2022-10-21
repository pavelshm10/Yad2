import styles from "./home.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import { coordinates } from "../../slices/coordinatesSlice";
import { Coords } from "../../types/coords";
// interface CoordsProps {
//   latitude: number;
//   longitude: number;
// }

export const Home: React.FC<any> = ({ setCoords }) => {
  const navigate = useNavigate();
  const [myLocation, setMyLocation] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  // const dispatch = useDispatch();
  const getBanksHandler = () => {
    navigate("/banks");
  };
  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setCoords(location.coords.latitude, location.coords.longitude);
        window.localStorage.setItem("lat", location.coords.latitude.toString());
        window.localStorage.setItem(
          "lon",
          location.coords.longitude.toString()
        );

        setMyLocation(
          `${location.coords.latitude}, ${location.coords.longitude}`
        );
      });
    } else {
      setMyLocation("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className={styles.home}>
      <button className={styles.btn} onClick={getMyLocation}>
        Get My Loacation
      </button>
      {myLocation ? (
        <>
          <span className={styles.location}>{myLocation}</span>
          <button className={styles.btn} onClick={getBanksHandler}>
            Find banks next to me
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
