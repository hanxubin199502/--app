<template>
  <div>
    <div class="footer">
      <div v-for='(item,index) of items' :class='[item.cls,{on:index === idx}]' @click="$router.push(item.push)">
        <img :src="index===idx?item.iconSelect:item.icon">
        <p :class="['colorChange',{on:index===idx}]" >{{item.name}}</p>
      </div>
	</div>
  </div>
</template>

<script>
export default {
  props: ['idx'],
  name: 'information',
  data () {
    return {
      items:[{
					cls:"home",
					name:"征信",
					push:"/",
					icon:require("../../assets/db_zx@2x.png"),
          iconSelect:require("../../assets/db_zx_xz@2x.png")
				},
				{
					cla:"myorder",
					name:"我的订单",
					push:"/myorder",
					icon:require("../../assets/db_dd@2x.png"),
          iconSelect:require("../../assets/db_dd_xz@2x.png")
				}]
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  width: 100%;
  color: #bbb;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.footer div {
  float: left;
  width: 50%;
  text-align: center;
  height: 1.26rem;
  font-size: 0.293rem;
}
.footer div img {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.2rem;
}

.on {
  color: #206af2;
}
</style>
