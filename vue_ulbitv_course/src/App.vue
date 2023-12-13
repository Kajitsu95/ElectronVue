<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-button 
            @click="showDialog"
            style=" margin: 15px"
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
            v-if="!isPostsLoading"            
        />
        <h4 style="color: gray" v-else>
            Список постов загружается...
        </h4>
    </div>
</template>
<script>
import PostForm from "./components/PostForm.vue"
import PostList from "./components/PostList.vue"
import axios from "axios"

export default {
    components: {
        PostList, PostForm
    },
    data() {
        return {
            posts: [ ],
            dialogVisible: false,
            isPostsLoading: true,
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
        },
        async fetchPosts() {
            try {                
                const responce = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                //console.log(responce);
                responce.data.forEach(element => {
                    this.posts.push(element);
                });
                this.isPostsLoading = false;
            }
            catch (error) {
                alert('Ошибка: ' + error)
            }
        }
    },
    mounted() {
        this.isPostsLoading = true;
        this.fetchPosts();
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