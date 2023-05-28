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
import Card2 from '@/assets/images/scenicSpot/card-1.jpg';
import Card3 from '@/assets/images/scenicSpot/card-1.jpg';
import Card4 from '@/assets/images/scenicSpot/card-1.jpg';
import Card5 from '@/assets/images/scenicSpot/card-1.jpg';
import Card6 from '@/assets/images/scenicSpot/card-1.jpg';
import Card7 from '@/assets/images/scenicSpot/card-1.jpg';
import Card8 from '@/assets/images/scenicSpot/card-1.jpg';
import Card9 from '@/assets/images/scenicSpot/card-1.jpg';
import Card10 from '@/assets/images/scenicSpot/card-1.jpg';
import Card11 from '@/assets/images/scenicSpot/card-1.jpg';
import Card12 from '@/assets/images/scenicSpot/card-1.jpg';

import { showToast, showSuccessToast } from 'vant';

import { scenicSpotMap } from '@/utils/dataMap/scenicSpot';

import { ref, onBeforeMount, watch } from 'vue';

import { getTodayScenicData, getUserLotteryInfo, userPunchIn } from '@/services';

import { useRouter } from 'vue-router';

const router = useRouter();

const showInfoModal = ref(false)
const showPunchInModal = ref(false)
const showPunchInCard = ref(false)
const currentScenicSpotId = ref(0)

const activeScenicSpotIds = ref([])
const punchInSuccessScenicSpotIds = ref([])

const lotteryEnable = ref(false)

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

const openPunchInModal = (id) => {
  if(!activeScenicSpotIds.value.includes(id)){
    showToast({
      message: '该景点今日未开放',
      position: 'top',
    });
    return
  }
  currentScenicSpotId.value = id
  showPunchInModal.value = true
}

const closePunchInModal = () => {
  showPunchInModal.value = false
}

const handlePunchIn = async () => {
  const res = await userPunchIn(currentScenicSpotId.value)
  showSuccessToast(res.message || '打卡成功')
  showPunchInCard.value = true;
}

const getTodayList = async () => {
  const data = await getTodayScenicData()
  activeScenicSpotIds.value = data.map(i => i.id)
  punchInSuccessScenicSpotIds.value = data.filter(i => i.hasPunchIn).map(i => i.id)
}

const saveCardToLocal = () => {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var image = new Image();
  image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;
    link.click();
  }
  console.log('保存图片', cardImgMap[currentScenicSpotId.value])
  image.src = cardImgMap[currentScenicSpotId.value];
}

const getLotteryInfo = async () => {
  const { enable } = await getUserLotteryInfo()
  lotteryEnable.value = enable
}

watch(() => showPunchInModal.value, (v) => {
  setTimeout(() => {
    showPunchInCard.value = false
  }, 500)
})

onBeforeMount(() => {
  getTodayList()
  getLotteryInfo()
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
        v-for="index in 12"
        :class="`punchInIcon${index}`"
        width="9vw"
        :src="activeScenicSpotIds.includes(index) ? PunchInEnable : PunchInDisable"
        @click="openPunchInModal(index)"
      />
    </div>
  </div>
  <van-popup v-model:show="showInfoModal" >
    <div class="info-modal">
      <van-image width="60" class="info-modal-back" :src="InfoModalBack" @click="closeInfoModal"/>
    </div>
  </van-popup>
  <van-popup v-model:show="showPunchInModal" >
    <div v-if="!showPunchInCard" class="punch-in-modal" :class="`punch-in-modal-${currentScenicSpotId}`">
      <div class="intro">
        {{ scenicSpotMap[currentScenicSpotId].intro }}
      </div>
      <van-image width="30vw" class="punch-in-modal-btn" :src="PunchInBtn" @click="handlePunchIn"/>
    </div>
    <div v-else>
      <div class="card-back-btn">
        <van-image width="15vw" :src="CardSaveBtn" @click="saveCardToLocal" style="margin-right: 10px"/>
        <van-image width="15vw" :src="CardBack" @click="closePunchInModal"/>
      </div>
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
  width: 80vw;
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
  width: 80vw;
  position: relative;
  .punch-in-modal-btn{
    position: absolute;
    bottom: 6%;
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

.punch-in-modal-1{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-2{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-3{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-4{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-5{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-6{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-7{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-8{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-9{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-10{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-11{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}
.punch-in-modal-12{
  height: 500px;
  background: url("@/assets/images/scenicSpot/punchIn-modal-1.png") no-repeat;
  background-size: 100% 100%;
}

</style>
