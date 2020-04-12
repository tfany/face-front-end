<template>
  <div>
    <Row>
      <Col span="4">
        <Menu theme="light" @on-select="selectOne">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"/>
              普通住户管理
            </template>
            <MenuItem name="1-1">新增用户</MenuItem>
            <MenuItem name="1-2">删除用户</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people"/>
              维修人员管理
            </template>
            <MenuItem name="2-1">新增维修人员</MenuItem>
            <MenuItem name="2-2">删除维修人员</MenuItem>
          </Submenu>
        </Menu>
      </Col>
      <Col span="20">
        <AddUser :groupId="groupId" v-show="flags[0]"></AddUser>
        <DeleteUser :groupId="groupId" v-show="flags[1]"></DeleteUser>
        <AddUser :groupId="groupId" v-show="flags[2]"></AddUser>
        <DeleteUser :groupId="groupId" v-show="flags[3]"></DeleteUser>
      </Col>
    </Row>
  </div>
</template>
<script>
  import AddUser from "./AddUser";
  import DeleteUser from "./DeleteUser";
  export default {
    name: "Home",
    components:{
      DeleteUser,
      AddUser: AddUser
    },
    data() {
      return {
        groupId: '',
        flags: [false,false,false,false]
      }
    },
    methods:{
      selectOne(name){
        if(name==='1-1'){
          this.groupId="customer"
          this.flags=[true,false,false,false]
        }else if(name==='1-2'){
          this.groupId="customer"
          this.flags=[false,true,false,false]
        }else if(name==='2-1'){
          this.groupId="fixer"
          this.flags=[false,false,true,false]
        }else if(name==='2-2'){
          this.groupId="fixer"
          this.flags=[false,false,false,true]
        }
      }
    }
  }
</script>


<style scoped>

</style>
