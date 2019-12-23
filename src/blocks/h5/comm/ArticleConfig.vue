<template>
  <div class="page-config-detail">
    <div class="page-config-detail-item">
      <span class="page-config-detail-label">字体</span>
      <div class="page-config-font">
        <span @click="decreaseSize" :class="{disabled: fontSize <= 12}">A-</span>
        <span @click="increaseSize" :class="{disabled: fontSize >= 40}">A+</span>
      </div>
    </div>
    <div class="page-config-detail-item">
      <span class="page-config-detail-label">翻页</span>
      <div class="page-config-font">
        <span @click="changeSlide(false)" :class="{disabled: !isVertical}">左右滑动</span>
        <span @click="changeSlide(true)" :class="{disabled: isVertical}">上下滑动</span>
      </div>
    </div>
    <div class="page-config-detail-item">
      <span class="page-config-detail-label">背景</span>
      <div class="page-config-background">
        <span
          v-for="(item, index) in colorList"
          :key="item.name"
          :style="`background-color:${item.background}`"
          :class="{active: colorIndex === index}"
          @click="changeBackground(index)"></span>
      </div>
    </div>
    <!-- <div class="page-config-detail-item">
      <span class="page-config-detail-label">本地</span>
      <div>
        <input type="file" @change="readFile" />
      </div>
    </div> -->
  </div>
</template>

<script>
import { chekaReport } from "../constant.js";
export default {
  props: {
    configData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      fontSize: this.configData.fontSize || 16,
      colorList: [{
        name: '浅色',
        background: '#e6e6e6',
        color: 'rgba(0,0,0,.85)'
      }, {
        name: '蓝色',
        background: '#cad9e8',
        color: 'rgba(0,0,0,.85)'
      }, {
        name: '绿色',
        background: '#d1edd1',
        color: 'rgba(0,0,0,.85)'
      }, {
        name: '黄色',
        background: 'rgb(255, 238, 194)',
        color: 'rgb(59, 51, 79)'
      }, {
        name: '深色',
        background: 'rgb(89, 89, 89)',
        color: 'rgb(193, 193, 193)'
      }],
      colorIndex: -1,
      isVertical: this.configData.isVertical
    }
  },
  computed: {
    config() {
      return Object.assign({}, this.configData);
    }
  },
  methods: {
    decreaseSize() {
      if (this.fontSize <= 12) return;
      this.fontSize -= 2;
      this.changeConfig();
      window.wbadmt.send(chekaReport.configFontS);
    },
    increaseSize() {
      if (this.fontSize >= 40) return;
      this.fontSize += 2;
      this.changeConfig();
      window.wbadmt.send(chekaReport.configFontL);
    },
    changeBackground(index) {
      this.colorIndex = index;
      this.changeConfig();
      window.wbadmt.send(chekaReport.configBg);
    },
    changeSlide(isver) {
      if (this.isVertical === isver) return;
      this.isVertical = isver;
      this.changeConfig();
      isver ? window.wbadmt.send(chekaReport.configV) : window.wbadmt.send(chekaReport.configH);
    },
    changeConfig() {
      let currColor = this.colorIndex >= 0 ? this.colorList[this.colorIndex] : this.configData;
      this.$emit('on-change', Object.assign({}, this.configData, {
        fontSize: this.fontSize,
        background: currColor.background,
        color: currColor.color,
        isVertical: this.isVertical
      }))
    },
    readFile(e) {
      let file = e.target.files[0];
      this.$emit('on-file-change', file);
    }
  },
  watch: {
    config: {
      handler: function (val) {
        this.fontSize = val.fontSize || 16;
        this.isVertical = val.isVertical;
      },
      deep: true,
      immediate: true
    },
  }
}
</script>

<style lang="scss" scoped>
.page-config {
  &-detail {
    position: absolute;
    padding: 15px 25px;
    bottom: 60px;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.9);
    &-item {
      display: flex;
      align-items: center;
      margin-top: 10px;
      &:first-child {
        margin-top: 0;
      }
    }
    &-label {
      width: 80px;
      line-height: 27px;
    }
  }
  &-font {
    display: flex;
    flex: 1;
    span {
      flex: 1;
      text-align: center;
      border: 1px solid #FFF;
      border-radius: 4px;
      line-height: 25px;
      margin-left: 20px;
      &:first-child {
        margin-left: 0;
      }
      &.disabled {
        color: #666;
        border-color: #666;
      }
    }
  }
  &-background {
    display: flex;
    flex: 1;
    span {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
      &.active {
        box-shadow: 0px 0px 18px #FFF;
      }
    }
  }
} 
</style>