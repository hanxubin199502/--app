<template>
  <div class="hellowwarp">
    <div class="overspread"></div>

    <div class="head">
      <div class="headauto">
        <div class="headtext">支付中</div>
      </div>
    </div>
    <div class="concentwarp">
      <img src="../../../assets/pay.png" alt>
    </div>
    <div class="aaa">
      <div class="title">请确认微信支付是否完成</div>
      <div class="yesmoney" @click="yesmoneyclick" :class="active">已完成支付</div>
      <div class="nonoemoney" @click="nonoemoneyclick" :class="nonoemoneyactive">支付遇到问题,可在我的报告中再次支付</div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      name: '',
      show: true,
      count: "",
      active: "activefalse",
      nonoemoneyactive: "nonoemoneyactivefalse",
    }
  },
  methods: {

    yesmoneyclick () {
      this.active = "activetrue"
      var that = this
      setTimeout(function () {
        that.active = "activefalse"
        that.$router.push({ path: './myorder' })
      }, 200)
    },
    nonoemoneyclick () {
      this.nonoemoneyactive = "nonoemoneyactivetrue"
      var that = this
      setTimeout(function () {
        that.active = "nonoemoneyactivefalse"
        that.$router.push({ path: './myorder', query: { id: 1 } })
      }, 200)
    }

  },




}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hellowwarp {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #f2f2f2;
}
.head {
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
}
.imgwarp {
  width: 2.2rem;
  height: 1.2rem;
  float: left;
  font-size: 0.45rem;
  line-height: 1.2rem;
}
.imgwarp img {
  width: 0.5rem;
  margin-left: 0.26rem;
  margin-top: 0.35rem;
  float: left;
}
.imgwarp span {
  margin-left: 0.2rem;
  font-weight: bold;
}

.headtext {
  width: 3rem;
  margin: 0 auto;
  font-size: 0.45rem;
  text-align: center;
  line-height: 1.2rem;
}
.concentwarp {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  font-size: 0.4rem;
  color: #9e9e9e;
  /* height: 8rem; */
  position: absolute;
  left: 50%;
  top: 3rem;
  /* margin-top: -4rem; */
  margin-left: -35%;
}
.concentwarp img {
  width: 100%;
}
.btn {
  font-size: 0.4rem;
  border-radius: 5px;
  text-align: center;
  background: #222;
  line-height: 1rem;
  margin-top: 0.5rem;
  color: #fff;
}
.overspread {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
}
.aaa {
  position: fixed;
  width: 7rem;
  height: 4.2rem;
  text-align: center;
  top: 50%;
  left: 50%;
  margin-left: -3.5rem;
  margin-top: -2.15rem;
  z-index: 500;
  font-size: 0.4rem;
  border-radius: 10px;
  background: #fff;
  font-weight: bold;
}
.aaa div {
  line-height: 1.4rem;
  border-bottom: 1px solid #ccc;
}
.title {
  color: #222;
  background: #fff;
  border-radius: 10px 10px 0 0;
}
.yesmoney {
  color: #f7a020;
}

.aaa .nonoemoney {
  color: red;
  border: none;
}
.activetrue {
  background: #ccc;
}
.nonoemoneyactivetrue {
  background: #ccc;
}
</style>
