<template>
  <Row>
    <Col span="12" offset="6">

      <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
          <p slot="title">欢迎您{{username}}，您的用电详情如下</p>
          <Table border :columns="columns" :data="dataList"></Table>
          <div class="more" v-if="showMore">
            <Button type="primary" ghost @click="getAllList">点击查看更多</Button>
          </div>
        </Card>
      </div>

    </Col>
  </Row>
</template>

<script>
  import {getCurrentMonth, getHistory} from "../../api/powerDetail";
  import {getCookie} from "../../utils/support";
  import {formatDate} from "../../utils/common";

  export default {
    name: "Home",
    data(){
      return {
        username: '',
        showMore: true,
        userId:'',
        columns: [
          {
            title: '时间',
            key: 'recordTime',
            render: (h,params)=>{
              return h('div',
                formatDate(new Date(params.row.recordTime),'yyyy年MM月')
              )
            }
          },
          {
            title: '用电量',
            key: 'electricity',
            render: (h,params)=>{
              return h('div',
                params.row.electricity+'(w)'
              )
            }
          },
          {
            title: '消费金额',
            key: 'amount',
            render: (h,params)=>{
              return h('div',
                (params.row.amount)/100+'(元)'
              )
            }
          },
          {
            title: '剩余金额',
            key: 'remaining',
            render: (h,params)=>{
              return h('div',
                (params.row.remaining)/100+'(元)'
              )
            }
          }
        ],
        dataList: []
      }
    },
    created() {
      this.userId=getCookie('userId')
      this.username=getCookie("username")
      console.log(this.userId)
      this.getCurrent(this.userId)
    },
    methods:{
      getAllList(){
        this.showMore=false;
        getHistory(this.userId).then(res=>{
          console.log(res.data.data)
          this.dataList.push(...res.data.data)
        })
      },
      getCurrent(userId){
        getCurrentMonth(userId).then(res=>{
          this.dataList=res.data.data
        })
      }
    }

  }
</script>

<style scoped>
.more{
  margin-top: 10px;
}
</style>
