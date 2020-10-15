<template>
  <div class="container">

    <div class="body">
      <div v-if="result && result.address && result.address === key" class="img_content">
        <p>恭喜您，您所在小区可参与本次福利活动，请扫描下放二维码下载领取！</p>
        <img class="thumbnail" src="../assets/images/qrcode.jpeg" alt="">
        <h3 style="color: #000; text-align: center;">
          <span style="color: #666; font-size: 20px; line-height: 1.6">{{ result.area }}</span><br>
          {{ result.address }}
          </h3>
      </div>
      <div v-else-if="list.length > 0">
          <ul class="list-group">
            <li class="list-group-item" v-for="({ address, area, index}, idx) of list" :key="idx" @click="itemClickHandler(index)">
              <span class="badge">{{ area }}</span>
              {{ address }}
            </li>
          </ul>
      </div>
      <h3 v-else class="no-data">
        <template v-if="key">
          十分抱歉，您所在小区暂时不能参与本次活动，详情咨询主办方！
        </template>
        <template v-else>
          先通过输入框查询自己的小区哦
        </template>
      </h3>
    </div>

    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-xs-12">
          <input type="text" ref="input" autocomplete="off" v-model="key" class="form-control" id="inputEmail3" placeholder="请输入您所在小区" @focus="inputFocusHandler">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { addresses } from '../data.json'
export default {
  data() {
    return {
      key: '',
      index: -1
    }
  },
  computed: {
    list() {
      if (this.key) {
        return addresses.map(({address, area}, index) => ({ address, area, index })).filter(({ address, index }) => new RegExp(this.key).test(address))
      }
      return []
    },
    result() {
      return addresses[this.index]
    }
  },
  methods: {
    inputFocusHandler() {
      this.$refs.input.select()
    },
    itemClickHandler(index) {
      this.index = index
      this.key = this.result.address
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.focus()
    })
  }
}
</script>

<style>
html, body {
  height: 100%;
  overflow: hidden;
}
.container {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.body {
  flex: 1;
  overflow: auto;
}
.container {
  padding-top: 10px;
}

.thumbnail {
  width: 50vw;
  max-width: 350px;
}

.img_content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.no-data {
  height: 100%;
  padding: 0 30px;
  text-align: center;
  display: flex;
  line-height: 1.4;
  justify-content: center;
  align-items: center;
}

h3 {
  margin: 0;

  color: #666;
}

p {
  font-size: 18px;
  padding: 0 15px;
  text-align: center;
}
</style>
