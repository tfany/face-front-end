<template>
  <Row>
    <Col span="12" offset="6">
      <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
          <p slot="title" class="t1">欢迎您<b>{{username}}</b>，您的用电详情如下</p>
         <CustomerPower></CustomerPower>
        </Card>
      </div>
    </Col>
  </Row>
</template>

<script>
  import CustomerPower from "./CustomerPower";
  import {getCookie} from "../../utils/support";

  export default {
    name: "Home",
    components: {CustomerPower},
    data(){
      return {
        username: ''
      }
    },
    created() {
      this.username = getCookie("username")
    }
  }
</script>

<style scoped>
.t1{
  text-align: center;
}
</style>
