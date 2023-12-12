<template>
    <div>
        <h3>Список постов</h3>
        <post-item
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove', post)"
        />
    </div>
</template>

<script>
import PostItem from '@/components/PostItem.vue';
export default{
    components: {PostItem},
    props: {
        posts: {
            type: Array,
            required: true,
        }
    }
}
</script>
<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
}
</style>