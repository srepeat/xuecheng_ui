
//导入
var {add} = require("./model01")
var Vue = require("./vue.min")

var VM = new Vue({
    el:"#app",
    data:{
        name:"江苏工程学院",
        num1:"",
        num2:"",
        result:""
    },
    methods:{
        change:function(){
            this.result =add(Number.parseFloat(this.num1),Number.parseFloat(this.num2))  ;
        }
    }
});