import Vue from 'vue'
import Vuex from 'vuex'
// import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

export default new Vuex.Store({
    // state 中存放的就是全局共享的数据
    state: {
        playlist:[
            {al:{},}
        ],
        glabledata:
          {
        glableBeian: "",
        glableBanquan:"",
        glableCommentShow:"",
        glableSitTitle:"",
        glableSieLogo:"",
        glableImageFormat:"",
        count:0,
        isLoggedIn: false,
        userInfo: {} // 你可以在这里存储用户的详细信息
      },
  },
  getters : {
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      avatar: state => state.user.avatar,
      name: state => state.user.name,
      visitedViews: state => state.tagsView.visitedViews,
      cachedViews: state => state.tagsView.cachedViews,
      isLogged: (state) => state.glabledata.isLoggedIn,
      loggedUser: (state) => state.glabledata.userInfo
  },
  // Mutation 用户变更Store数据
  mutations: {
      // 用来修改state中的playlist
      setPlaylist:function (state,value) {
        state.playlist.glableBeian = value
      },
      add(state){
        state.count++
      },
      glabledata:function (state,index) {
          state.glabledata.glableBeian = index.beian
          state.glabledata.glableBanquan = index.banquan
          state.glabledata.glableCommentShow = index.comment_show
          state.glabledata.glableSitTitle = index.sitTitle
          state.glabledata.glableSieLogo = index.sitLogo
          state.glabledata.glableImageFormat = index.imageFormat
      },
      setLogin:function (state,payload){
        const login = payload.sign
        const userInfo = payload.data
        state.glabledata.isLoggedIn=login
        state.glabledata.userInfo=userInfo
      }
    },
    // 定义了一个action，用于查询接口数据
    actions: {
        glabledata(context, index) {
          context.commit('glabledata', index);
        },
    },
    modules: {
        app,
        settings,
        tagsView
    },
  })


