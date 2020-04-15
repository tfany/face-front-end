<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="当前状态" icon="ios-options" :padding="0" shadow style="width: 400px;">
      <CellGroup>
        <Cell title="当前操作人员" :extra="fixerName" />
        <Cell title="是否有异常" :extra="errorCount!==0?'有异常':'无异常'" />
        <Cell title="异常数量" @click="toError">
          <Badge :count="errorCount" slot="extra" />
        </Cell>
        <Cell title="开关表箱">
          <i-Switch v-model="switchValue" slot="extra" :before-change="handleBeforeChange"/>
        </Cell>
      </CellGroup>
    </Card>
  </div>
</template>

<script>
  import {getCookie} from "../../utils/support";

  export default {
    name: "BoxSwitch",
    props:{
      errorCount: Number
    },
    data () {
      return {
        switchValue: false,
        fixerName: ''
      }
    },
    created() {
      this.fixerName=getCookie('username')
    },
    methods:{
      handleBeforeChange () {
        return new Promise((resolve) => {
          this.$Modal.confirm({
            title: '切换确认',
            content: '您确认要开启/关闭表箱吗？',
            onOk: () => {
              resolve();
            }
          });
        });
      },
      toError(){

      }
    }
  }
</script>

<style scoped>

</style>
