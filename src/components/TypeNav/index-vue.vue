<template>
  <div class="type-nav">
    <div class="container" @mouseenter="enterShow" @mouseleave="leaveShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
              <h3>
                <a :data-category-name="c1.categoryName" :data-category1id='c1.categoryId'>{{c1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-category-name="c2.categoryName" :data-category2id='c2.categoryId'>{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-category-name="c3.categoryName" :data-category3id='c3.categoryId'>{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
// 引入vuex辅助函数
import { mapState } from 'vuex'
export default {
  name:'TypeNav',
  data() {
    return {
      // 控制三级联动显示隐藏
      show:true
    }
  },
  methods:{
    // 跳转到Search组件
    goSearch(e) {
      const element = e.target
      const {categoryName, category1id,category2id, category3id} =  element.dataset
      // 为所有a标签添加data-categoryName属性，如果点击的标签有data-categoryName属性
      if(categoryName) {
        // 整理路由参数
        let query = {categoryName:categoryName}
        let location = {name:'search',query}
        // 判断是几级标签
        if(category1id) {
          query.category1Id = category1id
        }
        else if(category2id) {
          query.category2Id = category2id
        }
        else {
          query.category3Id = category3id
        }
        // 点击三级联动标签时，如果路径中有params参数,将params参数也传递过去
        if(this.$route.params) {
          location.params = this.$route.params
        }
        this.$router.push(location)
      }
      
      // this.$router.push('/search')
    },
    // Search模块中鼠标移入显示三级联动
    enterShow() {
      if(this.show === false)
      this.show = true
    },
    // 鼠标移出隐藏三级联动
    leaveShow() {
      if(this.$route.name === 'search')
      this.show = false
    }
  },
  mounted() {
    // 控制三级联动显示隐藏
    if(this.$route.name === 'home') {
      this.show = true
    }
    else if(this.$route.name === 'search') {
      this.show = false
    }
    
  },
  computed:{
    ...mapState({categoryList:state => state.home.categoryList})
  }
}
</script>

<style scoped lang="less">
 .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                   
                   .item:hover {
                     background-color: skyblue;
                    } 
                }
            }

            // 过渡动画的样式
            .sort-enter-active, .sort-leave-active{
              transition: opacity .1s;
            }
            .sort-enter,.sort-leave-to{
              opacity: 0;
            }
        }
    }
</style>