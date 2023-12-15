<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'my-button'
}
</script>
<style scoped>
.btn {
    color: teal;
    border: 1px solid teal;
    background: none;
    padding: 15px 10px;
    margin: 5px;
}
</style>