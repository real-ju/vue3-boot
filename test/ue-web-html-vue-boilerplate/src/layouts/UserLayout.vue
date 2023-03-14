<template>
  <div id="userLayout" class="user-layout-wrapper">
    <div class="user-layout-wrapper-content">
      <a-row class="user-layout-content">
        <a-row class="login-page" type="flex">
          <a-row class="login-page-box">
            <a-col :span="0" :lg="10" class="page-left">
              <!-- <img src="/images/banner2.png" class="page-left-img" /> -->
              <div class="page-left-description">
                <img :src="logo" class="page-left-description-logo" alt="logo" />
                <div class="page-left-description-content">Welcome To,</div>
                <h1 class="page-left-description-title">{{ title }}</h1>
              </div>
            </a-col>
            <a-col flex="410px" class="page-right">
              <div class="login-box">
                <div class="header">
                  <div v-show="!!logo" class="header-logo">
                    <img :src="logo" />
                  </div>
                  <div class="header-title">{{ title }}</div>
                </div>
                <router-view />
              </div>
            </a-col>
          </a-row>
        </a-row>
        <a-row class="footer">
          <div class="copyright">Copyright&nbsp;&copy;&nbsp;{{ year }}&nbsp;重庆超体科技有限公司</div>
        </a-row>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useCurrentInstance from '@/utils/useCurrentInstance';
  import defaultSettings from '@/config/defaultSettings';

  const { proxy } = useCurrentInstance();

  const year = ref<number>(proxy.$moment().subtract(3, 'months').format('YYYY'));
  const logo = ref<string>(defaultSettings.logo);
  const title = ref(<string>defaultSettings.title);
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;
    min-height: 550px;
    min-width: 300px;
    .user-layout-wrapper-content {
      width: 100%;
      height: 100%;
      background-image: url('/images/banner4.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      .user-layout-content {
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: center;
        flex-wrap: nowrap;
        .login-page {
          width: 100%;
          flex: 1;
          align-items: center;
          .login-page-box {
            width: 100%;
            align-items: center;
            justify-content: center;
            .page-left {
              padding-right: 5%;
              // background: url('/images/banner2.png') no-repeat center;
              .page-left-img {
                max-height: 100%;
                width: 100%;
              }
              .page-left-description {
                height: 410px;
                .page-left-description-logo {
                  width: 40px;
                }
                .page-left-description-title {
                  color: #fff;
                  font-size: 26px;
                  font-weight: bold;
                }
                .page-left-description-content {
                  color: #fff;
                  font-size: 30px;
                  font-weight: bold;
                }
              }
            }
            .page-right {
              .login-box {
                padding: 30px 40px;
                border: solid #ccc 0px;
                border-radius: 10px;
                box-shadow: 0px 6px 12px 0px rgba(7, 17, 27, 0.06);
                // color: #666666;
                // background-color: #fff;
                background-color: rgba(255, 255, 255, 0.1);
                color: #fff;
                // background-image: url('/images/login-banner.png');
                // background-repeat: no-repeat;
                // background-position: center center;
                // background-size: 100% 100%;
                .header {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 4px 0 10px;
                  .header-logo {
                    width: 44px;
                    > img {
                      width: 100%;
                    }
                  }
                  .header-title {
                    font-size: 26px;
                    color: #fff;
                    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
                    font-weight: 600;
                  }
                }
              }
            }
          }
        }
        .footer {
          height: 80px;
          line-height: 80px;
          .copyright {
            // color: rgba(0, 0, 0, 0.45);
            color: #eee;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
