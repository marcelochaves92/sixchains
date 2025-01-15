<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card class="pa-5" color="#312059">
                    <v-card-title>
                        <div class="text-center mb-4">
                            <img
                                src="../assets/logo.webp"
                                alt="Logo"
                                style="max-width: 150px"
                            />
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" :md="isEditing ? '8' : '12'">
                                <v-text-field
                                    v-model="newTodo"
                                    @keyup.enter="
                                        isEditing
                                            ? (showEditDialog = true)
                                            : addTodo()
                                    "
                                    :label="
                                        isEditing
                                            ? 'Editar tarefa'
                                            : 'Adicionar nova tarefa'
                                    "
                                    variant="outlined"
                                    color="#FF9823"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" v-if="isEditing">
                                <v-select
                                    v-model="newStatus"
                                    :items="statusOptions"
                                    label="Status"
                                    variant="outlined"
                                    color="#FF9823"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-btn
                            @click="
                                isEditing ? (showEditDialog = true) : addTodo()
                            "
                            :disabled="newTodo.trim() === ''"
                            color="#FF9823"
                            block
                            style="color: white; font-weight: bold"
                            >{{ isEditing ? "Salvar" : "Adicionar" }}</v-btn
                        >
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <TodoItem
                    v-for="(todo, index) in todos"
                    :key="index"
                    :todo="todo"
                    :index="index"
                    @edit="startEditing"
                    @remove="removeTodo"
                />
            </v-col>
        </v-row>

        <v-dialog v-model="showEditDialog" max-width="500" persistent>
            <v-card color="#312059">
                <v-card-title class="headline"> Confirmar edição </v-card-title>
                <v-card-text
                    >Você tem certeza que deseja alterar a tarefa
                    {{ oldTodoName }}?</v-card-text
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red darken-1"
                        variant="tonal"
                        @click="showEditDialog = false"
                        >Cancelar</v-btn
                    >
                    <v-btn
                        color="success darken-1"
                        variant="tonal"
                        @click="confirmEdit"
                        >Salvar</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import TodoItem from "~/components/TodoItem.vue";
import { useTodoStore } from "~/stores/todo";

export default {
    components: {
        TodoItem,
    },
    data() {
        return {
            newTodo: "",
            newStatus: "Não iniciada",
            oldTodoName: "",
            todos: [],
            isEditing: false,
            editingIndex: null,
            statusOptions: ["Não iniciada", "Em andamento", "Finalizado"],
            showEditDialog: false,
        };
    },
    computed: {
        todoStore() {
            return useTodoStore();
        },
    },
    async mounted() {
        await this.todoStore.fetchTodos();
        this.todos = this.todoStore.todos;
    },
    methods: {
        async addTodo() {
            if (this.newTodo.trim() !== "") {
                await this.todoStore.addTodo({
                    name: this.newTodo,
                    status: this.newStatus,
                    timestamp: Date.now(),
                    lastModified: null,
                });
                this.newTodo = "";
                this.todos = this.todoStore.todos;
            }
        },
        startEditing(index) {
            this.oldTodoName = this.todos[index].name;
            this.newTodo = this.todos[index].name;
            this.newStatus = this.todos[index].status;
            this.isEditing = true;
            this.editingIndex = index;
        },
        async confirmEdit() {
            if (this.editingIndex !== null) {
                await this.todoStore.editTodo(
                    this.todos[this.editingIndex].id,
                    {
                        name: this.newTodo,
                        status: this.newStatus,
                        lastModified: Date.now(),
                    }
                );
                this.newTodo = "";
                this.newStatus = "Não iniciada";
                this.isEditing = false;
                this.editingIndex = null;
                this.showEditDialog = false;
                this.todos = this.todoStore.todos;
            }
        },
        async removeTodo(index) {
            await this.todoStore.deleteTodo(this.todos[index].id);
            this.todos = this.todoStore.todos;
        },
    },
};
</script>