<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input placeholder="Поиск..." v-model="searchQuery" />
        <div class="app_btns">
            <my-button @click="showDialog">
                Добавить пост
            </my-button>
            <my-select v-model="selectedSort" :options="sortOption" />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list v-if="!isPostsLoading" :posts="sortedSearchedPosts" @remove="removePost" />
        <h4 style="color: gray" v-else>Список постов загружается...</h4>
        <div v-intersection="loadMorePosts" class="list_observer"></div>
    </div>
</template>
<script>
import axios from "axios"
import PostForm from "@/components/PostForm.vue"
import PostList from "@/components/PostList.vue"
import MySelect from "@/components/UI/MySelect.vue"

export default {
    components: {
        PostList, PostForm,
        MySelect
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: true,
            needStop: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOption: [
                { value: 'id', name: 'По id' },
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По содержанию' },
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
        showDialog() {
            this.dialogVisible = true;
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
                this.posts = responce.data;
                this.isPostsLoading = false;
            }
            catch (error) {
                alert('Ошибка: ' + error)
            }
        },
        async loadMorePosts() {
            if (this.needStop)
                return;

            try {
                this.page += 1;
                const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limit);
                this.posts = [...this.posts, ...responce.data];
            }
            catch (error) {
                alert('Ошибка: ' + error)
            }
        }
    },
    mounted() {
        this.isPostsLoading = true;
        this.needStop = this.page < this.totalPages;
        this.fetchPosts();
    },
    computed: {
        sortedPosts() {
            if (this.selectedSort == 'id') {
                return [...this.posts].sort((post1, post2) => {
                    post1.id - post2.id
                })
            }
            else {
                return [...this.posts].sort((post1, post2) => {
                    return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                })
            }
        },
        sortedSearchedPosts() {
            if (this.searchQuery == '' && this.selectedSort == '')
                return this.posts;
            else {
                if (this.selectedSort == 'id' && this.searchQuery != '') {
                    return this.sortedPosts.filter(post => post.id == this.searchQuery)
                }
                else if (this.selectedSort == 'id' && this.searchQuery == '') {
                    return this.sortedPosts
                }
                else {
                    return this.sortedPosts.filter(post => post[this.selectedSort]?.toLowerCase().includes(this.searchQuery.toLowerCase()))
                }
            }
        }
    },
    // подписка на изменения
    watch: {

    }
}
</script>
<style>
.app_btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.list_observer {
    height: 30px;
    background-color: gainsboro;
}
</style>