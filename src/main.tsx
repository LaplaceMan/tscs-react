import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'antd/dist/antd.less'
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter><App /></BrowserRouter>
)
