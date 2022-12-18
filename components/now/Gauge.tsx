import { scaleLinear } from "d3-scale";
import { arc } from "d3-shape";

type GaugeProps = {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  unit?: string;
  colorRange?: [string, string];
};

export function Gauge(props: GaugeProps) {
  const { gradient, bg, fill } = useGauge(props);
  const { label, unit } = props;

  return (
    <div>
      <svg
        width="9em"
        viewBox={[-1, -1, 2, 1].join(" ")}
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient
            id="Gauge__gradient"
            gradientUnits="userSpaceOnUse"
            x1="-1"
            x2="1"
            y2="0"
          >
            {gradient.map((color, index) => (
              <stop
                key={color}
                stopColor={color}
                offset={`${index / (gradient.length - 1)}`}
              />
            ))}
          </linearGradient>
        </defs>
        <path d={bg} fill="#dbdbe7" />
        <path d={fill} fill="url(#Gauge__gradient)" />
      </svg>

      <p>{label}</p>
      <p>{unit}</p>
    </div>
  );
}

type UseGaugeArgs = {
  value: number;
  min?: number;
  max?: number;
  colorRange?: [string, string];
};
function useGauge(args: UseGaugeArgs) {
  const { value = 50, min = 0, max = 100, colorRange } = args;

  //Scales
  const percent = scaleLinear().domain([min, max]).range([0, 1])(value);
  const angle = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI, Math.PI])
    .clamp(true)(percent);
  const colorScale = scaleLinear<string>()
    .domain([0, 1])
    .range(colorRange || ["#dbdbe7", "#9980FA"]);
  const gradientSteps = colorScale.ticks(10).map((v) => colorScale(v));

  //Arcs
  const arcGenerator = arc().cornerRadius(1);
  const backgroundArc = arcGenerator({
    innerRadius: 0.65,
    outerRadius: 1,
    startAngle: -Math.PI / 2,
    endAngle: Math.PI,
  }) as string;
  const filledArc = arcGenerator({
    innerRadius: 0.65,
    outerRadius: 1,
    startAngle: -Math.PI,
    endAngle: angle,
  }) as string;

  return {
    gradient: gradientSteps,
    bg: backgroundArc,
    fill: filledArc,
  };
}
