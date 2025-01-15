import { defineStore } from 'pinia';
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useNuxtApp } from '#app';

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todos: []
    }),
    actions: {
        async fetchTodos() {
            const { $db } = useNuxtApp();
            const querySnapshot = await getDocs(collection($db, 'todos'));
            this.todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },
        async addTodo(todo) {
            const { $db } = useNuxtApp();

            const newTodo = {
                name: todo.name,
                status: todo.status,
                timestamp: todo.timestamp,
                lastModified: todo.lastModified
            };

            const docRef = await addDoc(collection($db, 'todos'), newTodo);

            this.todos.push({
                id: docRef.id,
                ...newTodo
            });
        },
        async editTodo(id, updatedTodo) {
            const { $db } = useNuxtApp();
            const todoRef = doc($db, 'todos', id);

            await updateDoc(todoRef, updatedTodo);

            const index = this.todos.findIndex(todo => todo.id === id);
            if (index !== -1) {
                this.todos[index] = { id, ...updatedTodo };
            }
        },
        async deleteTodo(id) {
            const { $db } = useNuxtApp();
            const todoRef = doc($db, 'todos', id);

            await deleteDoc(todoRef);

            this.todos = this.todos.filter(todo => todo.id !== id);
        }
    }
});