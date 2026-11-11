import { useEffect, useRef, useState } from "react";
import "./SandonIcon.css";

type SandonIconProps = {
  size?: number;
  /** Fills the beard with a second tone */
  twoTone?: boolean;
  /** Beard fill colour (defaults to the icon's colour) */
  accent?: string;
  /** Beard fill opacity (defaults to 0.25) */
  accentOpacity?: number;
  /**
   * Play the animation from outside, e.g. while the Connect button is
   * hovered. Hovering the icon itself always plays it.
   */
  active?: boolean;
  /** Increment to force the hover animation to replay while still active. */
  playToken?: number;
};

export function SandonIcon({
  size = 48,
  twoTone = false,
  accent = "currentColor",
  accentOpacity = 0.25,
  active = false,
  playToken = 0,
}: SandonIconProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const isActive = hovered || active;

  const play = (name: "hover" | "blink") =>
    svgRef.current
      ?.querySelectorAll(`animate[data-anim="${name}"]`)
      .forEach((a) => (a as SVGAnimateElement).beginElement());

  // Hover: the smirk flip is an SVG <animate> shape morph (smooth in every
  // major browser). Head tilt, brow raise and glance are in
  // SandonIcon.css.
  useEffect(() => {
    if (!isActive) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = svgRef.current;
    if (el) {
      el.removeAttribute("data-active");
      void el.getBoundingClientRect();
      el.setAttribute("data-active", "true");
    }
    play("hover");
  }, [isActive, playToken]);

  // Idle double blink: every 2.5–6s at random.
  // Pauses while hovered, when the tab is hidden, or with reduced motion.
  useEffect(() => {
    if (isActive) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        if (!document.hidden) {
          play("blink");
        }
        schedule();
      }, 2500 + Math.random() * 3500);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <svg
      ref={svgRef}
      className="sandon-icon"
      data-active={isActive}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      viewBox="0 -8 448 448"
      width={size}
      height={size}
      overflow="visible"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g className="sandon-icon__head">
      {/* Two-tone beard fill (drawn first so the outline sits on top) */}
      {twoTone && (<path d="M112 224 C140 262 176 274 204 264 Q224 256 244 264 C272 274 308 262 336 224 V296 A112 112 0 0 1 112 296 Z" fill={accent} fillOpacity={accentOpacity} stroke="none" />)}
      {/* Head */}
      <rect x="112" y="24" width="224" height="384" rx="112" />
      {/* Hairline dots */}
      <circle cx="192" cy="60" r="8" fill="currentColor" stroke="none" />
      <circle cx="224" cy="70" r="8" fill="currentColor" stroke="none" />
      <circle cx="256" cy="60" r="8" fill="currentColor" stroke="none" />
      {/* Ears */}
      <path d="M112 148 H100 A20 20 0 0 0 100 188 H112" />
      <path d="M336 148 H348 A20 20 0 0 1 348 188 H336" />
      <g className="sandon-icon__brows">
      {/* Brows */}
      <path className="sandon-icon__brow-left" d="M160 136 L180 116" />
      <path className="sandon-icon__brow-right" d="M268 116 L288 136" />
      </g>
      <g className="sandon-icon__eyes">
      {/* Eyes — double blink now and then; glance right on hover (CSS) */}
      <path d="M184 152 Q184 168 184 184"><animate data-anim="blink" attributeName="d" values="M184 152 Q184 168 184 184;M184 178 Q184 178 184 178;M184 178 Q184 178 184 178;M184 158 Q184 171 184 184;M184 178 Q184 178 184 178;M184 178 Q184 178 184 178;M184 152 Q184 168 184 184" dur="0.7s" begin="indefinite" calcMode="spline" keyTimes="0;0.18;0.26;0.5;0.68;0.76;1" keySplines="0.45 0 0.55 1;0 0 1 1;0.45 0 0.55 1;0.45 0 0.55 1;0 0 1 1;0.45 0 0.55 1" /></path>
      <path d="M264 152 Q264 168 264 184"><animate data-anim="blink" attributeName="d" values="M264 152 Q264 168 264 184;M264 178 Q264 178 264 178;M264 178 Q264 178 264 178;M264 158 Q264 171 264 184;M264 178 Q264 178 264 178;M264 178 Q264 178 264 178;M264 152 Q264 168 264 184" dur="0.7s" begin="indefinite" calcMode="spline" keyTimes="0;0.18;0.26;0.5;0.68;0.76;1" keySplines="0.45 0 0.55 1;0 0 1 1;0.45 0 0.55 1;0.45 0 0.55 1;0 0 1 1;0.45 0 0.55 1" /></path>
      </g>
      {/* Beard line — dips at the cheeks and lifts over the lip to suggest a moustache */}
      <path d="M112 224 C140 262 176 274 204 264 Q224 256 244 264 C272 274 308 262 336 224" />
      <g className="sandon-icon__mouth">
      {/* Smirk — glides to the other side and back on hover */}
      <path d="M196 312 C220 322 244 318 256 298"><animate data-anim="hover" attributeName="d" values="M196 312 C220 322 244 318 256 298;M192 298 C204 318 228 322 252 312;M192 298 C204 318 228 322 252 312;M196 312 C220 322 244 318 256 298;M196 312 C220 322 244 318 256 298" dur="1.2s" begin="indefinite" calcMode="spline" keyTimes="0;0.3;0.6;0.8;1" keySplines="0.4 0 0.2 1;0 0 1 1;0.4 0 0.2 1;0 0 1 1" /></path>
      </g>
      </g>
    </svg>
  );
}
