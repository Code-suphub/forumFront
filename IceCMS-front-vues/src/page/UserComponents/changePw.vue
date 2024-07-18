<template>
  <div class="home">
    <div class="homeContent">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="原密码：">
                    <el-input style="width: 220px" placeholder="请输入密码"
                              v-model="form.oldPassword" show-password>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="新密码：">
                    <el-input style="width: 220px" placeholder="请输入密码"
                              v-model="form.newPassword" show-password
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="确认密码:">
                    <el-input style="width: 220px" placeholder="请输入密码"
                              v-model="form.repeatPassword" show-password
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { changePassword } from '@/api/user'
import { getUser } from "@/utils/userUtils";
import {getResultRespCode, getResultRespData, getResultRespMsg} from "@/utils/respUtils";

export default {
  data() {
    return {
      user: {},
      form: {
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
      }
    }
  },
  created() {
    this.user = getUser()
    if (this.user===null){
      this.$router.push('/login')
    }
  },
  methods: {
    onSubmit() {
      if (this.form.newPassword !== this.form.repeatPassword) {
        this.$notify({
          title: '失败',
          message: '两次输入密码不一致请重新输入',
          type: 'warning',
          offset: 50
        });
        this.form.newPassword = ''
        this.form.repeatPassword = ''
      }
      changePassword(this.user.token, this.form.oldPassword, this.form.newPassword, this.user.userId ).then(resp => {
        const code = getResultRespCode(resp)
        const data = getResultRespData(resp)
        const msg = getResultRespMsg(resp)
        if(code === 400){
          this.$notify({
            title: '失败',
            message: msg,
            type: 'warning',
            offset: 50
          });
        } else {
          //显示成功
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            offset: 50
          });
        }
      })
    },
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
