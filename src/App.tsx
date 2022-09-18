import {MenuSider, HeaderTop} from "./components"
import { Layout } from 'antd'
const { Header, Content, Sider } = Layout
import AllRoutes from "./Routes"
const App = () => {
  return (
    <div> 
    <Layout>
    <Sider
      trigger={null} theme="light"
      className="px-[24px]" >
         <MenuSider/> 
    </Sider>
    <Layout>
      <Header className="flex items-center" style={{padding: 0}}>
        <HeaderTop/>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
          {AllRoutes()}
      </Content>
    </Layout>
  </Layout>
    </div>  
  )
}

export default App
