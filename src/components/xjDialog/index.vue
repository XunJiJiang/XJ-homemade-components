<script>
// import './assets'
export default {
  name: 'xj-dialog',
  props: {
    // 是否显示 Dialog，支持 .sync 修饰符
    visible: {
      type: Boolean,
      default: false
    },
    // Dialog 的标题
    title: {
      type: String
    },
    // Dialog 的宽度
    width: {
      type: String,
      default: '50%'
    },
    // Dialog CSS 中的 margin-top 值
    top: {
      type: String,
      default: '15vh'
    },
    // 是否需要遮罩层
    modal: {
      type: Boolean,
      default: true
    },
    // 是否可以通过点击 modal 关闭 Dialog
    'close-on-click-modal': {
      type: Boolean,
      default: true
    },
    // 是否可以通过按下 ESC 关闭 Dialog
    'close-on-press-escape': {
      type: Boolean,
      default: true
    },
    // 是否显示关闭按钮
    'show-close': {
      type: Boolean,
      default: true
    },
    // 关闭前的回调，会暂停 Dialog 的关闭
    'before-close': {
      type: Function
    },
    // 开启 关闭 动画配置
    animationOptions: {
      // 数组里是动画的过程，若on长度大于1，则最后位置即为停止位置
      type: Object,
      default () {
        return {
          speed: 300,
          on: [{
            opacity: '0',
            top: 'calc(15vh - 10px)'
          }],
          off: [{
            opacity: '0',
            top: 'calc(15vh - 10px)'
          }]
        }
      }
    }
  },
  data () {
    return {
      visibleData: false,
      animation: {
        defaultAnimationOptions: {
          speed: 300,
          on: [{
            opacity: '0',
            top: 'calc(15vh - 10px)'
          }],
          off: [{
            opacity: '0',
            top: 'calc(15vh - 10px)'
          }]
        },
        nowLocation: {},
        transitionTimingFunction: 'ease',
        modal: {opacity: 0}
      }
    }
  },
  methods: {
    /**
     * 点击遮罩关闭 Dialog
     */
    closeDialogOnModal () {
      if (this.closeOnClickModal) this.closeDialog()
    },
    /**
     * 点击ESC关闭 Dialog
     */
    closeDialogOnESC (e) {
      if (e.code === 'Escape' || e.key === 'Escape' || e.keyCode === 27) this.closeDialog()
    },
    /**
     * 关闭 Dialog
     */
    closeDialog () {
      // 判断是否传入关闭前执行的回调 before-close
      if (this.beforeClose) this.beforeClose(this.done)
      else this.done()
    },
    /**
     * 关闭 Dialog 实际执行
     */
    done () {
      this.$emit('update:visible', false)
    }
  },
  // 监听属性支持异步，所以用监听属性
  watch: {
    /**
     * 监控 visible
     */
    visible: {
      async handler (newV, oldV) {
        // await new Promise(resolve => setTimeout(resolve, 3000))
        // const dialogModal = this.$refs['dialog-modal']
        // const dialogMain = this.$refs['dialog-main']
        this.animation.transitionTimingFunction = 'ease'
        if (newV && !oldV) {
          if (this.animationOptions['on'].length === 0) {
            this.animation.nowLocation = {}
            this.visibleData = newV
            this.animation.modal.opacity = '1'
          } else if (this.animationOptions['on'].length === 1) {
            this.animation.nowLocation = this.animationOptions['on'][0]
            this.visibleData = newV
            setTimeout(() => {
              this.animation.nowLocation = {}
              this.animation.modal.opacity = '1'
            }, 10)
          } else {
            this.animation.transitionTimingFunction = 'linear'
            this.animationOptions['on'].forEach((item, index) => {
              setTimeout(() => {
                this.animation.nowLocation = item
                if (index === 0) setTimeout(() => {
                  this.visibleData = newV
                  setTimeout(() => this.animation.modal.opacity = '1', 10)
                }, 10)
              }, index * this.animationOptions.speed)
            })
          }
        } else {
          if (this.animationOptions['off'].length === 0) {
            this.animation.nowLocation = {}
            this.visibleData = newV
            this.animation.modal.opacity = '0'
          } else if (this.animationOptions['off'].length === 1) {
            this.animation.nowLocation = this.animationOptions['off'][0]
            this.animation.modal.opacity = '0'
            setTimeout(() => {
              this.visibleData = newV
            }, this.animationOptions.speed)
          } else {
            this.animation.transitionTimingFunction = 'linear'
            this.animation.modal.opacity = '0'
            this.animationOptions['off'].forEach((item, index) => {
              setTimeout(() => {
                this.animation.nowLocation = item
                if (index === this.animationOptions['off'].length - 1) {
                  setTimeout(() => {
                    this.visibleData = newV
                    // setTimeout(() => this.animation.modal.opacity = '0', 10)
                  }, 10)
                }
              }, index * this.animationOptions.speed)
            })
          }
        }
      }
    }
  },
  mounted () {
    // const dialogModal = this.$refs['dialog-modal']
    // const dialogMain = this.$refs['dialog-main']
    window.addEventListener('keyup', this.closeDialogOnESC)
  },
  destroyed() {
    window.removeEventListener('keyup', this.closeDialogOnESC)
  }
}
</script>

<template>
  <div id="dialog" v-show="visibleData">
    <!--  遮罩层  -->
    <div
      class="dialog-modal"
      ref="dialog-modal"
      v-show="modal"
      @click="closeDialogOnModal"
      :style="animation.modal"
    ></div>
    <!--  主体  -->
    <div
      class="dialog-main"
      ref="dialog-main"
      :style="{
        marginTop: animation.nowLocation['top'] || top,
        // width: animation.nowLocation['width'] || width,
        left: animation.nowLocation['left'] || '50%',
        transform: animation.nowLocation['transform'] || 'translateX(-50%)',
        transformOrigin: animation.nowLocation['transform-origin'] || 'left center',
        opacity: animation.nowLocation['opacity'] || '1',
        transition: animation.nowLocation['transition'] || 'all',
        transitionDuration: animation.nowLocation['transition-duration'] || animationOptions.speed / 1000 + 's' || '.3s',
        transitionTimingFunction: animation.transitionTimingFunction
      }"
    >
      <!--   标题   -->
      <div
        class="dialog-title"
        ref="dialog-title"
      >
        <div><span v-html="title"></span></div>
      </div>
      <!--   内容  -->
      <div
        class="dialog-body"
        ref="dialog-body"
      >
        <div><slot></slot></div>
      </div>
      <!--   页脚   -->
      <div
        class="dialog-footer"
        ref="dialog-footer"
      >
        <div><slot name="footer"></slot></div>
      </div>
      <!--  右上角自带关闭按钮  -->
      <div
        class="dialog-closeButton"
        ref="dialog-closeButton"
        v-show="showClose"
        @click="closeDialog"
      >
        <span class="iconfont icon-close"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./assets/iconfont.css";
#dialog {
  position: fixed;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
}

.dialog-modal {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #00000066;
  transition: all .15s;
}

.dialog-main {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 4px #00000055;
}

.dialog-title {
  font-size: 18px;
  color: #303133;
  padding: 20px 20px 10px;
}


.dialog-body {
  font-size: 14px;
  color: #606266;
  padding: 30px 20px;
}

.dialog-footer {
  font-size: 1.8em;
  padding: 10px 20px 20px;
}

.dialog-footer div {
  float: right;
  //right: 0;
}

.dialog-footer::after {
  content: "";
  height: 0;
  clear: both;
  overflow: hidden;
  display: block;
  visibility: hidden;
}

.dialog-closeButton {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: all .2s;
  transform: scale(60%);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  background: #fd4356;
  color: #00000000;
}

.dialog-closeButton:hover {
  color: #000000dd;
}
</style>