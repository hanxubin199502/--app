<template>
  <div class="login">
      <!-- banner -->
    <div class="loginbanner">
        <div class="loginhead flex">
            <div class="close" @click="conback"><img src="../../../assets/dl_clsoe@2x.png" alt=""></div>
            <div class="loginname">征信登录</div>
            <div></div>
        </div>
        <div class="welcomelogin">欢迎登录</div>
        <div class="welcometext">征信秒查,全面掌握个人信用报告</div>
    </div>
     <!-- 登录 -->
     <div class="placelogin">
        <div class="submitinformation flex">
             <div class="lconimg">
                 <img src="../../../assets/dl_sj@2x.png" alt="">
             </div>
             <input type="tel"
              class="inputs"
              v-model="phone"
              placeholder="请输入手机号码"
              oninput="if(value.length > 11)value = value.slice(0, 11)"
              >
        </div>
        <div class="submitinformation flex margts">
             <div class="lconimg">
                 <img src="../../../assets/dl_yzm@2x.png" alt="">
             </div>
             <input type="tel"
              class="input" 
              placeholder="验证码"
              v-model="codeWord"
              :disabled="disabled"
              @blur="animateWidth"
              >
             <div class="loginImgBtn" @click="getCode" id="btnSendCode">
                <span v-show="show">发送验证码</span>
                <span v-show="!show" class="count">{{count}}秒后重新获取</span>
            </div>
        </div>
        <div class="logobtn" @click="logoclick">登录</div>
        <div class="tiaoli flex">
            <!-- <div class="chackes" @click="tiaoliclick">
            <img :src="require('../../../assets/'+imgurl)" alt class="cheackinput">
            </div> -->
            <span class="agreement">登录即代表您已同意《征信服务协议》</span>
        </div>
     </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'login',
  data () {
    return {
        imgurl: 'checknone.png',
        concent: null,
        cheackinput: false,
        disabled: true,
        show: true,
        count: "",
        phone: "",
        codeWord: "",
        code:'',
    }
  },
  methods: {
      wxlogo () {
        let redirect_uri = `${location.origin}/`;
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc49eb72e379064c2&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&#wechat_redirect`
        },
      conback(){
         this.$router.push({path:'/'})
      },
      //用户服务协议
      tiaoliclick () {
            this.concent++;
            if (this.concent % 2 != 0) {
                this.cheackinput = true
                this.imgurl = 'dl_xz@2x.png'
            } else {
                this.cheackinput = false
                this.imgurl = 'checknone.png'
          }
      },
      // 验证码   
        getCode () {
                if(this.phone == ""){
                    this.$layer.msg("手机号不能为空")
                }else if(this.phone.length != 11){
                    this.$layer.msg("请输入正确的手机号")
                }else{
                       const TIME_COUNT = 60;
                            if (!this.timer) {                       
                        let regsmsObj = this.phone
                            this.$server.regsms(regsmsObj).then(data => {
                                console.log(data)
                                if (data.code == "200") {
                                this.count = TIME_COUNT;
                                this.show = false;
                                this.disabled = false
                                this.$layer.msg('已发送验证码')
                                } else {
                                this.$layer.msg('获取验证码失败')
                                }
                            })
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                                } else {
                                this.show = true;
                                clearInterval(this.timer);
                                this.timer = null;
                                }
                            }, 1000)
                        } 
        }   
    },
    // 登录
    logoclick () {
            if(this.phone == ""){
                this.$layer.msg("手机号不能为空")
            }else if(this.phone.length != 11){
                this.$layer.msg("请输入正确的手机号")
            }else if (this.codeWord == "") {
            this.$layer.msg("请输入验证码")
            }
            // else if(this.cheackinput == false){
            //         this.$layer.msg("请阅读协议后检测")
            // }
            else{
            if (sessionStorage.getItem('router')) {       
            let logoObj = {
                phone: this.phone,
                code: this.codeWord
            }
            this.$server.logo(logoObj).then(data => {
                this.btnzhezhao = false
                console.log(data)
                if (data.code == "200") {
                localStorage.setItem("accessToken", data.data.accessToken)
                }

            })
            } else {
            let logoObj = {
                phone: this.phone,
                code: this.codeWord
            }
            this.$server.logo(logoObj).then(data => {
                console.log(data)
                if (data.code == "200") {
                    localStorage.setItem("accessToken", data.data.accessToken)
                    this.$layer.msg('登录成功')
                    this.$router.push({path:'/'})
                    if(data.data.wxOpenId == null){
                        let ua = window.navigator.userAgent.toLowerCase();
                        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                         location.replace(this.wxlogo())
                        }
                    }
                // this.$router.go(-1)
                }
            })
            }
        }
        },
    animateWidth () {
      document.body.scrollTop = 0;
    }
  },
  created:function(){
    console.log(this.$route.path)
      if(this.$route.path == '/login'){
         if(localStorage.getItem("accessToken")){
           this.$router.push({path:'/'})
         
      }
    }
  }
}
</script>


<style scoped>
.login{
    background-color: #fff;
}
.loginbanner{
  width: 100%;
  height: 10rem;
  background-image: url("../../../assets/dl_bj@2x.png");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.loginhead{
   margin: 0 0.4rem;
   height: 1rem;
}
.close img{
    width: 0.5rem;
    height: 0.5rem;
}
.loginname{
    font-size: 0.55rem;
    color: #fff;
    margin-left: -0.4rem;
    margin-top:0.5rem;
}
.welcomelogin{
    margin: 0.4rem 1rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.8rem;
    color: #fefefe;
    margin-top: 1rem;
}
.welcometext{
    margin: 0.4rem 1rem;
    font-size: 0.5rem;
    color:#fefefe;
}
.placelogin{
    height: 8rem;
    margin: 0 0.4rem;
    margin-top: -5rem;
    background-image: linear-gradient(0deg,#fff,#fff);
    border-radius: 0.24rem;
}
.submitinformation{
    height: 1.5rem;
    margin: 0 0.8rem;
    position: relative;
    top: 0.6rem;
    border-bottom: 1px solid #e7e7e7;
}
.inputs{
    width: 87%;
    height: 1rem;
    border: none;
    font-size: 0.373rem;
    margin-bottom: 0.15rem;
}
.input{
    width: 38%;
    height: 1rem;
    border: none;
    font-size: 0.373rem;
    background-color: #fff;
    position: relative;
    right: 0.2rem;
    bottom: 0.05rem;
}
.lconimg{
    width: 10%;
}
.lconimg img{
    width: 0.46rem;
    height: 0.46rem;
}
.margts{
    margin-top: 0.5rem;
}
.loginImgBtn{
    width: 40%;
    font-size: 0.4rem;
    color: #366fff;
    text-align: right;
}
.logobtn{
    margin: 0 0.8rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
    font-size: 0.5rem;
    margin-top: 1.8rem;
    background-color: #366fff;
    border-radius: 0.2rem;
}
.tiaoli{
    margin: 0.3rem 0.8rem;
    height: 1rem;
    line-height: 1rem;
    color: #666666;
}
.cheackinput {
  width: 0.5rem;
  height: 0.5rem;
}
.chackes{
    width: 10%;
    height: 0.8rem;
    text-align: center;
    margin-top: 0.1rem;
}
.agreement{
   width: 90%;
}
</style>