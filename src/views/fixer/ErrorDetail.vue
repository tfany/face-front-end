<template>
  <Table border :columns="columns" :data="errorList"></Table>
</template>

<script>
    export default {
        name: "ErrorDetail",
      data() {
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
                title: '报障时间',
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
                          this.detailError(this.customerList[params.index])
                        }
                      }
                    }, '维修')
                  ]);
                }
              }
            ],
            errorList: []
          }
      },
      methods:{
        detailError(user){

        }
      }
    }
</script>

<style scoped>

</style>
