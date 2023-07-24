import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    name: string;
    description: string;
}

interface TodoState {
    loading: boolean;
    error: string | null;
    data: Todo[];
}

const initialState: TodoState = {
    loading: false,
    error: null,
    data: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        fetchTodosRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload;
        },
        fetchTodosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        createTodoRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        createTodoSuccess: (state) => {
            state.loading = false;
        },
        createTodoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateTodoRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateTodoSuccess: (state) => {
            state.loading = false;
        },
        updateTodoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteTodoRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteTodoSuccess: (state) => {
            state.loading = false;
        },
        deleteTodoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosFailure,
    createTodoRequest,
    createTodoSuccess,
    createTodoFailure,
    updateTodoRequest,
    updateTodoSuccess,
    updateTodoFailure,
    deleteTodoRequest,
    deleteTodoSuccess,
    deleteTodoFailure,
} = todoSlice.actions;

export default todoSlice.reducer;