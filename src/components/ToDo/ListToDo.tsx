import React, {useState} from 'react';
import {Button, Col, Divider, message, Popconfirm, Row, Space, Table} from 'antd';
import {
    CheckCircleOutlined,
    CheckOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    FileAddOutlined,
    FolderViewOutlined,
    InfoCircleOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import type {SizeType} from 'antd/es/config-provider/SizeContext';
import type {ColumnsType} from 'antd/es/table';
import type {TableRowSelection} from 'antd/es/table/interface';
import {useNavigate} from "react-router-dom";

interface DataType {
    key: React.Key;
    task: string;
    description: string;
    category: string;
    when: Date;
    priority: string;
    status: string;
    children?: DataType[];
    id: string
}

const dataSource: DataType[] = [
    {
        key: '1',
        task: 'Task 1',
        description: 'Description 1',
        category: 'Category 1',
        when: new Date('2023-07-25'),
        priority: 'High',
        status: 'Pending',
        id: "52332"
    },
    {
        key: '2',
        task: 'Task 2',
        description: 'Description 2',
        category: 'Category 2',
        when: new Date('2023-07-25'),
        priority: 'Medium',
        status: 'In Progress',
        id: "5222"
    },
    {
        key: '3',
        task: 'Task 2',
        description: 'Description 2',
        category: 'Category 2',
        when: new Date('2023-07-25'),
        priority: 'Medium',
        status: 'Done',
        id: "5212"
    },
];

const statusIconMap: { [key: string]: React.ReactNode } = {
    Done: <CheckCircleOutlined style={{ color: 'green' }} />,
    'In Progress': <ClockCircleOutlined style={{ color: 'orange' }} />,
    Pending: <CloseCircleOutlined style={{ color: 'red' }} />,
};

const ListToDo = () => {
    const [size, setSize] = useState<SizeType>('large');
    const [checkStrictly, setCheckStrictly] = useState(false);
    const navigate = useNavigate();

    const handleEditTask = (record: DataType) => {
        navigate(`update-To-do/${record.id}`)
    };

    const handleShowTask = (record: DataType) => {
        console.log('handleShowTask:', record);
        navigate(`details-To-do/${record.id}`)
    };

    const handleDeleteTask = (key: React.Key) => {
        console.log('Delete Task:', key);
        message.success('Task deleted successfully');
    };

    const rowSelection: TableRowSelection<DataType> = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Task',
            dataIndex: 'task',
            key: 'task',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'When',
            dataIndex: 'when',
            key: 'when',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => statusIconMap[status],
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{ color: 'blue' }} onClick={() => handleEditTask(record)} />
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => handleDeleteTask(record.key)}
                        onCancel={() => message.error('Cancelled')}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>
                    <FolderViewOutlined style={{ color: 'blue' }} onClick={() => handleShowTask(record)} />
                </Space>
            ),
        },
    ];
    return (
        <>
           <h1 style={{textAlign: "center"}}>React app : lista de tareas por hacer (To-Do)</h1>
            <div>
                <Row>
                    <Col style={{marginRight: 10, marginTop: 57}} flex={2}>
                        <Button type="default" block icon={<FileAddOutlined />} size={size} onClick={()=> navigate('/create-To-do')}>
                            Crear TO-DO
                         </Button>
                    </Col>
                <Col flex={3}>
                    <Divider>Filtrar por estado:</Divider>
                    <Col flex={5} style={{ display: "flex", justifyContent: "space-between"}} >
                        <Button type="default" icon={<UnorderedListOutlined />} size={size}>
                            Listar todas
                        </Button>
                        <Button type="default" icon={<InfoCircleOutlined />} size={size}>
                            TO-DO
                        </Button>
                        <Button type="default" icon={<CheckOutlined />} size={size}>
                            Completadas
                        </Button>
                    </Col>
                </Col>
            </Row>
                <Table
                    style={{marginTop: 20}}
                    dataSource={dataSource}
                    columns={columns}
                    rowSelection={{ ...rowSelection, checkStrictly }}
                />;
            </div>
        </>
    )
}
export default ListToDo;