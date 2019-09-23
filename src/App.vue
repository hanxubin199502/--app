<template>
  <div id="app">
   <div class="aaaaaa" v-if="alert">{{msg}}</div>
  <div>
   <div  class="lodingwarp" v-show="loding">
       <div class="wxloding" >
      <!-- <img src="./assets/jz.png" alt=""> -->
   </div>
   </div>
  </div>
   <!-- <transition :name="transitionName">  -->
   <router-view></router-view>
   <!-- </transition> -->
   <!-- <keep-alive> -->
   <information  v-show="$route.meta.haslist"  :idx='$route.meta.index'></information>
   <!-- </keep-alive> -->
  </div>
</template>

<script>
 import wx from 'weixin-js-sdk'
 import information from './components/information/information'
export default {
  components: {
    information,
  },
  name: 'App',
  data(){
    return{
      transitionName:'',
    }
  },
   computed:{
      alert() {
        return this.$store.state.alert
      },
      msg(){
        return this.$store.state.msg 
      },
      loding(){
        return this.$store.state.loding 
      }
 
  },
  watch: {
    $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
    if(to.meta.index > from.meta.index){
        //设置动画名称
    this.transitionName = 'slide-left';
    }
    else{
      this.transitionName = 'slide-right';
    }
    
    }

  },
  methods: {
  },
  created() {

  },

}
  
</script>

<style>
#app{
  background: #f2f2f2;
}
.aaaaaa{
  width: 4rem;
  height: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  margin-top: -0.75rem;
  left: 50%;
  margin-left: -2rem;
  z-index: 100;
  color: #fff;
  font-size: 0.35rem;
  text-align: center;
  line-height: 1.5rem;
  border-radius: 10px;
}
.lodingwarp{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.3)
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

</style>
