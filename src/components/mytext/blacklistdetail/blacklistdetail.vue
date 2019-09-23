<template>
  <div class="blacklistdetail">
    <div class="myorderhead flex">
        <div class="blackimg" @click="backlist">
            <img src="../../../assets/hmd_back@2x.png" alt="">
        </div>
        <div class="loginname">黑名单风险检测详情</div>
        <div></div>
    </div>
    <div class="estimate">
         <div class="detectionimg" v-if="detailList.risk_level== '低'">
              <img src="../../../assets/p1.png" alt="">
              <div class="reports">
                  <div class="listpros">低风险</div>
                  <div class="listrop">报告更新时间:{{messagelist.create_date}}</div>
              </div>
              <div class="rating">"风险水平越高，申贷通过率越底"</div>
        </div>
         <div class="detectionimg" v-if="detailList.risk_level== '中'">
              <img src="../../../assets/p2.png" alt="">
              <div class="reports">
                  <div class="listpros">中风险</div>
                  <div class="listrop">报告更新时间:{{messagelist.create_date}}</div>
              </div>
              <div class="rating">"风险水平越高，申贷通过率越底"</div>
        </div> 
         <div class="detectionimg" v-if="detailList.risk_level== '高'">
              <img src="../../../assets/p3.png" alt="">
              <div class="reports">
                  <div class="listpros">高风险</div>
                  <div class="listrop">报告更新时间:{{messagelist.create_date}}</div>
              </div>
              <div class="rating">"风险水平越高，申贷通过率越底"</div>
        </div>   
    </div>
    <!-- 基本信息 -->
    <div class="thistust">
          <div class="up"></div>
      <div class="basic">---基本信息---</div>
        <div class="Informationlist">
         <div class="listname flex">
           <div>姓名：</div>
           <div>{{detailList.name}}</div>
         </div>
         <div class="listname flex">
           <div>手机号：</div>
           <div>{{detailList.phone}}</div>
         </div>
         <div class="listname flex">
           <div>身份证号：</div>
           <div>{{detailList.id_card}}</div>
         </div>
        </div>
    </div>
    <!-- 黑名单检测 -->
    <div class="report">
      <div class="titleimg">黑名单风险检测</div>
      <div class="nextname flex">
        <div class="leftnext special">黑名单风险检测</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">违法犯罪黑名单</div>
         <div class="hit">{{detailList.black_list_detection.black_list_crime}}</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">高法黑名单</div>
         <div class="hit">{{detailList.black_list_detection.black_list_high_court}}</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">失信被执行人黑名单</div>
         <div class="hit">{{detailList.black_list_detection.black_list_dishonesty_execute}}</div>
      </div>
       <div class="nextname flex">
         <div class="ordername">同行业贷款不良信息名单</div>
         <div class="hit">{{detailList.black_list_detection.black_list_loan_bad}}</div>
      </div>
       <div class="nextname flex">
         <div class="ordername">同行业贷款欺诈黑名单</div>
         <div class="hit">{{detailList.black_list_detection.black_list_loan_fraud}}</div>
      </div>
       <div class="nextname textlisy flex">
         <div class="ordername">不良嗜好贴吧黑名单</div>
         <div class="hit">{{detailList.black_list_detection.black_list_baidu_tieba}}</div>
      </div>
    </div>
    <!-- 解读 -->
    <div class="unscramble">
      <div class="useimg"><img src="../../../assets/jd@3x.png" alt="">{{detailList.black_list_detection.black_list_remark}}</div>
    </div>
    <!-- 多平台网贷 -->
    <div class="reportime">
      <div class="titleimg">多平台网贷检测</div>
      <div class="nextname flex">
        <div class="leftnext special">多平台网贷检测</div>
      </div>
      <div class="nextitle flex">
        <div class="tablebr"></div>
        <div class="tablebr">近1个月</div>
        <div class="tablebr">近3个月</div>
        <div class="tablebr">近6个月</div>
        <div class="tablebr">近12个月</div>
      </div>
      <div class="nextitle flex">
        <div class="tablebr">大型消费金融行业贷款事件平台数</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_1m_large_consume_finance_platform_num}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_3m_large_consume_finance_platform_num}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_6m_large_consume_finance_platform_num}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_12m_large_consume_finance_platform_num}}</div>
      </div>
      <div class="nextitle flex">
        <div class="tablebr">P2P网贷行业贷款事件平台数</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_1m_p2p_platform_num}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_3m_p2p_platform_num}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_6m_p2p_platform_num}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_12m_p2p_platform_num}}</div>
      </div>
      <div class="nextitle flex">
        <div class="tablebr">一般消费分期行业贷款事件平台数</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_1m_general_consume_stage_platform_num}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_3m_general_consume_stage_platform_num}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_6m_general_consume_stage_platform_num}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_12m_general_consume_stage_platform_num}}</div>
      </div>
      <div class="nextitle flex">
        <div class="tablebr">总计借款平台是否过多</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_1m_platform_mun}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_3m_platform_mun}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_6m_platform_mun}}</div>
        <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_12m_platform_mun}}</div>
      </div>
    </div>
    <div class="unscramble">
      <div class="useimg"><img src="../../../assets/jd@3x.png" alt="">{{detailList.multi_loan_detection.multi_loan_remark}}</div>
    </div>
    <!-- 网贷逾期 -->
     <div class="reporthree">
      <div class="titleimg">网贷逾期检测</div>
      <div class="nextname flex">
        <div class="leftnext special">网贷逾期检测</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">当前是否正在逾期</div>
         <div class="hit">{{detailList.overdue_detection.overdue_is_overdue_ing}}</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">历史是否存在上时间恶意逾期</div>
         <div class="hit">{{detailList.overdue_detection.overdue_is_due_time_too_long}}</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">历史累计逾期次数是否较多</div>
         <div class="hit">{{detailList.overdue_detection.overdue_is_due_times_too_many}}</div>
      </div>
    </div>
    <div class="unscramble">
      <div class="useimg"><img src="../../../assets/jd@3x.png" alt="">{{detailList.overdue_detection.overdue_remark}}</div>
    </div>


  </div>
</template>

<script>

export default {
  name: 'blacklistdetail',
  data () {
    return {
      detailList:[],
      messagelist:[],
    }
  },
  mounted(){
      let examines = this.$route.query.orderId
      this.getorderdetail(examines)
  },
  methods: {
      backlist(){
          this.$router.push({path:'../myorder'})
      },
      getorderdetail(examines){
        console.log(examines)
          this.$server.examinelist(examines).then(data =>{
              console.log(data.data)
              this.detailList=data.data.black_list
              this.messagelist=data.data
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
  height: 4.5rem;
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
  height: 9rem;
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
  height: 5.5rem;
  background-color: #fff;
  position: relative;
  bottom: 2rem;
  border-radius: 0.3rem;
}
.reportime{
  margin: 0.4rem 0.4rem;
  height: 100%;
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