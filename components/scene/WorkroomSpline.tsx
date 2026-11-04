"use client";

import Spline from "@splinetool/react-spline";
import type { Application, SplineEvent } from "@splinetool/runtime";
import { useEffect, useRef } from "react";
import { hotspotByObject, type HotspotId } from "./hotspots";

type Props = {
  scene: string;
  onReady: () => void;
  onActive: (id: HotspotId | null) => void;
  onPress: (id: HotspotId | null) => void;
};

function currentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "night" : "day";
}

export default function WorkroomSpline({ scene, onReady, onActive, onPress }: Props) {
  const app = useRef<Application | null>(null);

  // Variabel "theme" hanya ada jika scene Spline mendefinisikannya; lihat docs/SPLINE_SCENE.md.
  useEffect(() => {
    const sync = () => {
      try {
        app.current?.setVariables({ theme: currentTheme() });
      } catch {
        return;
      }
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Spline
      scene={scene}
      renderOnDemand
      className="h-full w-full"
      onLoad={(loaded) => {
        app.current = loaded;
        try {
          loaded.setVariables({ theme: currentTheme() });
        } catch {
          // scene tanpa variabel theme tetap berjalan
        }
        onReady();
      }}
      onSplineMouseHover={(e: SplineEvent) => onActive(hotspotByObject(e.target.name)?.id ?? null)}
      onSplineMouseDown={(e: SplineEvent) => onPress(hotspotByObject(e.target.name)?.id ?? null)}
    />
  );
}
