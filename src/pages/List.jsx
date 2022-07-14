import React, { useState, useEffect } from 'react'
import './css/List.css'
import { Space, Table, Button, message } from 'antd';
// import { Link } from 'react-router-dom';
import { ArticleListApi, ArticleDelApi} from '../request/api'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

{/**  用户列表页面 */}

//标题组件
function MyTitle(props) {
  return (
    <div >
      <a rel='noopener' className='table_title' href={"http://codesohight.com:8765/article/" + props.id}>{props.title}</a>
      <p style={{ color: '#999' }}>{props.subTitle}</p>
    </div >
  )
}

export default function List() {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({   //分页
    current: 1,
    pageSize: 8,
    total: 0
  });

  const delFn = (id) =>{        //删除
    // console.log(id)
    ArticleDelApi({id}).then((res)=>{
      if(res.errCode === 0){
        message.success(res.message);
        //重新刷新页面      window.reload  调用getArticleListApi(1)    增加变量的检测
        getArticleListApi(1)
      }else{
        message.error(res.message)
      }
    })
  }

  const getArticleListApi = (current, pageSize) => {     //接口调用
    ArticleListApi({
      num: current,
      count: pageSize
    }).then((res) => {
      if (res.errCode === 0) {
        let newArr = res.data.arr;      //取值
        let myArr = [];
        let { num, count, total } = res.data;
        setPagination({
          current: num,
          pageSize: count,
          total: total
        })
        newArr.map(item => {
          let obj = {
            key: item.id,
            date: moment(item.data).format('YYYY-MM-DD hh:mm:ss'),
            mytitle: <MyTitle title={item.title} subTitle={item.subTitle} id={item.id} />
          }
          myArr.push(obj);
        })
        setArr(myArr);
      } else {
        message.error(res.message)
      }
    })
  }


  useEffect(() => {   //请求数据
    getArticleListApi(pagination.current, pagination.pageSize);
  }, [])

  const pageChange = (arg) => {      //分页函数
    getArticleListApi(arg.current, arg.pageSize);
  }
  const [arr, setArr] = useState();   //列表数据

  //写在函数外面对其数据操作有困难
  const columns = [
    {
      dataIndex: 'mytitle',
      key: 'mytitle',
      width: '70%',
      render: text => <div> {text}</div>
    },
    {
      dataIndex: 'date',
      key: 'date',
      render: text => <p>{text}</p>
    },
    {
      key: 'action',
      render: text => (
        <Space size="middle">
          <Button type='primary' onClick={() => navigate('/edit/'+ text.key)}>编辑</Button>   {/**id跟着路由跳 */}
          <Button type='danger' onClick={() => delFn(text.key)}>删除</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className='list_box'>
      <Table
        showHeader={false}
        columns={columns}
        dataSource={arr}
        onChange={pageChange}
        pagination={pagination}
      />
    </div>
  )
}
