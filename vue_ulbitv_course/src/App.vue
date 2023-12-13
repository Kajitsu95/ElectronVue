<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <div class="app_btns">
            <my-button 
                @click="showDialog"
            >
                Добавить пост
            </my-button>
            <my-select
                v-model="selectedSort"
                :options="sortOption"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form            
                @create="createPost"
            />
        </my-dialog>
        <post-list 
            :posts="sortedPost"
            @remove="removePost"
            v-if="!isPostsLoading"            
        />
        <h4 style="color: gray" v-else>
            Список постов загружается...
        </h4>
    </div>
</template>
<script>
import axios from "axios"
import PostForm from "./components/PostForm.vue"
import PostList from "./components/PostList.vue"
import MySelect from "./components/UI/MySelect.vue"

export default {
    components: {
    PostList, PostForm,
    MySelect
},
    data() {
        return {
            posts: [ ],
            dialogVisible: false,
            isPostsLoading: true,
            selectedSort: '',
            sortOption: [
                //{value: 'id', name: 'По id'},
                {value: 'title', name: 'По названию'},                 
                {value: 'body', name: 'По содержанию'},
            ],
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
    },
    computed: {
        sortedPost() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        }
    }
    // подписка на изменения
    /*watch: {
        selectedSort (newValue){
            this.posts.sort((post1, post2) => {
                return post1[newValue]?.localeCompare(post2[newValue])
            })
        }
    }*/
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
.app_btns {
    display: flex;
    justify-content: space-between;
    margin: 15px;
}
</style>