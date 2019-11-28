<template>
  <div class="more" :class="{sticky: isSticky}">
    <div class="more-qr-wrap" v-if="qrImg && showContent && !isSticky">
      <img :src="qrImg" alt="">
    </div>
    <div class="more-wx-wrap" :class="{sticky: isSticky}" v-if="wechat && showContent" @touchend="stopHandler" @mouseup="stopHandler">
      <p>微信号： <span>{{wechat}}</span></p>
      <span class="copy-btn" @touchend.stop="copyHandler" @mouseup.stop="copyHandler">关注</span>
    </div>
    <div class="popup" @touchstart="stopHandler" @mousedown="stopHandler" @touchend="stopHandler" @mouseup="stopHandler" v-if="showPop">
      <div class="popup-box">
        <div class="popup-header">{{errorMsg ? '提示' : '复制成功'}}</div>
        <p>{{errorMsg || '微信号复制成功，是否立即跳转至微信并搜索该微信号？'}}</p>
        <div class="popup-btn">
          <span v-if="errorMsg" class="popup-btn-cancel blue" @mousedown="showPop = false;" @touchstart="showPop = false;">确定</span>
          <span v-else class="popup-btn-cancel" @mousedown="cancelWx" @touchstart="cancelWx">取消</span>
          <span v-if="!errorMsg" class="popup-btn-ok" @mousedown="wxHandler" @touchstart="wxHandler">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { wbadmt, CHEKA_REPORT } from "../constant.js";

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    showContent: {
      default: false
    },
    isSticky: {
      default: false
    },
    transType: {
      type: Number
    }
  },
  data() {
    return {
      isHide: true,
      showPop: false,
      errorMsg: '',
      tempTransType: 0
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
    copyHandler(e) {
      e.preventDefault();
      e.stopPropagation();
      this.copy();
    },
    copy(tempTransType) {
      this.tempTransType = tempTransType;
      let typeCode = this.tempTransType || this.transType;
      let arr = [0, CHEKA_REPORT.WX_COPY_BOTTOM, CHEKA_REPORT.WX_COPY_TOP, CHEKA_REPORT.WX_COPY_MORE];
      arr[typeCode] && wbadmt.send(arr[typeCode]);

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
          this.errorMsg = '您当前环境不支持复制，请手动复制';
      } finally {
        if (result) {
          this.errorMsg = '';
        } else  {
          this.errorMsg = '复制失败，请选择再次尝试或手动复制微信号';
        }
        this.showPop = true;
        document.body.removeChild(e)
      }
    },
    stopHandler(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    wxHandler() {
      let typeCode = this.tempTransType || this.transType;
      let arr = [0, CHEKA_REPORT.WX_COPY_BOTTOM_OPEN, CHEKA_REPORT.WX_COPY_TOP_OPEN, CHEKA_REPORT.WX_COPY_MORE_OPEN];
      arr[typeCode] && wbadmt.send(arr[typeCode]);
      this.showPop = false;
      window.location.href = 'weixin://';
      this.tempTransType = 0;
    },
    cancelWx() {
      let typeCode = this.tempTransType || this.transType;
      let arr = [0, CHEKA_REPORT.WX_COPY_BOTTOM_CANCEL, CHEKA_REPORT.WX_COPY_TOP_CANCEL, CHEKA_REPORT.WX_COPY_MORE_CANCEL];
      arr[typeCode] && wbadmt.send(arr[typeCode]);
      this.showPop = false;
      this.tempTransType = 0;
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
  margin-bottom: 40px;
  &.sticky {
    margin-bottom: 0;
  }
  &-qr {
    &-wrap {
      padding-top: 30px;
      text-align: center;
      img {
        width: 50%;
        height: 50%;
      }
    }
  }
  &-wx {
    &-wrap {
      margin-top: 30px;
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
    margin: 1em -20px -15px;
    border-top: 1px solid #ddd;
    display: flex;
    span {
      flex: 1;
      height: 3em;
      line-height: 3em;
      font-size: 16px;
    }
    &-cancel {
      color: #666;
      &.blue {
        color: #2d8cf0;
      }
    }
    &-ok {
      border-left: 1px solid #ddd;
      color: #2d8cf0;
    }
  }
}
</style>