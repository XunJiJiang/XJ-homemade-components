<script>
import xj_VNode from '../v-node'
export default {
  name: 'multi-line-stream-arrangement',
  props: {
    virtualKey: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },
  watch: {
    key: {
      immediate: false,
      handler () {
        const _VNode = new xj_VNode({ r_node: this.$refs['v-node'].childNodes})
        console.log(_VNode.r_node)
      }
    }
  },
  mounted () {
    const _VNode = new xj_VNode({ r_node: this.$refs['v-node'].childNodes})
    console.dir(_VNode.r_node)
  }
}
</script>

<template>
  <div>
    <div class="v-node" ref="v-node" :key="virtualKey" v-show="false"><slot name="v-node"></slot></div>
  </div>
</template>

<style lang="less" scoped>

</style>