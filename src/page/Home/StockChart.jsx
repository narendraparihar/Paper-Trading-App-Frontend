import { Button } from "@/components/ui/button";
import { fetchMarketChart } from "@/State/Coin/Action";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";

const StockChart = (coinId) => {
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);
  const timeSeries = [
    {
      keyword: "DIGITAL_CURRENCY_DAILY",
      key: "Time Series (Daily)",
      lable: "1 Day",
      value: 1,
    },
    {
      keyword: "DIGITAL_CURRENCY_DAILY",
      key: "Weekly Series (Daily)",
      lable: "1 Week",
      value: 7,
    },
    {
      keyword: "DIGITAL_CURRENCY_DAILY",
      key: "Monthly Series (Daily)",
      lable: "1 Month",
      value: 30,
    },
    {
      keyword: "DIGITAL_CURRENCY_Yearly",
      key: "Yearly Series (Daily)",
      lable: "1 Year",
      value: 365,
    },
  ];
  const [activeLabel, setActiveLabel] = useState(timeSeries[0]);
  const searies = [
    {
      data: coin.marketChart.data,
    },
  ];
  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 400,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
    },
    colors: ["#758AA2"],
    markers: {
      colors: ["#fff"],
      StrokeColor: "#fff",
      size: 0,
      strokeWidth: 1,
      strokeDashboardArray: 0,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacity: 0.9,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#4753E",
      strokeDashArray: 4,
      show: true,
    },
  };

  const handleActiveLabel = (value) => {
    setActiveLabel(value);
  };
  console.log(activeLabel.value);
  useEffect(() => {
    dispatch(
      fetchMarketChart({
        coinId,
        days: activeLabel.value,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, [dispatch, activeLabel]);
  return (
    <div>
      <div className="space-x-3">
        {timeSeries.map((item) => (
          <Button
            variant={activeLabel.lable == item.lable ? "" : "outline"}
            key={item.lable}
            onClick={() => handleActiveLabel(item)}
          >
            {item.lable}
          </Button>
        ))}
      </div>
      <div id="chart-timeline">
        <ReactApexChart options={options} series={searies} type="area" />
      </div>
    </div>
  );
};

export default StockChart;
