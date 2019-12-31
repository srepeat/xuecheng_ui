<template>
    <div>
        修改用户信息{{id}},姓名:{{name}}
    </div>
</template>

<script>
export default {
    layout:'test',
    async asyncData(){
        console.log("请求服务端接口");
        //alert(0) 只能在客户端中使用，不能在服务器渲染使用
        //同步调用，使用await实现
        //先调用a方法
        var a= await new Promise(function (resolve, reject) {
          setTimeout(function () {
            //alert(1)
            console.log(1)
            resolve(1)
          },2000)
        })
        //再调用b方法
        var b = await new Promise(function (resolve, reject) {
          setTimeout(function () {
            //alert(2)
            console.log(2)
            resolve(2)
          },1000)
        })
        return{
            name:"江苏工院"
        }
    },
    data(){
        return {
            id:"",
            name:""
        }
    },
    methods:{
        //客户端渲染方式
        getUser:function(){
            console.log("methods方式执行....")
            this.name="传智播客"
        },
        //异步调用
        a(){
            return new Promise(function(resolve,reject){
                setTimeout(function(){
                    resolve(1);
                },2000);
            })
        },

        b(){
            return new Promise(function(resolve,reject){
                setTimeout(function(){
                    resolve(2);
                },1000);

            })
        }



    },
    mounted(){
        this.id=this.$route.params.id;
        //alert(this.id);
        //this.getUser()
        //调用，根据时间的长短来异步执行
        /*this.a().then(res=>{
            alert(res);
        })
        this.b().then(res=>{
            alert(res)
        })*/
    }
}
</script>

<style>

</style>

