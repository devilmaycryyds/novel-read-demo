function mixExtra(type) {
  return Object.assign({}, extra, {
    extraEventType: type
  })
}

export const baseUrl = '//yingxiao.ad.weibo.com';
export const STORAGE_KEY = 'WB_CUBE_READ_CONFIG';

export let wbadmt = window.wbadmt || { send: () => {} };

export let extra = window.extra || {};

export let chekaReport = {
  /** 吸顶微信复制 */
  wxCopyTop: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('wx_copy_0')
  },
  /** 吸顶微信跳转 */
  wxCopyTopOpen: {
    eventid: '',
    eventtype: 'wechat',
    eventvalue: mixExtra('wx_copy_2')
  },
  /** 吸顶微信取消跳转 */
  wxCopyTopCancel: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('wx_copy_3')
  },
  /** 页尾微信复制 */
  wxCopyBottom: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('wx_copy_1')
  },
  /** 页尾微信跳转 */
  wxCopyBottomOpen: {
    eventid: '',
    eventtype: 'wechat',
    eventvalue: mixExtra('wx_copy_4')
  },
  /** 页尾微信取消跳转 */
  wxCopyBottomCancel: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('wx_copy_5')
  },
  /** 查看更多微信复制 */
  wxCopyMore: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('directory_view_more_0')
  },
  /** 查看更多微信跳转 */
  wxCopyMoreOpen: {
    eventid: '',
    eventtype: 'wechat',
    eventvalue: mixExtra('directory_view_more_1')
  },
  /** 查看更多微信取消跳转 */
  wxCopyMoreCancel: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('directory_view_more_2')
  },
  /** 二维码显示 */
  qrShow: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('bottom_show_qr_code_0')
  },
  /** 目录 */
  catalogue: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('undefined')
  },
  /** 配置字体缩小 */
  configFontS: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('undefined')
  },
  /** 配置字体放大 */
  configFontL: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('undefined')
  },
  /** 配置左右翻页 */
  configH: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('undefined')
  },
  /** 配置上下翻页 */
  configV: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('undefined')
  },
  /** 配置背景 */
  configBg: {
    eventid: '',
    eventtype: 'other',
    eventvalue: mixExtra('undefined')
  }
}