"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

type SpotlightVoice = {
  name: string;
  country: string;
  lat: number;
  lng: number;
  imageSrc: string;
};

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

const spotlightVoices: SpotlightVoice[] = [
  {
    name: "Conor McGregor",
    country: "Ireland",
    lat: 53.3498,
    lng: -6.2603,
    imageSrc: "/voice-highlights/conor-mcgregor.jpg",
  },
  {
    name: "Eva Vlaardingerbroek",
    country: "Sweden",
    lat: 59.3293,
    lng: 18.0686,
    imageSrc: "/voice-highlights/eva-vlaardingerbroek.jpg",
  },
  {
    name: "Tommy Robinson",
    country: "Britain",
    lat: 51.5074,
    lng: -0.1278,
    imageSrc: "/voice-highlights/tommy-robinson.jpg",
  },
];

const arcColor: [string, string, string] = [
  "rgba(34,211,238,0.95)",
  "rgba(59,130,246,0.8)",
  "rgba(99,102,241,0.2)",
];

const focusTransitionMs = 2300;
const introDelayMs = 900;
const markerDelayMs = 1650;
const photoDelayMs = 2250;
const holdDelayMs = 5200;

export function GitHubGlobe() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const connectorRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const [size, setSize] = useState(520);
  const [activeVoiceIndex, setActiveVoiceIndex] = useState(0);
  const [markerVisible, setMarkerVisible] = useState(false);
  const [photoVisible, setPhotoVisible] = useState(false);

  const activeVoice = spotlightVoices[activeVoiceIndex];
  const focusPoints = useMemo(
    () => spotlightVoices.map((voice) => ({ lat: voice.lat, lng: voice.lng, size: 0.46 })),
    [],
  );
  const allPoints = useMemo(() => [...points, ...focusPoints], [focusPoints]);

  const overlayOffset = size > 680
    ? { x: 128, y: -146, lineAngle: -36 }
    : { x: 104, y: -126, lineAngle: -34 };

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
      controls.enableRotate = false;
      controls.autoRotate = false;
    }

    if (typeof globe.pointOfView === "function") {
      globe.pointOfView({ lat: 18, lng: 12, altitude: 1.85 }, 0);
    }

    const clearTimers = () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };

    const queueTimer = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(callback, delay);
      timersRef.current.push(timer);
    };

    const focusVoice = (index: number) => {
      const voice = spotlightVoices[index];
      setActiveVoiceIndex(index);
      setMarkerVisible(false);
      setPhotoVisible(false);

      if (typeof globe.pointOfView === "function") {
        globe.pointOfView(
          { lat: voice.lat, lng: voice.lng, altitude: 1.58 },
          focusTransitionMs,
        );
      }

      queueTimer(() => setMarkerVisible(true), markerDelayMs);
      queueTimer(() => setPhotoVisible(true), photoDelayMs);
      queueTimer(
        () => focusVoice((index + 1) % spotlightVoices.length),
        holdDelayMs,
      );
    };

    clearTimers();
    queueTimer(() => focusVoice(0), introDelayMs);

    return clearTimers;
  }, [size]);

  useEffect(() => {
    let frameId = 0;

    const updateOverlayPosition = () => {
      const globe = globeRef.current;
      const coords =
        globe && typeof globe.getScreenCoords === "function"
          ? globe.getScreenCoords(activeVoice.lat, activeVoice.lng, 0.03)
          : null;

      if (coords) {
        const left = `${coords.x}px`;
        const top = `${coords.y}px`;

        if (markerRef.current) {
          markerRef.current.style.left = left;
          markerRef.current.style.top = top;
        }

        if (photoRef.current) {
          photoRef.current.style.left = left;
          photoRef.current.style.top = top;
        }

        if (connectorRef.current) {
          connectorRef.current.style.left = left;
          connectorRef.current.style.top = top;
        }
      }

      frameId = window.requestAnimationFrame(updateOverlayPosition);
    };

    updateOverlayPosition();

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeVoice, size]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[30rem] w-full items-center justify-end"
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
        pointsData={allPoints}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.02}
        pointRadius="size"
        pointColor={(point) =>
          focusPoints.includes(point as (typeof focusPoints)[number]) ? "#dff1ff" : "#9fd4ff"
        }
        pointsMerge
        arcsData={arcs}
        arcColor={arcColor}
        arcAltitude={0.22}
        arcStroke={0.42}
        arcDashLength={0.5}
        arcDashGap={0.65}
        arcDashAnimateTime={2200}
        ringsData={[activeVoice]}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => [
          "rgba(255,255,255,0.92)",
          "rgba(159,212,255,0.48)",
          "rgba(159,212,255,0)",
        ]}
        ringMaxRadius={4.8}
        ringPropagationSpeed={1}
        ringRepeatPeriod={1300}
        rendererConfig={{ alpha: true, antialias: true }}
      />

      <div
        ref={markerRef}
        aria-hidden="true"
        className={`pointer-events-none absolute z-20 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
          markerVisible ? "scale-100 opacity-100" : "scale-[0.35] opacity-0"
        }`}
      >
        <div className="absolute inset-0 rounded-full border border-[#9fd4ff]/60 bg-[#9fd4ff]/10 shadow-[0_0_28px_rgba(159,212,255,0.35)]" />
        <div className="absolute inset-[-7px] rounded-full border border-[#9fd4ff]/35 animate-ping [animation-duration:1.8s]" />
        <span className="absolute left-1/2 top-1/2 h-[2px] w-9 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.92)]" />
        <span className="absolute left-1/2 top-1/2 h-[2px] w-9 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.92)]" />
      </div>

      <div
        ref={connectorRef}
        aria-hidden="true"
        className={`pointer-events-none absolute z-20 h-[2px] origin-left bg-[linear-gradient(90deg,rgba(255,255,255,0.92),rgba(159,212,255,0.12))] transition-all duration-700 ${
          photoVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: size > 680 ? "132px" : "108px",
          transform: `translate(8px, -6px) rotate(${overlayOffset.lineAngle}deg) scaleX(${photoVisible ? 1 : 0.18})`,
        }}
      />

      <div
        ref={photoRef}
        className="pointer-events-none absolute z-30"
        style={{
          transform: photoVisible
            ? `translate(${overlayOffset.x}px, ${overlayOffset.y}px) scale(1)`
            : `translate(${Math.round(overlayOffset.x * 0.18)}px, ${Math.round(
                overlayOffset.y * 0.18,
              )}px) scale(0.2)`,
          opacity: photoVisible ? 1 : 0,
          transition:
            "transform 720ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease-out",
        }}
      >
        <article className="w-40 overflow-hidden rounded-[1.45rem] border border-white/50 bg-[linear-gradient(160deg,rgba(8,16,31,0.96),rgba(16,31,59,0.92))] shadow-[0_28px_72px_rgba(4,10,24,0.5)] backdrop-blur-sm md:w-48">
          <div className="relative">
            <img
              src={activeVoice.imageSrc}
              alt={`${activeVoice.name} portrait`}
              className="h-48 w-full object-cover object-top md:h-60"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(4,10,24,0.78))]" />
          </div>
          <div className="space-y-1 border-t border-white/10 px-4 py-3">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-[#9fd4ff]">
              {activeVoice.country}
            </p>
            <p className="text-sm font-semibold leading-5 text-white md:text-[0.98rem]">
              {activeVoice.name}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
