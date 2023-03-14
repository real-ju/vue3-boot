<template>
  <div>
    <a-drawer
      v-model:visible="visible"
      title="主题配置"
      width="320"
      placement="right"
      :bodyStyle="{ padding: 0 }"
      @close="onClose"
    >
      <div class="setting-drawer">
        <a-divider>导航栏模式</a-divider>
        <div class="setting-drawer-nav">
          <a-tooltip title="顶部菜单模式">
            <div class="setting-drawer-nav-top" @click="updateSetting('layout', 'top')">
              <ant-icon type="CheckOutlined" class="setting-drawer-nav-icon" v-show="settings.layout === 'top'" />
            </div>
          </a-tooltip>
          <a-tooltip title="左侧菜单模式">
            <div class="setting-drawer-nav-side" @click="updateSetting('layout', 'side')">
              <ant-icon type="CheckOutlined" class="setting-drawer-nav-icon" v-show="settings.layout === 'side'" />
            </div>
          </a-tooltip>
          <a-tooltip title="混合菜单模式">
            <div class="setting-drawer-nav-top setting-drawer-nav-side" @click="updateSetting('layout', 'mix')">
              <ant-icon
                type="CheckOutlined"
                class="setting-drawer-nav-icon"
                primary
                v-show="settings.layout === 'mix'"
              />
            </div>
          </a-tooltip>
        </div>
        <a-divider>系统主题</a-divider>
        <div>
          <div class="setting-drawer-theme">
            <a-tooltip :title="item.title" v-for="item in themeList" :key="item.color">
              <div
                class="setting-drawer-theme-item"
                :style="{ backgroundColor: item.color }"
                @click="updateSetting('primaryColor', item.color)"
              >
                <ant-icon
                  type="CheckOutlined"
                  class="setting-drawer-theme-icon"
                  v-show="settings.primaryColor === item.color"
                />
              </div>
            </a-tooltip>
          </div>
          <div style="text-align: center; padding-top: 6px">
            自定义主题：<input
              type="color"
              :value="settings.primaryColor"
              @input="e => selectColor('primaryColor', e)"
            />
          </div>
        </div>
        <a-divider>顶部栏主题</a-divider>
        <div>
          <div class="setting-drawer-theme">
            <a-tooltip :title="item.title" v-for="item in bgList" :key="item.color">
              <div
                class="setting-drawer-theme-item"
                :style="{ backgroundColor: item.color }"
                @click="updateSetting('topTheme', item.color)"
              >
                <ant-icon
                  type="CheckOutlined"
                  class="setting-drawer-theme-icon"
                  v-show="settings.topTheme === item.color"
                />
              </div>
            </a-tooltip>
          </div>
          <div style="text-align: center; padding-top: 6px">
            自定义主题：
            <input type="color" :value="settings.topTheme" @input="e => selectColor('topTheme', e)" />
          </div>
        </div>
        <a-divider>侧边栏主题</a-divider>
        <div>
          <div class="setting-drawer-theme">
            <a-tooltip :title="item.title" v-for="item in bgList" :key="item.color">
              <div
                class="setting-drawer-theme-item"
                :style="{ backgroundColor: item.color }"
                @click="updateSetting('sideTheme', item.color)"
              >
                <ant-icon
                  type="CheckOutlined"
                  class="setting-drawer-theme-icon"
                  v-show="settings.sideTheme === item.color"
                />
              </div>
            </a-tooltip>
          </div>
          <div style="text-align: center; padding-top: 6px">
            自定义主题：
            <input type="color" :value="settings.sideTheme" @input="e => selectColor('sideTheme', e)" />
          </div>
        </div>
        <a-divider>界面功能</a-divider>
        <div>
          <div class="setting-drawer-show">
            <span>菜单展开宽度</span>
            <a-input-number
              v-model:value="settings.siderWidth"
              :min="60"
              :step="10"
              :precision="0"
              :formatter="(value: number | string) => `${value}px`"
              :parser="(value: string) => value.replace('px', '')"
            />
          </div>
          <div class="setting-drawer-show">
            <span>菜单收起宽度</span>
            <a-input-number
              v-model:value="settings.collapsedWidth"
              :min="0"
              :step="10"
              :precision="0"
              :formatter="(value: number | string) => `${value}px`"
              :parser="(value: string) => value.replace('px', '')"
            />
          </div>
        </div>
        <a-divider>界面显示</a-divider>
        <div>
          <div class="setting-drawer-show">
            <span>面包屑</span>
            <a-switch
              :checked="settings.showBreadcrumb"
              checked-children="开"
              un-checked-children="关"
              @click="(checked: boolean) => updateSetting('showBreadcrumb', checked)"
            />
          </div>
          <div class="setting-drawer-show">
            <span>页签</span>
            <a-switch
              :checked="settings.showTabs"
              checked-children="开"
              un-checked-children="关"
              @click="(checked: boolean) => updateSetting('showTabs', checked)"
            />
          </div>
          <div class="setting-drawer-show">
            <span>色弱模式</span>
            <a-switch
              :checked="settings.colorWeak"
              checked-children="开"
              un-checked-children="关"
              @click="(checked: boolean) => updateSetting('colorWeak', checked)"
            />
          </div>
          <div class="setting-drawer-show">
            <span>灰色模式</span>
            <a-switch
              :checked="settings.grayMode"
              checked-children="开"
              un-checked-children="关"
              @click="(checked: boolean) => updateSetting('grayMode', checked)"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <a-alert type="warning" showIcon description="配置栏只用于预览，请拷贝后手动修改配置文件">
          <template #icon>
            <ant-icon type="NotificationOutlined" style="font-size: 14px; margin-right: 6px; line-height: inherit" />
          </template>
        </a-alert>
        <a-button block style="margin: 12px 0" @click="doCopy">
          <template #icon>
            <ant-icon type="CopyOutlined" />
          </template>
          拷贝
        </a-button>
        <a-button block @click="doReset">
          <template #icon>
            <ant-icon type="RedoOutlined" />
          </template>
          重置
        </a-button>
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts" name="SettingDrawer">
  import useClipboard from 'vue-clipboard3';
  import useCurrentInstance from '@/utils/useCurrentInstance';
  import defaultSettings from '@/config/defaultSettings';
  import { generate } from '@ant-design/colors';

  const { toClipboard } = useClipboard();
  const { proxy } = useCurrentInstance();

  const props = defineProps(['settings', 'showSettings']);

  const emit = defineEmits(['update:showSettings', 'close-settings', 'update-setting']);

  const themeList = [
    { title: '薄暮', color: '#f5222d' },
    { title: '火山', color: '#fa541c' },
    { title: '日暮', color: '#fa8c16' },
    { title: '极光绿', color: '#52c41a' },
    { title: '明青', color: '#13c2c2' },
    { title: '拂晓蓝', color: '#1677ff' },
    { title: '极客蓝', color: '#2f54eb' },
    { title: '酱紫', color: '#722ed1' }
  ];

  const bgList = [
    { title: '薄暮', color: '#ffccc7' },
    { title: '火山', color: '#ffd8bf' },
    { title: '日暮', color: '#ffe7ba' },
    { title: '极光绿', color: '#d9f7be' },
    { title: '明青', color: '#b5f5ec' },
    { title: '拂晓蓝', color: '#bae0ff' },
    { title: '极客蓝', color: '#d6e4ff' },
    { title: '酱紫', color: '#efdbff' }
  ];

  const visible = computed({
    get() {
      return props.showSettings;
    },
    set(value) {
      emit('update:showSettings', value);
    }
  });

  // 关闭弹窗
  const onClose = () => {
    emit('close-settings');
  };

  // 更新设置
  const updateSetting = (type: string, value: any) => {
    emit('update-setting', type, value);
  };

  // 选择主题
  const selectColor = (type: string, e: any) => {
    emit('update-setting', type, e.target.value);
  };

  // 复制
  const doCopy = () => {
    const topColors = generate(props.settings.topTheme);
    let topIndex = topColors.findIndex(x => x.toLowerCase() === props.settings.topTheme.toLowerCase());
    topIndex = topIndex < 1 ? 1 : topIndex;

    const sideColors = generate(props.settings.sideTheme);
    let sideIndex = sideColors.findIndex(x => x.toLowerCase() === props.settings.sideTheme.toLowerCase());
    sideIndex = sideIndex < 1 ? 1 : sideIndex;

    const text = `export default {
      // layout 的左上角 的 title
      title: '${props.settings.title}',
      // layout 的左上角 logo 的 url
      logo: '${props.settings.logo}',
      // 使用 IconFont 的图标配置
      iconfontUrl: '${props.settings.iconfontUrl}',
      // layout 的菜单模式，侧边菜单-side，顶部菜单-top，两种混合菜单-mix */
      layout: '${props.settings.layout}',
      // 系统主题
      primaryColor: '${props.settings.primaryColor}',
      // 顶部菜单主题
      topTheme: '${props.settings.topTheme}',
      // 侧边菜单主题
      sideTheme: '${props.settings.sideTheme}',
      // 侧边菜单展开时的宽度
      siderWidth: '${props.settings.siderWidth}',
      // 侧边菜单收缩时的宽度
      collapsedWidth: '${props.settings.collapsedWidth}',
      // 面包屑是否显示
      showBreadcrumb: '${props.settings.showBreadcrumb}',
      // 页签是否显示
      showTabs: '${props.settings.showTabs}',
      // 色弱模式
      colorWeak: '${props.settings.colorWeak}',
      // 灰色模式
      grayMode: '${props.settings.grayMode}'
    }
    html {
      // header
      --header-bg-color: ${topColors[topIndex - 1]};
      --header-bg-sub-color: ${topColors[topIndex]}; 

      // sider
      --sider-bg-color: ${sideColors[topIndex - 1]};
      --sider-sub-bg-color: ${sideColors[topIndex]}; 
    }`;
    toClipboard(text)
      .then(msg => {
        proxy.$message.success('拷贝完毕');
      })
      .catch(err => {
        proxy.$message.error('拷贝失败' + err);
      });
  };

  // 重置
  const doReset = () => {
    emit('update-setting', 'reset', { ...defaultSettings });
  };
</script>
<style lang="less" scoped>
  .setting-drawer {
    height: 100%;
    padding: 16px;
    overflow: hidden auto;
    .setting-drawer-nav {
      display: flex;
      justify-content: space-around;
      > div {
        position: relative;
        width: 56px;
        height: 48px;
        margin: 0 auto;
        cursor: pointer;
        background-color: #f0f2f5;
        border-radius: 4px;
        box-shadow: 0 1px 2.5px #0000002e;
        &:before {
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          z-index: 1;
          width: 33%;
          height: 100%;
          border-radius: 4px 0 0 4px;
        }
        &.setting-drawer-nav-side:before {
          background-color: #273352;
        }
        &:after {
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          border-radius: 4px 4px 0 0;
        }
        &.setting-drawer-nav-top:after {
          background-color: #273352;
        }
        &:not(&.setting-drawer-nav-top):after {
          background-color: #fff;
        }
        .setting-drawer-nav-icon {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: var(--ant-primary-color);
        }
      }
    }
    .setting-drawer-theme {
      display: flex;
      justify-content: space-around;
      .setting-drawer-theme-item {
        width: 20px;
        height: 20px;
        cursor: pointer;
        border: 1px solid #ddd;
        border-radius: 2px;
        text-align: center;
        line-height: 20px;
        .setting-drawer-theme-icon {
          color: #fff;
        }
      }
    }
    .setting-drawer-show {
      display: flex;
      justify-content: space-between;
      &:not(&:last-child) {
        margin-bottom: 16px;
      }
    }
  }
</style>
