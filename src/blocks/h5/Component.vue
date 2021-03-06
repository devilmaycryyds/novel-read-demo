<template>
  <div class="page-wrap">
    <div class="page-main" :class="{sticky: wechat && wxPos}" :style="articleStyle">
      <div
      class="article-wrap"
      :class="{vertical: configData.isVertical}"
      ref="wrap"
      @mousedown="startHandler"
      @mousemove="moveHandler"
      @mouseup="endHandler"
      @touchstart="startHandler"
      @touchmove="moveHandler"
      @touchend.stop="endHandler"
      @scroll="scrollHandler">
        <article v-if="!configData.isVertical" class="article-content" v-html="chapterContent">
        </article>
        <template v-else>
          <article class="article-content" v-for="(item, index) in allChapter" :key="index" v-html="item">
          </article>
        </template>
        <More ref="more" :data="data" :showContent="novelContent && (configData.isVertical || chapterList.length - 1 === currChapterIndex)" :transType="1"></More>
      </div>
      <div class="page-footer" v-if="!configData.isVertical">
        {{currPage}}/{{totalPage}}
      </div>
    </div>
    <More :data="data" :showContent="wechat" :isSticky="wxPos" :transType="2"></More>
    <div class="page-config" @touchend.stop :class="{hide: hideConfig}">
      <div class="page-config-cover" @click.stop="toggleConfig"></div>
      <ArticleConfig v-show="!hideSetting" :configData="configData" @on-change="changeConfig" @on-file-change="readFile"/>
      <Catalogue ref="catalogue" :data="{list: catalogueList, wechat: wechat}" @on-select="selectItem" @on-more="checkMore"/>
      <div class="page-config-tab">
        <div @click="showCatalogue">目录</div>
        <div @click="toggleSetting">设置</div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleConfig from './comm/ArticleConfig'
import Catalogue from './comm/Catalogue'
import More from './comm/More'
import {getNovelBySplit, getFileString} from './utils'
import { baseUrl, STORAGE_KEY, chekaReport } from "./constant.js";

export default {
  components: {
    ArticleConfig,
    Catalogue,
    More
  },
  props: ['data', 'schema'],
  data() {
    return {
      currScroll: 0,
      currClientX: 0,
      wrapWidth: 0,
      contentWidth: 0,
      /** 当前页码 */
      currPage: 1,
      /** 总页数 */
      totalPage: 1,
      /** 当前章节 */
      currChapterIndex: 0,
      chapterStatus: '',
      chapterList: [],
      /** 章节目录 */
      catalogueList: [],
      /** 功能配置弹出层 */
      hideConfig: true,
      /** 设置弹出层 */
      hideSetting: true,
      /** 设置项 */
      configData: {
        fontSize: 16,
        background: '#e6e6e6',
        color: 'rgba(0,0,0,.85)',
        isVertical: true
      },
      /** 文本内容 */
      novelContent: '',
      isMove: false,
      qrShowReport: false
    }
  },
  mounted() {
    window.wbadmt = window.wbadmt || { send: () => {} };
    let storageConfig = window.sessionStorage.getItem(STORAGE_KEY);
    try {
      this.configData = Object.assign({}, this.configData, JSON.parse(storageConfig));
    } catch (err) {
      console.log(err);
    }
    this.wrapWidth = this.$refs.wrap.offsetWidth;
    this.contentWidth = this.$refs.wrap.scrollWidth;
    this.totalPage = Math.round(this.contentWidth / this.wrapWidth);

    this.setEventId();
  },
  methods: {
    startHandler(e) {
      let touchEl;
      if (e.touches) {
        touchEl = e.touches[0];
      } else {
        touchEl = e;
      }
      this.currClientX = touchEl.clientX;
      this.currScroll = this.$refs.wrap.scrollLeft;
      this.isMove = true;
    },
    moveHandler(e) {
      if (!this.isMove) return;
      let touchEl;
      if (e.touches) {
        touchEl = e.touches[0];
      } else {
        touchEl = e;
      }
      this.scrollHorizontal(this.currScroll + this.currClientX - touchEl.clientX);
    },
    endHandler(e) {
      let touchEl;
      if (e.changedTouches) {
        touchEl = e.changedTouches[0];
      } else {
        touchEl = e;
      }
      if (this.configData.isVertical) {
        if (touchEl.clientX === this.currClientX) {
          e.preventDefault();
          let wrapHeight = this.$refs.wrap.offsetHeight;
          let blockHeight = wrapHeight / 3;
          if (touchEl.clientY < blockHeight) {
            this.$refs.wrap.scrollTop = this.$refs.wrap.scrollTop - (wrapHeight - 20);
          } else if (touchEl.clientY < blockHeight * 2) {
            this.hideConfig = false;
          } else {
            this.$refs.wrap.scrollTop = this.$refs.wrap.scrollTop + (wrapHeight - 20);
          }
        }
      } else {
        if (touchEl.clientX > this.currClientX + 20) {
          this.changePage('prev');
        } else if (touchEl.clientX < this.currClientX - 20) {
          this.changePage('next');
        } else if (touchEl.clientX === this.currClientX) {
          e.preventDefault();
          let blockWidth = this.wrapWidth / 3;
          if (touchEl.clientX < blockWidth) {
            this.changePage('prev');
          } else if (touchEl.clientX < blockWidth * 2) {
            this.hideConfig = false;
          } else {
            this.changePage('next');
          }
        } else {
          this.scrollHorizontal(this.currScroll);
        }
      }
      this.isMove = false;
    },
    scrollHandler(e) {
      if (this.qrShowReport) return;

      let moreEl = this.$refs.more.$el;
      if (e.target.scrollTop + document.body.offsetHeight - moreEl.offsetTop > moreEl.offsetHeight / 3 * 2) {
        window.wbadmt.send(chekaReport.qrShow);
        this.qrShowReport = true;
      }
    },
    /** 左右翻页 */
    changePage(type) {
      let page = this.currPage;
      let chapterChange = false;
      if (type === 'prev') {
        page--;
      } else if (type === 'next') {
        page++;
      } else if (typeof type === 'number') {
        page = type;
      }
      if (page < 1) {
        chapterChange = this.changeChapter(type);
        this.resetConfig().then(() => {
          this.currPage = chapterChange ? this.totalPage : 1;
          this.scrollHorizontal((this.currPage - 1) * this.wrapWidth, !chapterChange);
        })
      } else if (page > this.totalPage) {
        chapterChange = this.changeChapter(type);
        this.currPage = chapterChange ? 1 : this.totalPage;
        this.scrollHorizontal((this.currPage - 1) * this.wrapWidth, !chapterChange);
      } else {
        this.currPage = page;
        this.scrollHorizontal((this.currPage - 1) * this.wrapWidth, !chapterChange);
      }
    },
    /** 章节切换 */
    changeChapter(type) {
      let index = this.currChapterIndex;
      if (type === 'prev') {
        index--;
      } else if (type === 'next') {
        index++;
      }
      this.chapterStatus = type;
      this.currChapterIndex = index < 0 ? 0 : (index > this.chapterList.length - 1 ? this.chapterList.length - 1 : (this.currPage = 1, index));
      return this.currChapterIndex === index;
    },
    /** 水平滚动 */
    scrollHorizontal(num, isSmooth) {
      this.$refs.wrap.scrollTo({
        left: num < 0 ? 0 : (num > this.contentWidth ? this.contentWidth : num),
        behavior: isSmooth ? 'smooth' : 'instant'
      });
    },
    /** 重置 */
    resetConfig() {
      return this.$nextTick().then(() => {
        this.contentWidth = this.$refs.wrap.scrollWidth;
        this.totalPage = Math.round(this.contentWidth / this.wrapWidth);
      })
    },
    /** 关闭设置 */
    toggleConfig() {
      this.hideConfig = true;
      this.hideSetting = true;
    },
    /** 更改配置 */
    changeConfig(data) {
      this.configData = data;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },
    /** 展开目录 */
    showCatalogue() {
      this.$refs.catalogue.showCatalogue();
    },
    /** 设置显示 */
    toggleSetting() {
      this.hideSetting = !this.hideSetting;
    },
    /** 目录选择 */
    selectItem(index) {
      this.currChapterIndex = index + 1;
      if (this.configData.isVertical) {
        this.scrollToChapter(index);
      } else {
        this.changePage(1);
      }
      this.toggleConfig();
      window.wbadmt.send(chekaReport.catalogue);
    },
    /** 上下翻页滚动至章节 */
    scrollToChapter(index) {
      let currTitleEl = this.$refs.wrap.querySelectorAll('.article-content h2')[index];
      currTitleEl && this.$refs.wrap.scrollTo(0, currTitleEl.offsetTop - (this.wechat && this.wxPos ? 50 : 0));
    },
    checkMore() {
      this.hideConfig = true;
      this.$refs.more.copy(3);
    },
    /** 读取本地文件 */
    readFile(file) {
      getFileString(file).then(txt => {
        let novelData = getNovelBySplit(txt);
        this.chapterList = novelData.list;
        this.catalogueList = novelData.title;
      })
    },
    /** 上传文件获取/更新文本内容 */
    getNovelByPath(path) {
      let params = {
        url: path
      };
      // if (this.schema.novelId) {
      //   params.novel_id = this.schema.novelId;
      // }
      this.$http.post(`${baseUrl}/business/novel-content`, params).then(res => {
        let data = res.data || {};
        if (data.code === 0 && data.data) {
          this.novelContent = data.data.content || '';
          this.schema.novelId = data.data.novel_id;
          this.schema.novelUrl = data.data.novel_info_url;
          this.schema.originPath = path;
          this.novelHandler();
        }
      }).catch(() => {

      })
    },
    /** 根据id获取已解析的内容 */
    getNovelById() {
      this.$http.get(this.schema.novelUrl).then(res => {
        let data = res.data || {};
        if (data.code === 0 && data.data) {
          this.novelContent = data.data.novel || '';
          this.novelHandler();
        }
      }).catch(() => {

      })
    },
    /** 格式化小说内容 */
    novelHandler() {
      let novelData = getNovelBySplit(this.novelContent);
      this.chapterList = novelData.list;
      this.catalogueList = novelData.title;
    },
    async setEventId() {
      if (this.schema.event) {
        Object.keys(chekaReport).forEach(key => {
          chekaReport[key].eventid = this.schema.event[key];
        })
      } else {
        if (this.getUrlParams('_id')) return;
        this.schema.event = {};
        let eventLen = Object.keys(chekaReport).length;
        let idArr = [];
        while (idArr.length < eventLen) {
          let id = await this.getEventId();
          if (id) {
            idArr.push(id);
          }
        }
        Object.keys(chekaReport).forEach((key, index) => {
          this.schema.event[key] = chekaReport[key].eventid = idArr[index];
        })
      }
    },
    async getEventId() {
      return new Promise((resolve) => {
        this.$http.get(`${baseUrl}/common/event-id`).then(res => {
          let data = res.data || {};
          if (data.code === 0 && data.data) {
            resolve(data.data)
          } else {
            resolve(false)
          }
        }).catch(() => {
          resolve(false)
        })
      })
    },
    getUrlParams(name) {
      let matchStr = location.search.match(new RegExp(`${name}=([^&$]*)`));
      return matchStr ? matchStr[1] : '';
    }
  },
  computed: {
    articleStyle() {
      return `font-size: ${this.configData.fontSize}px; background: ${this.configData.background}; color: ${this.configData.color}`;
    },
    chapterContent() {
      let chapterStr = ((this.chapterList[this.currChapterIndex] || '').match(/\s*(第.{1,9}[章节卷集部篇回]\s{0}.*)\s*/) || [])[1] || '';
      return `${chapterStr ? `<h2>${chapterStr}</h2>` : ''}<p>${(this.chapterList[this.currChapterIndex] || '').replace(chapterStr, '').replace(/\s+/g, '</p><p>')}</p>`;
    },
    allChapter() {
      return (this.chapterList || []).map(item => {
        let chapterStr = ((item || '').match(/\s*(第.{1,9}[章节卷集部篇回]\s{0}.*)\s*/) || [])[1] || '';
        return `${chapterStr ? `<h2>${chapterStr}</h2>` : ''}<p>${(item || '').replace(chapterStr, '').replace(/\s+/g, '</p><p>')}</p>`;
      })
    },
    wechat() {
      return (this.data.wechat || {}).value || '';
    },
    /** 微信关注是否吸顶 */
    wxPos() {
      return (this.data.wxPos || {}).value || '';
    }
  },
  watch: {
    chapterContent() {
      this.resetConfig();
    },
    data: {
      handler: function (val) {
        let filePath = (val.content || {}).value;
        if (filePath && filePath !== this.schema.originPath) {
          this.getNovelByPath(filePath);
        } else if (!this.novelContent && this.schema.novelUrl) {
          this.getNovelById();
        }
      },
      deep: true,
      immediate: true
    },
    'configData.isVertical': {
      handler: function (val) {
        val && this.$nextTick(() => {
          this.scrollToChapter(this.currChapterIndex - 1);
        })
      }
    },
    currPage: {
      handler: function (val) {
        if (!this.qrShowReport &&
        !this.isVertical && 
        this.novelContent && 
        this.currChapterIndex === this.chapterList.length - 1 &&
        this.totalPage === val) {
          window.wbadmt.send(chekaReport.qrShow);
          this.qrShowReport = true;
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  &-wrap {
    min-height: 400px;
  }
  &-main {
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: column;
    &.sticky {
      padding-top: 50px;
    }
  }
  &-footer {
    font-size: 14px;
    color: rgba(0,0,0,.4);
    padding: 5px 15px;
  }
  &-config {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 14px;
    color: #FFF;
    &-cover {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0,0,0,.3);
    }
    &-tab {
      position: absolute;
      display: flex;
      justify-content: space-around;
      align-items: center;
      bottom: 0;
      height: 60px;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,.9);
    }
    &.hide {
      display: none;
    }
  }
}
.article {
  &-wrap {
    columns: 100vw 1;
    column-gap: 0;
    overflow: hidden;
    flex: 1;
    &.vertical {
      columns: auto;
      overflow: auto;
    }
  }
  &-content {
    padding: 15px;
  }
}
</style>
<style lang="scss">
.article-content {
  h2 {
    margin: 0;
    text-align: center;
  }
  p {
    margin: 1em 0;
    text-indent: 2em;
    line-height: 1.8em;
  }
}
</style>