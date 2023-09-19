import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../services/ToDo';


interface TodoState {
    loading: boolean;
    error: string | null;
    data: Task[];
    detailToDo: Task | null,
    toogleToDo: false
}

const initialState: TodoState = {
    loading: true,
    error: null,
    data: [],
    detailToDo: null,
    toogleToDo: false
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setToogleTodo: (state) => {
            state.loading = !state.loading;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchAllTodosSuccess: (state, action: PayloadAction<Task[]>) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload;
        },
        fetchByIdTodosSuccess: (state, action: PayloadAction<Task | null>) => {
            state.loading = false;
            state.error = null;
            state.detailToDo = action.payload;
        },
        createTodoSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = null;
        },
        updateTodoSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        deleteTodoSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    setLoading, // Agregamos setLoading para establecer el estado de carga
    setError,
    fetchByIdTodosSuccess,
    createTodoSuccess,
    updateTodoSuccess,
    deleteTodoSuccess,
    setToogleTodo,
    fetchAllTodosSuccess
} = todoSlice.actions;

export default todoSlice.reducer;