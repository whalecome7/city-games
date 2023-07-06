<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BgmAudio from '@/assets/audio/bgm.mp3'
import { ref, onMounted } from 'vue'

import imageMap1 from '@/assets/images/scenicSpot/map1.jpg'
import imageMap2 from '@/assets/images/scenicSpot/map2.jpg'
import imageMap3 from '@/assets/images/scenicSpot/map3.jpg'
import imageMap4 from '@/assets/images/scenicSpot/map4.jpg'
import GoHomeBtn from '@/assets/images/scenicSpot/go-home-btn.png'
import InfoBtn from '@/assets/images/scenicSpot/info-btn.png'
import LotteryBtn from '@/assets/images/scenicSpot/lottery-btn.png'
import PunchInDisable from '@/assets/images/scenicSpot/punchIn-disable.png'
import PunchInEnable from '@/assets/images/scenicSpot/punchIn-enable.png'
import PunchInSuccess from '@/assets/images/scenicSpot/punchIn-success.png'
import InfoModalBack from '@/assets/images/scenicSpot/info-modal-back.png'
import PunchInBtn from '@/assets/images/scenicSpot/punchIn-btn.png'
import OkBtn from '@/assets/images/scenicSpot/ok-btn.png'
import PunchInShowCardBtn from '@/assets/images/scenicSpot/punchIn-show-card-btn.png'
import PunchInBack from '@/assets/images/scenicSpot/punchIn-back.png'
import CardBack from '@/assets/images/scenicSpot/card-back.png'
import CardSaveBtn from '@/assets/images/scenicSpot/card-save-btn.png'
import Card1 from '@/assets/images/scenicSpot/card-1.jpg'
import Card2 from '@/assets/images/scenicSpot/card-2.jpg'
import Card3 from '@/assets/images/scenicSpot/card-3.jpg'
import Card4 from '@/assets/images/scenicSpot/card-4.jpg'
import Card5 from '@/assets/images/scenicSpot/card-5.jpg'
import Card6 from '@/assets/images/scenicSpot/card-6.jpg'
import Card7 from '@/assets/images/scenicSpot/card-7.jpg'
import Card8 from '@/assets/images/scenicSpot/card-8.jpg'
import Card9 from '@/assets/images/scenicSpot/card-9.jpg'
import Card10 from '@/assets/images/scenicSpot/card-10.jpg'
import Card11 from '@/assets/images/scenicSpot/card-11.jpg'
import Card12 from '@/assets/images/scenicSpot/card-12.jpg'
import PunchInModalLottery from '@/assets/images/scenicSpot/punchIn-modal-lottery-btn.png'
import imageMap1Img from '@/assets/images/scenicSpot/map1.jpg'
import infoImg from '@/assets/images/scenicSpot/info-modal.png'

// import VConsole from 'vconsole'

// new VConsole()

const audio = ref()

onMounted(() => {
  new Image().src = infoImg;
  new Image().src = imageMap1;
  new Image().src = imageMap2;
  new Image().src = GoHomeBtn;
  new Image().src = InfoBtn;
  new Image().src = LotteryBtn;
  new Image().src = PunchInDisable;
  new Image().src = PunchInEnable;
  new Image().src = PunchInSuccess;
  new Image().src = Card1;
  new Image().src = Card2;
  new Image().src = Card3;
  new Image().src = Card4;
  new Image().src = Card5;
  new Image().src = Card6;

  document.body.addEventListener('touchstart', () => {
    setTimeout(() => {
      if(audio.value.paused){
        audio.value.play()
      }
    }, 500)
  })
  document.body.addEventListener('mousedown', () => {
    setTimeout(() => {
      if(audio.value.paused){
        audio.value.play()
      }
    }, 500)
  })
  audio.value.currentTime = 0 //播放音频的起始时间
  audio.value.volume = 1; //音频声音大小
})

</script>

<template>
  <div style="display: none">
    <audio ref="audio" :src="BgmAudio" autoplay loop controls></audio>
  </div>
  <RouterView />
</template>

<style scoped>

</style>
