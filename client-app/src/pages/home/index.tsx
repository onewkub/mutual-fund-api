import { Typography, Image, Row, Col, Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import './style.less'
import homeImg from 'assets/11124.png'
const { Title, Paragraph } = Typography

function Home() {
  const history = useHistory()
  return (
    <div className="home">
      <Row className="home-row">
        <Col xs={{ order: 2, span: 24 }} sm={{ order: 1, span: 12 }}>
          <div className="home-col-text-container">
            <div className="home-col-text">
              <Title>ระบบค้นหากองทุนรวม</Title>
              <Paragraph>
                เว็บไซต์สำหรับช่วยค้นหากองทุนรวมที่เหมาะสมสำหรับรักลงทุนที่มีเป้าหมายในการสร้างกำไรและเก็บออม
              </Paragraph>
              <Button
                icon={<SmileOutlined />}
                type="primary"
                size="large"
                shape="round"
                onClick={() => history.push('/search')}
              >
                ค้นหากองทุน
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={{ order: 1, span: 24 }} sm={{ order: 2, span: 12 }}>
          <div className="home-col-img">
            <Image src={homeImg} preview={false} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Home
