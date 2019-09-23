<template>
  <div class="operlistorder">
    <div class="zhegai" v-if="zhegai" @click="zhegaiclick"></div>
     <div class="operbanner">
          <div class="loginhead flex">
            <div class="close" @click="backclick"><img src="../../../assets/yys_back@2x.png" alt=""></div>
            <div class="loginname">运营商诊断</div>
            <div></div>
          </div>
          <div class="welcomelogin">网贷核心风控项，放款</div>
          <div class="welcomesong">必查</div>
          <div class="welcometext">30+纬度直击拒贷风险</div>
     </div>
     <div class="blacklist">
        <div class="blacklisttitle">请填写运营商信息</div>
        <!-- 手机号 -->
        <div class="submitinformation flex" :class="{bigitem:changestyle}">
             <div class="lconimg" v-show="userimgurl">
                 <img src="../../../assets/yys_sjh_icon@2x.png" alt="">
             </div>
             <div class="lconimg" v-show="userimg">
                 <img src="../../../assets/yys_sjh1_icon@2x.png" alt="">
             </div>
             <input 
             type="tel" 
             class="inputs"
             v-model="telephone"
             oninput="if(value.length > 11)value = value.slice(0, 11)"
             placeholder="手机号"><img src="../../../assets/hmd_delete_icon@2x.png" @click="onUpload1()" class="pathClear" alt="">
        </div>
        <div class="badtext" v-show="userimgurl"></div>
        <div class="badtext" v-show="usermonty">请输入正确的手机号</div>
        <!-- 手机服务密码 -->
        <div class="submitinformation ts flex" :class="{bigitem:changestyles}">
             <div class="lconimg" v-show="operimg">
                 <img src="../../../assets/yys_m_icon@2x.png" alt="">
             </div>
             <div class="lconimg" v-show="operimgurl">
                 <img src="../../../assets/yys_m1_icon@2x.png" alt=""> <!-- h5用于表单校验显示换icon -->
             </div>
             <input 
             type="tel" 
             class="inputs"
             v-model="servicepsd"
             oninput="if(value.length > 6)value = value.slice(0, 6)"
             placeholder="手机服务密码"><img src="../../../assets/hmd_delete_icon@2x.png" @click="onUpload()" class="pathClear" alt="">
        </div>
        <div class="badtext" v-show="idimgurl"></div>
        <div class="badtext" v-show="idmonties">请输入正确的手机服务密码</div><!-- h5校验错误提示 -->
        <!-- 验证码，做了校验后端接口限制如果需要前端就显示填入验证码的入口，默认隐藏 -->
        <div class="submitinformation flex margts" :class="{bigitem:changestyley}" v-show="yzcode">
             <div class="lconimg" v-show="keycode">
                 <img src="../../../assets/yys_yzm_icon@2x.png" alt="">
             </div>
             <div class="lconimg" v-show="keycodeurl">
                 <img src="../../../assets/yys_yzm1_icon@2x.png" alt="">
             </div>
             <input 
             type="tel" 
             class="inputs" 
             v-model="codeWord"
             @blur="animateWidth"
             placeholder="验证码"><img src="../../../assets/hmd_delete_icon@2x.png" @click="onUpload2()" class="pathClear" alt="">
             <!-- <div class="loginImgBtn" @click="getCode">
                <span v-show="show">发送验证码</span>
                <span v-show="!show" class="count">{{count}}秒后重新获取</span>
            </div> -->
        </div>
        <div class="badtext" v-show="lodertext"></div>
        <div class="badtext" v-show="lodeslitter">请输入正确的验证码</div>
        <div class="logobtn" @click="operclick">立即检测</div>
        <!-- 使用协议 -->
        <div class="tiaoli flex">
            <!-- <div class="chackes" @click="tiaoliclick">
            <img :src="require('../../../assets/'+imgurl)" alt class="cheackinput">
            </div> -->
            <span class="agreement">您已同意《征信服务协议》</span>
        </div>
        <!-- 支付弹窗 -->
        <div class="tankuangwarp">
          <div class="tankuang" :class="taxon">
             <div class="closeing" @click="closeclick">
               <img src="../../../assets/help_close@2x.png" alt="">
             </div>
             <div class="clemoner">￥{{myretapemode.price}}</div><span class="simmoney">￥{{myretapemode.originalPrice}}</span>
             <div class="textcontent flex">
               <div>服务名称</div>
               <div>{{myretapemode.productName}}</div>
             </div>
             <div class="payment">选择支付方式</div>
             <div class="wxzf flex"
              :class="{active:curent==index}"
                 v-for="(item,index) in List"
                 @click="weixinclick(index,item.paymentId,item.paymentName)"
             >
                 <div class="wximg flex">
                   <img src="../../../assets/timg.jpg" alt="">
                   <div class="zfwx">微信支付</div>
                 </div>
                 <div class="weixinzhifuautoright"></div>
             </div>
             <div class="payfor" @click="wxpay">立即支付</div>
             <div class="lodings" v-show="lodinglist">
               <div class='lodingimg'><img src="../../../assets/hmd_jz_icon@2x.png" alt=""></div>
               <p class="lodingtext">正在飞速加载中。。。</p>
             </div>
          </div>
        </div>
     </div>
     <div class="lookhelp" @click="lookhelp">查看帮助></div>
     <div class="footer">
       <div class="footerlist flex">
            <div>
              <p class="hs"><img src="../../../assets/yys_kx@2x.png" alt=""></p>
              <p class="tet">数据权威可信</p>
            </div>
            <p class="hts"></p>
            <div>
              <p class="hs"><img src="../../../assets/yys_aq@2x.png" alt=""></p>
              <p class="tet">保证信息安全</p>
            </div>
            <p class="hts"></p>
            <div>
              <p class="hs"><img src="../../../assets/yys_bh@2x.png" alt=""></p>
              <p class="tet">敏感数据保护</p>
            </div>
       </div>
     </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'operlistorder',
  data () {
    return {
      imgurl: 'checknone.png',
      concent: null,
      cheackinput: false,

      telephone:'',
      codeWord:'',
      show:true,
      count: "",
      servicepsd:'',
      disabled:true,
      changestyle:false,
      changestyles:false,
      changestyley:false,
      userimg:false,
      userimgurl:true,
      usermonty:false,
      operimg:true,
      operimgurl:false,
      idimgurl:false,
      idmonties:false,
      keycode:true,
      keycodeurl:false,
      lodertext:false,
      lodeslitter:false,
      orderId:'',
      yzcode:false,
      zhegai:false,
      taxon: null,
      tankuang: true,
      myretapemode:'',
      curent: 0,
      serverspay:2,
      wxpaylist:3,
      paymentId: "weChat",
      lodinglist:false,
      List: [
        {
          value: "微信",
          code: "0"
        },
      ]
    }
  },
  methods: {
    backclick(){ // 返回按钮
         this.$router.push({path:'/'})
    },
    zhegaiclick () { //遮罩
      this.taxon = "activefalse"
      this.zhegai = false
    },
    closeclick(){//支付弹出框
      this.tankuang = false
      this.taxon = "activefalse"
      this.zhegai = false
    },
     weixinclick (index, paymentId) {
      console.log(paymentId)
      this.curent = index
      this.paymentId = paymentId //支付方式Id
    },
    //清空input
    onUpload(){
      if(this.servicepsd){
         this.servicepsd = ''
      } 
    },
    onUpload1(){
      if(this.telephone){
         this.telephone = ''
      } 
    },
    onUpload2(){
      if(this.codeWord){
         this.codeWord = ''
      } 
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
    //查看帮助
    lookhelp(){
          this.$router.push({path:'./blackorderhelp'})
    },
    animateWidth () {
      document.body.scrollTop = 0;
    },
    //获取验证码
    getCode(){
        if(this.telephone == ''){
          this.changestyle = true
          this.userimgurl = false
          this.userimg = true
          this.usermonty = true
        }else if(this.servicepsd  == ''){
          this.changestyles = true
          this.operimg = false
          this.operimgurl = true
          this.idmonties = true
        }else{
              const TIME_COUNT = 60;
              if (!this.timer) {
              this.count = TIME_COUNT;
              this.show = false;
              let regsmsoper = {
                  phone: this.telephone,
                  phonePassword: this.servicepsd
              }
              this.$server.operater(regsmsoper).then(data => {
                  console.log(data)
                  this.orderId = data.data.orderId
                  if (data.code == "200") {
                  this.disabled = false
                  this.$layer.msg('验证码发送成功')
                  } else {
                  this.$layer.msg(data.msg)
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
    //运营商立即检测
    operclick(){
      if(this.telephone == ''){
          this.changestyle = true
          this.userimgurl = false
          this.userimg = true
          this.usermonty = true
        }else if(this.servicepsd  == ''){
          this.changestyles = true
          this.operimg = false
          this.operimgurl = true
          this.idmonties = true
        }
        // else if(this.codeWord == ''){
        //   this.changestyley = true
        //   this.keycode = false
        //   this.keycodeurl = true
        //   this.lodeslitter = true
        // }
        else{
           let operction = {
             phonePassword:this.servicepsd,
             phone:this.telephone,
             phoneCaptcha:this.codeWord,
             orderId:this.orderId
           }
           this.lodinglist = true
           this.$server.operdiately(operction).then(data =>{
             console.log(data)
             if(data.code == 200){
               if(data.data.isNeedCode == true){// isNeedCode == true的时候则需要填验证码
                 this.yzcode = true
                 this.lodinglist = false
                 this.orderId = data.data.orderId
               }else if(data.data.isNeedCode == false){//填完验证码再次点击isNeedCode会返回false，继续走支付流程
                    this.lodinglist = true
                    this.myretapemode = data.data
                    this.tankuang = true
                    this.taxon = "trueactive"
                    this.zhegai = true
                    if(data.code == 200){   
                        this.$server.channel(this.serverspay).then(data =>{
                          this.lodinglist = false
                          console.log(data.data[0].payCode)
                          this.WXPayWap = data.data[0].payCode
                          // if(data.code == 200){
                          //   let iplist ={}
                          //   this.$server.waiip(iplist).then(data =>{
                          //     console.log(data)
                          //     this.neiip = data
                          //   })
                          // }
                        })
                    }else{
                      this.$layer.msg(data.msg)
                  }
               }             
             }else{
                this.$layer.msg(data.msg)
                this.lodinglist = false
             }
           })
        }
    },
    //h5微信支付
    wxpay(){
      let ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){//微信公众号支付的时候判断是不是微信浏览器，微信授权登录
           this.$server.channel(this.wxpaylist).then(data =>{
             if(data.code == 200){
                  let paylist = {
                    payCode:data.data[0].payCode,
                    orderId:this.myretapemode.orderId,
                    ip:'124.204.64.154',
                    returnUrl:this.$url,
                    openid: sessionStorage.getItem("openid")
                  }
                  this.$server.wxpayment(paylist).then(data =>{
                    let payse = data.data
                    var that = this
                    if(data.code == 200){//解析返回的表单
                      wx.config({
                        appId: payse.appId,
                        timestamp: payse.timeStamp,
                        nonceStr: payse.nonceStr,
                        signature: payse.signature,
                        jsApiList: ['chooseWXPay']
                      });
                      wx.chooseWXPay({
                        timestamp: payse.timeStamp,
                        package: payse.package,
                        nonceStr: payse.nonceStr,
                        signType: payse.signType,
                        paySign: payse.paySign,
                        success: function (res) {
                          // that.$layer.msg("支付成功");
                          if (res.errMsg == "chooseWXPay:ok") {//支付成功回跳的跳转页
                            that.$router.push({ path: './payseccess' })
                          } else {
                            that.$layer.msg(res.errMsg);
                          }
                        },
                        cancel: function (res) {
                          that.$layer.msg("取消支付");
                        }
                      });
                    }
                  })
              }
           })
      }else{//调起微信支付
        this.lodinglist = true
        let paylist = {
          payCode:this.WXPayWap,
          orderId:this.myretapemode.orderId,
          ip:'124.204.64.154',
          returnUrl:this.$url,
        }
        this.$server.wxpayment(paylist).then(data =>{
          let msg = data
          console.log(msg.data)
            if (msg.code == "200") {
              this.lodinglist = false
                  const div = document.createElement('div')
                  div.innerHTML = msg.data
                  document.body.appendChild(div)
                  document.forms.alipaysubmit.submit()
                  // document.forms['alipaysubmit'].submit()
            }
        })
      }
    },
  },
  // created () { 
  //   var parameter = location.href.indexOf("?")
  //   if (parameter > -1) {
  //     var code = location.href.split("?")[1].split("&")[0].split("=")[1]
  //     let getOpenidObj = {
  //       code: code
  //     }
  //     this.$server.getOpenid(getOpenidObj).then(data => {
  //       sessionStorage.setItem("openid", data.data.openid)
  //     })
  //   }
  // },
}
</script>


<style scoped>
.operlistorder{
  margin-bottom: 1.3rem;
}
.operbanner{
  width: 100%;
  height: 6rem;
  position: relative;
  top: 0;
  background-image: url("../../../assets/yys_top_bj@2x.png");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.blacklist{
  margin: 0.4rem 0.4rem;
  height: 12rem;
  background-color: #fff;
  margin-top: -1rem;
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
}
.welcomelogin{
  margin: 0.4rem 1rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.65rem;
  color: #b2ffcd;
  margin-top: 0.6rem;
}
.welcomesong{
  margin: 0rem 1rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.65rem;
  color: #b2ffcd;
  margin-top: -0.4rem;
}
.welcometext{
  margin: 0.4rem 1rem;
  font-size: 0.5rem;
  color:#fefefe;
}
.blacklisttitle{
  font-size: 0.5rem;
  color: #232323;
  position: relative;
  top: 1.5rem;
  left: 0.4rem;

}
.submitinformation{
  height: 1.5rem;
  margin: 0 0.8rem;
  position: relative;
  top: 2rem;
  border-bottom: 1px solid #e7e7e7;
}
.lconimg{
  width: 10%;
}
.lconimg img{
  width: 0.46rem;
  height: 0.46rem;
}
.inputs{
  width: 80%;
  height: 1rem;
  border: none;
  font-size: 0.373rem;
  margin-bottom: 0.1rem;
}
.input{
  width: 38%;
  height: 1rem;
  border: none;
  font-size: 0.373rem;
  background-color: #fff;
  position: relative;
}
.ts{
  margin-top: 0.4rem;
}
.logobtn{
  margin: 0 0.8rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  color: #fff;
  font-size: 0.5rem;
  margin-top: 2.8rem;
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
.lookhelp{
  height: 1.5rem;
  line-height: 1.5rem;
  color: #366fff;
  font-size: 0.45rem;
  text-align: center;
}
.footer{
  height: 2.5rem;
  margin: 0rem 0.4rem;
}
.footerlist{
  text-align: center;
}
.hts{
  width: 1px;
  height: 0.8rem;
  border-right: 1px solid #bbbbbb;
}
.hs img{
  width: 1.2rem;
  height: 1.2rem;
  text-align: center;
}
.tet{
  font-size: 0.4rem;
  color: #bbbbbb;
}
.margts{
  margin-top: 0.5rem;
}
.loginImgBtn{
  font-size: 0.4rem;
  color: #366fff;
  width: 43%;
  text-align: right;
}
/* 运营商 */
.pathClear{
  width: 0.2rem;
  height: 0.2rem;
  margin-right: 0.4rem;
}
.bigitem{
  border-bottom:1px solid red;
}
.badtext{
  width: 80%;
  position: relative;
  top: 2rem;
  left: 0.8rem;
  color: red;
  font-size: 0.4rem;
  height: 0.2rem;
}
.badtexts{
  width: 80%;
  position: relative;
  top: 2rem;
  left: 0.8rem;
  color: red;
  font-size: 0.4rem;
  height: 0.2rem;
}

.tankuang {
  width: 100%;
  padding-bottom: 2rem;
  background: #fff;
  position: fixed;
  bottom:-100%;
  left: 0;
  z-index: 20;
  border-radius: 5px 5px 0 0;
}
.sorll {
  position: fixed;
}
.zhegai {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
}
.trueactive {
  bottom: 0;
  transition: bottom 0.7s, transform 1s;
  -moz-transition: bottom 0.7s, -moz-transform 1s;
  -webkit-transition: bottom 0.7s, -webkit-transform 1s;
  -o-transition: bottom 0.7s, -o-transform 1s;
}
.closeing{
  float: right;
  position: relative;
  top: 0.4rem;
  right: 0.4rem;

}
.closeing img{
  width: 0.5rem;
  height:0.5rem;
}
.clemoner{
  width: 100%;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  position: relative;
  top: 1.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: #386fff;
}
.simmoney{
  font-size: 0.5rem;
  position: relative;
  top: 0.9rem;
  left: 6.4rem;
  text-decoration: line-through;
  width: 0.2rem;
  height: 0.2rem;
  line-height: 0.2rem;
  color: #adafb2;
}
.textcontent{
  position: relative;
  top: 1.5rem;
  margin: 0.4rem 0.4rem;
  font-size: 0.5rem;
}
.payment{
  width: 100%;
  position: relative;
  top: 1.5rem;
  padding-left: 0.4rem;
  height: 1rem;
  line-height: 1rem;
  background: #cbcbcb;
  font-size: 0.45rem;
  color: #7a7c81;
}
.wxzf{
  margin: 0.4rem 0.4rem;
  height: 1.5rem;
  position: relative;
  top: 1.5rem;
}
.wximg img{
  width: 1rem;
  height: 1rem;
}
.zfwx{
  margin: 0 0.2rem;
  font-size: 0.5rem;
}
.weixinzhifuautoright {
  float: right;
  margin-right: 0.1rem;
}
.weixinzhifuautoright {
  width: 0.5rem;
  height: 0.5rem;
  background: url(../../../assets/checknone.png) no-repeat;
  background-size: 100% 100%;
}
.active .weixinzhifuautoright {
  background: url(../../../assets/dl_xz@2x.png) no-repeat;
  background-size: 100% 100%;
}
.payfor{
  margin: 0.6rem 0.8rem;
  height: 1.2rem;
  position: relative;
  top: 1.5rem;
  text-align: center;
  line-height: 1.2rem;
  border-radius: 0.2rem;
  background: #366fff;
  color: #fff;
  font-size: 0.5rem;
}
.bigitem{
  border-bottom:1px solid red;
}
.badtext{
  width: 80%;
  position: relative;
  top: 2rem;
  left: 0.8rem;
  color: red;
  font-size: 0.4rem;
  height: 0.2rem;
}
.badtexts{
  width: 80%;
  position: relative;
  top: 2rem;
  left: 0.8rem;
  color: red;
  font-size: 0.4rem;
  height: 0.2rem;
}
.pathClear{
  width: 0.3rem;
  height: 0.3rem;
}
.lodings{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(3, 3, 3, 0.3);
}
.lodingimg{
  position: absolute;
  top: 40%;
  left: 40%;
}
.lodingimg img{
  -webkit-transform: rotate(360deg);
  animation: rotation 8s linear infinite;
  -moz-animation: rotation 8s linear infinite;
  -webkit-animation: rotation 8s linear infinite;
  -o-animation: rotation 8s linear infinite;
}
 @-webkit-keyframes rotation {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
.lodingtext{
  position: relative;
  top: 52%;
  left: 32%;
  color: #fff;
  font-size: 0.4rem;
}
</style>