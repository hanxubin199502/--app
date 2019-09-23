<template>
  <div class="contactlistorder">
    <div class="zhegai" v-if="zhegai" @click="zhegaiclick"></div>
     <div class="contactbanner">
          <div class="loginhead flex">
            <div class="close" @click="backclick"><img src="../../../assets/jj_back@2x.png" alt=""></div>
            <div class="loginname">紧急联系人风险检测</div>
            <div></div>
          </div>
          <div class="welcomelogin">紧急联系人风险高，网贷</div>
          <div class="welcomesong">同样悲剧</div>
          <div class="welcometext">快速排查出高风险联系人</div>
     </div>
     <div class="blacklist">
        <div class="blacklisttitle">请添加待检测联系人</div>
        <div class="listtext">最多可添加3人</div>
        <Form ref="formDynamic" :model="formDynamic">
        <div class="submitinformation flex"
          v-for="(item, index) in formDynamic.contactList"                 
          :key="index"
          :prop="'contactList.' + index + '.value'"
        >
             <div class="lconimg" @click="handleRemove(index)">
                 <img src="../../../assets/jj_delete_icon@2x.png" alt="">
             </div>
             <input 
             type="tel" 
             class="inputs"
             maxlength="11"
             v-model="item.phone"
             oninput="if(value.length > 11)value = value.slice(0, 11)"
             placeholder="请输入待检测联系人手机号">
        </div>
        <div class="submitinformations ts flex">
             <div class="lconimg" @click="handleAdd" v-if='formDynamic.contactList.length <3'>
                 <img src="../../../assets/jj_tj_icon@2x.png" alt="">
             </div>
             <div class="lconimg"  v-else='formDynamic.contactList.length >2'>
                 <img src="../../../assets/jj_tj_icon@2x.png" alt="">
             </div>
             <div class="addclass">添加联系人</div>
        </div>
        <div class="logobtn" @click="logoclick(formDynamic)">立即检测</div>
        <div class="tiaoli flex">
            <!-- <div class="chackes" @click="tiaoliclick">
            <img :src="require('../../../assets/'+imgurl)" alt class="cheackinput">
            </div> -->
            <span class="agreement">您已同意《征信服务协议》</span>
        </div>
        </Form>
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
  name: 'contactlistorder',
  data () {
    return {
      imgurl: 'checknone.png',
      concent: null,
      cheackinput: false,
      formDynamic: {
          contactList: [
              {
                  phone: '',                 
              }
          ]
      },
      zhegai:false,
      taxon: null,
      tankuang: true,
      myretapemode:'',
      curent: 0,
      serverspay:2,
      wxpaylist:3,
      paymentId: "weChat",
      lodinglist:false,
      WXPayWap:'',
      List: [
        {
          value: "微信",
          code: "0"
        },
      ]
    }
  },
  methods: {
    backclick(){
         this.$router.push({path:'/'})
    },
    zhegaiclick () { //遮罩
      this.taxon = "activefalse"
      this.zhegai = false
    },
    closeclick(){
      this.tankuang = false
      this.taxon = "activefalse"
      this.zhegai = false
    },
     weixinclick (index, paymentId) {
      console.log(paymentId)
      this.curent = index
      this.paymentId = paymentId //支付方式Id
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
    lookhelp(){
          this.$router.push({path:'./blackorderhelp'})
    },
    handleAdd () {
          this.index++;
          this.formDynamic.contactList.push({
              phone: '',
              index: this.formDynamic.contactList.index,
          });                             
      },
    //remove移除
    handleRemove (index) {
        this.remove=index
        this.formDynamic.contactList=this.formDynamic.contactList.filter((item,index) => {
          return (this.remove!=index);
        });
    },
    //立即检测
    logoclick(index){
      if(this.formDynamic.contactList == ''){
          this.$layer.msg('至少添加一个联系人手机号')
      }
      // else if(this.cheackinput == false){
      //     this.$layer.msg('请阅读协议后检测')
      // }
      else{
          this.$server.detection(this.formDynamic).then(data =>{
           console.log(data)
           if(data.code == 1103){
               this.$layer.msg("信息失效，请重新登录")
                this.$router.push({path:'./login'})
             }else if(data.code ==1001){
               this.$layer.msg("待检测联系人不能为空")
             }else{
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
         })
      }
    },
     //h5微信支付
    wxpay(){
      let ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){//判断是不是微信浏览器
           this.$server.channel(this.wxpaylist).then(data =>{
             if(data.code == 200){
                  let paylist = {
                    payCode:data.data[0].payCode,
                    orderId:this.myretapemode.orderId,
                    ip:'124.204.64.154',
                    returnUrl:this.$url,
                    // openid: sessionStorage.getItem("openid")
                  }
                  this.$server.wxpayment(paylist).then(data =>{
                    let payse = data.data
                    var that = this
                    if(data.code == 200){
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
                          that.$layer.msg("支付成功");
                          if (res.errMsg == "chooseWXPay:ok") {
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
      }else{
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
              }
          })
      }
    },
  },
  //  created () { 
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
.contactlistorder{
  margin-bottom: 1.3rem;
}
.contactbanner{
  width: 100%;
  height: 6rem;
  position: relative;
  top: 0;
  background-image: url("../../../assets/jj_top_bj@2x.png");
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
  color: #fff58d;
  margin-top: 0.6rem;
}
.welcomesong{
  margin: 0rem 1rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.65rem;
  color: #fff58d;
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
.listtext{
  font-size: 0.4rem;
  color: #888888;
  position: relative;
  top: 1.7rem;
  left: 0.4rem;
}
.submitinformation{
  height: 1.5rem;
  margin: 0.5rem 0.8rem;
  position: relative;
  top: 2rem;
  border-bottom: 1px solid #e7e7e7;
}
.submitinformations{
  height: 1.5rem;
  margin: 0 0.8rem;
  position: relative;
  top: 2rem;
}
.lconimg{
  width: 10%;
}
.lconimg img{
  width: 0.46rem;
  height: 0.46rem;
}
.inputs{
  width: 86%;
  height: 1rem;
  border: none;
  font-size: 0.373rem;
  margin-bottom: 0.1rem;
}
.input{
  width: 44%;
  height: 1rem;
  border: none;
  font-size: 0.373rem;
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
  margin: 0.7rem 0.8rem;
  height: 1rem;
  line-height: 1rem;
  color: #666666;
  position: relative;
  bottom: 0.5rem;
    
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
}
.addclass{
  width: 100%;
  height: 1.4rem;
  text-align: left;
  position: relative;
  top: 0.4rem;
  left: 0.4rem;
  font-size: 0.373rem;
  color: #366eff;
}
.tankuang {
  width: 100%;
  padding-bottom: 2rem;
  background: #fff;
  position: fixed;
  bottom:-100%;
  /* bottom: 0rem; */
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
.pathClear{
  width: 0.3rem;
  height: 0.3rem;
}
</style>