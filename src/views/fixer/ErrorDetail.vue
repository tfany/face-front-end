<template>
  <div>
    <Table border :columns="columns" :data="dataList" :no-data-text="dataTExt"></Table>
    <div class="more" v-if="showMore">
      <Button type="primary" ghost @click="getAllList">查看维修历史</Button>
    </div>
    <Modal
      title="维修结果"
      v-model="showModal"
      class-name="vertical-center-modal"
      :mask-closable=false
      @on-ok="handleOk"
      class="t2"
    >
      <p>请选择维修结果</p>
      <RadioGroup v-model="resultType" vertical>
        <Radio :label=1>
          <span>修好了</span>
        </Radio>
        <Radio :label=2>
          <span>没修好</span>
        </Radio>
      </RadioGroup>
    </Modal>
  </div>
</template>

<script>
  import {findUserById} from "../../api/user";
  import {detailBad, queryFixBadRecord} from "../../api/bad";
  import {getCookie} from "../../utils/support";
  import {formatDate} from "../../utils/common";

  export default {
    name: "ErrorDetail",
    props: {
      errorList: Array
    },
    data() {
      return {
        dataTExt: '暂无未处理的报修，点击查看维修历史',
        ownErrorList: [],
        showMore: true,
        showModal: false,
        resultType: 1,
        rowId: Number,
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
            label: '没修好'
          }

        ],
        columns: [
          {
            title: '姓名',
            key: 'name',
            width: 80
          },
          {
            title: '手机号',
            key: 'phone',
            width: 130
          },
          {
            title: '报障时间',
            key: 'tellErrorTime',
            width: 148,
            render: (h, params) => {
              return h('div',
                formatDate(new Date(params.row.tellErrorTime), 'yyyy-MM-dd hh:mm')
              )
            }
          },
          {
            title: '用户留言',
            key: 'customerTalk'
          },
          {
            title: '状态',
            key: 'fixResult',
            width: 80,
            render: (h, params) => {
              return h('div',
                this.fixList.find(item => item.value === params.row.fixResult).label
              )
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    disabled: this.dataList[params.index].disabled
                  },
                  on: {
                    click: () => {
                      this.detailError(this.dataList[params.index])
                    }
                  }
                }, '维修')
              ]);
            }
          }
        ],
        dataList: []
      }
    },
    created() {
      Object.assign(this.ownErrorList, this.errorList)
      this.getData()
    },
    methods: {
      getData(){
        this.ownErrorList.map(item => {
          this.dataList=[]
          if (item.fixResult !== 1) {
            findUserById(item.customerId).then(res => {
              let user = res.data.data
              let temp = {
                name: user.name,
                phone: user.phone,
                tellErrorTime: item.tellErrorTime,
                fixResult: item.fixResult,
                disabled: false,
                rowId: item.id,
                customerTalk: item.customerTalk
              }
              this.dataList.push(temp)
            })
          }
        })
        this.columns.map(item => {
          item['align'] = 'center'
        })
      },
      detailError(user) {
        this.showModal = true;
        this.rowId = user.rowId
      },
      getAllList() {
        this.showMore = false
        this.ownErrorList.map(item => {
          if (item.fixResult === 1) {
            findUserById(item.customerId).then(res => {
              let user = res.data.data
              let temp = {
                name: user.name,
                phone: user.phone,
                tellErrorTime: item.tellErrorTime,
                fixResult: item.fixResult,
                disabled: true,
                customerTalk: item.customerTalk
              }
              this.dataList.push(temp)
            })
          }
        })
      },
      handleOk() {
        detailBad(this.rowId, this.resultType, getCookie('userId')).then(res => {
          if (res.data.code === 200) {
            queryFixBadRecord().then(response=>{
              this.$emit('update:errorList', response.data.data);
              this.ownErrorList=response.data.data;
              this.getData();
            })
            this.$Message.success({
              background: true,
              content: '提交成功'
            })
          } else {
            this.$Message.error({
              background: true,
              content: '提交失败'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .more {
    margin-top: 10px;
    text-align: center;
  }

  .t2 {
    text-align: center;
  }
</style>
