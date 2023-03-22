<template>
  <div class="user-layout-login form-box-key-enter">
    <a-form class="form-box-key-enter" :model="loginForm" :rules="loginRules" @finish="handleSubmit">
      <a-form-item name="username">
        <a-input v-model:value="loginForm.username" size="large" placeholder="账号">
          <template #prefix>
            <svg-icon name="svg-zhanghao" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password v-model:value="loginForm.password" size="large" placeholder="密码">
          <template #prefix>
            <svg-icon name="svg-password" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </template>
        </a-input-password>
      </a-form-item>
      <!-- <a-form-item name="password">
        <a-input
          v-model:value="loginForm.password"
          size="large"
          placeholder="密码"
          autocomplete="off"
          :class="passwordStatus ? '' : 'login-password-invisible'"
        >
          <template #prefix>
            <svg-icon name="svg-password" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </template>
          <template #suffix>
            <ant-icon
              class="login-password-status"
              :type="passwordStatus ? 'EyeOutlined' : 'EyeInvisibleOutlined'"
              @click="passwordStatus = !passwordStatus"
            />
          </template>
        </a-input>
      </a-form-item> -->
      <a-row type="flex">
        <div style="flex: 1">
          <a-form-item name="captchaCode">
            <a-input v-model:value="loginForm.captchaCode" size="large" placeholder="验证码">
              <template #prefix>
                <svg-icon name="svg-yanzhengma" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </a-input>
          </a-form-item>
        </div>
        <div>
          <a-spin :spinning="captchaData.isLoadingCaptcha">
            <img
              id="vcode"
              :src="'data:image/jpg;base64,' + captchaData.captchaImage"
              :style="{ height: '40px', cursor: 'pointer' }"
              @click="onChangeCaptcha"
            />
          </a-spin>
        </div>
      </a-row>
      <a-form-item>
        <a-checkbox v-model:checked="loginForm.remember" style="color: #fff">自动登录</a-checkbox>
      </a-form-item>
      <a-form-item class="login-btn">
        <a-button block size="large" :disabled="loginDisabled" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts" name="UserLogin">
  import type { Rule } from 'ant-design-vue/es/form';
  import JSEncrypt from 'jsencrypt';
  import type { Result } from '#/axios';
  import { getRsaPublicKey, getCaptcha } from '@/api/login';
  import { LoginModel } from '@/api/model/loginModel';
  import useCurrentInstance from '@/utils/useCurrentInstance';
  import { timeFix } from '@/utils/util';
  import { useUserStore } from '@/store/modules/user';
  import { useGlobalStore } from '@/store/modules/global';

  interface FormState {
    username: string;
    password: string;
    captchaCode?: string;
    remember: boolean;
  }

  interface CaptchaState {
    // 加载验证码
    isLoadingCaptcha: boolean;
    // 验证码id
    captchaId: string;
    // 验证码图片
    captchaImage: string;
  }

  const { proxy } = useCurrentInstance();
  const router = useRouter();
  const userStore = useUserStore();
  const globalStore = useGlobalStore();

  // RSA 加密公钥
  const rsaPublicKey = ref<string>('');
  // 防止重复点击
  const loginDisabled = ref<boolean>(false);
  // // 密码显示样式
  // const passwordStatus = ref<boolean>(false);

  const loginForm = reactive<FormState>({
    username: '',
    password: '',
    captchaCode: '',
    remember: true
  });
  const loginRules: Record<string, Rule[]> = {
    username: [{ required: true, whitespace: true, message: '请输入帐户名' }],
    password: [{ required: true, whitespace: true, message: '请输入密码' }],
    captchaCode: [{ required: true, whitespace: true, message: '请输入验证码' }]
  };
  const captchaData = reactive<CaptchaState>({
    // 加载验证码
    isLoadingCaptcha: false,
    // 验证码id
    captchaId: '',
    // 验证码图片
    captchaImage: ''
  });
  const requestFailed = (err: Result) => {
    proxy.$notification.error({
      message: '错误',
      description: err.message || '请求出现错误，请稍后再试',
      duration: 4
    });
  };
  // 刷新验证码
  const onChangeCaptcha = () => {
    if (loginDisabled.value) {
      proxy.$message.info('登录中，请稍后...');
    } else if (captchaData.isLoadingCaptcha) {
      proxy.$message.info('验证码加载中，请稍后...');
    } else {
      captchaData.isLoadingCaptcha = true;
      getCaptcha()
        .then(res => {
          if (+res.code === 0) {
            const data = res.data;
            captchaData.isLoadingCaptcha = false;
            captchaData.captchaId = data.captchaId || '';
            captchaData.captchaImage = data.image || '';
          }
        })
        .catch(() => {
          captchaData.isLoadingCaptcha = false;
        });
    }
  };
  const loginSuccess = (res: Result) => {
    router.push({ path: '/home' });
    // 延迟 1 秒显示欢迎信息
    setTimeout(() => {
      if (+res.data.warnCode === 110002) {
        const key = `open${Date.now()}`;
        proxy.$notification.warning({
          message: '提示',
          description: res.message,
          duration: 0,
          btn: () => {
            return h(
              'a-button',
              {
                props: {
                  type: 'primary',
                  size: 'middle'
                },
                on: {
                  click: () => {
                    proxy.$notification.close(key);
                    proxy.$notification.destroy();
                    // router.push({ path: '/account/settings/security' });
                  }
                }
              },
              '更新密码'
            );
          }
        });
      } else {
        proxy.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        });
      }
    }, 1000);
  };
  const handleSubmit = (values: FormState) => {
    loginDisabled.value = true;
    const loginParams: LoginModel = {
      username: '',
      password: '',
      grant_type: 'password'
    };
    loginParams.username = values.username;
    loginParams.password = values.password;
    // RSA 方式加密
    if (rsaPublicKey.value) {
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(rsaPublicKey.value);
      const ciphertext = encrypt.encrypt(loginParams.password);
      loginParams.password = 'encrypt:' + ciphertext;
    }
    if (captchaData.captchaId) {
      loginParams.captchaId = captchaData.captchaId;
      loginParams.captchaCode = values.captchaCode;
    }
    userStore
      .login(loginParams)
      .then(res => {
        captchaData.isLoadingCaptcha = false;
        if (+res.code === 0 || +res.code === 110002) {
          globalStore.setPagePanes([]);
          globalStore.setPageActiveKey('');
          loginSuccess(res);
          loginDisabled.value = false;
        } else {
          loginDisabled.value = false;
          if (+res.code === 70) {
            const data = res.data;
            captchaData.captchaId = data.captchaId || '';
            captchaData.captchaImage = data.image || '';
          } else {
            onChangeCaptcha();
          }
          requestFailed(res);
        }
      })
      .catch(err => requestFailed(err))
      .finally(() => {
        loginDisabled.value = false;
      });
  };

  onMounted(() => {
    // RSA 加密公钥
    getRsaPublicKey()
      .then(res => {
        if (res && +res.code === 0) {
          rsaPublicKey.value = res.data.publicKey || '';
        }
      })
      .catch(() => {
        rsaPublicKey.value = '';
      });
    onChangeCaptcha();
  });
</script>

<style lang="less" scoped>
  // .login-password-invisible {
  //   :deep(.ant-input) {
  //     -webkit-text-security: disc !important;
  //   }
  // }
  // .login-password-status {
  //   color: rgba(0, 0, 0, 0.25);
  //   &:hover {
  //     color: rgba(0, 0, 0, 0.85);
  //   }
  // }
</style>
