import { Typography } from 'antd'
import FilterBox from 'components/filterBox'
import Result from 'components/result'
import './style.less'

const { Title } = Typography

function Search() {
  return (
    <div className="bg">
      <Title level={2}>ระบบค้นหากองทุน</Title>
      <FilterBox />
      <Result />
    </div>
  )
}

export default Search
