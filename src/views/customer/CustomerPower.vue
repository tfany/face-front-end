<template>
  <div>
    <Table border :columns="columns" :data="dataList"></Table>
    <div  class="more" v-if="showMore">
      <Button type="primary" ghost @click="getAllList">点击查看更多</Button>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../utils/common";
  import {getCookie} from "../../utils/support";
  import {getCurrentMonth, getHistory} from "../../api/powerDetail";

  export default {
    props:{
      userIdFromFather:String
    },
    name: 'CustomerPower',
    data() {
      return {
        username: '',
        showMore: true,
        userId: '',
        columns: [
          {
            title: '时间',
            key: 'recordTime',
            render: (h, params) => {
              return h('div',
                formatDate(new Date(params.row.recordTime), 'yyyy年MM月')
              )
            }
          },
          {
            title: '用电量',
            key: 'electricity',
            render: (h, params) => {
              return h('div',
                params.row.electricity + '(w)'
              )
            }
          },
          {
            title: '消费金额',
            key: 'amount',
            render: (h, params) => {
              return h('div',
                (params.row.amount) / 100 + '(元)'
              )
            }
          },
          {
            title: '剩余金额',
            key: 'remaining',
            render: (h, params) => {
              return h('div',
                (params.row.remaining) / 100 + '(元)'
              )
            }
          }
        ],
        dataList: []
      }
    },
    created() {
      if(this.userIdFromFather){
        this.userId=this.userIdFromFather
      }
      else{
        this.userId = getCookie('userId')
      }
      console.log(this.userId)
      this.getCurrent(this.userId)
    },
    methods: {
      getAllList() {
        this.showMore = false;
        getHistory(this.userId).then(res => {
          console.log(res.data.data)
          this.dataList.push(...res.data.data)
        })
      },
      getCurrent(userId) {
        getCurrentMonth(userId).then(res => {
          this.dataList = res.data.data
        })
      }
    }
  }
</script>

<style scoped>
  .more{
    margin-top: 10px;
    text-align: center;
  }

</style>
