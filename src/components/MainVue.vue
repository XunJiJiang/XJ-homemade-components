<script>
import { xj_message, xj_notification, xj_dialog, xj_multi_line_stream } from "@/components/index";
export default {
  name: 'mainVue',
  components: {
    'xj-dialog': xj_dialog,
    'xj-multi-line-stream': xj_multi_line_stream
  },
  data () {
    return {
      show: false,
      show2: false,
      option0: {
        on: [{
          speed: 8000,
          top: '28px',
          transform: 'scale(10%, 10%) translate(-50%, 0)',
          'transform-origin': 'left top',
          left: '28px',
        }],
        off: [{
          speed: 8000,
          top: '28px',
          transform: 'scale(10%, 10%) translate(-50%, 0)',
          'transform-origin': 'left top',
          left: '28px',
        }]
      },
      option1: {
        speed: 80,
        on: [{
          opacity: '.5',
          top: '28px',
          transform: 'scale(10%, 10%) translate(-50%, 0)',
          'transform-origin': 'left top',
          left: '28px',
        }, {
          opacity: '1',
          top: '13vh',
          transform: 'scale(10%, 60%) translate(-50%, 0)',
          'transform-origin': 'left top',
          left: '5%',
        }, {
          opacity: '1',
          top: '14vh',
          transform: 'scale(30%, 90%) translate(-50%, 0)',
          'transform-origin': 'left top',
          left: '20%',
        }, {
          opacity: '1',
          top: '15vh',
          transform: 'scale(100%) translate(-50%, 0)',
          'transform-origin': 'left top',
          left: '50%',
        }],
        off: [{
          opacity: '1',
          top: '15vh',
          transform: 'scale(100%) translate(-50%, 0)',
          'transform-origin': 'left top',
          left: '50%',
        }, {
          opacity: '1',
          top: '13.5vh',
          transform: 'scale(70%) translate(-50%, 0)',
          'transform-origin': 'left top',
          left: '20%',
        }, {
          opacity: '1',
          top: '10vh',
          transform: 'scale(20%) translate(-50%, 0)',
          'transform-origin': 'left top',
          left: '5%',
        }, {
          opacity: '.5',
          top: '0vh',
          transform: 'scale(10%) translate(-50%, 0)',
          'transform-origin': 'left top',
          left: '0%',
        }]
      },
      option2: {
        speed: 100,
        on: [{
          transform: 'scale(1%, 1%) translate(-50%, 0)'
        }, {
          transform: 'scale(100%, 1%) translate(-50%, 0)'
        }, {
          transform: 'scale(100%) translate(-50%, 0)'
        }],
        off: [{
          transform: 'scale(100%) translate(-50%, 0)'
        }, {
          transform: 'scale(100%, 1%) translate(-50%, 0)'
        }, {
          transform: 'scale(1%, 1%) translate(-50%, 0)'
        }]
      },
      option3: {},
      option4: { on: [], off:[] },
      option: this.option1
    }
  },
  methods: {
    test (done) {
      // setTimeout(() => {
      //   done()
      // }, 3000)
      done()
    }
  },
  mounted () {
    xj_message({
      message: 'hello',
      type: 'success'
    })
    xj_notification({
      title: 'hello',
      message: 'hello',
      type: 'success',
      location: 'right-bottom'
    })
  }
}
</script>

<template>
  <div class="long">
    <xj-multi-line-stream :virtual-key="'111'">
        <p>111</p>
        <h3>e22s</h3>
    </xj-multi-line-stream>
    <button @click="show = true">呼出</button>
    <xj-dialog
      :visible.sync="show"
      title="title"
      :modal="true"
      :show-close="true"
      :before-close="test"
      :options="option"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :lock-scroll="true"
      :mob-width="'80%'"
    >
      <xj-dialog
        :visible.sync="show2"
        title="title"
        :modal="false"
        :show-close="true"
        :before-close="test"
        :options="option"
        :width="'80%'"
        :mob-width="'80%'"
      >
        <span slot="footer">
          <button @click="show2 = false" class="button">完成</button>
        </span>
      </xj-dialog>
      <button @click="show2 = true">内层dialog</button>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <span slot="footer">
        <button @click="option = option0">动画0</button>
        <button @click="option = option1">动画1</button>
        <button @click="option = option2">动画2</button>
        <button @click="option = option3">默认动画</button>
        <button @click="option = option4">关闭动画</button>
        <button @click="show = false" class="button">完成</button>
      </span>
    </xj-dialog>
  </div>
</template>

<style scoped>
.long{
  height: 200vh;
}
</style>