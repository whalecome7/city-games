<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, watch, onBeforeMount } from 'vue'
import * as _ from 'lodash'

import LogBtnImg from "@/assets/images/lottery/log-btn.png"
import BackBtnImg from "@/assets/images/lottery/back-btn.png"
import LogBackBtnImg from "@/assets/images/lottery/log-back-btn.png"

import Prize1 from "@/assets/images/lottery/prize1.png"
import Prize2 from "@/assets/images/lottery/prize2.png"
import Prize3 from "@/assets/images/lottery/prize3.png"
import Prize4 from "@/assets/images/lottery/prize4.png"

import { getUserLotteryInfo, openUserLottery, getPrizeInfo } from "@/services";

const router = useRouter()

const goBack = () => {
  router.back()
}

const prizeMap = {
  1: Prize1,
  2: Prize2,
  3: Prize3,
  4: Prize4,
}

const freeze = ref(false)
const rolling = ref(false)
const wheelDeg = ref(0)
const prizeNumber = ref(8)
const prizeListOrigin = ref([])

const prizeList = computed(() => prizeListOrigin.value.slice(0, prizeNumber.value))

const prize = ref()
const showMakePrizeModal = ref(false)
const showMakePrizeNoCountModal = ref(false)
const makePrizeInfo = ref({})

const onClickRotate = async () => {
  if (rolling.value) {
    return;
  }
  const { lottery_id, lottery_info, status } = await openUserLottery();
  // const { lottery_id, lottery_info, status } = {lottery_id: 1, lottery_info: {id: 1, name:'特等奖'}}
  if(status){
    showMakePrizeNoCountModal.value = true
    return
  }
  makePrizeInfo.value = lottery_info
  getLotteryInfo(true);
  rolling.value = true;
  let index
  if(lottery_id){
    prizeList.value.map((v, k) => {
      if(v.id === lottery_id){
        index = k;
      }
    })
  }else{
    const emptyArr = [];
    prizeList.value.map((v, k) => {
      if(v.id === 0){
        emptyArr.push({index: k})
      }
    })
    const emptyRandom = _.random(0, emptyArr.length - 1);
    index = emptyArr[emptyRandom].index
  }
  const random = index

  console.log(random)

  wheelDeg.value =
    wheelDeg.value -
    wheelDeg.value % 360 +
    6 * 360 +
    (360 - 360 / prizeList.value.length * random);
  setTimeout(() => {
    rolling.value = false
    showMakePrizeModal.value = true
  }, 4500);
}

watch(() => prizeNumber.value, (v) => {
  freeze.value = true
  wheelDeg.value = 0

  setTimeout(() => {
    freeze.value = false
  }, 0)
})

const remainCount = ref(0)
const lotteryConfig = ref([])

const getLotteryInfo = async (onlyUpdateCount = false) => {
  const { remain_count, config } = await getUserLotteryInfo()
  remainCount.value = remain_count
  if(onlyUpdateCount){
    return
  }
  lotteryConfig.value = config
  const emptyPrize = new Array(prizeNumber.value - config.length).fill({
    id: 0,
    name: '谢谢'
  })
  config.forEach(i => {
    prizeListOrigin.value.push(i)
    prizeListOrigin.value.push({
      id: 0,
      name: '谢谢'
    })
  })
  // prizeListOrigin.value = _.shuffle([...config, ...emptyPrize])
}

const showLogs = ref(false)
const prizeInfo = ref()
const openLogsModal = async () => {
  const data = await getPrizeInfo();
  prizeInfo.value = data;
  showLogs.value = true
}

const closeLogsModal = () => {
  showLogs.value = false
}

onBeforeMount(() => {
  getLotteryInfo()
})

</script>
<template>
  <div class="bg">
    <van-image class="back-btn" width="80px" :src="BackBtnImg" @click="goBack"/>
    <div class="wheel-wrapper">
      <div
        class="wheel-pointer"
        @click="onClickRotate"
      >
<!--        Start-->
      </div>
      <div
        class="wheel-bg"
        :class="{freeze: freeze}"
        :style="`transform: rotate(${wheelDeg}deg)`"
      >
        <div class="prize-list">
          <div
            class="prize-item-wrapper"
            v-for="(item,index) in prizeList"
            :key="index"
          >
            <div
              class="prize-item"
              :style="`transform: rotate(${(360/ prizeList.length) * index}deg)`"
            >
              <div class="prize-name">
<!--                {{ item.name }}-->
              </div>
              <!--            <div class="prize-icon">-->
              <!--              <img :src="item.icon">-->
              <!--            </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="remain-count-btn">
        今天还剩{{ remainCount }}次抽奖机会
      </div>
      <van-image width="150px" :src="LogBtnImg" @click="openLogsModal"/>
    </div>
    <van-popup v-model:show="showLogs">
      <div :class="prizeInfo ? 'log-modal' : 'log-empty-modal'">
        <div class="prize-text" v-if="prizeInfo">
          <div>奖品：{{ prizeInfo.info.name }}</div>
          <div>时间：{{ prizeInfo.time }}</div>
        </div>
        <van-image class="log-back-btn" width="80px" :src="LogBackBtnImg" @click="closeLogsModal"/>
      </div>
    </van-popup>
    <van-popup v-model:show="showMakePrizeModal">
      <div :class="makePrizeInfo ? 'make-prize-modal' : 'empty-prize-modal'">
        <van-image v-if="makePrizeInfo" class="make-prize-img" width="40vw" :src="prizeMap[makePrizeInfo.id]"/>
        <div v-if="makePrizeInfo" class="make-prize-text">
          恭喜您获得 <span class="prize-name-span">{{ makePrizeInfo.name }}</span>
        </div>
      </div>
    </van-popup>
    <van-popup v-model:show="showMakePrizeNoCountModal">
      <div class="prize-no-count-modal"></div>
    </van-popup>
  </div>

</template>

<style scoped lang="scss">
.wheel-wrapper {
  width: 90vw;
  height: 90vw;
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wheel-pointer {
  width: 24vw;
  height: 30vw;
  border-radius: 1000px;
  //background: yellow;
  background: url("@/assets/images/lottery/wheel-center.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 46%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  z-index: 10;
}
.wheel-bg {
  position: relative;

  width: 100%;
  height: 100%;
  border-radius: 1000px;
  overflow: hidden;
  transition: transform 4s ease-in-out;
  //background: #7EEF97;

  &.freeze {
    transition: none;
    background: red;
  }
}
.wheel-bg:before {

  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  //top: -50%;
  //left: -50%;
  z-index: -1;
  background: url("@/assets/images/lottery/wheel.png") no-repeat;
  background-size: 100% 100%;
  -webkit-transform: rotate(25deg);
  transform: rotate(25deg);
}


.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.prize-item-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
}

.prize-item {
  width: 100%;
  height: 100%;
  transform-origin: bottom;

  .prize-name {
    padding: 16px 0;
  }

  .prize-icon {}
}

.bg{
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  margin: 0;
  background: url("@/assets/images/lottery/bg.jpg") no-repeat;
  background-size:100% 100%;
  background-attachment:fixed;
  position: relative;
  .back-btn{
    position: absolute;
    top: 40px;
    right: 20px;
  }
}
.footer{
  position: absolute;
  bottom: 40px;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: space-around;
  .remain-count-btn{
    width: 190px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    font-weight: 500;
    text-align: center;
    font-size: 18px;
  }
}
.log-modal{
  width: 80vw;
  height: 90vw;
  position: relative;
  background: url("@/assets/images/lottery/log-bg.png") no-repeat;
  background-size: 100% 100%;
}
.log-empty-modal{
  width: 80vw;
  height: 90vw;
  position: relative;
  background: url("@/assets/images/lottery/log-empty-bg.png") no-repeat;
  background-size: 100% 100%;
}
.log-back-btn{
  position: absolute;
  bottom: 40px;
  right: 20px;
}
.prize-text{
  position: absolute;
  padding: 80px 30px 0 30px;
}
.make-prize-modal{
  width: 80vw;
  height: 90vw;
  position: relative;
  background: url("@/assets/images/lottery/prize-bg.png") no-repeat;
  background-size: 100% 100%;
  .make-prize-text{
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 23vw;
  }
  .make-prize-img{
    position: absolute;
    top: 22vw;
    left: 20vw;
  }
}
.empty-prize-modal{
  width: 80vw;
  height: 90vw;
  position: relative;
  background: url("@/assets/images/lottery/prize-empty-bg.png") no-repeat;
  background-size: 100% 100%;
}
.prize-no-count-modal{
  width: 80vw;
  height: 90vw;
  position: relative;
  background: url("@/assets/images/lottery/prize-no-count.png") no-repeat;
  background-size: 100% 100%;
}
.prize-name-span{
  color: red;
  font-size: 24px;
  font-weight: 500;
  margin-left: 12px;
}
</style>
