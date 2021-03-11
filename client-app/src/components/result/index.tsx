import { Typography, Row, Col } from 'antd'
import PartitionChart from './chart'
import FundDetail from './fundDetail'
import GrowthRate from './growthRate'
import './style.less'

const { Paragraph } = Typography

function Result() {
  return (
    <div className="result">
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={10}>
          <div className="partition-box">
            <Paragraph>อัตราส่วน</Paragraph>
            <PartitionChart />
          </div>
        </Col>
        <Col xs={24} sm={14}>
          <div className="partition-box">
            <Paragraph>รายละเอียดกองทุน</Paragraph>
            <FundDetail />
          </div>
        </Col>
        <Col xs={24} sm={24}>
          <div className="partition-box">
            <Paragraph>แสดงอัตราการเติบโต</Paragraph>
            <GrowthRate />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Result
