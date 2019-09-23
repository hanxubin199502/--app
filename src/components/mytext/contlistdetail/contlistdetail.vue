<template>
  <div class="contlistdetail">
    <div class="myorderhead flex">
        <div class="blackimg" @click="backlist">
            <img src="../../../assets/hmd_back@2x.png" alt="">
        </div>
        <div class="loginname">紧急联系人风险检测详情</div>
        <div></div>
    </div>
    <div class="estimate">
        <div class="detectionimg">
              <img src="../../../assets/p1.png" alt="">
              <div class="reports">
                  <div class="listpros">低风险</div>
                  <div class="listrop">报告更新时间:{{mussegs.create_date}}</div>
              </div>
              <div class="rating">"风险水平越高，申贷通过率越底"</div>
        </div>
    </div>
    <!-- 行为检测 -->
    <div class="report">
      <div class="titleimg">联系人名单</div>
      <div class="nextname flex" 
       v-for="items in itemsList"
      >
         <div class="ordername">{{items.contact_phone}}</div>
         <div class="hit">{{items.contact_loan_bad}}</div>
      </div>
    </div>
    <div class="unscramble">
      <div class="useimg"><img src="../../../assets/jd@3x.png" alt="">{{itemsremark.contacts_remark}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contlistdetail',
  data () {
    return {
      itemsList:[],
      itemsremark:[],
      mussegs:[],
    }
  },
  mounted(){
      let examineing = this.$route.query.orderId
      this.getorderdetail(examineing)
  },
  methods: {
      backlist(){
          this.$router.push({path:'../myorder'})
      },
      getorderdetail(examineing){
        console.log(examineing)
          this.$server.examinelist(examineing).then(data =>{
              console.log(data.data)
              this.itemsList=data.data.contacts.contact_list
              this.itemsremark=data.data.contacts
              this.mussegs=data.data
          })
      },
  },
}
</script>


<style scoped>
.myorderhead{
  height: 1.5rem;
  background-color: #12ad57;
  text-align: center;
  line-height: 1.5rem;
  font-size: 0.5rem;
  color: #fff;
}
.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.loginname{
  font-size: 0.5rem;
  color: #fff;
  margin-left: -1rem;
}
.blackimg{
  width: 1rem;
  height: 1.5rem;
  margin-top: 0.3rem;
  margin-left: 0.2rem;
}
.blackimg img{
  width: 0.6rem;
  height: 0.6rem;
}
.estimate{
  width: 100%;
  height: 7.5rem;
  background-image: linear-gradient(0deg,#2ece7f,#12ad57);
}
.reports{
  width: 100%;
  height: 2rem;
  text-align: center;
  position: relative;
  bottom: 2.3rem;
}
.listpros{
  font-size: 0.8rem;
  color: #fff;
}
.listrop{
  font-size: 0.4rem;
  color: #b2ffcd;
}
.rating{
  width: 100%;
  text-align: center;
  position: relative;
  bottom: 2.3rem;
  font-size: 0.45rem;
  color: #fff;
}
.thistust{
  margin: 0.4rem 0.4rem;
  height: 7.5rem;
  background-color: #fff;
  border-radius: 0.3rem;
  position: relative;
  bottom: 2.4rem;
}
.basic{
  margin: 0.4rem 0.4rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  font-size: 0.4rem;
  color: #cbcbcb;
  position: relative;
  bottom: 0.4rem;
}
.yuanimg{
  margin: 0.4rem 0.4rem;
  height: 4rem;
}
.yuanimgright{
  margin: auto;
}
.yuanright{
  width: 2rem;
  height: 2rem;
  border-radius: 1.8rem;
  border: 25px solid #cbcbcb;
  line-height: 2rem;
  font-size: 0.8rem;
  color: #84f50c;
  text-align: center;
}
.Informationlist{
  margin: 0rem 0.4rem;
  height: 3rem;
  margin-top: -0.55rem;
}
.listname{
  margin: 0.4rem 0;
  font-size: 0.45rem;
}
.up{
  width:0;
  height:0;
  border: 1px solid black;
  border-width:0 0.4rem 0.4rem;
  border-style:solid;
  border-color:transparent transparent #fff;
  margin:0 auto;
  position:relative;
  bottom: 0.3rem;
}
.report{
  margin: 0.4rem 0.4rem;
  background-color: #fff;
  position: relative;
  bottom: 2rem;
  border-radius: 0.3rem;
}
.titleimg{
  width: 5rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.5rem;
  font-weight: bold;
  background-image: url("../../../assets/bq@3x.png");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  bottom: 0.3rem;
}
.nextname{
  margin: 0.4rem 0.4rem;
  font-size: 0.45rem;
  position: relative;
  bottom: 0.4rem;
}
.leftnext{
  font-size: 0.5rem;
  font-weight: bold;
}
.special{
  border-left: 2px solid #f82004;
  position: relative;
  right: 0.3rem;
  padding: 0 0.2rem;;
}
.unscramble{
  margin: 0rem 0.4rem;
  position: relative;
  bottom: 2.2rem;
}
.useimg{
  font-size: 0.4rem;
  color: #615c5c;
  margin: 0 0.4rem;
}
.useimg img{
  width: 1rem;
  height: 0.5rem;
  position: relative;
  top: 0.15rem;
}
.reporthree{
  margin: 0.4rem 0.4rem;
  height: 6.5rem;
  background-color: #fff;
  position: relative;
  bottom: 2rem;
  border-radius: 0.3rem;
}
.reporfore{
  margin: 0.4rem 0.4rem;
  height: 3.5rem;
  background-color: #fff;
  position: relative;
  bottom: 2rem;
  border-radius: 0.3rem;
}
.reporfive{
  margin: 0.4rem 0.4rem;
  height: 12rem;
  background-color: #fff;
  position: relative;
  bottom: 2rem;
  border-radius: 0.3rem;
}
.reporfive1{
  margin: 0.4rem 0.4rem;
  height: 8.5rem;
  background-color: #fff;
  position: relative;
  bottom: 2rem;
  border-radius: 0.3rem;
}
.reportime{
  margin: 0.4rem 0.4rem;
  height: 13rem;
  background-color: #fff;
  position: relative;
  bottom: 2rem;
  border-radius: 0.3rem;
}
.tablebr{
  width: 20%;
  text-align: center;
}
.nextitle{
  margin: 0.4rem 0.4rem;
  font-size: 0.4rem;
}
.hit{
  color: #f86604;
}
</style>