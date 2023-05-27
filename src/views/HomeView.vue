<script setup>
import { ref } from 'vue';
import { userLogin } from '@/services';
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const tel = ref();

const pageState = ref(1);

const login = async () => {
  const {resident_type, token} = await userLogin(tel.value)
  userStore.updateToken(token);
  if(!resident_type){
    pageState.value = 2
  }
}

const handleBack = () => {
  pageState.value = 1
}



</script>

<template>
  <div class="bg">
    <div class="login-container">
      <div v-if="pageState === 1">
        <div class="title">
          · 登 录 ·
        </div>
        <div class="row">
          <div class="tel-input">
            <van-field v-model="tel" type="tel"  placeholder="请输入手机号" />
          </div>
        </div>
        <div class="row">
          <div class="dv-start" @click="login">
            开始游记
          </div>
        </div>
      </div>
      <div v-else>
        <div class="title">
          · 身份认证 ·
        </div>
        <div class="row">
          <div class="tel-input">
            <van-field v-model="tel" type="tel"  placeholder="请输入手机号" />
          </div>
        </div>
        <div class="row">
          <div class="dv-start" @click="login">
            开始游记
          </div>
          <div @click="handleBack">
            返回
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg{
  width: 100vw;
  height: 100vh;
  margin: 0;
  background: url("./src/assets/images/login/home.jpg") no-repeat;
  background-size:100% 100%;
  background-attachment:fixed;
  position: relative;
  .login-container{
    position: absolute;
    left: 10%;
    top: 30%;
    width: 80%;
    height: 28%;
    background: linear-gradient(white, rgb(234,249,252));
    border-radius: 10px;
    box-shadow: 2px 3px 1px 0 rgb(120, 199, 226);
    .title{
      color: rgb(98, 190, 219);
      width: 100%;
      text-align: center;
      margin-top: 24px;
      font-size: 24px;
      font-weight: 500;
    }
    .row{
      width: 100%;
      text-align: center;
    }
  }
}
.dv-start{
  text-align: center;
  background: url(./src/assets/images/login/start-long-btn.png) no-repeat;
  background-size: 100%;
  line-height: 37px;
  height: 40px;
  margin: 20px 30px;
  color: white;
  font-size: 20px;
  font-weight: 500;
}
.tel-input{
  margin: 20px 30px;
  ::v-deep .van-field{
    border-radius: 40px;
    border: 1px solid rgb(137, 202, 184);
  }
}
</style>
