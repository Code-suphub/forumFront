<template>
    <div class="home">
        <div class="chat-container">
            <div class="friend-list">
                <el-card>
                    <el-input placeholder="搜索好友" v-model="searchText" clearable></el-input>
                    <el-menu :default-active="activeFriendId" class="friend-menu" router>
                        <el-menu-item v-for="friend in filteredFriends" :key="friend.userId"
                            @click="selectFriend(friend)">
                            <el-avatar :src="friend.avatar" size="medium" class="friend-avatar"></el-avatar>
                            <span>{{ friend.nickName }}</span>
                        </el-menu-item>
                    </el-menu>
                </el-card>
            </div>
            <div class="chat-window">
                <el-card class="chat-header" v-if="activeFriend">
                    <el-avatar :src="activeFriend.avatar" size="large" class="friend-avatar"></el-avatar>
                    <span class="friend-name">{{ activeFriend.nickName }}</span>
                </el-card>
                <el-card class="chat-body">
                    <div class="message" v-for="message in getMessages" :key="message.id">
                      <div v-if="message.toUserId === user.userId">
                        <div class="message-content">
                            <div class="message-text">{{ message.msg }}</div>
                            <div class="message-time">{{ message.time }}</div>
                        </div>
                      </div>
                      <div v-else>
                        <div class="message-right" >
                          <div class="message-text">{{ message.msg }}</div>
                          <div class="message-time">{{ message.time }}</div>
                        </div>
                      </div>
                    </div>
                </el-card>
                <el-card class="chat-input" style="">
                    <div style="display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;">
                        <el-input placeholder="输入消息" v-model="messageInput" clearable></el-input>
                        <el-button type="primary" @click="sendMessage">发送</el-button>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
import { getMessageList, getChatMessages, sendChatMessage } from '@/api/webchatmessages'
import {getUser} from "@/utils/userUtils";
import {getListRespData, getResultRespCode} from "@/utils/respUtils";

export default {
    data() {
        return {
          toUserId: 1,
          user: {},
          friends: [],
          activeFriend: {},
          searchText: '',
          messageInput: '',
          messages: []
        }
    },
    created() {
      this.user = getUser()
      if(this.user==null){
        this.$notify({
          title: '错误',
          message: '请登录',
          type: 'warning'
        })
        this.$router.push({ path: '/login' })
        return
      }
      getMessageList(this.user.userId).then(response => {
        this.friends = getListRespData(response)
      })
    },
    computed: {
      activeFriendId() {
        if (this.activeFriend.userId!=null) {
          return this.activeFriend.userId.toString()
        }
        return ''
      },
      filteredFriends() {
        return this.friends.filter(friend => {
          return friend.nickName.toLowerCase().includes(this.searchText.toLowerCase())
        })
      },
      getMessages(){
        return this.messages
      }
    },
    methods: {
      selectFriend(friend) {
        this.toUserId = friend.userId
        getChatMessages(this.toUserId, this.user.userId).then(response => {
          this.messages = getListRespData(response)
        })
        this.activeFriend = friend
      },
      sendMessage() {
        if (this.messageInput==='') {
          return
        }
        const msg = this.messageInput
        const message = {
          id: this.messages.length + 1,
          text: msg,
          from: 2,
          time: new Date().toLocaleString()
        }
        sendChatMessage(this.user.userId, this.toUserId, this.messageInput).then(response => {
          if(getResultRespCode(response)===200){
            this.messages = this.messages.concat(message)
            this.messageInput = ''
          }else {
            this.$notify({
              title: '失败',
              message: '发送失败',
              type: 'warning',
              offset: 50
            });
          }
        })
      }
    }
}
</script>
<style scoped>
.chat-container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    width: 100%;
}

.friend-list {
    width: 300px;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
}

.friend-menu {
    padding: 0;
}

.friend-avatar {
    margin-right: 10px;
}

.chat-window {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.chat-header {
    display: flex;
    align-items: center;
    padding: 10px;
}

.friend-avatar {
    margin-right: 10px;
}

.friend-name {
    font-size: 20px;
}

.chat-body {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
}

.message {
  display: flex;
  margin-bottom: 10px;
  align-items: flex-start; /* 确保内容垂直对齐方式，根据需要调整 */
}

.message-content {
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #F0F0F0;
    word-wrap: break-word;
}

.message-right {
  /* align-self: flex-end; 这行可以移除，因为我们要它水平对齐到右侧 */
  background-color: #62c074;
  padding: 5px 10px;
  border-radius: 5px;
  word-wrap: break-word;
  margin-left: auto; /* 这将把.message-right推到右侧 */
  float: right;
}

.message-text {
    font-size: 16px;
}

.message-time {
    font-size: 12px;
    color: #777;
}

.chat-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
}

.el-input {
    width: 80%;
    margin-right: 10px;
}

.el-button {
    width: 35%;
}
</style>

 <style scoped>
 .site-content {
     display: flex;
     padding: 20px;
     margin-left: 43px;
     margin-right: 43px;
 }

 .usertopName {
     display: flex;
 }

 .home {
     background-color: #ffffff;
     border-radius: 13px;
 }

 .homeContent {
     margin-top: 40px;
 }
</style>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
    position: relative;
    width: 100%;
    margin-top: -26px;

    .createPost-main-container {
        padding: 40px 45px 20px 50px;

        .postInfo-container {
            position: relative;
            @include clearfix;
            margin-bottom: 10px;

            .postInfo-container-item {
                float: left;
            }
        }
    }

    .word-counter {
        position: absolute;
        right: -50px;
        top: 1px;
    }
}

.article-textarea ::v-deep {
    textarea {
        width: 100%;
        padding-right: 30px;
        resize: none;
        border: none;
        border-radius: 0px;
        border-bottom: 1px solid #bfcbd9;
    }
}

.app-top {
    padding-top: 0px !important;
}
</style>
