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
import PunchInBtn from '@/assets/images/scenicSpot/punchIn-btn.png';
import PunchInBack from '@/assets/images/scenicSpot/punchIn-back.png';
import CardBack from '@/assets/images/scenicSpot/card-back.png';
import CardSaveBtn from '@/assets/images/scenicSpot/card-save-btn.png';
import Card1 from '@/assets/images/scenicSpot/card-1.jpg';
import Card2 from '@/assets/images/scenicSpot/card-2.jpg';
import Card3 from '@/assets/images/scenicSpot/card-3.jpg';
import Card4 from '@/assets/images/scenicSpot/card-4.jpg';
import Card5 from '@/assets/images/scenicSpot/card-5.jpg';
import Card6 from '@/assets/images/scenicSpot/card-6.jpg';
import Card7 from '@/assets/images/scenicSpot/card-7.jpg';
import Card8 from '@/assets/images/scenicSpot/card-8.jpg';
import Card9 from '@/assets/images/scenicSpot/card-9.jpg';
import Card10 from '@/assets/images/scenicSpot/card-10.jpg';
import Card11 from '@/assets/images/scenicSpot/card-11.jpg';
import Card12 from '@/assets/images/scenicSpot/card-12.jpg';
import PunchInModalLottery from '@/assets/images/scenicSpot/punchIn-modal-lottery-btn.png';

import { showToast, showSuccessToast } from 'vant';

import { scenicSpotMap } from '@/utils/dataMap/scenicSpot';

import { ref, onBeforeMount, watch, getCurrentInstance } from 'vue';

import { getTodayScenicData, getUserLotteryInfo, userPunchIn, getUserPunchInLogs } from '@/services';

import { useRouter } from 'vue-router';

const router = useRouter();

const showInfoModal = ref(false)
const showPunchInModal = ref(false)
const showPunchInCard = ref(false)
const currentScenicSpotId = ref(0)
const currentScenicSpot = ref()

const lotteryEnable = ref(false)

const instance = getCurrentInstance()

const cardImgMap = {
  1: Card1,
  2: Card2,
  3: Card3,
  4: Card4,
  5: Card5,
  6: Card6,
  7: Card7,
  8: Card8,
  9: Card9,
  10: Card10,
  11: Card11,
  12: Card12,
}

const scenicSpotList = ref([])

const openInfoModal = () => {
  showInfoModal.value = true
}

const closeInfoModal = () => {
  showInfoModal.value = false
}

const openLotteryModal = () => {
  if(!lotteryEnable.value){
    showToast('您未获得抽奖资格')
    return
  }
  router.push('/lottery')
}

const goHome = () => {
  router.push('/')
}

const openPunchInModal = (item) => {
  if(!item.status){
    showToast({
      message: '该景点今日未开放',
      position: 'top',
    });
    return
  }
  currentScenicSpotId.value = item.id
  currentScenicSpot.value = item
  showPunchInModal.value = true
}

const closePunchInModal = () => {
  showPunchInModal.value = false
}

const handlePunchIn = async () => {
  const res = await userPunchIn(currentScenicSpotId.value)
  showSuccessToast(res.message || '打卡成功')
  showPunchInCard.value = true;
  getLotteryInfo()
  await handleGetUserPunchInLogs()
}

const getTodayList = async () => {
  const data = await getTodayScenicData()
  const activeScenicIds = data.map(i => i.id)
  scenicSpotList.value.forEach(i => {
    if(activeScenicIds.includes(i.id)){
      i.status = 1
    }
  })
}

const saveCardToLocal = () => {
  // let u = navigator.userAgent
  // const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  // const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  // console.log(999, isAndroid, isIOS)
  // console.log(9998, window.hitumedia_android_js)
  // const name = 'test'
  // if(isAndroid){
  //   window.hitumedia_android_js[name](imgUrl);
  // }else if(isIOS){
  //   window.webkit.messageHandlers[name].postMessage(imgUrl);
  // }
  const url = cardImgMap[currentScenicSpotId.value]
  var a =document.createElement('a');
  a.href=url;
  document.body.appendChild(a);
  a.style.display ='none';
  a.download ='明信片';
  a.click();
}

const getLotteryInfo = async () => {
  const { enable } = await getUserLotteryInfo()
  lotteryEnable.value = enable
}

const handleGetUserPunchInLogs = async () => {
  const data = await getUserPunchInLogs()
  const successSid = data.map(i => i.scenic_spot_id)
  scenicSpotList.value.forEach(i => {
    if(successSid.includes(i.id)){
      i.status = 2
    }
  })
}

const punchInIconMap = ref({
  0: PunchInDisable,
  1: PunchInEnable,
  2: PunchInSuccess,
})

watch(() => showPunchInModal.value, (v) => {
  setTimeout(() => {
    showPunchInCard.value = false
  }, 500)
})

onBeforeMount(async () => {
  for (let i = 1; i<=12; i++){
    scenicSpotList.value.push({
      id: i,
      status: 0
    })
  }
  await getTodayList()
  getLotteryInfo()
  await handleGetUserPunchInLogs()
})

</script>

<template>
  <div class="bg">
    <van-image :block="true" :src="imageMap1"/>
    <van-image :block="true" :src="imageMap2"/>
    <van-image :block="true" :src="imageMap3"/>
    <van-image :block="true" :src="imageMap4"/>
    <div class="container">
      <div class="dv-action">
        <van-image width="90" :src="InfoBtn" @click="openInfoModal"/>
        <van-image width="90" :src="LotteryBtn" @click="openLotteryModal"/>
        <van-image width="90" :src="GoHomeBtn" @click="goHome"/>
      </div>
      <van-image
        v-for="item in scenicSpotList"
        :class="`punchInIcon${item.id}`"
        width="9vw"
        :src="punchInIconMap[item.status]"
        @click="openPunchInModal(item)"
      />
    </div>
  </div>
  <van-popup v-model:show="showInfoModal" >
    <div class="info-modal">
      <van-image width="60" class="info-modal-back" :src="InfoModalBack" @click="closeInfoModal"/>
    </div>
  </van-popup>
  {{ currentScenicSpotId }}
  <van-popup v-model:show="showPunchInModal" >
    <div v-if="!showPunchInCard" class="punch-in-modal" :class="`punch-in-modal-${currentScenicSpotId}`">
      <div class="intro">
        {{ scenicSpotMap[currentScenicSpotId].intro }}
      </div>
      <van-image v-if="currentScenicSpot.status === 1" width="30vw" class="punch-in-modal-btn" :src="PunchInBtn" @click="handlePunchIn"/>
<!--      <van-image width="30vw" class="punch-in-modal-btn" :src="PunchInBtn" @click="handlePunchIn"/>-->
    </div>
    <div v-else>
      <van-image class="card-save-btn" width="15vw" :src="CardSaveBtn" @click="saveCardToLocal" style="margin-right: 10px"/>
      <van-image class="card-lottery-btn" width="15vw" :src="PunchInModalLottery" @click="openLotteryModal"/>
      <van-image class="card-back-btn" width="15vw" :src="CardBack" @click="closePunchInModal"/>
      <van-image class="punch-in-modal-card" :src="cardImgMap[currentScenicSpotId]"/>
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
    width: 90px;
    right: 10px;
    top: 40px;
  }
}
.info-modal{
  width: 90vw;
  height: 500px;
  background: url("@/assets/images/scenicSpot/info-modal.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .info-modal-back{
    position: absolute;
    bottom: 5%;
    right: 9%;
  }
}
.punchInIcon1{
  position: absolute;
  top: 81vw;
  right: 15vw;
}
.punchInIcon2{
  position: absolute;
  top: 130vw;
  left: 29vw;
}
.punchInIcon3{
  position: absolute;
  top: 178vw;
  right: 35vw;
}
.punchInIcon4{
  position: absolute;
  top: 246vw;
  right: 35vw;
}
.punchInIcon5{
  position: absolute;
  top: 317vw;
  right: 40vw;
}
.punchInIcon6{
  position: absolute;
  top: 360vw;
  left: 23vw;
}
.punchInIcon7{
  position: absolute;
  top: 414vw;
  right: 40vw;
}
.punchInIcon8{
  position: absolute;
  top: 557vw;
  right: 47vw;
}
.punchInIcon9{
  position: absolute;
  top: 617vw;
  right: 38vw;
}
.punchInIcon10{
  position: absolute;
  top: 703vw;
  left: 34vw;
}
.punchInIcon11{
  position: absolute;
  top: 773vw;
  right: 34vw;
}
.punchInIcon12{
  position: absolute;
  top: 853vw;
  left: 34vw;
}
.punch-in-modal{
  width: 90vw;
  position: relative;
  .punch-in-modal-btn{
    position: absolute;
    bottom: 3%;
    left: 32%;
  }
  .punch-in-modal-back{
    position: absolute;
    bottom: 5%;
    right: 9%;
  }
  .intro{
    padding: 240px 30px 0 30px;
    font-size: 12px;
  }
  .punch-in-modal-card{
    position: absolute;
    top: 0;
    left: 0;
  }
}
.card-back-btn{
  position: absolute;
  top: 8vw;
  z-index: 1;
  right: 5vw;
}
.card-lottery-btn{
  position: absolute;
  top: 16vw;
  z-index: 1;
  right: 5vw;
}
.card-save-btn{
  position: absolute;
  bottom: 6vw;
  z-index: 1;
  left: 5vw;
}

.punch-in-modal-1{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-2{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-2.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-3{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-3.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-4{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-4.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-5{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-5.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-6{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-6.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-7{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-7.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-8{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-8.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-9{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-9.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-10{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-10.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-11{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-11.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-12{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-12.png") no-repeat;
  background-size: 100% 100%;
}

</style>
