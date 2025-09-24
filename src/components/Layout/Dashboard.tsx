// Dashboard.tsx
import React, { useState } from "react";
import type { AccountData, ChartData, MetricData } from "../../types";
import AccountsTable from "./AccountsTable";
import MetricCard from "./MetricCard";
import BarChart from "./BarChart";
import { ResponsiveBar } from "@nivo/bar";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "insights">(
    "overview"
  );

  const metricsData: MetricData[] = [
    {
      label: "Wasted spend (last 30 days)",
      value: "$2,539.45",
      subtitle: "",
    },
    {
      label: "Spend (last 30 days)",
      value: "$40,492",
      subtitle: "",
    },
    {
      label: "Wasted spend insights",
      value: "6",
      subtitle: "",
      linkText: "View all",
    },
    {
      label: "All insights",
      value: "18",
      subtitle: "",
      linkText: "View all",
    },
  ];

  const chartData: ChartData[] = [
    { week: "2-8 Sep", value: 200 },
    { week: "9-15 Sep", value: 450 },
    { week: "Last week", value: 200 },
    { week: "This week", value: 250 },
  ];

  const dataChart = [
    {
      week: "2-8 Sep",
      wastedSpend: 200,
      normalSpend: 400, // 600 - 200 = 400
    },
    {
      week: "9-15 Sep",
      wastedSpend: 450,
      normalSpend: 300, // 750 - 450 = 300
    },
    {
      week: "Last week",
      wastedSpend: 250,
      normalSpend: 200, // 450 - 250 = 200
    },
    {
      week: "This week",
      wastedSpend: 200,
      normalSpend: 150, // 350 - 200 = 150
    },
  ];

  const accountsData: AccountData[] = [
    {
      name: "Globex Corporation",
      insights: 8,
      wastedSpend: "$2,103.50",
      spend: "$3,013.56",
      conv: 305,
      cpa: "$103.43",
      roas: "2%",
    },
    {
      name: "Soylent Corp",
      insights: 3,
      wastedSpend: "$428.50",
      spend: "$1,204.56",
      conv: 105,
      cpa: "$115.43",
      roas: "2%",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#212936] mb-2">
              Good afternoon Richard
            </h1>
            <p className="text-[#212936] text-sm">
              What's been happening between 1 Sept - 3 Oct
            </p>
          </div>
          <div className="flex items-center">
            <select className="border border-[#68737D] rounded-md px-3 py-2 text-sm text-[#68737D] md:w-50 w-auto">
              <option>Last 30 days</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-[#418D8E] text-[#418D8E]"
                  : "border-transparent text-[#68737D] hover:text-[#212936] hover:border-[#212936]"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            {/* #68737D */}
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "insights"
                  ? "border-[#418D8E] text-[#418D8E]"
                  : "border-transparent text-[#68737D] hover:text-[#212936] hover:border-[#212936]"
              }`}
              onClick={() => setActiveTab("insights")}
            >
              Key insights
              <span className="ml-2 bg-[#ECF5F7] text-[#418D8E] rounded-full px-2 py-1 text-xs">
                6
              </span>
            </button>
          </nav>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-3 mb-8 border border-gray-200 rounded-sm">
          {metricsData.map((metric, index) => (
            <MetricCard
              key={index}
              label={metric.label}
              value={metric.value}
              subtitle={metric.subtitle}
              linkText={metric.linkText}
            />
          ))}
        </div>

        {/* Chart */}
        {/* <div className="mb-8">
          <BarChart data={chartData} title="Wasted spend by week" />
        </div> */}
        {/* Nivo ResponsiveBar Chart */}
        <div className="mb-8 bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-[#212936] mb-4">Wasted spend by week</h3>
          <div style={{ height: "400px" }}>
            <ResponsiveBar
              data={dataChart}
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
                return e.id + ": $" + e.formattedValue + " in week: " + e.indexValue;
              }}
            />
          </div>
        </div>

        {/* Accounts Table */}
        <AccountsTable accounts={accountsData} />
      </div>
    </div>
  );
};

export default Dashboard;