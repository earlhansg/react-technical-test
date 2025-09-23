import type { MetricData } from "../../types";

const MetricCard: React.FC<MetricData> = ({
  label,
  value,
  subtitle,
  linkText,
}) => {
  return (
    // <div className="bg-white p-4 rounded-lg shadow-sm">
    <div className="p-4">
      <div className="text-sm text-[#68737D] mb-1">{label}</div>
      <div className="flex items-center">
        <span className="text-2xl font-semibold text-[#212936]">{value}</span>
        <button className="text-sm text-[#418D8E] ml-2 cursor-pointer font-medium">
            {linkText}
          </button>
        </div>
    </div>
  );
};

export default MetricCard;