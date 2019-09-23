
<template>
  <div class="myorder">
    <div class="zhegai" v-if="zhegai"></div>
    <div class="myorderhead">我的报告</div>
    <div class="listome">
        <div v-show="orderlist==''" style="text-align:center;position:relative;top:5rem;">
            <!-- <div class="noside"><img src="../../../assets/no.png" alt=""></div> -->
            <div>暂无报告哦！！！</div>
        </div>
        <div class="hst">
          <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        :noDataText="msgst"
        >
          <div 
              v-for="item in orderlist"
          >
          <div class="orderlist">
            <div class="orderhead flex">
                <div class="blackfen">{{item.productName}}</div>
                <div class="status" v-if="item.orderStatusRemark == '待支付'">{{item.orderStatusRemark}}</div>
                <div class="statuse" v-if="item.orderStatusRemark == '报告生成中'">{{item.orderStatusRemark}}</div>
                <div class="statuse" v-if="item.orderStatusRemark == '已完成'">{{item.orderStatusRemark}}</div>
                <div class="statuse" v-if="item.orderStatusRemark == '退款中'">{{item.orderStatusRemark}}</div>
                <div class="statuse" v-if="item.orderStatusRemark == '退款成功'">{{item.orderStatusRemark}}</div>
            </div>
            <div class="orderdel flex">
                <div>
                  <!-- {{JSON.stringify(item)}} -->
                  <div class="bill">{{item.name}}{{item.idCard}}</div>
                  <div class="bill" v-if="(item.creditType == 2 && item.contacts)" v-for="k in item.contacts">{{k.phone}}</div>
                  <div class="bill" v-if="item.creditType == 3" >{{item.phone}}</div>
                  <div class="ctime">{{item.createDate}}</div>
                </div>
                <!-- payStatus：10未支付  12支付成功 -->
                <div class="lookme" @click="lookdetail(item)" v-if="item.payStatus == 10 || item.reportStatus == 32">{{orderType(item.payStatus)}}</div>
                <div class="lookmesg" v-if="item.payStatus==12 && item.reportStatus == 30">报告待生成</div>
                <div class="lookmesg" v-if="item.payStatus==12 && item.reportStatus == 31 || item.reportStatus == 34">报告生成中</div>
                <div class="lookmesg" v-if="item.payStatus==12 && item.reportStatus == 33">报告生成失败</div>
                <!-- reportStatus：30报告待生成 31，34报告生成中  32报告生成成功 33报告生成失败-->
            </div>
          </div>
        </div>
      </scroller>
      </div>
    </div>
    
     <div class="tankuangwarp">
          <div class="tankuang" :class="taxon">
             <div class="closeing" @click="closeclick">
               <img src="../../../assets/help_close@2x.png" alt="">
             </div>
             <div class="clemoner">￥{{msg.productPrice}}</div><span class="simmoney">￥{{msg.productOriginalPrice}}</span>
             <div class="textcontent flex">
               <div>服务名称</div>
               <div>{{msg.productName}}</div>
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
    <div class="exitlogin" @click="exitlogin">退出登录</div>
    <div class="exittext" v-show="exitcancle">
      <div class="exittest">确定退出登录？</div>
      <div class="cancle flex">
        <div class="camcles" @click="cancle">取消</div>
        <div class="determine" @click="determine">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { setTimeout } from 'timers';
export default {
  name: 'myorder',
  data () {
    return {
      orderlist:[],
      msgst:'O(∩_∩) 没有更多报告啦~',
      page:1,
      hasNext: 0,
      zhegai:false,
      taxon: null,
      tankuang: true,
      myretapemode:'',
      curent: 0,
      msg:'',
      paymentId: "weChat",
      lodinglist:false,
      exitcancle:false,
      serverspay:2,
      wxpaylist:3,
      WXPayWap:'',
      List: [
        {
          value: "微信",
          code: "0"
        },
      ]
    }
  },
  created:function(index){
     this.getorderlist(index)
  },
  methods: {
       //查看详情
       lookdetail(e){
          console.log(e)
        if(e.payStatus == 12){//判断订单列表支付状态如果是12则跳转详情
            if(e.creditType == 1){
                this.$router.push({path:'/blacklistdetail',query:{orderId:e.orderId},name:'blacklistdetail'})
            }else if(e.creditType == 2){
                this.$router.push({path:'/contlistdetail',query:{orderId:e.orderId},name:'contlistdetail'})
            }else if(e.creditType == 3){
                this.$router.push({path:'/operlistdetail',query:{orderId:e.orderId},name:'operlistdetail'})
            }  
        }else{//未支付（10）状态走支付接口
              this.msg = e
              this.tankuang = true
              this.taxon = "trueactive"
              this.zhegai = true
              this.$server.channel(this.serverspay).then(data =>{
                console.log(data)
                this.WXPayWap = data.data[0].payCode
                // if(data.code == 200){
                //   let iplist ={}
                //   this.$server.waiip(iplist).then(data =>{
                //     console.log(data)
                //     this.neiip = data
                //   })
                // }   
            })
          }
        },
         //h5微信支付
        wxpay(){
          let ua = window.navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            console.log('走微信浏览器了')
              this.$server.channel(this.wxpaylist).then(data =>{
                console.log(data)
                if(data.code == 200){
                      let paylist = {
                        payCode:data.data[0].payCode,
                        orderId:this.msg.orderId,
                        ip:'124.204.64.154',
                        returnUrl:this.$url,
                      }
                      this.$server.wxpayment(paylist).then(data =>{
                        let payse = data.data
                        var that = this
                        if(data.code == 200){
                          console.log(data)
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
                              // this.$layer.msg("支付成功");
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
                        }else{
                          this.$layer.msg(data.msg)
                        }
                      })
                  }else{
                    this.$layer.msg(data.msg)
                  }
              })
          }else{
            let paylist = {
                payCode:this.WXPayWap,
                orderId:this.msg.orderId,
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
        //退出登录
        exitlogin(){
          this.zhegai = true
          this.exitcancle = true
        },
        //取消
        cancle(){
          this.exitcancle = false
          this.zhegai = false
        },
        //确定
        determine(){
          let exit = {}
          this.$server.exitlist(exit).then(data =>{
            this.$layer.msg('退出登录成功')
            this.$router.push({path:'./login'})
          })
        },
       //请求列表
       getorderlist(index){              
          let looklist = {}
          this.$server.orderslist(looklist).then(data =>{
            this.lodinglist = true
            if(data.code == 200){
              this.lodinglist = false
              this.orderlist=data.data.rows; 
             }           
          })
      },
      closeclick(){
      this.tankuang = false
      this.taxon = "activefalse"
      this.zhegai = false
    },
     zhegaiclick () { //遮罩
      this.taxon = "activefalse"
      this.zhegai = false
    },
     weixinclick (index, paymentId) {
      console.log(paymentId)
      this.curent = index
      this.paymentId = paymentId //支付方式Id
    },
      //订单状态
      changeType(payStatus){   
          return payStatus==12? "订单完成":"未支付";
          
      },
       //支付状态
      orderType(payStatus){
          return payStatus==10? "去支付":"查看";
      },
      refresh (done) {  //下拉刷新
      this.page = 1
      this.getorderlist(done)
      },
      infinite (done) {    //上拉加载  
      if (this.page >= this.hasNext) {
        done(true)
        return
      }
      this.page++
      console.log(this.page)
      console.log("翻翻翻翻", this.page)
      this.init(done)
    },
  },
}
</script>


<style scoped>
.myorder{
   background-color: #efecec;
   margin-bottom: 1.3rem;
}
.listome{
  margin-top: 1.5rem;
  background: #eceaea;
  margin-bottom: 0.4rem;
  height: 10000px;
}
.myorderhead{
  position: fixed;
  top: 0;
  width: 100%;
  height: 1.5rem;
  background-color: #0f54ef;
  text-align: center;
  line-height: 1.5rem;
  font-size: 0.5rem;
  color: #fff;
  z-index: 100;
}
.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.orderlist{
margin: 0.4rem 0.4rem;
height: 4.5rem;
background-color: #fff;
border-radius: 0.3rem;
}
.orderhead{
  margin: 0 0.4rem;
  height: 2rem;
  border-bottom:1px solid #e7e7e7;
}
.blackfen{
  font-size: 0.5rem;
  font-weight: bold;
}
.status{
  font-size:0.5rem;
  color: #f3be4a;
}
.statuse{
  font-size:0.5rem;
  color: #91908d;
}
.nostatus{
  font-size:0.5rem;
  color: #ffae08;
}
.orderdel{
  margin: 0 0.4rem;
  height: 2.5rem;
}
.bill{
  font-size: 0.4rem;
  color: #666666;
}
.ctime{
  font-size: 0.38rem;
  color: #666666;
  margin-top: 0.2rem;
}
.lookme{
  width: 2rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-radius: 0.15rem;
  font-size: 0.4rem;
  background-color: #0f54ef;
  color:#fff;
}
.lookmesg{
  width: 3rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-radius: 0.15rem;
  font-size: 0.4rem;
  background-color: #7a7c80;
  color:#fff;
}
.noside{
  margin-top: 5rem;
}
.noside img{
  width: 3.5rem;
  height: 3rem;
  text-align: center;
}
.tankuang {
  width: 100%;
  padding-bottom: 2rem;
  background: #fff;
  position: fixed;
  bottom:-100%;
  left: 0;
  z-index: 1000;
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
.exitlogin{
  width: 92%;
  margin: 0.4rem 0.4rem;
  height: 1.46rem;
  border-radius: 0.2rem;
  position: fixed;
  bottom: 0.82rem;
  z-index: 1;
  background: #0f54ef;
  color: #fff;
  font-size: 0.6rem;
  text-align: center;
  line-height: 1.46rem;
}
.exittext{
  height: 3.5rem;
  width: 80%;
  margin: 0.6rem 1rem;
  background: #fff;
  border-radius: 0.5rem;
  position: fixed;
  bottom: 40%;
  z-index: 10000;
  text-align: center;
}
.exittest{
  font-size: 0.5rem;
  font-weight: bold;
  margin: 0.6rem 0;

}
.cancle{
  margin: 0.8rem 1.2rem;
  font-size: 0.5rem;
}
.determine{
  color: #f3be4a;
}
.hst{
  width: 100%;
  height: 100%;
  border: 1px solid #eceaea;
}
</style>