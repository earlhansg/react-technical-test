import type { MetricData } from "../../types";

const MetricCard: React.FC<MetricData> = ({
  label,
  value,
  subtitle,
  linkText,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-semibold text-gray-900 mb-1">{value}</div>
      <div className="flex items-center">
        <span className="text-sm text-gray-600">{subtitle}</span>
        {linkText && (
          <button className="text-sm text-blue-600 hover:text-blue-800 ml-2">
            {linkText}
          </button>
        )}
      </div>
    </div>
  );
};

export default MetricCard;