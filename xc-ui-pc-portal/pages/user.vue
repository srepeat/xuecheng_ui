<template>
 <div>
     用户管理导航 <nuxt-link :to="'/user/one'">跳转one页面</nuxt-link>,<nuxt-link :to="'/user/101'">修改用户</nuxt-link>
     <nuxt-child/>
 </div>   
</template>

<script>
export default {
    layout:'test'
}
</script>

<style>

</style>


