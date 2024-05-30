import { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  Tooltip,
  Legend
);

const colors = [
  '#9F53FB',
  '#6982FA',
  '#23BCFE',
];


function createGradient(ctx, area ) {
  const colorStart = colors[0];
  const colorMid = colors[1];
  const colorEnd = colors[2];

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

export function ChartComponent(chartDataPassed) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  let labels = []
  let dataArray = []
  if (chartDataPassed.data[1].length !== 0) { 
    labels = chartDataPassed.data[1].map(data => data[0])
    dataArray = chartDataPassed.data[1].map(data => data[1])
  }

  const options = {
    tension: 0.4,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          bodyColor: "#BBBBBB",
          cornerRadius: 15,
          titleColor: "#BBBBBB",
          titleFont: {weight: 'bold', size: 18},
          displayColors: false,
          padding: 15,
          // usePointStyle: true,
          callbacks: {
            title: (ctx) => {
              return ctx[0].dataset.data[ctx[0].dataIndex].toFixed(2) + ' ' + chartDataPassed.data[0]
            },
            label: (ctx) => {
              return ctx.label
            },
            // labelPointStyle: (ctx: any) => {
            //   console.log("footer", ctx)
            //   return {
            //     pointStyle: image
            //   }
            // },
          }
        },
    },
    tooltips: {
      backgroundColor: "green",
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderWidth: 1,
      titleFontColor: "red",
      titleFontStyle: "normal",
      displayColors: false,
      bodyFontColor: "black",
    },
    scales: {
          x: {
            ticks: {
                display: false //this will remove only the label
            }
        },
        y:
          {
            min: Math.min(...dataArray) - (Math.max(...dataArray) - Math.min(...dataArray)) * 0.4,
            max: Math.max(...dataArray) + (Math.max(...dataArray) - Math.min(...dataArray)) * 0.15,
            display: false
          },
        }
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataArray,
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
      })),
    };

    setChartData(chartData);
  }, [chartDataPassed]);

  return <Chart 
            ref={chartRef} 
            type='bar' 
            data={chartData} 
            options={options}/>;
}
