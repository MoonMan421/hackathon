import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import logoPlaceholder from "../logos/kuji-logo.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const counter = {
  id: 'counter',
  beforeInit: function (chart) {
  // Get reference to the original fit function
    const originalFit = chart.legend.fit;
    // Override the fit function
    chart.legend.fit = function fit() {
    // Call original function and bind scope in order to use `this` correctly inside it
      originalFit.bind(chart.legend)();
      this.height += 35;
    };
  },
}

ChartJS.register(counter);

export function DoughnutChartComponentWink({chartDataPassed, activeToken, onChange, activeIndex}) {
  const chartRef = useRef(null)

  // console.log("chartDataPassed", chartDataPassed)
  // console.log("activeTokenFirst", activeToken)

  // Set active state based on table state (activeIndex)
  useEffect(() => {
    const numberOfElements = chartRef.current?.data.datasets[0].data.length
    if (activeIndex > -1 && activeIndex < numberOfElements) {
      chartRef.current?.setActiveElements([
        { datasetIndex: 0, index: activeIndex },
      ])
    } else {
      chartRef.current?.setActiveElements([
    ])}
  }, [activeIndex])

  // useEffect(() => {
  //   const selectedMode = getEditorSelection(); // Get editor selection
  //   chartRef.current.options.plugins = activeToken === 'kuji' ? plugin : pluginNew;
  //   chartRef.current.update();
  // }, [activeToken])

  // console.log("activeTokenAfter", activeToken)

  const image = new Image();
  image.src = `/wink-logo.png`

  const plugin = {
    id: 'custom_canvas_background_image',
    beforeDraw: (chart) => {
      if (image.complete) {
        const ctx = chart.ctx;
        const {top, left, width, height} = chart.chartArea;
        const x = left + width / 2 - image.width / 2;
        const y = top + height / 2 - image.height / 2;
        ctx.drawImage(image, x, y);
      } else {
        image.onload = () => chart.draw();
      }
    },
  };

  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
      },
    },
    radius: '90%',
    cutout: '85%',
    onHover: function(evt, item) { 
      if(item[0] !== undefined){
        onChange(item[0].index)
      } else {
        onChange(-1)
      }
    },
   
  }

  const passedData = chartDataPassed.map(asset => asset[0])
  const colors = chartDataPassed.map(asset => asset[1])

  const greyData = [
    '#6A6A6A',
    '#808080',
    '#999999',
    '#B5B5B5',
    '#C2C2C2',
    '#D2D2D2',
  ]

  const data = {
    labels: [],
    datasets: [
      {
        label: 'Doughnut Chart',
        data: passedData,
        backgroundColor: colors,
        borderColor: [
          'rgba(229, 57, 53, 0)',
          'rgba(116, 250, 221, 0)',
          'rgba(89, 123, 181, 0)',
          'rgba(127, 32, 30, 0)',
          'rgba(149, 41, 239, 0)',
          'rgba(92, 92, 92, 0)',  
          'rgba(0, 0, 0, 0)',
          'rgba(116, 250, 221, 0)',
          'rgba(255, 184, 59, 0)',
          'rgba(164, 164, 164, 0)',
        ],
        hoverOffset: 20,
        hoverBackgroundColor: passedData[0] ? colors : greyData,
      },      
    ],
  };


  return <Doughnut 
            ref={chartRef} 
            data={data} 
            options={options}
            plugins = {[
              plugin
            ]}
            />;
}
