<template>
  <el-table :data="tableData" stripe border fit max-height="85vh" style="width: 100%; overflow-y: auto;">
    <el-table-column show-overflow-tooltip="true" align="center" type="selection" width="50"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="index" label="序号" width="60" fixed="left"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="orderNumber" label="订单号" width="180" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="productTotalPrice" label="商品总价" width="120" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="freight" label="订单运费" width="120" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="actualPayment" label="实付款" width="120" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="paymentWay" label="支付方式" width="120" sortable>
      <template #default="scope">
        <span>{{scope.row.paymentWay === 1 ? '微信' : scope.row.paymentWay === 2 ? '支付宝' : '银行卡'}}</span>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip="true" align="center" prop="createdTime" label="下单时间" width="160" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="paymentTime" label="付款时间" width="160" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="shippingTime" label="发货时间" width="160" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" fixed="right" label="操作" width="120">
      <template #default>
        <el-button link type="primary" size="small">详情</el-button>
        <el-button link type="primary" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
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

</script>

<style scoped lang="scss">

</style>
