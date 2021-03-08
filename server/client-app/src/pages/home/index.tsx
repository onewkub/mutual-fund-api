import { Typography, Image, Row, Col, Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import './style.less'
import homeImg from 'assets/11124.png'
const { Title, Paragraph } = Typography

function Home() {
  return (
    <div className="home">
      <Row className="home-row">
        <Col
          className="home-col-text-container"
          xs={{ order: 2, span: 24 }}
          sm={{ order: 1, span: 12 }}
        >
          <div className="home-col-text">
            <Title>ระบบค้นหากองทุน</Title>
            <Paragraph>
              เว็บไซต์สำหรับช่วยค้นหากองทุนรวมที่เหมาะสมสำหรับรักลงทุนที่มีเป้าหมายในการสร้างกำไรและเก็บออม
            </Paragraph>
            <Button
              icon={<SmileOutlined />}
              type="primary"
              size="large"
              shape="round"
            >
              ค้นหากองทุน
            </Button>
          </div>
        </Col>
        <Col
          className="home-col-img"
          xs={{ order: 1, span: 24 }}
          sm={{ order: 2, span: 12 }}
        >
          <Image src={homeImg} preview={false} />
        </Col>
      </Row>
    </div>
  )
}

export default Home
