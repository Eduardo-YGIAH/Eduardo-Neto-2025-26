"use client";

import { useEffect, useState } from "react";
import MetricBadge from "./MetricBadge";
import { useRenderCount } from "@/lib/metrics/useRenderCount";

type Props = {
  label?: string;
  tooltip?: string;
};

export default function RenderCountBadge({ label = "Renders", tooltip }: Props) {
  const renders = useRenderCount();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return <MetricBadge label={label} value={hydrated ? renders : "—"} tooltip={tooltip} />;
}


