<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-button 
            @click="showDialog"
            style=" margin: 15px 0"
        >
            Добавить пост
        </my-button>
        <my-dialog v-model:show="dialogVisible">
            <post-form            
                @create="createPost"
            />
        </my-dialog>
        <post-list 
            :posts="posts"
            @remove="removePost"
        />
    </div>
</template>
<script>
import PostForm from "./components/PostForm.vue"
import PostList from "./components/PostList.vue"
export default {
    components: {
        PostList, PostForm
    },
    data() {
        return {
            posts: [
                {id: 1, title: 'dg 1', body: 'ddgdgfgs 1'},
                {id: 2, title: 'dg 2', body: 'ddgdgfgs 2'},
                {id: 3, title: 'dg 3', body: 'ddgdgfgs 3'},
                {id: 4, title: 'dg 4', body: 'ddgdgfgs 4'},
            ],
            dialogVisible: false,
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog () {
            this.dialogVisible = true;
        }
    }
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 20px;
}
h1, h2, h3, h4 {
    color: teal;
    text-transform: uppercase;
}
</style>