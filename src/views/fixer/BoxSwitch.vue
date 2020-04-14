<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="当前状态" icon="ios-options" :padding="0" shadow style="width: 400px;">
      <CellGroup>
        <Cell title="当前操作人员" :extra="fixerName" />
        <Cell title="表箱状态" :extra="haveError?'异常':'正常'" />
        <Cell v-if="haveError" title="异常数量" to="/components/badge">
          <Badge :count="10" slot="extra" />
        </Cell>
        <Cell title="开关表箱">
          <i-Switch v-model="switchValue" slot="extra" :before-change="handleBeforeChange"/>
        </Cell>
      </CellGroup>
    </Card>
  </div>
</template>

<script>
  export default {
    name: "BoxSwitch",
    data () {
      return {
        switchValue: true,
        fixerName: '江泽晖',
        haveError: true
      }
    },
    methods:{
      handleBeforeChange () {
        return new Promise((resolve) => {
          this.$Modal.confirm({
            title: '切换确认',
            content: '您确认要切换开启/关闭表箱吗？',
            onOk: () => {
              resolve();
            }
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
