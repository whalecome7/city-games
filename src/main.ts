import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import {
  Button,
  Field,
  Toast,
  RadioGroup,
  Radio,
  Image as VanImage,
  Popup,
  ConfigProvider
} from 'vant';
import 'vant/lib/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button);
app.use(Field);
app.use(Toast);
app.use(RadioGroup);
app.use(Radio);
app.use(VanImage);
app.use(Popup);
app.use(ConfigProvider);

app.mount('#app')
