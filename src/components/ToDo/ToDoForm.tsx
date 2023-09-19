import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Select,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import TaskService, {
  Task,
  TaskCategory,
  TaskPriority,
} from "../../services/ToDo";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { format, parseISO } from "date-fns";
import {setToogleTodo} from "../../store/slices/todoSlice";

dayjs.extend(utc);
interface TaskFormProps {
  mode: "create" | "update" | "details";
  initialValues?: Task;
}

const initialForm =  {
  title: "",
  description: "",
  category:"",
  priority: "",
  status: "",
}

const ToDoForm: React.FC<TaskFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  let { taskId } = useParams();
  const taskService = new TaskService();
  const { detailToDo, loading } = useSelector((state: RootState) => state.toDo);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("taskId", taskId)
  }, [taskId]);

  const onFinish = async (values: any) => {
    console.log("Form values:", values);
    if (mode === "create") {
      try {
        const newTask = await taskService.createTask(values);
        message.success("Tarea Creada Exitosamente");
        dispatch(setToogleTodo())
        navigate("/");
      } catch (error) {
        console.error("Error creating task:", error);
        message.error("Lo sentimos Hubo un error");
      }
    }
    if (mode === "update") {
      try {
        // @ts-ignore
        values.id = detailToDo.id
        const newTask = await taskService.updateTask(values);
        message.success("Tarea Actualizada Exitosamente");
        navigate("/");
      } catch (error) {
        console.error("Error creating task:", error);
        message.error("Lo sentimos Hubo un error");
      }
    }
  };
  const formValues = mode === "create" ?  initialForm : detailToDo

  return (
    <>
      <div>
        <Button onClick={() => navigate("/")}>Volver</Button>
      </div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "500px", margin: "0 auto" }}// @ts-ignore
        initialValues={ formValues }
      >
        <Form.Item
          label="Titulo"
          name="title"
          rules={[{ required: true, message: "Please enter the task name" }]}
        >
          <Input disabled={mode === "details"} />
        </Form.Item>

        <Form.Item
          label="Descripcion"
          name="description"
          rules={[
            { required: true, message: "Please enter the task description" },
          ]}
        >
          <Input.TextArea rows={4} disabled={mode === "details"} />
        </Form.Item>

        <Form.Item
          label="Categoria"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select disabled={mode === "details"}>
            {Object.values(TaskCategory).map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Prioridad"
          name="priority"
          rules={[{ required: true, message: "Please select a priority" }]}
        >
          <Select disabled={mode === "details"}>
            {Object.values(TaskPriority).map((priority) => (
              <Select.Option key={priority} value={priority}>
                {priority}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Estado"
          name="status"
          valuePropName="checked"
        >
          <Checkbox defaultChecked={false} disabled={mode === "details"}>¿ Completada ?</Checkbox>
        </Form.Item>

        {mode !== "details" && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {mode === "create" ? "Crear Tarea" : "Actualizar Tarea"}
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  );
};

export default ToDoForm;
