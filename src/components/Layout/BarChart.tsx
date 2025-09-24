import { ResponsiveBar } from "@nivo/bar";
import type { ChartData } from "../../types";

const BarChart: React.FC<{ chartData: ChartData[]; title: string }> = ({
  chartData,
  title,
}) => {
  return (
    <>
      <h3 className="text-lg font-semibold text-[#212936] mb-4">
        {title}
      </h3>
      <div style={{ height: "400px" }}>
        <ResponsiveBar
          data={chartData}
          keys={["wastedSpend", "normalSpend"]}
          indexBy="week"
          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
          padding={0.8}
          valueScale={{ type: "linear", min: 0, max: 800 }}
          indexScale={{ type: "band", round: true }}
          colors={["#9B1C1C", "#FBD5D5"]}
          defs={[]}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: [0, 200, 400, 600, 800],
            format: (value) => `$${value}`,
          }}
          enableLabel={false}
          legends={[]}
          role="application"
          ariaLabel="Wasted spend by week chart"
          barAriaLabel={function (e) {
            return (
              e.id + ": $" + e.formattedValue + " in week: " + e.indexValue
            );
          }}
        />
      </div>
    </>
  );
};

export default BarChart;
