<script>
import xjDialog from './xjDialog'
import {message, notification} from "@/components/index";
export default {
  name: 'mainVue',
  components: {
    'xj-dialog': xjDialog
  },
  data () {
    return {
      show: false,
      show2: false,
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
    message({
      message: 'hello',
      type: 'success'
    });
    notification({
      title: 'hello',
      message: 'hello',
      type: 'success',
      location: 'right-bottom'
    });
  }
}
</script>

<template>
  <div>
    <button @click="show = true">呼出</button>
    <xj-dialog
      :visible.sync="show"
      title="title"
      :modal="true"
      :show-close="true"
      :before-close="test"
      :animation-options="option"
    >
      <xj-dialog
        :visible.sync="show2"
        title="title"
        :modal="false"
        :show-close="true"
        :before-close="test"
        :animation-options="option"
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
      <button @click="option = option1">动画1</button>
      <button @click="option = option2">动画2</button>
      <span slot="footer">
        <button @click="show = false" class="button">完成</button>
      </span>
    </xj-dialog>
  </div>
</template>

<style scoped>

</style>