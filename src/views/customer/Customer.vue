<template>
  <Row>
    <Col span="12" offset="6">
      <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
          <Button @click="tellBad">故障报修</Button>
          <Button @click="badHistory">报修历史</Button>
          <p class="t1">欢迎您<b>{{username}}</b>，您的用电详情如下</p>
          <CustomerPower></CustomerPower>
        </Card>
        <Modal
          title="故障报修"
          v-model="bad"
          class-name="vertical-center-modal"
          :mask-closable=false
          @on-ok="tellBadOk"
          class="t2"
        >
          <p>请选择故障类型</p>
          <Select v-model="badType" style="width:150px">
            <Option v-for="item in badList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input class="t3" v-model="talk" type="textarea" :rows="5" placeholder="您可以在这里给维修工留言哟"/>
        </Modal>
        <Modal
          title="报修历史"
          v-model="showHistory"
          class-name="vertical-center-modal"
          :mask-closable=false
          width="800"
          class="t2"
        >
          <Table border :columns="columns" :data="dataList"></Table>

        </Modal>
      </div>
    </Col>
  </Row>
</template>

<script>
  import CustomerPower from "./CustomerPower";
  import {getCookie} from "../../utils/support";
  import {formatDate} from "../../utils/common";
  import {queryTellBadRecord, tellNewBad} from "../../api/user";

  export default {
    name: "Customer",
    components: {CustomerPower},
    data() {
      return {
        username: '',
        bad: false,
        badType: 1,
        talk: '',
        userId: '',
        showHistory: false,
        badList: [
          {
            //1计量不准确 2无法显示数据 3家中停电 4其他异常
            value: 1,
            label: '电表计量不准确'
          },
          {
            value: 2,
            label: '无法显示数据'
          },
          {
            value: 3,
            label: '家中停电'
          },
          {
            value: 4,
            label: '其他异常'
          },
        ],
        fixList: [
          {
            // 1已修复 0未修复 2上次维修过但没修好
            value: 0,
            label: '未修复'
          },
          {
            value: 1,
            label: '已修复'
          },
          {
            value: 2,
            label: '修了没修好'
          }

        ],
        columns: [
          {
            title: '申请时间',
            key: 'tellErrorTime'
          },
          {
            title: '报修类型',
            key: 'badType',
            render: (h, params) => {
              return h('div',
                this.badList.find(o => o.value === params.row.badType).label
              )
            }
          },
          {
            title: '维修状态',
            key: 'fixResult',
            render: (h, params) => {
              return h('div',
                this.fixList.find(o => o.value === params.row.fixResult).label
              )
            }
          },
          {
            title: '维修时间',
            key: 'fixTime',
            render: (h, params) => {
              return h('div',
                params.row.fixTime===null?'未维修':params.row.fixTime
              )
            }
          },

        ],
        dataList: []
      }
    },
    methods: {
      /**
       * 故障报修
       */
      tellBad() {
        this.bad = true;
      },
      badHistory() {
        this.showHistory = true;
        queryTellBadRecord(this.userId).then(res=>{
          this.dataList=res.data.data
        })
      },
      tellBadOk(){
        tellNewBad(this.userId,this.badType,this.talk).then(res=>{
          if(res.data.code===200){
            this.$Message.success({
              background: true,
              content: '提交成功'
            })
          }
          else{
            this.$Message.error({
              background: true,
              content: '提交失败'
            })
          }
        })
      }
    },
    created() {
      this.username = getCookie("username")
      this.userId=getCookie('userId')
    }
  }
</script>

<style scoped>
  .t1 {
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .t2 {
    text-align: center;
  }

  .t2 p {
    font-size: 18px;
    display: inline-block;
    margin-right: 15px;
  }

  .t3 {
    margin-top: 30px;
    width: 300px;
  }
</style>
