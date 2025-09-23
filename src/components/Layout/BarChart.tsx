import type { ChartData } from "../../types";

const BarChart: React.FC<{ data: ChartData[]; title: string }> = ({
  data,
  title,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-[#212936] mb-6">{title}</h3>
      <div className="relative">
        <div className="flex items-end space-x-8 h-48 pl-8">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="relative w-full flex flex-col items-center justify-end h-40">
                {/* Light background bar */}
                <div
                  className="w-12 bg-[#FBD5D5] rounded-sm mb-1"
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                />
                {/* Dark foreground bar */}
                <div
                  className="w-12 bg-[#9B1C1C] rounded-sm absolute bottom-0"
                  style={{ height: `${(item.value / maxValue) * 80}%` }}
                />
              </div>
              <div className="text-xs text-[#68737D] mt-2">{item.week}</div>
            </div>
          ))}
        </div>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-40 flex flex-col justify-between text-xs text-[#68737D]">
          <span>$800</span>
          <span>$600</span>
          <span>$400</span>
          <span>$200</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
