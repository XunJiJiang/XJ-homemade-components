<script>
import { xj_message, xj_dialog, xj_multi_line_stream } from '@/components/index'
import VoteRoughList from '@/components/vote/votelist/tool/roughVoteList'
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
      option: this.option1,
      notificationOption: [
        {
          title: 'notification title测试-1',
          message: 'notification message测试-1',
          type: 'success',
          location: 'left-top',
          duration: Math.floor(Math.random() * 5000 + 1000)
        },
        {
          title: 'notification title测试-2',
          message: 'notification message测试-2',
          type: 'normal',
          location: 'left-bottom',
          showClose: false
        },
        {
          title: 'notification title测试-3',
          message: 'notification message测试-5',
          type: 'warning',
          location: 'right-top-2',
          duration: 0,
          userSelect: false,
          async callback (l) {
            console.log('@3 async callback 运行了', l)
            await new Promise(resolve => {
              setTimeout(() => {
                resolve()
              }, 3000)
            })
            return '@3 callback 运行 的返回值'
          }
        },
        {
          title: 'notification title测试-4',
          message: 'notification message测试-4',
          type: 'error',
          location: 'right-bottom',
          async callback () {
            console.log('@4 callback 运行了')
            return '@4 callback 运行 的返回值'
          }
        }
      ],
      voteData: [
        {
          voteId: 0,
          title: 'title-0000000000000000000000000000000000000000000000000',
          content: 'content-0 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          status: 1,
          createTime: '2023-10-03 19:20:24',
          deadTime: '2023-11-15 24:00:00',
          userName: '迅疾0',
          userId: 0
        },
        {
          voteId: 1,
          title: 'title-1',
          content: 'content-1',
          status: 1,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾1',
          userId: 1
        },
        {
          voteId: 2,
          title: 'title-2',
          content: 'content-2',
          status: 2,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾2',
          userId: 2
        },
        {
          voteId: 3,
          title: 'title-3',
          content: 'content-3',
          status: 3,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾3',
          userId: 3
        },
        {
          voteId: 4,
          title: 'title-4',
          content: 'content-4',
          status: 4,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾4',
          userId: 4
        },
        {
          voteId: 5,
          title: 'title-5',
          content: 'content-5',
          status: 5,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾5',
          userId: 5
        },
        {
          voteId: 6,
          title: 'title-6',
          content: 'content-6',
          status: 1,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾6',
          userId: 6
        },
        {
          voteId: 7,
          title: 'title-7',
          content: 'content-7',
          status: 1,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾7',
          userId: 7
        },
        {
          voteId: 8,
          title: 'title-8',
          content: 'content-8',
          status: 2,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾8',
          userId: 8
        },
        {
          voteId: 9,
          title: 'title-9',
          content: 'content-9',
          status: 3,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾9',
          userId: 9
        },
        {
          voteId: 10,
          title: 'title-10',
          content: 'content-10',
          status: 4,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾10',
          userId: 10
        },
        {
          voteId: 11,
          title: 'title-11',
          content: 'content-11',
          status: 5,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾11',
          userId: 11
        },
        {
          voteId: 12,
          title: 'title-12',
          content: 'content-12',
          status: 1,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾12',
          userId: 12
        },
        {
          voteId: 13,
          title: 'title-13',
          content: 'content-13',
          status: 1,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾13',
          userId: 13
        },
        {
          voteId: 14,
          title: 'title-14',
          content: 'content-14',
          status: 1,
          createTime: '2023-10-05 19:20:24',
          deadTime: '2023-11-25 24:00:00',
          userName: '迅疾14',
          userId: 14
        }
      ],
      voteList: null
    }
  },
  methods: {
    test (done) {
      // setTimeout(() => {
      //   done()
      // }, 3000)
      done()
    },
    xj_notification (v) {
      this.$xjNotify(v).then(v => { console.log('# $xjNotify -> then #', v) }).catch(err => { console.log('# $xjNotify -> catch #', err) })
    }
  },
  mounted () {
    xj_message({
      message: 'hello',
      type: 'success'
    })
    this.$xjNotify({
      title: 'hello',
      message: 'hello',
      type: 'success',
      location: 'right-bottom'
    })

    this.voteList = new VoteRoughList(this.$refs['vote-list'], this.voteData)
    this.voteList.onclick(({ voteId }) => {
      // return require.voteId(voteId)
      voteId
      // 理论上这里返回应该发送的亲求
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            voteId: 0,
            userName: '迅疾',
            voteType: 3,
            title: '详细标题11111111111111111111111111111111111111aweaweqwe青蛙恶趣味啊是大多数·',
            content: '详细介绍埃斯库嘎斯的空间噶噶啥的客户嘎斯的空间和按时灯笼裤飞机哈桑法律噶啥的客户嘎斯的空间和按时灯笼裤飞机哈桑法律噶啥的客户嘎斯的空间和按时灯笼裤飞机哈桑法律噶啥的客户嘎斯的空间和按时灯笼裤飞机哈桑法律啥的客户嘎斯的空间和按时灯笼裤飞机哈桑法律框架哈桑打开链接',
            status: 1,
            createTime: '2023-10-03 19:20:24',
            deadTime: '2023-10-13 19:20:24',
            optionNum: 3,
            isRealTime: '',
            voteOptionLaunchDTOs: [
              {
                id: 0,
                voteId: 0,
                optionType: 'S',
                content: '000',
                percentage: '10%',
                voteNum: 13,
                isSelect: false
              },
              {
                id: 1,
                voteId: 0,
                optionType: 'S',
                content: '111',
                percentage: '20%',
                voteNum: 26,
                isSelect: false
              },
              {
                id: 2,
                voteId: 0,
                optionType: 'S',
                content: '222',
                percentage: '40%',
                voteNum: 52,
                isSelect: false
              },
              {
                id: 3,
                voteId: 0,
                optionType: 'S',
                content: '333',
                percentage: '30%',
                voteNum: 39,
                isSelect: false
              },
              {
                id: 4,
                voteId: 0,
                optionType: 'S',
                content: '444',
                percentage: '50%',
                voteNum: 52,
                isSelect: false
              }
            ],
            isComplete: 0,
            voteWeights: [
              {
                roleId: 0,
                roleName: '超管',
                weight: 10
              },
              {
                roleId: 100,
                roleName: '人',
                weight: 5
              },
              {
                roleId: 200,
                roleName: '贱民',
                weight: 1
              }
            ],
            delFlag: '0'
          })
        }, 500)
      })
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
    <button @click="show = true">呼出dialog</button>
    <button @click="xj_notification(notificationOption[0])">呼出弹窗1</button>
    <button @click="xj_notification(notificationOption[1])">呼出弹窗2</button>
    <button @click="xj_notification(notificationOption[2])">呼出弹窗3</button>
    <button @click="xj_notification(notificationOption[3])">呼出弹窗4</button>
    <div id="voteList" ref="vote-list"></div>
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

</style>