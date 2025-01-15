<template>
    <v-card class="mb-2" color="#312059">
        <v-card-title>
            <div
                class="d-flex justify-space-between align-center flex-wrap"
                style="width: 100%"
            >
                <div>
                    <h3>{{ todo.name }}</h3>
                    <p v-if="!todo.lastModified">{{ formattedDate }}</p>
                    <p v-else>Última alteração: {{ formattedLastModified }}</p>
                </div>
                <v-chip
                    :color="statusColor"
                    :class="statusClass"
                    variant="flat"
                >
                    {{ todo.status }}
                </v-chip>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn @click="editTodo" color="#FF9823" text>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="showDeleteDialog = true" color="#591F31" text>
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-card-actions>
        <v-dialog v-model="showDeleteDialog" max-width="500" persistent>
            <v-card color="#312059">
                <v-card-title class="headline">
                    Confirmar exclusão
                </v-card-title>
                <v-card-text>
                    Você tem certeza que deseja excluir a tarefa
                    {{ todo.name }}?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="#FF9823"
                        variant="tonal"
                        @click="showDeleteDialog = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="red darken-1"
                        variant="tonal"
                        @click="confirmRemoveTodo"
                    >
                        Excluir
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            showDeleteDialog: false,
            statusOptions: ["Não iniciada", "Em andamento", "Finalizado"],
        };
    },
    computed: {
        formattedDate() {
            return new Date(this.todo.timestamp).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        },
        formattedLastModified() {
            return new Date(this.todo.lastModified).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        },
        statusColor() {
            switch (this.todo.status) {
                case "Em andamento":
                    return "#1F5931";
                case "Finalizado":
                    return "#591F31";
                case "Não iniciada":
                default:
                    return "#FF9823";
            }
        },
        statusClass() {
            return this.todo.status === "Não iniciada" ? "white-text" : "";
        },
    },
    methods: {
        editTodo() {
            this.$emit("edit", this.index);
        },
        confirmRemoveTodo() {
            this.showDeleteDialog = false;
            this.$emit("remove", this.index);
        },
    },
};
</script>

<style scoped>
.white-text {
    color: white !important;
}
</style>
