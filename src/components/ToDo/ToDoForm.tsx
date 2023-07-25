import React from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import { useParams, useNavigate  } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


interface TaskFormProps {
    mode: 'create' | 'update' | 'details';
    initialValues?: {
        task: string;
        description: string;
        category: string;
        when: Date;
        priority: string;
        status: string;
    };
}

const ToDoForm: React.FC<TaskFormProps> = ({ mode, initialValues }) => {
    let { userId } = useParams();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        // Aquí puedes implementar la lógica para enviar los datos al servidor
        console.log('Form values:', values);
        message.success(`${mode === 'create' ? 'Task created' : 'Task updated'} successfully`);
        navigate('/'); // Redirigir a la página principal después de la creación
    };

    return (
        <>
            <div>
                <Button onClick={()=> navigate('/')}>Volver</Button>
            </div>
            <Form
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: '500px', margin: '0 auto' }}
                initialValues={initialValues}
            >
                <Form.Item
                    label="Task"
                    name="task"
                    rules={[{ required: true, message: 'Please enter the task name' }]}
                >
                    <Input disabled={mode === 'details'} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter the task description' }]}
                >
                    <Input.TextArea rows={4} disabled={mode === 'details'} />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select a category' }]}
                >
                    <Select disabled={mode === 'details'}>
                        <Select.Option value="Category 1">Category 1</Select.Option>
                        <Select.Option value="Category 2">Category 2</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="When"
                    name="when"
                    rules={[{ required: true, message: 'Please select a date' }]}
                >
                    <DatePicker
                        format="dd-MM-yyyy" // Cambia el formato a date-fns compatible
                        disabled={mode === 'details'}
                    />
                </Form.Item>

                <Form.Item
                    label="Priority"
                    name="priority"
                    rules={[{ required: true, message: 'Please select a priority' }]}
                >
                    <Select disabled={mode === 'details'}>
                        <Select.Option value="High">High</Select.Option>
                        <Select.Option value="Medium">Medium</Select.Option>
                        <Select.Option value="Low">Low</Select.Option>
                    </Select>
                </Form.Item>

                {mode !== 'details' && (
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {mode === 'create' ? 'Crear Tarea' : 'Actualizar Tarea'}
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </>
    );
};

export default ToDoForm ;

