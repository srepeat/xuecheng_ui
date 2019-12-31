<template>
<div>
  <!-- 表单查询，提交 -->
  <el-form v-model="params">
    <!-- 站点查询 -->
    <el-select v-model="params.siteId" placeholder="请选择站点">
      <el-option
      v-for="item in siteList"
      :key="item.siteId"
      :label="item.siteName"
      :value="item.siteId"
      >
    </el-option>
  </el-select>
    页面别名:<el-input v-model="params.pageAliase" style="width:100px"></el-input>
<!-- 类型查询 -->
    <el-select v-model="params.pageType" placeholder="请选择类型">
      <el-option
      v-for="item in siteType"
      :key="item.siteId"
      :label="item.pageType"
      :value="item.pageType">
    </el-option>
  </el-select>

  页面名称:<el-input v-model="params.pageName" style="width:100px"></el-input>
    <!-- 编写页面静态部分，即view部分 -->
    <el-button type="primary" size="small" v-on:click="query">查询</el-button>
    <router-link :to="{path:'/cms/page/add',query:{
          page:this.params.page,
          siteId:this.params.siteId}}">
        <el-button type="primary" size="small">新增</el-button>
    </router-link>
  </el-form>
    <!-- 表格 -->
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称"  width="180"></el-table-column>
      <el-table-column prop="pageAliase" label="别名"  width="180"></el-table-column>
      <el-table-column prop="pageType" label="页面类型"  width="180"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径"  width="180"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径"  width="180"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间"  width="180"></el-table-column>
       <el-table-column prop="dataUrl" label="Url信息"  width="180"></el-table-column>
      <el-table-column label="操作" width="380">
          <template slot-scope="scope">
            <el-button
              size="small" type="primary"
              @click="edit(scope.row.pageId)">编辑
            </el-button>

            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row.pageId)">删除
            </el-button>

            <el-button 
            @click="preview(scope.row.pageId)" 
            type="info" 
            size="mini">页面预览
            </el-button>

            <el-button @click="postPage(scope.row.pageId)" 
            type="primary"  
            size="small">页面发布
            </el-button>

          </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <el-pagination
    background
    layout="prev, pager, next"
    :page-size="this.params.size"
    :total="total" :current-page="this.params.page"
    v-on:current-change="changePage"
    style="float:right">
</el-pagination>
</div>
</template>


<script>
//引入接口
import * as cmsApi from '../api/cms'
/*编写页面静态部分，即model及vm部分。*/
export default {
      data() {
        return {
          siteType:[],//pageType类型查询
          siteList:[],//站点列表
          list: [],
            total:10,
            params:{
                page:1,//页码
                size:7,//每页显示个数
                siteId:'',
                pageAliase:'',
                pageType:'',
                pageName:''
            }
        }
      },
      methods:{
          query:function(){
            cmsApi.page_list(this.params.page,this.params.size,this.params).then((res)=>{
                console.log(res);
                this.total = res.queryResult.total;
                this.list = res.queryResult.list;
            })
              //alert("查询成功");
          },
          //查询每页的页码
          changePage:function(page){
           // alert(page);
           //把当前页码传递给this.params.page,实现分页
            this.params.page = page;
            this.query();
          },
          edit:function(pageId){
            //push从路由中取
              this.$router.push({ path: '/cms/page/edit/'+pageId
                 ,query:{
                   page:this.params.page,
                   siteId:this.params.siteId
                 }
              })
          },
          del:function(pageId){
            //提示框
            this.$confirm('你确定删除吗？','提示',{}).then(()=>{
              //调用接口，参数传递当前行的id
              cmsApi.page_del(pageId).then((res)=>{
                //删除成功
                if(res.success){
                    this.$message.success("删除成功")
                    //删除后刷新
                    this.query();
                }else{
                  this.$message.error("删除失败")
                }
              })
            })
          },
          //页面预览
          preview:function(pageId){
              window.open("http://localhost:31001/cms/preview/"+pageId);
          },
          //页面发布
          postPage:function(pageId){
              this.$confirm('确认发布该页面吗？','提升',{}).then(()=>{
                cmsApi.page_postPage(pageId).then((res)=>{
                  if(res.success){
                      console.log("页面Id:"+pageId);
                      this.$message.success("发布成功，请稍后查看页面");
                  }else{
                    this.$message.error("发布失败！");
                  }
                });
              }).catch(()=>{

              });
          }
      },
      // 在DOM为渲染之前准备加载数据
      created(){
          //从路由获取参数、转换数据类型
          this.params.page= Number.parseInt(this.$route.query.page || 1) 
          this.params.siteId = this.$route.query.siteId || ''
      },
      //使用钩子函数，完成DOM的数据页面渲染
      mounted(){
            this.query();
        //初始化站点列表
        this.siteList = [
      {
        siteId:'5a751fab6abb5044e0d19ea1',
        siteName:'门户主站'
      },
      {
        siteId:'102',
        siteName:'测试站'
      },
      {
        siteId:'',
        siteName:''
      }
      ],
      this.siteType=[
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          pageType:'0'
        },
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          pageType:'1'
        },
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          pageType:''
        }
      ]

      }
     
    }
</script>
<style>
/*编写页面样式，不是必须*/
</style>