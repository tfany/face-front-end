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
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats"/>
              统计分析
            </template>
            <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
          </Submenu>
          <MenuItem name="4">
            <Icon type="ios-construct"/>
            异常处理
          </MenuItem>
        </Menu>
        <BoxSwitch v-if="flags[0]"></BoxSwitch>
        <UserManager v-if="flags[1]"></UserManager>
      </Col>
    </Row>

  </div>
</template>

<script>
  import BoxSwitch from "./BoxSwitch";
  import UserManager from "./UserManager";
  export default {
    name: "fixer",
    components: {UserManager, BoxSwitch},
    data(){
      return{
        flags: [true,false,false,false]
      }
    },
    methods:{
      selectOne(name){
        if(name==='1'){
          this.flags=[true,false,false,false]
        }else if(name==='2'){
          this.flags=[false,true,false,false]
        }else if(name==='3'){
          this.flags=[false,false,true,false]
        }else if(name==='4'){
          this.flags=[false,false,false,true]
        }
      }
    }
  }
</script>

<style scoped>

</style>
