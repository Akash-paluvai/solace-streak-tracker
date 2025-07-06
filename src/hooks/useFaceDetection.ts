import { useEffect, useRef, useState } from "react";
import * as faceMesh from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

export const useFaceDetection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const faceMeshInstance = new faceMesh.FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMeshInstance.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMeshInstance.onResults((results) => {
      const nostrilsLandmarks = [2, 98]; // Nose area
      const hasFace =
        results.multiFaceLandmarks &&
        results.multiFaceLandmarks[0] &&
        nostrilsLandmarks.every((index) => {
          const point = results.multiFaceLandmarks[0][index];
          return point && typeof point.x === "number" && typeof point.y === "number";
        });

      setFaceDetected(!!hasFace);
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await faceMeshInstance.send({ image: videoRef.current! });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      if (typeof camera.stop === "function") {
        camera.stop();
      }
    };
  }, []);

  return { videoRef, faceDetected };
};
