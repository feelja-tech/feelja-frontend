import "@tensorflow/tfjs-backend-webgl";
import * as tfc from "@tensorflow/tfjs-core";
import * as faceapi from "@vladmandic/face-api";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { setFaceApiLoaded } from "../redux/slices/appSlice";

export function useFaceApiPreload(): void {
  const [loadingSuccesses, setLoadingSuccesses] = useState([]);

  const dispatch = useDispatch();

  const handleLoadingSuccess = useCallback(() => {
    setLoadingSuccesses((prev) => [...prev, true]);
  }, []);

  useEffect(() => {
    if (loadingSuccesses.filter((x) => !!x).length === 3) {
      dispatch(setFaceApiLoaded(true));
    }
  }, [loadingSuccesses]);

  const { faceApiLoaded } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    if (!faceApiLoaded)
      tfc.setBackend("webgl").then(() => {
        faceapi.nets.faceExpressionNet
          .loadFromUri("/face_api")
          .then(handleLoadingSuccess);

        faceapi.nets.faceLandmark68TinyNet
          .loadFromUri("/face_api")
          .then(handleLoadingSuccess);

        faceapi.nets.tinyFaceDetector
          .loadFromUri("/face_api")
          .then(handleLoadingSuccess);
      });
  }, [faceApiLoaded]);
}

export default useFaceApiPreload;
