<template>
  <el-row align="middle" class="header">
    <el-col :span="5">
      <img :src="hot" class="logo" />
      <span class="title">时事热点</span>
    </el-col>
    <el-col :span="13">
      <el-input
        v-model="searchKey"
        @focus="focus"
        @blur="blur"
        @keyup="onInputKeyup"
        class="search-input"
        placeholder="请输入想要搜索的内容哦～"
        :prefix-icon="Search"
        size="large"
        :clearable="true"
      />
      <img
        :src="toukan"
        class="toukan"
        :style="{ opacity: isShowPic ? 0.2 : 0 }"
      />
    </el-col>
    <el-col :span="6" style="justify-content: flex-end; padding-right: 20px">
      <a href="https://carlblog.site/" target="_blank" rel="noreferrer">
        <img :src="me" class="nav-logo me" />
      </a>
      <a href="https://github.com/yyISACoder" target="_blank" rel="noreferrer">
        <svg
          height="32"
          aria-hidden="true"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          data-view-component="true"
          class="octicon octicon-mark-github v-align-middle"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
      </a>
      <a
        href="https://juejin.cn/user/712139266332670"
        target="_blank"
        rel="noreferrer"
      >
        <img :src="juejin" class="nav-logo" />
      </a>
      <a href="https://www.npmjs.com/~yinyue" target="_blank" rel="noreferrer">
        <img :src="npm" class="nav-logo" />
      </a>
    </el-col>
  </el-row>
  <div v-loading="isLoadingNews" class="nav-container">
    <el-row :gutter="12" class="card-row">
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="ysw" />
              <span>央视网</span>
            </div>
          </template>
          <ul class="card-ul">
            <li v-for="(item, index) in yswList" :key="item.id">
              <span class="index">{{ index + 1 }}</span>
              <a :href="item.url" target="_blank" rel="noreferrer">{{
                item.title
              }}</a>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="zhihu" />
              <span>知乎</span>
            </div>
          </template>
          <ul class="card-ul">
            <li v-for="(item, index) in zhihuList" :key="item.id">
              <span class="index">{{ index + 1 }}</span>
              <a :href="item.target.url" target="_blank" rel="noreferrer">{{
                item.target.title
              }}</a>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="tt" />
              <span>今日头条</span>
            </div>
          </template>
          <ul class="card-ul">
            <li v-for="(item, index) in ttList" :key="item.id">
              <span class="index">{{ index + 1 }}</span>
              <a :href="item.url" target="_blank" rel="noreferrer">{{
                item.title
              }}</a>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="tx" />
              <span>腾讯新闻</span>
            </div>
          </template>
          <ul class="card-ul">
            <li v-for="(item, index) in txList" :key="item.article_id">
              <span class="index">{{ index + 1 }}</span>
              <a :href="item.url" target="_blank" rel="noreferrer">{{
                item.title
              }}</a>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="card-row">
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="bilibili" />
              <span>哔哩哔哩</span>
            </div>
          </template>
          <ul class="card-ul">
            <li v-for="(item, index) in bilibiliList" :key="item.aid">
              <span class="index">{{ index + 1 }}</span>
              <a :href="item.short_link" target="_blank" rel="noreferrer">{{
                item.title
              }}</a>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="juejin" />
              <span>掘金</span>
            </div>
          </template>
          <ul class="card-ul" v-infinite-scroll="loadJuejin">
            <li
              v-for="(item, index) in juejinList"
              :key="
                item.item_info.id
                  ? item.item_info.id
                  : item.item_info.article_id
              "
            >
              <span class="index">{{ index + 1 }}</span>
              <a
                :href="
                  item.item_info.id
                    ? item.item_info.url
                    : item.item_info.article_info.link_url
                "
                target="_blank"
                rel="noreferrer"
                >{{
                  item.item_info.id
                    ? item.item_info.title
                    : item.item_info.article_info.title
                }}</a
              >
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="nba" style="width: 16px" />
              <span>NBA</span>
            </div>
          </template>
          <ul class="card-ul">
            <li v-for="(item, index) in nbaList" :key="item.news_id">
              <span class="index">{{ index + 1 }}</span>
              <a
                :href="`https://china.nba.cn/article/index.htm?articleId=${item.news_id}&column=&exposure_page=&exposure_module=`"
                target="_blank"
                rel="noreferrer"
                >{{ item.title }}</a
              >
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="wb" />
              <span>微博</span>
            </div>
          </template>
          <ul class="card-ul">
            <li v-for="(item, index) in wbList" :key="item.word">
              <span class="index">{{ index + 1 }}</span>
              <a
                :href="'https://s.weibo.com/weibo?q=%23' + item.word + '%23'"
                target="_blank"
                rel="noreferrer"
                >{{ item.word }}</a
              >
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="card-row" style="margin-bottom: 30px">
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAADoUlEQVRIx8WXT2gcVRzHP++9mc3O/pnuJhttUpqCpVhp40VxDz2IHhooIhUq4kE96MEcol6sBxE8CEIrolDTINSDeij+ab310iJoVRTFf4RApNatYatt/m+S3Z0/73nYP9lks2Zj0viFYWYY3vu87+/Pmxn4nyRqF/Pf7lHAYPXYD8gtYmhgDBgBTrvZXFgHV6EfA4/cYqPngUfdbC6suRrcBihVxiAsh3NwG6A1PdsI3r+N4LsArOpNy0LSIXx3yWfsF5/CrCYWg4P9Fvcc7sDuEG2RVkk2gpvke4b3hz1OXSyh4ymSyS7sSASmBcXxRfwzMxztKfL8ay5u18YbYM0R168ajjw+zxtfKEhlUBEb32i8MCA0GieRIN23h0tiL4efKjL6pbdhcJPj/G9wdGiSvAdBsITRenmVStERjRJLJIgnk0ipUD29PHnyLz5L+ezut9sG1/rYABSmYeCJSa7MldcPlVI4iQROPI6SCnd+hs8/dbGd9fPuZnNiRaiPv1xoCwqgw5DFuTn6r0/hT04yoeHEi7NtO66Dv/6pzLlf59seWNNgYPP9zhQXYw57xxVBXrc1rp5jo+H4sRSx0CLwQv6+ETCe8/jhpseCMS0nuCx87lWC3tscHk51ELxbxHo1ui54RY7XkrdkOPtWgZMXFrhRXcABo9hlBD+LkN1IPkqnkX1xjDGY3CLO2xHkvtYt5mZzYl1wTTP5kGeenuJywWdA2wyHDgBTGLqkRB7cUYlfOUA4RZxTsYZ3XzO47c5P9yrOnuvmgZTNn2I5j10I0AY9sQjGgC3R1xTBBf9f59vQlmM7gvc+zBBfq2WmfZj1wRjE7Tbld3z0H60LbcN7XSwlGX6zk4VkM1xfK2JKIQAiE6E4VCQcDbcGDNB3t03mlTUqNzSY34uYkgYFotOm+FIZ74MQs1RbXeVktU1bJet+C/uYjf/Jqlz6BnOlBDstxA6J7LEIvtEEP0rIWMiE+u+Oa+p4IYq6TzU/0AaT99ETAWYJjJBgS0Q5gj2wiVDXZUP0hIP14BqBi0iEo0BaCCsCdhR7QKPu9DYX6pqEI4i+7hB8FeCf8SrFFJWIhAWuhXAt5D5F5IiPvCNYTlUtOJt1bx2ysA5ZmJsGfdVgSgKRFshdBtG54n2tG8FjwIHNugcQ3QLV3dhqTZviGA0uR7YC2qZGGsGnqXxs32qdr7IqYDebC8vOQ4+BeA4Ypd7mWyJdnXOI6l/ENhhsrX8A1lhFeWM56dEAAAAASUVORK5CYII="
              />
              <span>搜狐新闻</span>
            </div>
          </template>
          <ul class="card-ul">
            <li v-for="(item, index) in shList" :key="item.resourceData.id">
              <span class="index">{{ index + 1 }}</span>
              <a
                :href="
                  'https://news.sohu.com' + item.resourceData.contentData.url
                "
                target="_blank"
                rel="noreferrer"
                >{{ item.resourceData.contentData.title }}</a
              >
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="wx" />
              <span>微信</span>
            </div>
          </template>
          <ul class="card-ul">
            <li v-for="(item, index) in wxList" :key="item.index">
              <span class="index">{{ index + 1 }}</span>
              {{ item.word }}
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="baidu" />
              <span>百度</span>
            </div>
          </template>
          <ul class="card-ul">
            <li v-for="(item, index) in baiduList" :key="item.index">
              <span class="index">{{ index + 1 }}</span>
              {{ item.brief }}
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <img :src="dy" style="width: 27px" />
              <span>抖音</span>
            </div>
          </template>
          <ul class="card-ul">
            <li v-for="(item, index) in dyList" :key="item.word">
              <span class="index">{{ index + 1 }}</span>
              {{ item.word }}
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
    <div id="commentBox"></div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    width="90%"
    :show-close="false"
    :destroy-on-close="true"
  >
    <template #header>
      <img :src="bing" style="width: 120px" />
    </template>
    <template #footer>
      <el-row>
        <el-col :span="2" :offset="22">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </el-col>
      </el-row>
    </template>
    <iframe :src="iframeSrc" style="width: 100%; height: 600px"></iframe>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import valine from 'valine'
import axios from 'axios'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import request from '../utils/request'
import bing from '../assets/images/bing.jpeg'
import hot from '../assets/images/hot.png'
import baidu from '../assets/images/baidu.png'
import wb from '../assets/images/wb.png'
import wx from '../assets/images/wx.png'
import tt from '../assets/images/tt.png'
import dy from '../assets/images/dy.jpeg'
import zhihu from '../assets/images/zhihu.png'
import toukan from '../assets/images/toukan.jpeg'
import bilibili from '../assets/images/blibli.jpeg'
import juejin from '../assets/images/juejin.jpeg'
import tx from '../assets/images/tx.jpeg'
import ysw from '../assets/images/ysw.jpeg'
import nba from '../assets/images/nba.jpeg'
import npm from '../assets/images/npm.jpeg'
import me from '../assets/images/me.jpeg'
import { apiKey } from '../utils/const'

const searchKey = ref('')
const juejinCursor = ref('0')
const isShowPic = ref(false)
const baiduList = ref([])
const wxList = ref([])
const wbList = ref([])
const dyList = ref([])
const ttList = ref([])
const zhihuList = ref([])
const bilibiliList = ref([])
const txList = ref([])
const juejinList = ref([])
const shList = ref([])
const yswList = ref([])
const nbaList = ref([])
const dialogVisible = ref(false)
const isLoadingNews = ref(false)
const iframeSrc = computed(() => {
  return `https://cn.bing.com/search?q=${encodeURIComponent(searchKey.value)}`
})

const focus = () => {
  isShowPic.value = true
}
const blur = () => {
  isShowPic.value = false
}
const onInputKeyup = (e) => {
  if (e.code === 'Enter') {
    dialogVisible.value = true
  }
}

const getRecommondList = () => {
  isLoadingNews.value = true
  Promise.all([
    request({
      url: 'https://api.tianapi.com/nethot/index',
      method: 'get',
      params: {
        key: apiKey
      }
    }),
    request({
      url: 'https://api.tianapi.com/wxhottopic/index',
      method: 'get',
      params: {
        key: apiKey
      }
    }),
    request({
      url: 'https://carlblog.site/weibo/ajax/statuses/hot_band',
      method: 'get'
    }),
    request({
      url: 'https://api.tianapi.com/douyinhot/index',
      method: 'get',
      params: {
        key: apiKey
      }
    }),
    request({
      url: 'https://api.tianapi.com/topnews/index',
      method: 'get',
      params: {
        key: apiKey,
        num: 50,
        page: 1
      }
    }),
    request({
      url: 'https://carlblog.site/zhihu/api/v3/feed/topstory/hot-lists/total',
      method: 'get',
      params: {
        key: apiKey,
        limit: 50,
        desktop: true
      }
    }),
    request({
      url: 'https://carlblog.site/blibli/x/web-interface/popular',
      method: 'get',
      params: {
        ps: 50,
        pn: 1
      }
    }),
    request({
      url: 'https://carlblog.site/juejin/recommend_api/v1/article/recommend_all_feed?aid=2608&uuid=6968122106504840743',
      method: 'post',
      data: {
        cursor: juejinCursor.value,
        limit: 20
      }
    }),
    request({
      url: 'https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/list?sub_srv_id=24hours&srv_id=pc&offset=0&limit=50&strategy=1&ext={%22pool%22:[%22top%22],%22is_filter%22:7,%22check_type%22:true}',
      method: 'get'
    }),
    request({
      url: 'https://cis.sohu.com/cis/feeds',
      method: 'post',
      data: {
        clientType: 3,
        pvId: '210731175536EJTE',
        requestId: '1654336628568_BtHpQnw',
        refererSpm: 'smpc.news-home.hotnews-daily',
        refererPath: '/',
        referSpm: '',
        referPath: '/link',
        sceneParam: [{ page: 1, size: 50, spm: 'smpc.news-home.hotnews-daily' }]
      }
    }),
    request({
      url: 'https://china.nba.cn/cms/v1/news/list?column_id=8&page_size=50&page_no=1&team_ids=&last_time=&app_key=tiKB2tNdncnZFPOi&os_type=3&os_version=10.0&app_version=1.0.0&install_id=202111201544&network=wifi&t=1654397401088&device_id=d1cc35e095b11e9be5c3473839e13367&channel=&sign=84039511a09d37d25f91ce5911f76107',
      method: 'get'
    })
  ])
    .then(
      ([
        { data: baidu },
        { data: wx },
        { data: wb },
        { data: dy },
        { data: tt },
        { data: zh },
        { data: blibli },
        { data: juejin },
        { data: tx },
        { data: sh },
        { data: nba }
      ]) => {
        isLoadingNews.value = false
        baidu.newslist.forEach((item) => {
          item.brief = item.brief.replace('查看更多&gt;', '')
          if (!item.brief) {
            item.brief = item.keyword
          }
        })
        baiduList.value = baidu.newslist

        wxList.value = wx.newslist
        wbList.value = wb.data.band_list
        dyList.value = dy.newslist
        ttList.value = tt.newslist
        bilibiliList.value = blibli.data.list
        juejinList.value = juejin.data
        juejinCursor.value = juejin.cursor
        txList.value = tx.data.list
        shList.value = sh['smpc.news-home.hotnews-daily'].data
        nbaList.value = nba.data

        zh.data.forEach((item) => {
          item.target.url = item.target.url.replace('api.', '')
          item.target.url = item.target.url.replace('questions', 'question')
        })
        zhihuList.value = zh.data
      }
    )
    .catch(() => {
      isLoadingNews.value = false
    })
}
const getYswJSONP = () => {
  axios(
    'https://carlblog.site/ysw/2019/07/gaiban/cmsdatainterface/page/news_1.jsonp?cb=news'
  )
    .then(({ data }) => {
      data = JSON.parse(data.replace(/^news\(/, '').replace(/\)$/, '')).data
        .list
      yswList.value = data
    })
    .catch(() => {
      ElMessage.error('网络发生错误啦～')
    })
}
const loadJuejin = () => {
  request({
    url: 'https://carlblog.site/juejin/recommend_api/v1/article/recommend_all_feed?aid=2608&uuid=6968122106504840743',
    method: 'post',
    data: {
      cursor: juejinCursor.value,
      limit: 20
    }
  }).then(({ data: { data, cursor } }) => {
    juejinCursor.value = cursor
    juejinList.value.push(...data)
  })
}

onMounted(() => {
  getRecommondList()
  getYswJSONP()

  new valine({
    el: '#commentBox',
    appId: 'oK2pE7mWECKa5Ny2ELGVXtCT-gzGzoHsz',
    appKey: 'I2mCg7MUsrx7Y7PlP253NoLp',
    placeholder:
      '如果你有任何对于该应用的意见和想法，欢迎留言👏，我会据此做持续优化的😄'
  })
})
</script>
<style lang="scss" scoped>
.header {
  background-color: #f3f3f3;
  height: 64px;
  .logo {
    height: 28px;
    margin: 0 6px 0 20px;
  }
  .nav-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-left: 12px;
  }
  .nav-logo.me {
    margin: 0 12px 0 0;
  }
  .title {
    color: #4a4a4a;
  }
  .home {
    font-size: 20px;
    color: #3d3d39bd;
    cursor: pointer;
    display: inline-block;
    margin-left: 65px;
  }
  .toukan {
    width: 60px;
    opacity: 0.2;
    margin-left: 5px;
    transition: all 0.4s linear;
  }
}
.nav-container {
  padding: 20px;
  .card-header {
    display: flex;
    align-items: center;
    span {
      color: #1a1a1a;
      font-size: 18px;
      font-weight: 700;
    }
    img {
      margin-right: 5px;
      height: 25px;
      border-radius: 50%;
    }
  }
  .card-ul {
    max-height: 330px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    li {
      line-height: 24px;
      display: flex;
      color: #1a1a1a;
      font-size: 16px;
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
      a {
        color: #1a1a1a;
      }
      a:hover {
        text-decoration: underline;
        color: #6d6de6;
      }
      .index {
        color: #999;
        margin-right: 10px;
      }
    }
  }
  .card-row {
    margin-bottom: 12px;
  }
}
</style>
