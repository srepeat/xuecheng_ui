<template>
<div>
  <!--  绑定校验数据 :rules="pageFormRules"   提交验证通过/失败 、提示消息 ref="pageForm" -->
  <el-form   :model="pageForm" label-width="80px" :rules="pageFormRules" ref="pageForm">
    <!-- 站点 -->
    <el-form-item label="所属站点" prop="siteId">
      <el-select v-model="pageForm.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 模板 -->
    <el-form-item label="选择模版" prop="templateId">
      <el-select v-model="pageForm.templateId" placeholder="请选择">
        <el-option
          v-for="item in templateList"
          :key="item.templateId"
          :label="item.templateName"
          :value="item.templateId">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 页面名称 -->
    <el-form-item label="页面名称" prop="pageName">
      <el-input v-model="pageForm.pageName" auto-complete="off" ></el-input>
    </el-form-item>
    <!-- 别名 -->
    <el-form-item label="别名" prop="pageAliase">
      <el-input v-model="pageForm.pageAliase" auto-complete="off" ></el-input>
    </el-form-item>
    <!-- 访问路径 -->
    <el-form-item label="访问路径" prop="pageWebPath">
      <el-input v-model="pageForm.pageWebPath" auto-complete="off" ></el-input>
    </el-form-item>
    <!-- 物理路径 -->
    <el-form-item label="物理路径" prop="pagePhysicalPath">
      <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off" ></el-input>
    </el-form-item>
    <!-- Url信息 -->
    <el-form-item label="数据Url" prop="dataUrl">
        <el-input v-model="pageForm.dataUrl" auto-complete="off" ></el-input>
    </el-form-item>
    <!-- 类型 -->
    <el-form-item label="类型">
      <el-radio-group v-model="pageForm.pageType">
        <el-radio class="radio" label="0">静态</el-radio>
        <el-radio class="radio" label="1">动态</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- 时间 -->
    <el-form-item label="创建时间">
      <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.pageCreateTime"></el-date-picker>
    </el-form-item>

  </el-form>
  <!-- 表单提交 -->
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addSubmit" >提交</el-button>
    <el-button type="primary" @click="go_back" >返回</el-button>
  </div>
</div>
</template>
<script>
//引入接口
import * as cmsApi from '../api/cms'
/*编写页面静态部分，即model及vm部分。*/
export default {
      data() {
        return {
        siteList:[],//站点id
        templateList:[],//模板id
        //绑定属性
        pageForm:{
          siteId:'',
          templateId:'',
          pageName: '',
          pageAliase: '',
          pageWebPath: '',
          pageParameter:'',
          pagePhysicalPath:'',
          pageType:'',
          pageCreateTime: new Date(),
          dataUrl:''
        },
        // 校验表单
        pageFormRules: {
          siteId:[
            {required: true, message: '请选择站点', trigger: 'blur'}
          ],
          templateId:[
            {required: true, message: '请选择模版', trigger: 'blur'}
          ],
          pageName: [
            {required: true, message: '请输入页面名称', trigger: 'blur'}
          ],
          pageWebPath: [
            {required: true, message: '请输入访问路径', trigger: 'blur'}
          ],
          pagePhysicalPath: [
            {required: true, message: '请输入物理路径', trigger: 'blur'}
          ],
          dataUrl:[
            {required: true, message: '请输入数据Url', trigger: 'blur'}
          ]
        }
        }
      },
      methods:{
        // 提交方法
         addSubmit:function(){
            // 表单验证,
              this.$refs['pageForm'].validate((valid) => {
              if (valid) {
                //使用窗口提示方法
                this.$confirm('确定提交吗？','提示',{}).then(()=>{
                  //调用cmsApi接口方法
                  cmsApi.page_add(this.pageForm).then(res=>{
                    //判断是否提交成功
                    if(res.success){
                      this.$message.success("提交成功");
                      //等于reset重置
                      this.$refs['pageForm'].resetFields();
                    }else if(res.message){
                      this.$message.error(res.message);
                    }else{
                      this.$message.error("提交失败！");
                    }
                  })
                })
            }
          });
         },
        // 返回 
         go_back:function(){
           this.$router.push({
             path:'/cms/page/list',
            //  返回当前路径带参数的页面
             query:{
               page:this.$route.query.page,
               siteId:this.$route.query.siteId
             }
           });
         }
      },
      //使用钩子函数，完成DOM的数据页面渲染
      mounted(){
      //初始化站点列表
      this.siteList = [
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          siteName:'门户主站'
        },
        {
          siteId:'102',
          siteName:'测试站'
        }
      ]
      //模板列表
      this.templateList = [
        {
          templateId:'5a962b52b00ffc514038faf7',
          templateName:'首页'
        },
        {
          templateId:'5a962bf8b00ffc514038fafa',
          templateName:'轮播图'
        }
      ]
      }
     
    }
</script>
<style>
/*编写页面样式，不是必须*/
</style>