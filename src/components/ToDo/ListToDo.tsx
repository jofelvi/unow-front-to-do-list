import React, {useState} from 'react';
import {Button, Col, Divider, message, Popconfirm, Row, Space, Table} from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DownloadOutlined, EditOutlined,  DeleteOutlined, } from "@ant-design/icons";
import type {SizeType} from 'antd/es/config-provider/SizeContext';
import type {ColumnsType} from 'antd/es/table';
import type {TableRowSelection} from 'antd/es/table/interface';

interface DataType {
    key: React.Key;
    task: string;
    description: string;
    category: string;
    when: string;
    priority: string;
    status: string;
    children?: DataType[];
}

const dataSource: DataType[] = [
    {
        key: '1',
        task: 'Task 1',
        description: 'Description 1',
        category: 'Category 1',
        when: '2023-07-25',
        priority: 'High',
        status: 'Pending',
    },
    {
        key: '2',
        task: 'Task 2',
        description: 'Description 2',
        category: 'Category 2',
        when: '2023-07-26',
        priority: 'Medium',
        status: 'In Progress',
    },
    {
        key: '3',
        task: 'Task 2',
        description: 'Description 2',
        category: 'Category 2',
        when: '2023-07-26',
        priority: 'Medium',
        status: 'Done',
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

    const handleEdit = (record: DataType) => {
        console.log('Edit Task:', record);
    };

    // Función para manejar la eliminación de una tarea
    const handleDelete = (key: React.Key) => {
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
                    <EditOutlined style={{ color: 'blue' }} onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => handleDelete(record.key)}
                        onCancel={() => message.error('Cancelled')}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Popconfirm>
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
                        <Button type="default" block icon={<DownloadOutlined />} size={size}>
                            Crear TO-DO
                         </Button>
                    </Col>
                <Col flex={3}>
                    <Divider>Filtrar por estado:</Divider>
                    <Col flex={5} style={{ display: "flex", justifyContent: "space-between"}} >
                        <Button type="default" icon={<DownloadOutlined />} size={size}>
                            Listar todas
                        </Button>
                        <Button type="default" icon={<DownloadOutlined />} size={size}>
                            TO-DO
                        </Button>
                        <Button type="default" icon={<DownloadOutlined />} size={size}>
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