<template>
  <div style="height: 80vh">
    <el-container>
      <el-header>
        <el-row :gutter="10" style="margin-top: 3px">
          <el-col :span="4">
            <el-input size="small" placeholder="订单号"></el-input>
          </el-col>
          <el-col :span="8">
            <el-date-picker
                v-model="times"
                type="datetimerange"
                range-separator="到"
                size="small"
                start-placeholder="Start date"
                end-placeholder="End date"
            />
          </el-col>
          <el-col :span="4">
            <el-button size="small" type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="tableData" stripe border fit max-height="80vh" style="width: 100%; overflow-y: auto;">
          <el-table-column align="center" type="selection" width="50"/>
          <el-table-column align="center" prop="index" label="序号" width="60" fixed="left"/>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="orderNumber" label="订单号" width="180" sortable/>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="productTotalPrice" label="商品总价" width="120" sortable/>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="freight" label="订单运费" width="120" sortable/>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="actualPayment" label="实付款" width="120" sortable/>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="paymentWay" label="支付方式" width="120" sortable>
            <template #default="scope">
              <span>{{scope.row.paymentWay === 1 ? '微信' : scope.row.paymentWay === 2 ? '支付宝' : '银行卡'}}</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="createdTime" label="下单时间" width="160" sortable/>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="paymentTime" label="付款时间" width="160" sortable/>
          <el-table-column :show-overflow-tooltip="true" align="center" prop="shippingTime" label="发货时间" width="160" sortable/>
          <el-table-column :show-overflow-tooltip="true" align="center" fixed="right" label="操作" width="120">
            <template #default>
              <el-button link type="primary" size="small">详情</el-button>
              <el-button link type="primary" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[50, 100, 200, 300]"
            :small="small"
            :disabled="disabled"
            :background="background"
            style="margin-left: 10px; margin-top: 3px"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

const tableData = ref<any>([]);
function generatorOrderList():void {
  for (let i = 0; i < 30; i++) {
    const item = {
      index: i + 1,
      orderNumber: '2024030910000000' + i,
      productTotalPrice: 2290 + i,
      freight: 0,
      actualPayment: 2290 + i,
      paymentWay: i % 2 === 0 ? 1 : i % 3 === 0 ? 2 : 0,
      createdTime: '2024-03-09 15:27:' + (i < 10 ? '0' + i : i),
      paymentTime: '2024-03-09 15:27:' + (i < 10 ? '0' + i : i),
      shippingTime: '2024-03-09 18:30:' + (i < 10 ? '0' + i : i)
    };
    tableData.value.push(item);
  }
}
generatorOrderList();

const times = ref<[Date, Date]>([
  new Date(2024, 3, 1, 0, 0, 0),
  new Date(2024, 3, 15, 23, 59, 59),
]);

const currentPage = ref(1);
const pageSize = ref(50);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<style scoped lang="scss">
.el-header {
  --el-header-padding: 0;
  --el-header-height: 4vh;
  padding: var(--el-header-padding);
  height: var(--el-header-height);
}
.el-main {
  --el-main-padding: 0;
  padding: var(--el-main-padding);
}
.el-footer {
  --el-footer-padding: 0;
  --el-footer-height: 4vh;
  padding: var(--el-footer-padding);
  height: var(--el-footer-height);
}
</style>
