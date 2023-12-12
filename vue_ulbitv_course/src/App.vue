<template>
    <div class="app">
        <post-form            
            @create="createPost"
        />
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
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
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
h3, h4 {
    color: teal;
    text-transform: uppercase;
}
</style>