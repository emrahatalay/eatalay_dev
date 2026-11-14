import type { ReactNode } from "react";
import type { ServiceVisual as Visual } from "@/core/domain/entities";
import { FlowVisual } from "./FlowVisual";
import { GameVisual } from "./GameVisual";
import { ProcessVisual } from "./ProcessVisual";
import { ShipVisual } from "./ShipVisual";
import { WebVisual } from "./WebVisual";

type Renderers = { [K in Visual["kind"]]: (visual: Extract<Visual, { kind: K }>) => ReactNode };

/**
 * Registry instead of a switch (Open/Closed): a new visual kind is a new
 * entry here plus its component; existing renderers stay untouched.
 * TypeScript fails the build if a kind from the domain has no renderer.
 */
const renderers: Renderers = {
  web: (v) => <WebVisual visual={v} />,
  ship: (v) => <ShipVisual visual={v} />,
  game: (v) => <GameVisual visual={v} />,
  flow: (v) => <FlowVisual visual={v} />,
  process: (v) => <ProcessVisual visual={v} />,
};

export function ServiceVisual({ visual }: { readonly visual: Visual }) {
  const render = renderers[visual.kind] as (v: Visual) => ReactNode;
  return render(visual);
}
