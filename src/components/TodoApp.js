import React, { useState } from 'react';
import TodoHeader from './TodoHeader';
import uuid from 'uuidv4';
import CustomModal from './CustomModal';
import { Card } from 'antd';
import { notification } from 'antd';
import TabsContainer from './TabsContainer';

const openNotification = (placement) => {
    notification.warning({
        message: `Warning`,
        description:
            'Could not process blank!',
        placement,
    });
};

export default function TodoApp() {
    const [openDialog, setOpenDialog] = useState(false);
    const [priority, setPriority] = useState("low");
    const [taskValue, setTaskValue] = useState("");
    const currentDate = new Date();
    const [todos, setTodos] = useState([]);
    const [editTask, setEditTask] = useState({ id: "", task: "", status: "", priority: "" });

    const priorityOptions = [
        {
            value: 'low',
            label: 'low',
        },
        {
            value: 'medium',
            label: 'medium',
        },
        {
            value: 'high',
            label: 'high',
        },
    ];

    const handlePriorityChange = (data) => {
        setPriority(data);
    }

    const handleTaskChange = (event) => {
        setTaskValue(event.target.value);
    }

    function addTask() {
        let newTaskValue = taskValue;
        if (newTaskValue === "") {
            openNotification("top");
            return null;
        }
        const todosList = todos.concat();
        let newTask = {
            id: uuid(),
            task: newTaskValue,
            status: "Todo",
            priority: priority,
            created: currentDate.toDateString() + " " + currentDate.toLocaleTimeString(),
        }
        todosList.push(newTask);
        setTodos(todosList);
        setTaskValue("");
        setPriority("low");
    }

    function setTaskData(id, todoValue, todoStatus, todoPriority) {
        setEditTask({ id, task: todoValue, status: todoStatus, priority: todoPriority })
        setOpenDialog(true);
    }

    function updateTask() {
        const todosList = todos.filter(data => {
            if (data.id === editTask.id) {
                data.task = editTask.task;
                data.status = editTask.status;
                data.priority = editTask.priority;
            }
            return data;
        });
        setTodos(todosList);
        setEditTask({ id: "", task: "", status: "" });
        setOpenDialog(false)
    }

    function deleteTask(id) {
        const todosList = todos.filter(data => data.id !== id);
        setTodos(todosList);
    }

    function handleCancel() {
        setEditTask({ id: "", task: "", status: "" });
        setOpenDialog(false)
    }

    return (
        <div className='container'>
            <Card className='cardStyle'>
                <CustomModal
                    isOpen={openDialog}
                    onCancel={handleCancel}
                    onUpdate={updateTask}
                    editValue={editTask}
                    onSetEditTask={setEditTask}
                />
                <TodoHeader
                    taskValue={taskValue}
                    priority={priority}
                    priorityOptions={priorityOptions}
                    handlePriorityChange={handlePriorityChange}
                    handleTaskChange={handleTaskChange}
                    onAddTask={addTask}
                />
                <TabsContainer
                    todos={todos}
                    deleteTask={deleteTask}
                    setTaskData={setTaskData}
                />
            </Card>
        </div>
    );
}


