import React, {useEffect, useReducer, useState} from 'react';
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
import TaskService, {Task} from "../../services/ToDo";
import {fetchAllTodosSuccess, setLoading, setToogleTodo} from "../../store/slices/todoSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";

const statusIconMap: { [key: string]: React.ReactNode } = {
    Done: <CheckCircleOutlined style={{ color: 'green' }} />,
    'In Progress': <ClockCircleOutlined style={{ color: 'orange' }} />,
    Pending: <CloseCircleOutlined style={{ color: 'red' }} />,
};

const ListToDo = () => {
    const [size, setSize] = useState<SizeType>('large');
    const [checkStrictly, setCheckStrictly] = useState(false);
    const navigate = useNavigate();
    const taskService = new TaskService();
    const toDo = useSelector((state: RootState) => state.toDo);
    const { toogleToDo, data } = useSelector((state: RootState) => state.toDo);
    const [taskData, setTaskData] = useState< Task[]>(data)
    const [_, forceUpdate] = useReducer(x => x + 1, 0);
    const dispatch = useDispatch();

    useEffect(() => {

    }, [toogleToDo, toDo]);
    const handleEditTask = (record: Task) => {
        navigate(`update-To-do/${record.id}`)
    };

    const handleShowTask = (record: Task) => {
        navigate(`details-To-do/${record.id}`)
    };

    const handleDeleteTask = (key: number | undefined) => {
        console.log('Delete Task:', key);
        let deleteTask = taskService.deleteTask(key)
        setToogleTodo()
        getAllTask()
        message.success('Tarea borrada exitosamente');
    };
    const filterTasksByStatus =(tasks: any[], status: any)=> {
        return tasks.filter((task) => task.status === status);
    }

    const rowSelection: TableRowSelection<Task> = {
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

    const completedTasks = ()=>{
       let filterData =  filterTasksByStatus(data, true)
       setTaskData(filterData)
    }
    const pendingTasks  = ()=>{
       let filterData =  filterTasksByStatus(data, false)
       setTaskData(filterData)
    }
    const getAllTask = async () => {
        let task = await taskService.getAllTasks();
        dispatch(fetchAllTodosSuccess(task));
        dispatch(setLoading(false));
    };
    const listAllTask  = ()=>{
        getAllTask()
        setTaskData(data)
    }

    const columns: ColumnsType<Task> = [
        {
            title: 'Titulo',
            dataIndex: 'title',
            key: 'task',
        },
        {
            title: 'Descripcion',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Prioridad',
            dataIndex: 'priority',
            key: 'priority',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: boolean) => (status ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />)
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{ color: 'blue' }} onClick={() => handleEditTask(record)} />
                    <Popconfirm
                        title="¿Esta seguro que desea borrar esta tarea?"
                        onConfirm={() => handleDeleteTask(record.id)}
                        onCancel={() => message.error('Cancelled')}
                        okText="Si"
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
                        <Button onClick={()=> listAllTask()} type="default" icon={<UnorderedListOutlined />} size={size}>
                            Actualizar
                        </Button>
                        <Button onClick={()=> listAllTask()} type="default" icon={<UnorderedListOutlined />} size={size}>
                            Quitar Filtros
                        </Button>
                        <Button onClick={()=> pendingTasks()} type="default" icon={<InfoCircleOutlined />} size={size}>
                            TO-DO
                        </Button>
                        <Button onClick={()=> completedTasks()} type="default" icon={<CheckOutlined />} size={size}>
                            Completadas
                        </Button>
                    </Col>
                </Col>
            </Row>
                <Table
                    style={{marginTop: 20}}
                    dataSource={taskData}
                    columns={columns}
                    rowSelection={{ ...rowSelection, checkStrictly }}
                />;
            </div>
        </>
    )
}
export default ListToDo;