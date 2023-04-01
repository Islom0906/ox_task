import {Col, Input, Pagination, Row, Space, Spin, Table, Tag} from 'antd';
import {useEffect, useState} from "react";
import ProductService from "../../service/product";


const columns = [

    {
        title: 'Product Name',
        dataIndex: 'productName',
        id: 'productName',
    },
    {
        title: 'Short Description',
        dataIndex: 'shortDescription',
        id: 'shortDescription'
    },
    {
        title: 'Short Description',
        dataIndex: 'properties',
        id: 'properties',
        render: (_, {properties}) => (
            <>
                {properties.map((tag, ind) => {
                    return (
                        <Tag key={ind}>
                            {tag.name.toUpperCase()}: {tag.value}
                        </Tag>
                    );
                })}
            </>
        )
    }

];

const ProductTable = () => {
    const [isLoading, setisLoading] = useState(false)
    const [data,setData]=useState([])
    const [filterData,setFilterData]=useState([])
    const [isSearch,setIsSearch]=useState(false)
    const [totalCount,setTotalCount]=useState(1)


    const searchProduct=(e)=>{
        const searchValue=e.target.value
        if (searchValue===""){
            setIsSearch(false)
        }
        else{
            setIsSearch(true)
        }


        const filterData=data.filter(data=>data.name.toLowerCase().includes(searchValue.toLowerCase()))
        console.log(filterData)
        filterData.sort((a,b)=>a.name.localeCompare(b.name))
        setFilterData(filterData)
    }

    const getProduct = async (page, size) => {
        console.log(page,size)
        setisLoading(true)
        try {
            const {data} = await ProductService.getProduct(page, size)
            console.log(data.items)
            setData(data.items)
            setTotalCount(data.total_count)
            setisLoading(false)

        } catch (error) {
            setisLoading(false)

            console.log(error)
        }
    }

    useEffect(() => {
        getProduct(1, 10).then(() => console.log('success'))
    }, [])


    return (
        <Space direction={'vertical'} size={20}>
            <Row >
                <Col span={24}>
                    <Input placeholder={'Searching product'} onChange={(e)=>searchProduct(e)}/>
                </Col>
            </Row>
            <Spin size="large" spinning={isLoading}>
                <Table columns={columns} dataSource={isSearch ? filterData : data} rowKey={record => record.id} pagination={false} scroll={{
                    y: 600
                }}/>
            </Spin>

            <Pagination
                style={{marginTop:"20px"}}
                defaultCurrent
                total={totalCount}
                onChange={function (page, size) {
                    getProduct(page, size)
                }}
            />

        </Space>
    );
};

export default ProductTable;