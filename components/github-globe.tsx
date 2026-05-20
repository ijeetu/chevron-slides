"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

const points = [
  { lat: 28.6139, lng: 77.209, size: 0.42 },
  { lat: 35.6762, lng: 139.6503, size: 0.34 },
  { lat: 1.3521, lng: 103.8198, size: 0.32 },
  { lat: 51.5072, lng: -0.1276, size: 0.28 },
  { lat: 37.7749, lng: -122.4194, size: 0.3 },
  { lat: -33.8688, lng: 151.2093, size: 0.26 },
  { lat: 25.2048, lng: 55.2708, size: 0.24 },
  { lat: -1.2921, lng: 36.8219, size: 0.24 },
  { lat: -23.5505, lng: -46.6333, size: 0.24 },
  { lat: 40.7128, lng: -74.006, size: 0.28 },
  { lat: 31.2304, lng: 121.4737, size: 0.24 },
  { lat: 19.076, lng: 72.8777, size: 0.24 },
];

const arcs = [
  { startLat: 28.6139, startLng: 77.209, endLat: 1.3521, endLng: 103.8198 },
  { startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503 },
  { startLat: 35.6762, startLng: 139.6503, endLat: 51.5072, endLng: -0.1276 },
  { startLat: 51.5072, startLng: -0.1276, endLat: 37.7749, endLng: -122.4194 },
  { startLat: 37.7749, startLng: -122.4194, endLat: -33.8688, endLng: 151.2093 },
  { startLat: -33.8688, startLng: 151.2093, endLat: 28.6139, endLng: 77.209 },
  { startLat: 25.2048, startLng: 55.2708, endLat: 19.076, endLng: 72.8777 },
  { startLat: 19.076, startLng: 72.8777, endLat: 31.2304, endLng: 121.4737 },
  { startLat: 31.2304, startLng: 121.4737, endLat: 35.6762, endLng: 139.6503 },
  { startLat: 40.7128, startLng: -74.006, endLat: 51.5072, endLng: -0.1276 },
  { startLat: 40.7128, startLng: -74.006, endLat: -23.5505, endLng: -46.6333 },
  { startLat: -23.5505, startLng: -46.6333, endLat: -1.2921, endLng: 36.8219 },
  { startLat: -1.2921, startLng: 36.8219, endLat: 25.2048, endLng: 55.2708 },
  { startLat: 1.3521, startLng: 103.8198, endLat: 25.2048, endLng: 55.2708 },
  { startLat: 28.6139, startLng: 77.209, endLat: 40.7128, endLng: -74.006 },
  { startLat: 37.7749, startLng: -122.4194, endLat: 31.2304, endLng: 121.4737 },
  { startLat: -33.8688, startLng: 151.2093, endLat: 1.3521, endLng: 103.8198 },
  { startLat: 51.5072, startLng: -0.1276, endLat: 25.2048, endLng: 55.2708 },
];

const arcColor: [string, string, string] = [
  "rgba(34,211,238,0.95)",
  "rgba(59,130,246,0.8)",
  "rgba(99,102,241,0.2)",
];

export function GitHubGlobe() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(520);
  const globeMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial();
    material.color = new THREE.Color("#0a2258");
    material.emissive = new THREE.Color("#04122f");
    material.emissiveIntensity = 0.55;
    material.shininess = 0.8;
    return material;
  }, []);

  useEffect(() => {
    const measure = () => {
      const parentWidth = containerRef.current?.clientWidth ?? 520;
      const viewportLimit = Math.max(window.innerHeight - 120, 360);
      const nextSize = Math.min(parentWidth, viewportLimit, 920);
      setSize(nextSize);
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    if (typeof globe.controls === "function") {
      const controls = globe.controls();
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.45;
    }

    if (typeof globe.pointOfView === "function") {
      globe.pointOfView({ lat: 18, lng: 12, altitude: 1.8 }, 0);
    }
  }, [size]);

  return (
    <div
      ref={containerRef}
      className="flex h-full min-h-[30rem] w-full items-center justify-end"
    >
      <Globe
        ref={globeRef}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={globeMaterial}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere
        atmosphereColor="#9ecbff"
        atmosphereAltitude={0.14}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.02}
        pointRadius="size"
        pointColor={() => "#9fd4ff"}
        pointsMerge
        arcsData={arcs}
        arcColor={arcColor}
        arcAltitude={0.22}
        arcStroke={0.42}
        arcDashLength={0.5}
        arcDashGap={0.65}
        arcDashAnimateTime={2200}
        rendererConfig={{ alpha: true, antialias: true }}
      />
    </div>
  );
}
