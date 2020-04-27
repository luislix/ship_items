<template>
  <div>
    <div style="margin: 15px 15px 15px 60%;">
      <el-input placeholder="请输入内容" v-model="allValue" class="input-with-select">
        <el-select v-model="insertSheduleTab.chargingOption" slot="prepend" clearable filterable placeholder="请选择" @change="selectWorkName">
          <el-option
            v-for="item in insertSheduleTab"
            :key="item.chargingWorkId"
            :label="item.chargingOption"
            :value="item.chargingWorkId" >
          </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
      </el-input>
    </div>
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%; border: 1px solid #d3dce6"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="userType"
        label="全部"
        sortable
        width="100"
      >
        <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
      </el-table-column>
      <el-table-column
        prop="shipOrderNumber"
        label="订单编号"
        sortable
        show-overflow-tooltip
      />
      <el-table-column
        prop="userName"
        sortable
        label="用户名"
        show-overflow-tooltip
      />
      <el-table-column
        prop="mobilePhone"
        sortable
        label="联系电话"
        show-overflow-tooltip
      />
      <el-table-column
        prop="startAddress"
        sortable
        label="始发地"
        show-overflow-tooltip
      />
      <el-table-column
        prop="endAddress"
        sortable
        label="目的地"
        show-overflow-tooltip
      />
      <el-table-column
        sortable
        label="船名/MMSI"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.shipName }}</span>/
          <span>{{ scope.row.shipMmsi }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="maxRequiredWeight"
        sortable
        label="装载量"
        show-overflow-tooltip
      />
      <el-table-column
        prop="createTime"
        sortable
        label="发布时间"
        show-overflow-tooltip
      />
      <el-table-column
        prop="userSource"
        sortable
        label="端口来源"
        show-overflow-tooltip
      />
      <el-table-column
        prop="startTime"
        sortable
        label="空船开始时间"
        width="140"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="el-footer" style="margin-top: 20px">
      <div class="el-footer">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="toadd()">新增</el-button>
        <!-- <el-button type="primary" icon="el-icon-download">导入</el-button> -->
        <div class="import_btn">
          <el-upload action="http://192.168.0.129:8080/adminmanage/importByExcel/insert" :show-file-list="false" :file-list="fileList" :on-success="handleAvatarSuccess">
            <el-button type="primary" icon="el-icon-download">导入</el-button>
          </el-upload>
          <!--<input
            id="upload"
            ref="inputer"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            @change="importfxx(this)"
          >-->
        </div>
        <el-button type="primary" icon="el-icon-upload2" @click="exportExcel(this)">导出</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="toggleSelection()">删除</el-button>
      </div>
      <div style="display: flex; flex-direction: row">
        <el-pagination
          background
          layout="total, prev, pager, next,jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
        <el-button type="primary" size="mini">Go</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderPage } from '@/api/table'
import { deleteOrder } from '@/api/table'
import { inExcel } from '@/api/table'

export default {
  data() {
    return {
      pickerOptions1: {},
      total: null,
      fileUrl: '',
      list: [],
      id: '',
      insertSheduleTab: [{
        chargingWorkId: 1,
        chargingOption: '用户名'
      }, {
        chargingWorkId: 2,
        chargingOption: '订单编号'
      }, {
        chargingWorkId: 3,
        chargingOption: '联系电话'
      }, {
        chargingWorkId: 4,
        chargingOption: '始发地'
      }, {
        chargingWorkId: 5,
        chargingOption: '目的地'
      }],
      listLoading: true,
      fileList: [],
      file: '',
      allValue: '',
      orderIdList: [],
      data: {
        params: {
          userType: 3,
          userName: '',
          orderNumber: '',
          mobilePhone: '',
          startAddress: '',
          endAddress: ''
          // firstTime: '',
          // secondTime: ''
        },
        pageNum: 1
      },
      token: ''
    }
  },
  mounted() {
    this.loadData()
    this.timestampToTime()
  },
  methods: {
    selectWorkName(vId) {
      this.id = vId
    },
    toSearch() {
      switch (this.id) {
        case 1: this.data.params.userName = this.allValue; break
        case 2: this.data.params.orderNumber = this.allValue; break
        case 3: this.data.params.mobilePhone = this.allValue; break
        case 4: this.data.params.startAddress = this.allValue; break
        case 5: this.data.params.endAddress = this.allValue; break
      }
      // console.log(this.data.params.userName)
      this.loadData()
    },
    /* focus(time) {
      const aa = new Date(this.data.params.firstTime).getTime()
      this.pickerOptions1 = {
        disabledDate(time) {
          return time.getTime() < aa
        }
      }
    },*/
    handleSelectionChange(val) {
      // console.log(val[0])
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.data.pageNum = val
      this.loadData()
    },
    // 新增
    toadd() {
      this.$alert('此功能暂未完成', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
      /* this.$prompt('请输入邮箱', '添加用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })*/
    },
    // 表格导入
    // UploadFile(content) { // 上传文件
    //   const msg = new FormData()
    //   msg.append('file', content.file)
    //   // console.log(content.file)
    //   msg.append('enctype', 'multipart/form-data')
    //   console.log(msg)
    //   inExcel(msg, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //     fileType: 'xlsx' // 上传文件类型设置
    //     // token: getToken
    //   }).then(data => {
    //     console.log(data)
    //   })
    // },
    /* importfxx(obj) {
      const _this = this
      const inputDOM = this.$refs.inputer
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0]
      console.log(this.file)
      var rABS = false // 是否将文件读取为二进制字符串
      var f = this.file
      var reader = new FileReader()
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = ''
        var rABS = false // 是否将文件读取为二进制字符串
        var pt = this
        var wb // 读取完成的数据
        var outdata
        var reader = new FileReader()
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          var XLSX = require('xlsx')
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), { // 手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) // outdata就是你想要的东西
          console.log(outdata)
          this.token = getToken()
          inExcel(outdata, this.token).then(res => {
            console.log(res)
          })
        }
        reader.readAsArrayBuffer(f)
      }
      console.log(this.file)
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },*/
    handleAvatarSuccess(res, file) {
      // this.file = res.name
      console.log(res)
      return
      // console.log(res)
      // console.log('file',file)
      this.file = file.name
      this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(this.obj);
      let name = file.name
    },
    /* UploadFile(content) { // 上传文件
      /!* const msg = new FormData()
      msg.append('file', content.file)
      // console.log(content.file)
      msg.append('enctype', 'multipart/form-data')
      console.log(msg)
      inExcel(msg, {
        headers: { 'Content-Type': 'multipart/form-data' },
        fileType: 'file' // 上传文件类型设置
      }).then(data => {
        console.log(data)
      })*!/
      inExcel
    },*/
    // 导出
    exportExcel: function() { // 兼容ie10哦！
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../vendor/Export2Excel') // 引入文件
        const tHeader = ['全部', '订单编号', '用户名', '联系电话', '始发地', '目的地', '船名/MMSI', '装载量', '发布时间', '端口来源', '空船开始时间', '空船结束时间'] // 将对应的属性名转换成中文
        const filterVal = ['userType', 'shipOrderNumber', 'userName', 'mobilePhone', 'startAddressHistoryDtoList[0].cityName', 'endAddressHistoryDtoList[0].cityName', 'shipName', 'maxRequiredWeight', 'createTime', 'userSource', 'startTime', 'endTime'] // table表格中对应的属性名
        const list = this.list // this.sels就是你想要导出的数据[{userName: '1001', realName: '张三'}]
        console.log(list)
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '船主订单列表')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    toggleSelection() {
      if (this.$refs.multipleTable.selection.length) {
        this.orderIdList = this.$refs.multipleTable.selection.map(item => {
          return item.emptyShipOrderId
        })
        console.log(this.orderIdList)
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrder(this.data.params.userType, this.orderIdList).then(function() {
            console.log('ok')
          })
          location.reload()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message('请选择用户')
      }

    // console.log(this.userId)
    },
    loadData() {
    // console.log('hh')
      getOrderPage(this.data).then(response => {
        this.total = response.data.total
        this.list = response.data.list
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].userType = '船主'
          this.list[i].startTime = this.timestampToTime(this.list[i].startTime)
          this.list[i].endTime = this.timestampToTime(this.list[i].endTime)
          this.list[i].createTime = this.timestampToTime(this.list[i].createTime)
          if (this.list[i].userSource === 0) {
            this.list[i].userSource = 'APP登录'
          }
        }
        // console.log(this.list)
      })
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // console.log(date)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return Y + M + D
    }
  }
}
</script>

<style lang='scss' scoped>
  .el-select{
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  el-button {
    padding: 6px 20px;
  }

  .el-footer {
    display: flex;
    justify-content: space-between;
  }

  .el-table {
    padding: 0;
  }

  .import_btn {
    width: 89px;
    margin: 0 10px;
  }
</style>
