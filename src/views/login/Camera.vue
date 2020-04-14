<template>
  <div class="content">
    <div class="login" v-show="!flag">
      <div class="steps">

      </div>
      <div class="user-title">电力计量表箱人脸识别登录系统</div>
      <div class="telWrap">
        <span>选择身份</span>&nbsp;&nbsp;&nbsp;
        <RadioGroup v-model="identity">
          <Radio label="普通用户"></Radio>
          <Radio label="维修人员"></Radio>
          <Radio label="管理员"></Radio>
        </RadioGroup>
      </div>
      <div class="next">
        <input type="button" value="下一步" @click="next">
      </div>
    </div>
    <!--拍照-->
    <div class="imgWrap" v-show="flag">
      <div class="cameraBox">
        <video id="video"></video>
        <span>{{aMessage}}</span>
        <div class="next" v-show="rel">
          <input type="button" value="重试" @click="retry">
        </div>
      </div>
      <div class="canvasWrap" style="display: none;">
        <canvas id='canvas' width='330' height='440' style="display: block"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
  import {faceSearch, faceVerify} from "../../api/baiduface";
  import {getBaiduToken} from "../../api/getToken";
  import {setCookie} from "../../utils/support";
  import {GetChinese} from "../../utils/common";

  export default {
    name: 'camera',
    data() {
      return {
        canvas: null,
        video: null,
        MediaStreamTrack: null,
        identity: '普通用户',
        flag: false,
        rel: false,
        timer: null,
        aMessage: "请将人脸移入圆圈内，系统将进行自动识别"
      }
    },
    mounted() {
      // 摄像头
      this.video = document.getElementById('video')
      this.canvas = document.getElementById('canvas')
    },
    methods: {
      //检验是否进行选择
      next() {
        this.flag = false;
        if (!this.identity) {
          this.$Modal.warning({
            title: '警告',
            content: '请选择用户身份'
          });
        } else {
          this.flag = true;
          this.handleCamera();
        }

      },
      retry() {
        this.$router.go(0)
      },
      // 调用摄像头
      handleCamera() {
        let that = this
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          }).then(function (stream) {
            that.MediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0]
            that.video.srcObject = stream
            that.video.play()
            let tryTimes = 0;
            let interval = setInterval(function () {
              tryTimes++;
              let res;
              let groupId = null;
              if (that.identity === "普通用户") {
                groupId = 'customer';
              } else if (that.identity === "维修人员") {
                groupId = 'fixer';
              } else if (that.identity === "管理员") {
                groupId = 'manager';
              }
              res = that.takePhone()
              console.log("用户身份" + groupId)
              if (res != null) {
                getBaiduToken().then(baiduToken => {
                  faceVerify(res, baiduToken.data.data).then(liveness => {
                    console.log("活体检测")
                    console.log(liveness.data)
                    if (liveness.data.error_code === 222202) { //是否包含人脸
                      that.aMessage = "未检测到人脸,请将人脸移入圆圈内"
                    } else if (liveness.data.result.face_liveness < 0.7) { //活体检测
                      that.aMessage = "活体检测失败，请将人脸移入圆圈内"
                    } else if (liveness.data.error_code === 0) {
                      //验证人脸数据
                      faceSearch(res, groupId, baiduToken.data.data).then(response => {
                        let data=response.data
                        let list=data.result.user_list[0]
                        let userId=list.user_id
                        if (data.error_code === 0) {
                          clearInterval(interval)
                          that.closeCamera();
                          if (that.$route.params.path === undefined) {
                            that.$store.dispatch('Login', userId).then(() => {
                              setCookie("userId",userId,15)
                              setCookie("username",GetChinese(list.user_info),15)
                              if(list.group_id==='customer'){
                                that.$router.push({path: '/customer'})
                              }else if(list.group_id==='manager'){
                                that.$router.push({path: '/manager'})
                              }else if(list.group_id==='fixer'){
                                that.$router.push({path: '/fixer'})
                              }
                            })
                          }
                        }
                      })
                    }
                  })

                })

              }
              else {
                that.rel = true
                that.aMessage = "身份验证失败,请重试"
              }
              if (tryTimes === 5){
                clearInterval(interval)
              }
            }, 1500)
          }).catch(function (err) {
            console.log(err)
          })
        }
      },
      // 拍照
      takePhone() {
        let that = this
        that.canvas.getContext('2d').drawImage(this.video, 135, 0, 330, 440, 0, 0, 330, 440) // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
        let dataurl = that.canvas.toDataURL('image/jpeg')
        that.dataurl = dataurl
        return dataurl.replace('data:image/jpeg;base64,', '')
      },
      // 关闭摄像头
      closeCamera() {
        this.MediaStreamTrack.stop()
        this.video.srcObject = null
      }

    }
  }
</script>
<style>
  .content {
    width: 100%;
    height: auto;
  }

  .content .login {
    flex: 1;
    width: 500px;
    height: 400px;
    border-radius: 10px;
    background: #6cd79c;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  .content .login .steps {
    width: 100px;
    height: 100px;
    margin: auto;
  }

  .content .login .telWrap {
    width: 300px;
    height: 26px;
    margin: auto;
    background: aliceblue;
  }

  .user-title {
    height: 30px;
    line-height: 30px;
    font-size: 30px;
    color: #130435;
    margin-bottom: 150px;
  }

  .next {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .content .login span {
    font-size: 14px;
    line-height: 26px;
  }

  .next input[type=button] {
    text-align: center;
    border: none;
    color: #fff;
    font-size: 12px;
    width: 100px;
    height: 28px;
    line-height: 28px;
    border-radius: 6px;
    background: #7306cc;
    display: block;
    margin: auto;
    margin-bottom: 40px;
  }

  .content .imgWrap {
    display: flex;
    width: 500px;
    height: 400px;
    margin: 0 auto;
    background: #130435;
    border-radius: 10px;
    /* display: none; */
  }

  .content .imgWrap span {
    color: #fff;
    font-size: 14px;
    white-space: nowrap;
    margin: 20px -30px;
    display: block;
  }

  #video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .content .cameraBox {
    /*flex: 1;*/
    display: inline-block;
    border: 1px solid gray;
    margin: auto;
    border-radius: 50%;
    background: #fff;
    width: 150px;
    height: 150px;
  }

  .content .buttonWrap button {
    width: 100px;
    height: 30px;
  }
</style>
