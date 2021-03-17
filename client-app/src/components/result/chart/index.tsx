import { Doughnut, ChartData } from 'react-chartjs-2'
import * as chartjs from 'chart.js'
import { IFund } from 'store/actions/fundAction'

interface IProps {
  fundSet: IFund[]
}

function PartitionChart(props: IProps) {
  const { fundSet } = props
  const data: ChartData<chartjs.ChartData> = {
    labels: fundSet
      .filter((element) => element.percentage > 0)
      .map((element) => element.name),
    datasets: [
      {
        data: fundSet.map((element) => element.percentage),
        backgroundColor: ['#99bbad', '#ebd8b7', '#c6a9a3'],
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
