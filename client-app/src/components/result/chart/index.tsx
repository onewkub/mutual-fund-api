import { Doughnut, ChartData } from 'react-chartjs-2'
import * as chartjs from 'chart.js'

function PartitionChart() {
  const data: ChartData<chartjs.ChartData> = {
    labels: ['ABC', 'BED', 'CEB', 'DAC', 'EAG'],
    datasets: [
      {
        data: [1, 2, 3, 4, 5],
        backgroundColor: [
          '#99bbad',
          '#ebd8b7',
          '#c6a9a3',
          '#9a8194',
          '#9fd8df',
        ],
      },
    ],
  }

  const options: chartjs.ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      align: 'center',
      position: 'right',
    },
  }

  return <Doughnut data={data} options={options} />
}

export default PartitionChart
