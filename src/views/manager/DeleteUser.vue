<template>
  <div>
      <Table border :columns="columns" :data="userList"></Table>
  </div>
</template>

<script>
  import {deleteUser as myDelete, getList} from "../../api/user";
  import {getBaiduToken} from "../../api/getToken";
  import {deleteUser} from "../../api/baiduface";
  import {formatDate} from "../../utils/common";

  export default {
    props: {
      groupId: String
    },
    name: "DeleteUser",
    data () {
      return {
        columns: [
          {
            title: '姓名',
            key: 'name',
          },
          {
            title: '用户id',
            key: 'id',
          },
          {
            title: '手机号',
            key: 'phone'
          },
          {
            title: '创建时间',
            key: 'createTime',
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        userList: []
      }
    },
    created() {
      if(this.groupId!==''){
        getList(0,100,this.groupId).then(res=>{
          this.userList=res.data.data;
        })
      }
    },
    watch: {
      groupId: function(){
        getList(0,100,this.groupId).then(res=>{
          this.userList=res.data.data;
        })
      }
    },
    methods: {
      remove (index) {
        this.$Modal.confirm({
          content: '<p>确认要删除用户吗</p>',
          onOk: () => {
            getBaiduToken().then(response=>{
              let baiduToken=response.data.data
              let userId=this.userList[index].id;
              deleteUser(baiduToken,this.groupId,userId).then(response=>{
                  if(response.data.error_code===0){
                    myDelete(userId).then(response=>{
                      if(response.data.code===200){
                        this.userList.splice(index, 1);
                        this.$Message.info('删除成功');
                      }
                      else{
                        this.$Message.info('删除失败');
                      }
                    })
                  }else{
                    this.$Message.info('删除失败');
                  }
                }

              )
            })
          },
          onCancel: () => {
            this.$Message.info('取消删除');
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
