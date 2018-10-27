import Behavior from '../common/behavior/index';

Component({
  externalClasses: ['wuss-class'],
  relations: {},
  options: {
    addGlobalClass: true,
  },
  behaviors: [Behavior],
  /**
   * 组件的属性列表
   * @param {array} options 传入的选项组[ [], [], [] ]
   * @param {string} defaultValue 默认值 可以支持 key value 例: [value,value,value...] 或 [key,key,key...]
   * @param {string} cancelTextColor 取消文本颜色
   * @param {string} cancelText 取消文本文字
   * @param {string} title 标题
   * @param {string} confirmTextColor 确认文本颜色
   * @param {string} confirmText 确认文本文字
   * @param {string} showValue 是否用value而不是key展示
   * @param {string} defaultKey onChange和onSelect事件返回的值是何种格式 [value,value...] [key,key,...]
   */
  properties: {
    options: {
      type: Array,
      value: [],
    },
    defaultValue: {
      type: Array,
      value: [],
    },
    cancelTextColor: {
      type: String,
      value: '',
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    label: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    confirmTextColor: {
      type: String,
      value: '',
    },
    confirmText: {
      type: String,
      value: '确认',
    },
    showValue: {
      type: Boolean,
      value: false,
    },
    defaultKey: {
      type: String,
      value: 'value',
    },
  },
  data: {
    _visible: true,
    value: [0, 0, 0],
    _isLinkage: false,
  },
  methods: {
    _handleClick() {
      this.setData({
        _visible: true,
      });
    },
    _handleCancel() {
      this.setData({
        _visible: false,
      });
    },
    _handleConfirm() {
      const { value } = this.data;
      this.setData({
        _visible: false,
      });
      // this.triggerEvent('onSelect',{
      //   value: this.getValues(value),
      // },{})
    },
    _ArrayKeysToArrayObject() {
      const { options } = this.data;
      if (options.length <= 0) return false;
      const { 0: items } = options;
      const _isArrayObject = this.isArrayObject(items);
      !_isArrayObject &&
        this.setData({
          options: options.map(i =>
            i.map(j => ({
              key: j,
              value: j,
            }))
          ),
        });
    },
    _handleChange(e) {
      const value = e.detail.value;
      this.setData({ value });

      // this.triggerEvent('onChange',{
      //   value: this.getValues(value),
      // },{})
    },
  },
  ready: function() {
    const { options, defaultValue } = this.data;
    const [v1 = 0, v2 = 0, v3 = 0] = defaultValue;
    this.setData({
      value: [v1, v2, v3],
      _isLinkage: !!(
        options[1] &&
        options[1][0] &&
        options[1][0].hasOwnProperty('parent')
      ),
    });
    this._ArrayKeysToArrayObject();
  },
});
