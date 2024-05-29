import { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
// import kjiLogo from "./logos/kji-logo.png";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
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
  if (chartDataPassed.data.length !== 0) { 
    labels = chartDataPassed.data.map(data => data[0])
    dataArray = chartDataPassed.data.map(data => data[1])
  }

  // const labels= chartDataPassed.data.labels
  // const dataArrayDay= chartDataPassed.data.dataArrayDay
  // TODO: Add icon to tooltip
  // const image = new Image(15,20)
  // image.src = kjiLogo

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
              return '$' + ctx[0].dataset.data[ctx[0].dataIndex].toFixed(2)
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
      // mode: 'nearest',
      titleFontColor: "red",
      titleFontStyle: "normal",
      displayColors: false,
      bodyFontColor: "black",
    },
    // tooltips: {
    //   callbacks: {
    //     label: function(tooltipItem, data) {
    //       let account: Account = that.accounts[tooltipItem.index];
    //       return account.accountNumber+":"+account.balance+"€";
    //     }
    //   }
    // }
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
            // stepSize: 25,
            // title: {
            //     display: true
            // }
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
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    // console.log("chartData", chartData)

    setChartData(chartData);
  }, [chartDataPassed]);

  return <Chart 
            ref={chartRef} 
            type='line' 
            data={chartData} 
            options={options}/>;
}
