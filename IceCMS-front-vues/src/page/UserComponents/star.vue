<template>
  <div class="home">
    <div class="createPost-container app-top">
      <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
        <sticky :z-index="10" :class-name="'sub-navbar ' + postForm.status">
          <CommentDropdown v-model="postForm.commentDisabled" />
          <PlatformDropdown v-model="postForm.platforms" />
          <SourceUrlDropdown v-model="postForm.source_uri" />
          <el-button :loading="loading" style="margin-left: 10px" type="success" @click="submitForm(true)">
            提交
          </el-button>
          <el-button :loading="loading" type="warning" @click="submitForm(false)">
            草稿
          </el-button>
        </sticky>
        <div class="createPost-main-container">
          <el-row>
            <Warning />
            <el-col :span="24">
              <el-form-item style="margin-bottom: 40px" prop="title">
                <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                  标题
                </MDinput>
              </el-form-item>
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label-width="60px" label="简介:">
                      <el-input v-model="postForm.intro" :rows="1" type="textarea" class="article-textarea" autosize
                                placeholder="简单介绍一下吧" />
<!--                      <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>-->
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label-width="120px" label="发布时间:" class="postInfo-container-item">
                      <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                      placeholder="选择日期和时间" :picker-options="pickerOptions"   />
                    </el-form-item>
                  </el-col>
<!--                  <el-col :span="6">-->
<!--                    <el-form-item label-width="90px" label="重要性:" class="postInfo-container-item">-->
<!--                      <el-rate v-model="postForm.ownerTag" :max="3" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"-->
<!--                               :low-threshold="1" :high-threshold="3" style="display: inline-block" />-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label-width="60px" label="分类:" class="postInfo-container-item" prop="class">
                <el-select v-model="postForm.sortClass" default-first-option placeholder="选择分类">
                  <el-option v-for="item in ClassListOptions" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label-width="60px" label="标签:">
                <el-drag-select v-model="value" style="width: 400px" multiple placeholder="选择标签">
                  <el-option v-for="item in options" :key="item.id" :label="item.tagName" :value="item.id" />
                </el-drag-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="发布内容">
              <el-input type="textarea" v-model="postForm.content"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
              <span v-show="contentLength">{{ contentLength }}字符</span>
          </el-row>
          <h4>生成图片文字(根据所填写标题)</h4>
          <el-switch v-model="isCreate" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          <h4>上传轮播图</h4>
          <el-form-item prop="image_uri" style="margin-bottom: 30px">
            <Upload :foriscreate="this.isCreate" :fortitle="this.postForm.title" :forcontent="this.postForm.intro"
                    v-model="postForm.thumb" />
          </el-form-item>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2mb</div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>

import {validURL} from '@/utils/validate'
import {Todate} from '@/utils/date.js'

import ElDragSelect from '@/components/DragSelect' // base on element-ui
import Upload from '@/components/Upload/SingleImage'
import Sticky from '@/components/Sticky' // 粘性header组件
import Warning from '@/admin/components/Warning'
import {CommentDropdown, PlatformDropdown, SourceUrlDropdown} from '@/admin/components/Dropdown'
import {createArticle, getArticleById} from '@/api/article'
import {getAllClassName, getClassNameById} from "@/api/articleClass"
import {getAllTag} from "@/api/alltag";
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import {getUser} from "@/utils/userUtils";
import {getListRespData, getListRespTotal, getResultRespCode, getResultRespData} from "@/utils/respUtils";



export default {
  components: { ElDragSelect, Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          })
          callback(new Error(rule.field + '为必传项'))
        } else {
          callback()
        }
      }
      const listRule = (rule, value, callback) => {
        if (this.postForm.author === '' || this.postForm.author === undefined || this.postForm.author === null) {
          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          })
          callback(new Error(rule.field + '为必填字段'))
        } else {
          callback()
        }
      }
      const validateSourceUri = (rule, value, callback) => {
        if (value) {
          if (validURL(value)) {
            callback()
          } else {
            this.$message({
              message: '外链url填写不正确',
              type: 'error'
            })
            callback(new Error('外链url填写不正确'))
          }
        } else {
          callback()
        }
      }
      return {
        isCreate: false,
        options: [],
        value: [],
        postForm: {
          status: 'draft',
          title: '', // 文章题目
          content: '', // 文章内容
          intro: '', // 文章摘要
          source_uri: '', // 文章外链
          // ima_url: '', // 文章图片
          createTime: undefined, // 前台展示时间
          id: undefined,
          platforms: ['a-platform'],
          commentDisabled: false,
          ownerTag: 0
        },
        loading: false,
        userListOptions: [],
        ClassListOptions: [],
        rules: {
          image_uri: [{ validator: validateRequire }],
          title: [{ validator: validateRequire }],
          authorId: [{ validator: listRule }],
          content: [{ validator: validateRequire }],
          source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
        },
        tempRoute: {},
        pickerOptions: {
          disabledDate(time) {
            // 禁用小于当前时间的日期
            // return time.getTime() < Date.now() - 86400000; // 86400000 是一天的毫秒数，这里可以根据需要调整
            // 如果你想要禁用包括当前分钟之前的所有时间，可以这样写：
            return time.getTime() < new Date().getTime();
          }
        }
      }
    },
    computed: {
      contentShortLength() {
        return this.postForm.intro.length
      },
      contentLength(){
        return this.postForm.content.length
      },
      displayTime: {
        get() {
          return (+new Date(this.postForm.createTime))
        },
        set(val) {
          this.postForm.createTime = new Date(val)
          this.postForm.createTime = Todate(this.postForm.createTime)
        }
      }
    },
    created() {
      this.user = getUser();
      if(this.user==null){
        this.$notify({
          title: '请先登录',
          message: '请先登录',
          type: 'error',
          duration: 2000
        })
        this.$router.push({ path: '/login' })
      }
      this.getRemoteUserList()
      //获取标签列表
      this.getRemoteTagList()
      this.tempRoute = Object.assign({}, this.$route)
    },
    methods: {
      submitForm(sign) {
        this.postForm.keyword = JSON.stringify(this.value)
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.loading = true
            if(sign){
              this.postForm.status = 'published'
            }else{
              this.postForm.status = 'draft'
            }
            this.createArticleFunc()
          } else {
            this.loading = false
            console.log('error submit!!')
            return false
          }
        })
      },
      createArticleFunc(){
        createArticle(this.postForm).then(resp => {
          const code = getResultRespCode(resp)
          const data = getResultRespData(resp)
          //做一个简单的返回数据判断
          if (code === 200) {
            this.$notify({
              title: '成功',
              message: '发布文章成功',
              type: 'success',
              duration: 2000
            })
            //返回一个此文章的id给本页
            this.postForm.id = data
            this.postForm.status = 'published'
            this.loading = false
          } else {
            console.log("保存失败")
          }
        })
          .catch((e) => {
            console.log('error submit!!')
            this.postForm.status = 'draft'
            this.loading = false
            this.$notify.error({
              title: '失败',
              message: '请检查网络连接',
            })
            return false
          })
      },
      getRemoteUserList(query) {
        getAllClassName().then(resp => {
          this.ClassListOptions = getListRespData(resp)
        })
      },
      getRemoteTagList() {
        getAllTag().then(response => {
          this.options = getListRespData(response)
        })
      }
    }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
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
