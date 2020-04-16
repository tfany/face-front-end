<template>
  <Row>
    <Col span="12" offset="4">

      <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
          <p slot="title">{{getTitle()}}</p>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="姓名" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
            </FormItem>
            <FormItem label="电话" prop="phone">
              <Input v-model="formValidate.phone" placeholder="请输入手机号码"></Input>
            </FormItem>
          </Form>
          <div class="upload" v-if="!imgUrl">
            <Upload
              type="drag"
              :format="['jpg','jpeg','png']"
              accept="image/png,image/jpeg,image/jpg"
              :before-upload="handlePreview"
              action="null">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击上传或将人脸照片拖到此处</p>
              </div>
            </Upload>
          </div>
          <div v-else>
            <img class="previewImg" :src="imgUrl">
          </div>

          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>


        </Card>
      </div>

    </Col>
  </Row>

</template>


<script>
  import {validatePhone} from "../../utils/validate";
  import {faceAdd} from "../../api/baiduface";
  import {getBaiduToken} from "../../api/getToken";
  import {getUserId} from "../../utils/common";
  import {addUser} from "../../api/user";

  export default {
    props: {
      groupId: String
    },
    data() {
      return {
        name: "AddUser",
        imgUrl: '',
        base64File: null,
        formValidate: {
          name: '',
          phone: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          phone: [
            {required: true, validator: validatePhone, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid && this.base64File != null) {
            getBaiduToken().then(baiduToken => {
              let uid = getUserId();
              //百度云人脸注册
              faceAdd(this.base64File,
                baiduToken.data.data,
                this.groupId,
                uid,
                this.formValidate.name
                + this.formValidate.phone
              ).then(res => {
                let data=res.data;
                if (data.error_code===222202){
                  this.$Message.error('上传照片中不含人脸');
                  this.imgUrl=''
                }
                else{
                  //数据库也要写入相应的信息
                  addUser(uid,this.formValidate.name,this.formValidate.phone,this.groupId).then(response=>{
                    if(response.data.code===200){
                      this.handleReset('formValidate')
                      this.$Message.success('用户添加成功!');
                    }
                  })
                }
              })
            })
          } else if (this.base64File == null) {
            this.$Message.error('请选择人脸照片！');
          } else {
            this.$Message.error('用户信息不完整！');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.imgUrl = ''
      },
      handlePreview(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const _base64 = reader.result
          this.imgUrl = _base64 //将_base64赋值给图片的src，实现图片预览
          this.base64File = _base64.replace(/^data:image\/.*;base64,/, '')
        }
        return false//阻止图片继续上传，使得form表单提交时统一上传
      },
      getTitle(){
        if(this.groupId==='fixer'){
          return "请输入维修人员信息"
        }else{
          return "请输入普通住户信息"
        }
      }
    }
  }
</script>


<style scoped>
  .upload {
    padding: 20px 0;
    margin-left: 35px;
  }

  .previewImg {
    width: 250px;
  }
</style>
