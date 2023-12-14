<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-input 
            placeholder="Поиск..."
            v-model="searchQuery"
        />
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
        <div v-if="!isPostsLoading" >
            <post-list 
                :posts="sortedSearchedPosts"
                @remove="removePost"
           
            />
            <div class="page_wrapper">
                <div 
                    v-for="pageNumber in totalPages" :key="pageNumber"
                    class="page"
                    :class="{
                        'current_page':page === pageNumber
                    }"
                    @click ="changePage(pageNumber)"
                >
                    {{ pageNumber }}
                </div>
            </div>
        </div>
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
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
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
        changePage (pageNumber) {
            this.page = pageNumber;
        },
        async fetchPosts() {
            try {                
                const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limit);
                //console.log(responce);
                this.posts = responce.data;
                /*responce.data.forEach(element => {
                    this.posts.push(element);
                });*/
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
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        },
        sortedSearchedPosts () {
            if (this.searchQuery == '')
                return this.posts;

            if (this.selectedSort != '') {
                return this.sortedPosts.filter(post => post[this.selectedSort]?.toLowerCase().includes(this.searchQuery.toLowerCase()))                
            }
            else {
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
        }
    },
    // подписка на изменения
    watch: {
        page(){
            this.fetchPosts()
        }
        /*selectedSort (newValue){
            this.posts.sort((post1, post2) => {
                return post1[newValue]?.localeCompare(post2[newValue])
            })
        }*/
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
.app_btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
.page_wrapper {
    display: flex;
    justify-content: center;
    margin: 15px 0;
}
.page {
    color: teal;
    background-color: white;
    text-transform: uppercase;
    padding: 0 5px;
    border: 1px solid teal;
    border-radius: 10px;
    margin: 5px;
}
.current_page {
    background-color: teal;
    color: white;
}
</style>