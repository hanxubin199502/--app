<template>
  <div class="operlistdetail">
    <div class="myorderhead flex">
        <div class="blackimg" @click="backlist">
            <img src="../../../assets/hmd_back@2x.png" alt="">
        </div>
        <div class="loginname">运营商诊断详情</div>
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
           <div>{{detailList.base_info.name}}</div>
         </div>
         <div class="listname flex">
           <div>手机号：</div>
           <div>{{detailList.base_info.phone}}</div>
         </div>
         <div class="listname flex">
           <div>运营商：</div>
           <div>{{detailList.base_info.operator}}</div>
         </div>
          <div class="listname flex">
           <div>号码归属地：</div>
           <div>{{detailList.base_info.phone_location}}</div>
         </div>
          <div class="listname flex">
           <div>身份证号码：</div>
           <div>{{detailList.base_info.id_card}}</div>
         </div>
          <div class="listname flex">
           <div>开户时长：</div>
           <div>{{detailList.base_info.register_days}}天</div>
         </div>
        </div>
    </div>
    <div class="unscramble">
      <div class="useimg"><img src="../../../assets/jd@3x.png" alt="">{{detailList.base_info.remark}}</div>
    </div>
    <!-- 运营商概况 -->
    <div class="reporfive">
      <div class="titleimg">运营商概况</div>
      <div>
         <pirese :id="id" :option="option"></pirese>
      </div>
      <div class="carousel">
          <div class="bigcarousel">
            <div>
                <Carousel dots='none' arrow='always'>
                  <Carousel-item v-for='(item,index) in bannerList' :key='index'>
                            <div class="demo-carousel">
                                <div class="party_muth">{{item.month}}</div>
                                <div class="calltime flex">
                                   <div class="smilmad">
                                     <div class="party_num">{{item.call_out_count}}</div>
                                     <div class="party">主叫次数</div>
                                   </div>
                                   <div class="smilmad">
                                     <div class="party_num">{{item.call_in_count}}</div>
                                     <div class="party">被叫次数</div>
                                   </div>
                                   <div class="smilmads">
                                     <div class="party_num">{{item.call_time}}</div>
                                     <div class="party">通话时长(分)</div>
                                   </div>
                                </div>
                            </div>                            
                  </Carousel-item>
              </Carousel>
            </div>
          </div>
      </div> 
    </div>
    <div class="unscramble">
      <div class="useimg"><img src="../../../assets/jd@3x.png" alt="">近6个月月均话费和通话次数，反映了个人通话的稳定性，在一定程度上会影响贷款机构对您的评估</div>
    </div>
    <!-- 行为检测 -->
    <div class="report">
      <div class="titleimg">行为检测</div>
      <div class="nextname flex">
         <div class="ordername">最近常用通话地</div>
         <div class="hit">暂无数据</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">最近连续静默天数</div>
         <div class="hit">0</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">月均静默天数</div>
         <div class="hit">0</div>
      </div>
       <div class="nextname flex">
         <div class="ordername">互通电话号码个数</div>
         <div class="hit">0</div>
      </div>
    </div>
    <div class="unscramble">
      <div class="useimg"><img src="../../../assets/jd@3x.png" alt="">稳定的通话状态有利于贷款机构的放款，若静默天数过多、互通电话号码较少的话代表"圈子"较小，会影响下款通过率。</div>
    </div>
    <!-- 借贷联系情况 -->
    <div class="reporfive1">
      <div class="titleimg">借贷联系情况</div>
      <div class="yuanimg flex">
         <div class="yuanimgleft">与借贷通话号码数量(个)</div>
         <div class="yuanimgright">
             <div class="yuanright">0</div>
         </div>
      </div>
      <div class="nextname flex">
         <div class="ordername">与借贷通话次数</div>
         <div class="hit">0</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">与借贷通话时长</div>
         <div class="hit">0</div>
      </div>
    </div>
    <div class="unscramble">
      <div class="useimg"><img src="../../../assets/jd@3x.png" alt="">与借贷机构的通话频率一定程度代表着借款活跃度，能够反 映您是否在多个借贷平台有借款行为，与借贷通话过多会影响到贷款机构对您的评估，不利于下款。</div>
    </div>
    <!-- 通话行为分析 -->
     <div class="reporthree">
      <div class="titleimg">通话行为分析</div>
      <div class="nextname flex">
         <div class="ordername">夜间通话占比是否过多</div>
         <div class="hit">{{detailList.call_behavior_analysis.is_more_night_calls_proportion}}</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">有效联系人数量是否较少</div>
         <div class="hit">{{detailList.call_behavior_analysis.is_less_valid_contacts_number}}</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">通信频率异常</div>
         <div class="hit">{{detailList.call_behavior_analysis.contact_frequency_exception}}</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">社交通讯信息多为陌生号码</div>
         <div class="hit">{{detailList.call_behavior_analysis.is_more_strange_number_in_contacts}}</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">通话记录异常号码占比过多</div>
         <div class="hit">{{detailList.call_behavior_analysis.is_more_exception_number_in_call_records}}</div>
      </div>
    </div>
    <div class="unscramble">
      <div class="useimg"><img src="../../../assets/jd@3x.png" alt="">{{detailList.call_behavior_analysis.remark}}</div>
    </div>
    <!-- top5联系人黑名单检测 -->
     <div class="reporfore">
      <div class="titleimg">联系人黑名单检测</div>
      <div class="nextname flex">
         <div class="ordername">TOP5中不良信息占比是否过高</div>
         <div class="hit">{{detailList.top5_contact_black_list.is_more_bad_list_proportion}}</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">TOP5中是否网贷申请平台过多</div>
         <div class="hit">{{detailList.top5_contact_black_list.is_more_loan_platform}}</div>
      </div>
    </div>
    <div class="unscramble">
      <div class="useimg"><img src="../../../assets/jd@3x.png" alt="">经常与风险较高的人群沟通，会被认定为存在一定的风险因素，不利于机构对您的放款评估。</div>
    </div>
    <!-- 通话标签 -->
    <div class="reporfore">
      <div class="titleimg">通话标签</div>
      <div class="nextname flex">
         <div class="ordername">通话对象是否异常(过多集中于</div>
         <div class="hit">{{detailList.call_label.is_exception_contact_object}}</div>
      </div>
      <div class="nextname flex">
         <div class="ordername">金融机构或还款通知或催收机构</div>
         <div class="hit"></div>
      </div>
    </div>
    <div class="unscramble">
      <div class="useimg"><img src="../../../assets/jd@3x.png" alt="">{{detailList.call_label.remark}}</div>
    </div>
  </div>
</template>

<script>
import pirese from '@/components/mytext/pirese/pirese.vue'
export default {
  name: 'operlistdetail',
  components:{
         pirese
     },
  data () {
    return {
      detailList:[],
      messagelist:[],
      bannerList:[],
      id: 'test',
        option: {
            chart: {
                type: 'column',
            },
            title: {
                text: '月话费(元)'
            },
            xAxis: {
                categories: [],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '额度（元）'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} 元</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    borderWidth: 0
                }
            },
            series: [{
                name:'月话费',
                data: [],
                color:'#e7a76f'
            }]
        }
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
              this.detailList=data.data.operator
              this.messagelist=data.data
              let newList=data.data.operator.operator_info.call_list 
              this.option.series[0].data=newList.map(item=>item.month_bill).map(Number)
              this.option.xAxis.categories=newList.map(item=>item.month)
              this.bannerList = newList.map(item=>item)
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
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 2.8rem;
  border: 25px solid #cbcbcb;
  line-height: 2.2rem;
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
  height: 5.5rem;
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
  padding: 0 0.2rem;
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
  height: 15rem;
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
.carousel{
  width: 100%;
  height: 2.5rem;
}
.bigcarousel{
  height: 2rem;
}
.ivu-carousel-item{
  height: 3.5rem !important;
}
.demo-carousel{
  height: 1rem;
} 
.calltime{
  height: 2rem;
  margin: 0 1.3rem;
}
.party_num{
  font-weight: bold;
  font-size: 0.5rem;
}
.party{
  color: #615c5c;
}
.party_muth{
  font-size: 0.5rem;
  text-align: center;
}
.smilmad{
  border-right: 1px solid #cbcbcb;
  width: 33%;
  text-align: center;
}
.smilmads{
  width: 33%;
  text-align: center;
}
</style>