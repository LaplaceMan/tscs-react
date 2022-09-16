import MenuLeft from "./components/Menu"
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;

const App = () => {
  return (
    <div> 
    <Layout>
    <Sider
      trigger={null} theme="light"
      className="px-[24px]" >
         <MenuLeft/> 
    </Sider>
    <Layout>
      <Header style={{ padding: 0 }}>

      </Header>
      <Content className="bg-white" style={{ margin: '24px 16px 0', padding: 24, minHeight: 280 }}>
          content
      </Content>
    </Layout>
  </Layout>
    </div>  
  )
}

export default App
