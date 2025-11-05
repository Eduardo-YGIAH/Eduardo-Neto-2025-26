type Props = {
  label: string;
  value: string | number;
  tooltip?: string;
};

export default function MetricBadge({ label, value, tooltip }: Props) {
  return (
    <div
      className="rounded-md border border-white/10 bg-black px-3 py-2 text-sm"
      title={tooltip}
    >
      <div className="text-zinc-400">{label}</div>
      <div className="text-lg font-semibold text-white">{value}</div>
    </div>
  );
}


