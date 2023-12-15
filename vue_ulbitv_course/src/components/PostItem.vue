<template>
    <div class="post">
        <div>
            <strong>ID:</strong>{{ post.id }}
        </div>
        <div>
            <strong>Название:</strong> {{ post.title }}
        </div>
        <div>
            <strong>Описание:</strong> {{ post.body }}
        </div>
        <my-button @click="$router.push({ name: 'postid', params: { id } })">
            Открыть
        </my-button>
        <my-button @click="$emit('remove', post)">
            Удалить
        </my-button>
    </div>
</template>
<script>
export default {
    data () {
        return {
            id: ''
        }
    },
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
    mounted() {
        this.id = this.post.id;
    },
}
</script>
<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
</style>