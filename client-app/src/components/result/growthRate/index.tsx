import { ChartData, Line } from 'react-chartjs-2'
import * as chartjs from 'chart.js'
import './style.less'

function GrowthRate() {
  const data: ChartData<chartjs.ChartData> = {
    // labels: ['a', 'b', 'c', 'd'],
    datasets: [
      {
        backgroundColor: '#f0e5d82f',
        borderColor: '#b8b5ff',
        data: [
          { t: new Date('2021-01'), y: 0.5 },
          { t: new Date('2021-02'), y: 1.5 },
          { t: new Date('2021-03'), y: 2.5 },
          { t: new Date('2021-04'), y: 3.5 },
        ],
        label: 'Min',
        fill: '+1',
      },
      {
        backgroundColor: '#f0e5d82f',
        borderColor: '#f5c0c0',
        data: [
          { t: new Date('2021-01'), y: 1 },
          { t: new Date('2021-02'), y: 2 },
          { t: new Date('2021-03'), y: 3 },
          { t: new Date('2021-04'), y: 4 },
        ],
        label: 'Average',
        fill: false,
      },

      {
        backgroundColor: '#f0e5d82f',
        borderColor: '#b8b5ff',
        data: [
          { t: new Date('2021-01'), y: 1.5 },
          { t: new Date('2021-02'), y: 2.5 },
          { t: new Date('2021-03'), y: 3.5 },
          { t: new Date('2021-04'), y: 4.5 },
        ],
        label: 'Max',
        fill: 1,
      },
    ],
  }
  const options: chartjs.ChartOptions = {
    scales: {
      xAxes: [
        {
          type: 'time',
          // display: true,
          // distribution: 'series',
          time: {
            unit: 'month',
          },
        },
      ],
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  }

  return (
    <div className="growth-chart">
      <Line data={data} options={options} />
    </div>
  )
}
export default GrowthRate
