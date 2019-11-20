<template>
  <div class="more">
    <div class="more-qr-wrap" v-if="qrImg">
      <img :src="qrImg" alt="">
    </div>
    <div class="more-wx-wrap" :class="{sticky: wxPos}" v-if="wechat">
      <p>微信号： <span>{{wechat}}</span></p>
      <span class="copy-btn" @touchstart.stop="copyHandler" @mousedown.stop="copyHandler">关注</span>
    </div>
    <div class="popup" @touchstart.stop @mousedown.stop v-if="showPop">
      <div class="popup-box">
        <div class="popup-header">复制成功</div>
        <p>微信号复制成功，是否立即跳转至微信并搜索该微信号？</p>
        <div class="popup-btn">
          <span class="popup-btn-cancel" @click="showPop = false;">取消</span>
          <span class="popup-btn-ok" @click="wxHandler">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isHide: true,
      showPop: false
    }
  },
  methods: {
    showCatalogue() {
      this.isHide = false;
    },
    hideCatalogue() {
      this.isHide = true;
    },
    clickHandler(index) {
      this.$emit('on-select', index)
    },
    copyHandler() {
      var e = document.createElement('textarea');
      e.value = this.wechat;
      document.body.appendChild(e);
      e.setAttribute('readonly', '');
      e.select();
      e.setSelectionRange(0, e.value.length);
      var result = false;
      try {
          result = document.execCommand('copy');
      } catch (n) {
          alert('您当前环境不支持复制，请手动复制');
      } finally {
          document.body.removeChild(e)
        if (result) {
          this.showPop = true;
        } else  {
          alert('复制失败，请选择再次尝试或手动复制微信号');
        }
      }
    },
    wxHandler() {
      this.showPop = false;
      window.location.href = 'weixin://';
    }
  },
  computed: {
    qrImg() {
      return (this.data.qrCode || {}).value || '';
    },
    wechat() {
      return (this.data.wechat || {}).value || '';
    },
    wxPos() {
      return (this.data.wxPos || {}).value || '';
    }
  }
}
</script>

<style lang="scss" scoped>
.more {
  &-qr {
    &-wrap {
      padding-top: 30px;
      text-align: center;
      img {
        width: 50vw;
        height: 50vw;
      }
    }
  }
  &-wx {
    &-wrap {
      margin-top: 30px;
      margin-bottom: 40px;
      text-align: center;
      &.sticky {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
        margin: 0;
        padding: 0 1em;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #FFF;
        .copy-btn {
          margin: 0;
        }
      }
      p,
      span {
        font-size: 16px;
      }
    }
  }
}
.copy-btn {
  margin-top: 10px;
  display: inline-block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 1px solid;
  border-radius: 15px;
}
.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  &-box {
    display: block;
    padding: 20px 20px 15px;
    position: absolute;
    width: 60vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
    background-color: #FFF;
    border-radius: 6px;
    font-size: 14px;
    text-align: center;
    p {
      margin-top: 1em;
      line-height: 1.5em;
      font-size: 14px;
      color: #333;
      text-align: center;
    }
  }
  &-header {
    line-height: 24px;
    text-align: center;
    font-size: 17px;
    color: #333;
    font-weight: 700;
  }
  &-btn {
    margin-top: 1em;
    span {
      display: inline-block;
      width: 5em;
      height: 2em;
      line-height: 2em;
      border: 1px solid;
      border-radius: 4px;
    }
    &-cancel {

    }
    &-ok {
      margin-left: 1em;
    }
  }
}
</style>