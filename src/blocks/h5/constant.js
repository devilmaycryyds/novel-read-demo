export const baseUrl = '//yingxiao.ad.weibo.com';
export const STORAGE_KEY = 'WB_CUBE_READ_CONFIG';

export let wbadmt = window.wbadmt || { send: () => {} };

export const CHEKA_REPORT = {
  /** 吸顶微信复制 */
  WX_COPY_TOP: {
    eventid: 'wx_copy_0',
    eventtype: 'wx_copy'
  },
  /** 吸顶微信跳转 */
  WX_COPY_TOP_OPEN: {
    eventid: 'wx_copy_2',
    eventtype: 'wx_copy'
  },
  /** 吸顶微信取消跳转 */
  WX_COPY_TOP_CANCEL: {
    eventid: 'wx_copy_3',
    eventtype: 'wx_copy'
  },
  /** 页尾微信复制 */
  WX_COPY_BOTTOM: {
    eventid: 'wx_copy_1',
    eventtype: 'wx_copy'
  },
  /** 页尾微信跳转 */
  WX_COPY_BOTTOM_OPEN: {
    eventid: 'wx_copy_4',
    eventtype: 'wx_copy'
  },
  /** 页尾微信取消跳转 */
  WX_COPY_BOTTOM_CANCEL: {
    eventid: 'wx_copy_5',
    eventtype: 'wx_copy'
  },
  /** 查看更多微信复制 */
  WX_COPY_MORE: {
    eventid: 'directory_view_more_0',
    eventtype: 'directory_view_more'
  },
  /** 查看更多微信跳转 */
  WX_COPY_MORE_OPEN: {
    eventid: 'directory_view_more_1',
    eventtype: 'directory_view_more'
  },
  /** 查看更多微信取消跳转 */
  WX_COPY_MORE_CANCEL: {
    eventid: 'directory_view_more_2',
    eventtype: 'directory_view_more'
  },
  /** 二维码显示 */
  QR_SHOW: {
    eventid: 'bottom_show_qr_code_0',
    eventtype: 'bottom_show_qr_code'
  },
  /** 目录 */
  CATALOGUE: {
    eventid: 'undefined',
    eventtype: 'undefined'
    // eventvalue: ''
  },
  /** 配置字体缩小 */
  CONFIG_FONT_S: {
    eventid: 'undefined',
    eventtype: 'undefined'
  },
  /** 配置字体放大 */
  CONFIG_FONT_L: {
    eventid: 'undefined',
    eventtype: 'undefined'
  },
  /** 配置左右翻页 */
  CONFIG_H: {
    eventid: 'undefined',
    eventtype: 'undefined'
  },
  /** 配置上下翻页 */
  CONFIG_V: {
    eventid: 'undefined',
    eventtype: 'undefined'
  },
  /** 配置背景 */
  CONFIG_BG: {
    eventid: 'undefined',
    eventtype: 'undefined'
  }
}