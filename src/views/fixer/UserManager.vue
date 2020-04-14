<template>
  <div>
    <Table v-if="!showDetail" border :columns="columns" :data="userList"></Table>
    <CustomerPower v-if="showDetail" :user-id-from-father="rowUserId"></CustomerPower>
  </div>
</template>

<script>
  import {getList} from "../../api/user";
  import CustomerPower from "../customer/CustomerPower";

  export default {
    components: {CustomerPower},
    props: {
      groupId: String
    },
    name: "UserManager",
    data () {
      return {
        columns: [
          {
            title: '姓名',
            key: 'name',
          },
          {
            title: '手机号',
            key: 'phone'
          },
          {
            title: '创建时间',
            key: 'createTime'
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
                      this.lookOver(this.userList[params.index].id)
                    }
                  }
                }, '查看')
              ]);
            }
          }
        ],
        rowUserId:'',
        showDetail: false,
        userDetailList:[],
        userList: []
      }
    },
    created() {
      if(this.groupId!==''){
        getList(0,100,'customer').then(res=>{
          this.userList=res.data.data;
        })
      }
    },
    methods: {
      lookOver(userId){
        this.showDetail=true;
        this.rowUserId=userId
      }
    }
  }
</script>

<style scoped>

</style>
