<template>
  <div class="blackorderhelp">
      <div class="listnav"><div class="return" @click="returns" ><img src="../../../assets/help_close@2x.png" alt=""></div></div>
     <div class="listone"></div>
     <div class="listtwo"></div>
     <div class="listthree"></div>
     <div class="listfore"></div>
     <div class="listfive"></div>
  </div>
</template>

<script>

export default {
  name: 'blackorderhelp',
  data () {
    return {

    }
  },
  methods: {
      returns(){         
       this.$router.go(-1)
      },

  },

}
</script>


<style scoped>
.blackorderhelp{
    overflow-y: scroll;
}
.listone{
    width: 100%;
    height: 20rem;
    margin-top: 1.5rem;
    background-image: url("../../../assets/help_one@2x.jpg");
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow-y: scroll;
}
.listtwo{
    width: 100%;
    height: 20rem;
    background-image: url("../../../assets/help_two@2x.jpg");
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow-y: scroll;
}
.listthree{
    width: 100%;
    height: 20rem;
    background-image: url("../../../assets/help_three@2x.jpg");
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow-y: scroll;
}
.listfore{
    width: 100%;
    height: 20rem;
    background-image: url("../../../assets/help_four@2x.jpg");
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow-y: scroll;
}
.listfive{
    width: 100%;
    height: 20rem;
    background-image: url("../../../assets/help_five@2x.jpg");
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow-y: scroll;
}
.return img{
    width: 0.6rem;
    height: 0.6rem;
    float: left;
    margin: 0.4rem 0.4rem;
}
.listnav{
    width: 100%;
    height: 1.5rem;
    background: #fff;
    position: fixed;
    top: 0;
}
</style>