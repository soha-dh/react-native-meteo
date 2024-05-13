import { s } from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Home } from "./pages/Home/Home";
import { ImageBackground } from "react-native";
import backgroundImg from "./assets/background.png";
import { useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { MeteoAPI } from "./api/meteo";

export default function App() {
  const [coordinates, setCoordinates] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    getUserCoordinates();
  }, []);

  useEffect(
    (coordinates) => {
      featchWeatherByCoords(coordinates);
    },
    [coordinates]
  );

  async function featchWeatherByCoords(coords) {
    const weaderResponse = await MeteoAPI.fetchWeatherByCoords(coords);
    setWeather(weaderResponse);
  }
  async function getUserCoordinates() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setCoordinates({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } else {
      setCoordinates({ lat: "35.70", lng: "51.40" });
    }
  }
  console.log(coordinates);
  console.log(weather);
  return (
    <ImageBackground
      imageStyle={s.IMG_Style}
      style={s.img_background}
      source={backgroundImg}
    >
      <SafeAreaProvider>
        <SafeAreaView style={s.container}>
          <Home />
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
