<template>
  <div class="catalogue" :class="{hide: isHide}" @click="hideCatalogue">
    <div class="catalogue-wrap" @click.stop>
      <span class="catalogue-title">目录</span>
      <div class="catalogue-list">
        <ul>
          <li v-for="(item, index) in data.list" :key="item" @click="clickHandler(index)">{{item}}</li>
          <li class="more" v-if="data.list && data.list.length" @click="moreHandler">查看更多...</li>
        </ul>
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
      isHide: true
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
      this.$emit('on-select', index);
      this.hideCatalogue();
    },
    moreHandler() {
      this.$emit('on-more');
      this.hideCatalogue();
    }
  }
}
</script>

<style lang="scss" scoped>
.catalogue {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .3);
  color: #333;
  z-index: 1;
  &.hide {
    display: none;
  }
  &-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 20%;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
  }
  &-title {
    display: block;
    font-size: 20px;
    text-align: center;
    padding: 10px 0 5px;
    border-bottom: 1px solid #DDD;
  }
  &-list {
    overflow: auto;
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        height: 3em;
        padding-left: 1em;
        line-height: 3em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:after {
          content: '';
          display: block;
          margin-top: -1px;
          transform: scaleY(.75);
          border-top: 1px solid #DDD;
        }
        &:last-child:after {
          content: none;
        }
        &:active {
          background-color: #EEE;
        }
        &.more {
          text-align: center;
        }
      }
    }
  }
}
</style>