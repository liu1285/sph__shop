<template>
  <div class="pagination">
    <button @click="$emit('currentPage',pageNo - 1)" :disabled="pageNo <=1 ">上一页</button>

    <button v-show="startAndEnd.start > 1" @click="$emit('currentPage',1)" :class="{active:page === pageNo}">1</button>
    <button v-show='startAndEnd.start > 2'>...</button>

    <button v-for="(page,index) in startAndEnd.end" :key="index" v-if="page >= startAndEnd.start" @click="$emit('currentPage',page)" :class="{active:page === pageNo}">{{page}}</button>

    <button v-show="startAndEnd.end < totalPage - 1">...</button>
    <button v-show="startAndEnd.end < totalPage" @click="$emit('currentPage',totalPage)" :class="{active:page == pageNo}">{{totalPage}}</button>
    <button @click="$emit('currentPage',pageNo + 1)" :disabled="pageNo >= totalPage ">下一页</button>
    <button style=" marign-left:30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "PaginaTion",
  // 父组件传递过来的数据
  props:['pageNo','pageSize','total','continues'],
  computed:{
    // 总共的页数
    totalPage() {
      return Math.ceil(this.total/this.pageSize)
    },
    // 起始数字与结束数字
    startAndEnd() {
      // 解构赋值
      const {pageNo,totalPage,continues} = this
      let start = 0
      let end = 0
      // 当总页数没有连续页数多时
      if(totalPage < continues){
        start = 1 // 起始数字
        end = totalPage // 结束数字
      }
      else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // start小于1,end大于总页数
        if(start < 1) {
          start = 1
          end = continues
        }
        if(end > totalPage) {
          end = totalPage
          start = end - continues + 1
        }
      }
      return {start,end}
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>