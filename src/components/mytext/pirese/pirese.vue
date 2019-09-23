<template>
<div class="container">
  <div :id="id" :option="option"></div>
</div>
</template>
<script>
import HighCharts from 'highcharts';
export default {
  props: {
    id: {
      type: String
    },
    option: {
      type: Object
    }
  },
 mounted () {
    setTimeout(() => {
        console.info('柱状图');
        HighCharts.chart(this.id, this.option);
      }, 500);
  }
};
</script>
 
<style scoped>
.container {
  width: document.documentElement.clientWidth;
  height: document.documentElement.clientHeight;
}
</style>