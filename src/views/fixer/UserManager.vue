<template>
  <div>
    <Table v-if="!showDetail" border :columns="columns" :data="customerList"></Table>
    <div style="background:#eee;padding: 20px" v-if="showDetail">
      <Card :bordered="false">
        <Button @click="lastFloor">点我返回上一层</Button>
        <p class="t1">您查看的用户是<b>{{customerName}}</b>，用电详情如下</p>
        <CustomerPower :user-id-from-father="rowUserId"></CustomerPower>
      </Card>
    </div>
  </div>
</template>

<script>
  import {getList} from "../../api/user";
  import CustomerPower from "../customer/CustomerPower";
  import {imitationData} from "../../api/powerDetail";

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
                      this.lookOver(this.customerList[params.index])
                    }
                  }
                }, '查看')
              ]);
            }
          }
        ],
        rowUserId:'',
        showDetail: false,
        customerList: [],
        customerName: ''
      }
    },
    created() {
      if(this.groupId!==''){
        getList(0,100,'customer').then(res=>{
          this.customerList=res.data.data;
        })
      }
    },
    methods: {
      lookOver(customer){
        this.showDetail=true
        this.rowUserId=customer.id
        imitationData(this.rowUserId)
        this.customerName=customer.name
      },
      lastFloor(){
        this.showDetail=false;
      }
    }
  }
</script>

<style scoped>
  .t1 {
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;
  }
</style>
