<script setup>
import { ref, onBeforeMount } from 'vue';
import { userLogin, updateResidentType, me } from '@/services';
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();

const tel = ref();
const residentType = ref(1);

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

const jump = async () => {
  if(pageState.value === 2){
    await updateResidentType(residentType.value);
  }
  router.push('/scenic-spots');
}

onBeforeMount(async () => {
  if(userStore.token){
    const { resident_type } = await me()
    if(resident_type){
      router.push('/scenic-spots');
    }
  }
})

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
            <van-field v-model="tel" type="tel" placeholder="请输入手机号" />
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
          <div class="dv-radio">
            <van-radio-group v-model="residentType" direction="horizontal">
              <van-radio :name="1"  icon-size="20px" checked-color="#E68C3C">福州本地人</van-radio>
              <van-radio :name="2"  icon-size="20px" checked-color="#E68C3C">福州新市民</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="dv-flex">
          <div class="dv-jump" @click="jump">
            开始游记
          </div>
          <div class="go-back" @click="handleBack">
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
.dv-jump{
  text-align: center;
  background: url(./src/assets/images/login/start-btn.png) no-repeat;
  background-size: 100%;
  line-height: 37px;
  height: 40px;
  //margin: 20px 30px;
  color: white;
  font-size: 20px;
  font-weight: 500;
  width: 120px;
}
.go-back{
  text-align: center;
  background: url(./src/assets/images/login/back-btn.png) no-repeat;
  background-size: 100%;
  line-height: 37px;
  height: 40px;
  //margin: 20px 30px;
  color: white;
  font-size: 20px;
  font-weight: 500;
  width: 120px;
}
.tel-input{
  margin: 20px 30px;
  ::v-deep .van-field{
    border-radius: 40px;
    border: 1px solid rgb(137, 202, 184);
  }
}
.dv-radio{
  margin: 30px 30px 0 30px;
}
.dv-flex{
  display: flex;
  margin: 35px 30px 0 30px;
  justify-content: space-between;
}
</style>
