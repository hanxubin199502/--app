<template>
  <div class="indexapp">
     <div class="creditbanner"></div>
     <!-- 黑名单 -->
     <div class="blacklist">
          <div class="blacklisthead">
            <div class="blacklistleft"><div class="quanquan"></div><div class="blacktext">拒贷雷达</div></div> 
            <div class="blacklistright"><div class="righttext">{{messagelist.detectionCount}}次检测</div></div>
          </div>
          <div class="blackchart flex">
             <div class="blackchartleft"></div>
             <div class="blackchartright">
               <div class="risktext">黑名单风险监测</div>
               <div class="mideotext">90%拒贷源于命中黑名单</div>
               <div class="detection" @click="blacklistleder">立即检测</div>
             </div>
          </div>
     </div>
     <!-- 运营商 -->
     <div class="blacklist meslist">
          <div class="blacklisthead">
            <div class="blacklistleft"><div class="quanquan"></div><div class="blacktext">信用优化</div></div> 
            <div class="blacklistright"><div class="righttext">{{datalist.detectionCount}}次检测</div></div>
          </div>
          <div class="blackchart flex">
             <div class="operationtleft"></div>
             <div class="blackchartright">
               <div class="risktext">运营商诊断</div>
               <div class="mideotext">网贷核心风险项放款必查</div>
               <div class="detection" @click="Immediate">立即检测</div>
             </div>
          </div>
     </div>
     <!-- 联系人 -->
     <div class="mogen">
          <div class="blacklisthead">
            <div class="blacklistleft"><div class="quanquan"></div><div class="blacktext">增加通过率</div></div> 
            <div class="blacklistright"><div class="righttext">{{modellist.detectionCount}}次检测</div></div>
          </div>
          <div class="blackchart flex">
             <div class="contactsleft"></div>
             <div class="blackchartright">
               <div class="risktext">紧急联系人风险检测</div>
               <div class="mideotext">快速排查出高风险联系人</div>
               <div class="detection" @click="manlister">立即检测</div>
             </div>
          </div>
     </div>
     <div class="lodings" v-show="lodinglist">
        <div class='lodingimg'><img src="../../../assets/hmd_jz_icon@2x.png" alt=""></div>
        <p class="lodingtext">正在飞速加载中。。。</p>
      </div>
  </div>
</template>

<script>

export default {

  name: 'indexapp',
  data () {
    return {
      messagelist:[],
      datalist:[],
      modellist:[],
      lodinglist:false,

    }
  },
  created: function(){
        this.getorderlist() //定义方法
        var parameter = location.href.indexOf("?")
        if (parameter > -1) {
          var code = location.href.split("?")[1].split("&")[0].split("=")[1]
          let getOpenidObj = {
            code: code
          }
          this.$server.getOpenid(getOpenidObj).then(data => {
            sessionStorage.setItem("openid", data.data.openid)
          })
        }
    },
  methods: {
    Immediate(){
        this.$router.push({path:'../operatorlistorder'})
    },
    blacklistleder(){    
        this.$router.push({path:'../blacklistorder'})    
    },
    manlister(){
        this.$router.push({path:'../contactlistorder'})    
    },
    getorderlist(){
      let orderlist = '';
      this.$server.ordertext(orderlist).then(data =>{
        // this.lodinglist= true
        if(data.code == 200){
          // this.lodinglist= false
          this.messagelist = data.data[0]
          this.modellist = data.data[1]
          this.datalist = data.data[2]
        }
      })
    }
  },
}
</script>


<style scoped>
.indexapp{
  background-color: #efecec;
  margin-bottom: 1.3rem;
}
.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mogen{
  margin: 0 0.4rem;
  height: 6rem;
  background: #fff;
  position: relative;
  bottom: 0.4rem;
}
.creditbanner{
  width: 100%;
  height: 3.5rem;
  background-image: url("../../../assets/sy_top_bj@2x.png");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.blacklist{
  margin: 0 0.4rem;
  height: 6rem;
  background: #fff;
  position: relative;
  bottom: 0.4rem;
}
.blacklisthead{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: 0.6rem;
  bottom: 0.6rem;
}
.quanquan{
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  float: left;
  background-color: #a4bffe;
  text-align: center;
  margin: 0.15rem 0.4rem;
}
.blacklistleft{
  width: 50%;
  height: 0.8rem;
}
.blacktext{
  font-size: 0.5rem;
  color: #232323;
}
.blacklistright{
  width: 3.5rem;
  height: 1rem;line-height: 1rem;
  text-align: center;
  font-size: 0.4rem;
  color: #fff;
  background-image: url("../../../assets/sy_bq@2x.png");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.blackchartleft{
  width: 50%;
  height: 4.5rem;
  background-image: url("../../../assets/sy_hmd_icon@2x.png");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 0.4rem;
}
.operationtleft{
  width: 50%;
  height: 4.5rem;
  background-image: url("../../../assets/sy_yys_icon@2x.png");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 0.4rem;
}
.contactsleft{
  width: 50%;
  height: 4.5rem;
  background-image: url("../../../assets/sy_jj_icon@2x.png");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 0.2rem;
  margin-left: -0.3rem;
}
.blackchartright{
  position: relative;
  right: 0.4rem;
  top: 0.2rem;
}
.risktext{
  font-size: 0.51rem;
  color: #000;
  margin-bottom: 0.4rem;
  font-weight: bold;
}
.mideotext{
  font-size: 0.41rem;
  position: relative;
  bottom: 0rem;
}
.detection{
  width: 2.4rem;
  height: 1.1rem;
  background-color: #206af3;
  text-align: center;
  line-height: 1.1rem;
  border-radius: 0.2rem;
  color: #fff;
  font-size: 0.45rem;
  margin-top: 0.4rem;
}
.meslist{
  margin: 0.4rem 0.4rem;
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
