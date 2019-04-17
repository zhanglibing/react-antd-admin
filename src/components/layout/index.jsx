import React,{Component} from 'react'
import { Layout } from 'antd';
import SliderModel from '../slider/index'

const {
    Header, Footer, Sider, Content,
} = Layout;

class LayoutModel extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Layout>
                <Sider>
                    <SliderModel></SliderModel>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>
                        {this.props.children}
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )

    }

}

export default LayoutModel;