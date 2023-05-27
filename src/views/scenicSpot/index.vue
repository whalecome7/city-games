<script setup>
import imageMap1 from '@/assets/images/scenicSpot/map1.jpg';
import imageMap2 from '@/assets/images/scenicSpot/map2.jpg';
import imageMap3 from '@/assets/images/scenicSpot/map3.jpg';
import imageMap4 from '@/assets/images/scenicSpot/map4.jpg';
import GoHomeBtn from '@/assets/images/scenicSpot/go-home-btn.png';
import InfoBtn from '@/assets/images/scenicSpot/info-btn.png';
import LotteryBtn from '@/assets/images/scenicSpot/lottery-btn.png';
import PunchInDisable from '@/assets/images/scenicSpot/punchIn-disable.png';
import PunchInEnable from '@/assets/images/scenicSpot/punchIn-enable.png';
import PunchInSuccess from '@/assets/images/scenicSpot/punchIn-success.png';
import InfoModalBack from '@/assets/images/scenicSpot/info-modal-back.png';

import { ref } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const showInfoModal = ref(false)

const openInfoModal = () => {
  showInfoModal.value = true
}

const closeInfoModal = () => {
  showInfoModal.value = false
}

const openLotteryModal = () => {

}

const goHome = () => {
  router.push('/')
}

</script>

<template>
  <div class="bg">
    <van-image :block="true" :src="imageMap1"/>
    <van-image :block="true" :src="imageMap2"/>
    <van-image :block="true" :src="imageMap3"/>
    <van-image :block="true" :src="imageMap4"/>
    <div class="container">
      <div class="dv-action">
        <van-image width="100" :src="InfoBtn" @click="openInfoModal"/>
        <van-image width="100" :src="LotteryBtn" @click="openLotteryModal"/>
        <van-image width="100" :src="GoHomeBtn" @click="goHome"/>
      </div>
    </div>
  </div>
  <van-popup v-model:show="showInfoModal" >
    <div class="info-modal">
      <van-image width="60" class="info-modal-back" :src="InfoModalBack" @click="closeInfoModal"/>
    </div>
  </van-popup>
</template>

<style scoped lang="scss">
.bg{
  position: relative;
}
.container{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .dv-action{
    position: absolute;
    width: 100px;
    right: 10px;
    top: 40px;
  }
}
.info-modal{
  width: 80vw;
  height: 500px;
  background: url("./src/assets/images/scenicSpot/info-modal.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .info-modal-back{
    position: absolute;
    bottom: 5%;
    right: 9%;
  }
}
</style>
