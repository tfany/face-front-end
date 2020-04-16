<template>
  <div>
    <Row>
      <Col span="12" offset="6">
        <Menu mode="horizontal" theme="light" active-name="1" @on-select="selectOne">
          <MenuItem name="1">
            <Icon type="ios-paper"/>
            开关表箱
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-people"/>
            查看用户
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-construct"/>
            异常处理
          </MenuItem>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-log-out" />
              其他
            </template>
            <MenuItem name="4-1">退出登录</MenuItem>
          </Submenu>
        </Menu>
        <BoxSwitch :errorCount="errorCount" v-if="flags[0]"></BoxSwitch>
        <UserManager v-if="flags[1]"></UserManager>
        <ErrorDetail :errorList.sync="errorList" v-if="flags[2]"></ErrorDetail>
      </Col>
    </Row>

  </div>
</template>

<script>
  import BoxSwitch from "./BoxSwitch";
  import UserManager from "./UserManager";
  import ErrorDetail from "./ErrorDetail";
  import {queryFixBadRecord} from "../../api/bad";
  export default {
    name: "Fixer",
    components: {ErrorDetail, UserManager, BoxSwitch},
    data(){
      return{
        flags: [true,false,false],
        errorList: [],
        errorCount: 0
      }
    },
    watch:{
      errorList(){
        this.errorCount=0;
        this.errorList.map(item=>{
          if(item.fixResult!==1){
            this.errorCount++;
          }
        })
      }
    },
    created() {
      queryFixBadRecord().then(res=>{
        this.errorList=res.data.data
        this.errorList.map(item=>{
          if(item.fixResult!==1){
            this.errorCount++;
          }
        })
      })
    },
    methods:{
      selectOne(name){
        console.log(name)
        if(name==='1'){
          this.flags=[true,false,false]
        }else if(name==='2'){
          this.flags=[false,true,false]
        }else if(name==='3'){
          this.flags=[false,false,true]
        }else if(name==='4-1'){
          this.$store.dispatch('FedLogOut').then(()=>{
            this.$router.push({
              path: '/'
            })
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
