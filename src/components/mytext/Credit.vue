<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
        </div>
        <div class="headtext">信贷超市</div>
      </div>
    </div>
    <div class="parent">
        <div class="banner">
             <img src="../../assets/banner.png" alt="">
        </div>
        <div class="textone">
          <div class="intellogo"><img src="../../assets/tj@3x.png" alt=""></div>
             <div class="intellectual">
               <div class="imgs"><img src="../../assets/zxd@3x.png" alt=""></div>
               <span class="inteltext">智享贷</span>               
             </div>
          <div class="inteldetail">
            <div class="limit">贷款额度（元）
              <div class="limitlist">100,000.00</div>
            </div>
            <div class="limit">最低日息
              <div class="limitlist">0.03%</div>
            </div>
            <div class="intellectual">
                <div class="togo" @click="togoclick">去申请</div><div class="togoimg"><img  @click="togoclick" src="../../assets/h@3x.png" alt=""></div>
            </div>
            
          </div>
        </div>
       <!--  <div class="textone">
          <div class="intellogo"><img src="../../assets/tj@3x.png" alt=""></div>
             <div class="intellectual">
               <div class="imgs"><img src="../../assets/xfd@3x.png" alt=""></div>
               <span class="inteltext">消费贷</span>               
             </div>
          <div class="inteldetail">
            <div class="limit">贷款额度（元）
              <div class="limitlist">100,000.00</div>
            </div>
            <div class="limit">最低日息
              <div class="limitlist">0.03%</div>
            </div>
            <div class="intellectual">
              <div class="togo" @click="mogoclick">去申请</div><div class="togoimg"><img  @click="mogoclick" src="../../assets/h@3x.png" alt=""></div>
            </div>          
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      top1: "",
      right1: "",
      toTopShow: false,
      name: '',
      show: true,
      count: "",
      iconwidth: null,
      iconheight: null,
      iconList: [

      ],
      CreditconcentList: [
      ],
      jiantou: null,
      kongzhi: "a",
      concent: null,
      rotateright: false,
      loding: true,
      returl:null,
      goestourl:null,
      moesturl:null,

    }
  },
  methods: {
    imgwarpclick () {
      
       window.location.href=this.returl
      // this.$router.push({ path: '/mytext' })
    },
    togoclick(){
      //  this.$router.push({path:'https://link.geedai.com/pack/totorox/5cbd34e778aeee1ce97ebe7a?utm_source=wap_jidaiqudao949'})
      window.location.href=this.goestourl
    },
    mogoclick(){
       window.location.href=this.moesturl
    },
    init () {
      let bankAndCreditObj = {

      }
      this.$server.bankAndCredit(bankAndCreditObj).then(data => {
        console.log(data)
        this.loding = false
        this.iconList = data.data.banks
        this.CreditconcentList = data.data.credits
        console.log(this.iconList)
        if (this.iconList.length >= 4) {
          this.iconwidth = "25%"
        } else {

          this.iconwidth = 100 / this.iconList.length + "%"
          console.log(this.iconwidth)
        }
        if (this.iconList.length > 8) {
          this.jiantou = true

        } else {
          this.jiantou = false
          this.iconheight = "100%"
        }

      })



    },
    //同级推广次数接口
    identifying () {
      let extensionObj = {
        extension: "Credit"
      }
      this.$server.extension(extensionObj).then(data => {

      })
    },
    Applyimmediatelyclick (url, creditId) {

      let clickCreditObj = {
        creditId: creditId
      }
      this.$server.clickCredit(clickCreditObj).then(data => {
        location.href = url
      })

    },
    jiantouclick () {
      this.concent++;
      if (this.concent % 2 != 0) {
        this.kongzhi = "b"
      } else {
        this.kongzhi = "a"
      }
      this.rotateright = !this.rotateright

    },

    scrollToTop () {
      let that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 500) {
        that.toTopShow = true
      } else {
        that.toTopShow = false
      }
    },



    toTopShows () {

      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0

    }
  },

  mounted () {
    this.init()
    window.addEventListener('scroll', this.scrollToTop)
    let parameter = location.href.indexOf("?")
      
     if(parameter>-1){
      this.returl='https://test.kkswine.com/v1/mytext'
     }else{
      this.returl='https://kkswine.com/v1/mytext'
     }
     this.goestourl='https://link.geedai.com/pack/totorox/5cbd34e778aeee1ce97ebe7a?utm_source=wap_jidaiqudao949'
     this.moesturl='https://link.geedai.com/pack/totorox/5cbd34e778aeee1ce97ebe7a?utm_source=wap_jidaiqudao949_01'
  },


  created () {
    if (this.$route.query.channelid) {
      sessionStorage.setItem("channelid", this.$route.query.channelid)
      this.identifying()
    }
  


  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hellowwarp {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #f2f2f2 !important;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  z-index: 100;
}
.banner{
    width: 100%;
    margin-top: 1.2rem;
}
.textone{
  margin: 0.3rem 0.3rem;
  background: #fff;
  /* height: 4rem; */
  border: 1px solid #fff;
}
.imgs img{
  width: 0.6rem;
  height: 0.6rem;
}
.intellectual{
  display: flex;
  margin: 0.2rem 0.2rem;
}
.inteltext{
    font-size: 0.4rem;
    margin-left: 1%;
    color: #222222;
}
.intellogo img{
  width: 1rem;
  height: 1rem;
  float: right;
}
.inteldetail{
  /* height: 2rem; */
  /* border: 1px solid #cbcbcb; */
  margin: 0rem 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
  margin-right: 0.5rem;
}
.limit{
  color: #666666;
  font-size: 0.34rem;
}
.limitlist{
  color: #222222;
  margin: 0.2rem 0.2rem;
}
.togo{
  font-size: 0.34rem;
  color: #f8a120;
  /* position: relative; */
  /* left: 7%; */
}
.togoimg img{
  width: 0.34rem;
  height: 0.34rem;
  margin-top: 0.05rem;
}
.head {
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.imgwarp {
  width: 1rem;
  height: 1.2rem;
  float: left;
  line-height: 1.2rem;
}
.imgwarp img {
  width: 0.5rem;
  margin-top: 0.35rem;
  margin-left: 0.26rem;
  float: left;
}
.imgwarp span {
  margin-left: 0.2rem;
  font-weight: bold;
  font-size: 0.45rem;
}
.headtext {
  width: 3rem;
  margin: 0 auto;
  font-size: 0.45rem;
  text-align: center;
  line-height: 1.2rem;
}
.bankcentre {
  background: #fff;
  overflow: hidden;
  padding-top: 1.2rem;
}
.bankcentretitle {
  width: 90%;
  margin: 0 auto;
  background: #fff;
  padding-top: 0.5rem;
  font-size: 0.4rem;
  font-weight: bold;
}
.iconconcent {
  overflow: hidden;
  width: 100%;
  background: #fff;
}
.iconconcent ul li {
  /* width: 20%; */
  float: left;
  text-align: center;
  padding-top: 0.3rem;
}
.iconul li .bankimg {
  width: 1.6rem;
  height: 1.3rem;
}
.iconul li p {
  margin-top: 0.1rem;
  font-size: 0.35rem;
  color: rgb(102, 102, 102);
}
.iconul {
  overflow: hidden;
  padding-bottom: 0.3rem;
  height: 4.3rem;
}
.jiantou {
  width: 100%;
  height: 1rem;
  background: #fff;
  line-height: 1rem;
}
.b {
  height: 100%;
  /* transition: height 1s;
-moz-transition: height 1s;	
-webkit-transition: height 1s;
-o-transition: height 1s; */
}
.a {
  height: 4.3rem;
  /* transition: height 1s;
-moz-transition: height 1s;
-webkit-transition: height 1s;
-o-transition: height 1s; */
}

.aa {
  /* transition: all 1s;  */
  transform: rotate(0deg);
}
.go {
  transform: rotate(180deg);
  /* transition: all 1s; */
}
.dingdanaa {
  /* transition: all 1s;  */
  transform: rotate(0deg);
}
.dingdango {
  transform: rotate(180deg);
  /* transition: all 1s; */
}
.jiantouimg {
  width: 0.5rem;
  margin: 0 auto;
}
.jiantouimg img {
  width: 100%;
}
.bankimgiconwarp {
  width: 1.6rem;
  height: 1.3rem;
  position: relative;
  margin: 0 auto;
}
.tuijian {
  width: 0.8rem;
  height: 0.4rem;
  position: absolute;
  right: -0.46rem;
  top: 0rem;
  color: #fff;
 
}

.bankcentretitle img {
  height: 0.4rem;
  float: left;
  margin-right: 0.2rem;
  margin-top: 0.1rem;
  width: 0.1rem;
}
.concentwarp {
  overflow: hidden;
  margin-top: 0.2rem;
  background: #fff;
  width: 100%;
}
.Creditconcent {
  width: 90%;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.Creditconcenteach {
  margin-top: 0.46rem;
  padding-bottom: 0.46rem;
  border-bottom: 1px solid #f2f2f2;
  overflow: hidden;
}
.Creditcardimg {
  width: 2.93rem;
  height: 1.86rem;
  float: left;
  border-radius: 5px;
}
.Creditconcenteachcent {
  float: left;
  margin-left: 0.2rem;
  overflow: hidden;
  width: 65%;
}
.title h1 {
  max-width: 80%;
  font-weight: bold;
  font-size: 0.373rem;
  float: left;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.title {
  width: 100%;
  overflow: hidden;
}

.Creditconcenteachcent p {
  width: 3.5rem;
  font-size: 0.35rem;
  margin-top: 0.3rem;
  color: #a0a0a0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 2;
  float: left;
}
.btn {
  float: right;
  width: 2rem;
  height: 0.8rem;
  background: #222222;
  border-radius: 15px;
  text-align: center;
  color: #fff;
  line-height: 0.8rem;
  font-size: 0.373rem;
  /* margin-left: 0.2rem; */
  margin-top: 0.2rem;
}
.loding img {
  width: 40%;
  margin-top: 40%;
}
.loding {
  width: 100%;
  height: 100%;
  /* height: calc(100% - 2.46rem); */
  background: #fff;
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
}
.returntoop {
  width: 0.9rem;
  height: 0.9rem;
  float: right;
  margin-top: 0.25rem;
  margin-right: 0.266rem;
}
.returntoopwarp {
  width: 1.2rem;
  height: 1.2rem;
  position: fixed;
  right: 0rem;
  bottom: 2rem;
}
.Nocreditcard {
  position: fixed;
  width: 100%;
  top: 1.2rem;
  bottom: 1.3rem;
  left: 0;
  background: #fff;
  font-size: 0.4rem;
  height: 100%;
}
.Nocreditcard div {
  width: 5rem;
  height: 1rem;
  /* background: red; */
  line-height: 1rem;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -2.5rem;
  margin-top: -0.5rem;
  color: #222;
}
</style>
