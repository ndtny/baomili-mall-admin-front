<template>
  <el-table :data="tableData" stripe border fit max-height="85vh" style="width: 100%; overflow-y: auto;">
    <el-table-column show-overflow-tooltip="true" align="center" type="selection" width="50"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="index" label="序号" width="60" fixed="left"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="productNumber" label="商品编码" width="120" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="productName" label="商品名称" width="120" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="productBrandName" label="商品品牌" width="120" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="productCategoryName" label="商品分类" width="120" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="productPicture" label="商品图片" width="120"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="publishStatus" label="上架状态" width="120" sortable>
      <template #default="scope">
        <el-tag :type="scope.row.publishStatus === 1 ? 'success':'warning'">
          <span>{{ scope.row.publishStatus === 1 ? '已上架' : '未上架' }}</span>
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip="true" align="center" prop="newProductStatus" label="是否新品" width="120" sortable>
      <template #default="scope">
        <el-tag :type="scope.row.newProductStatus === 1 ? 'success':'warning'">
          <span>{{ scope.row.newProductStatus === 1 ? '新品' : '非新品' }}</span>
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip="true" align="center" prop="price" label="商品价格" width="120" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="promotionPrice" label="促销价格" width="120" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="giftPoints" label="赠送积分" width="120"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="description" label="商品描述" width="120"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="stock" label="商品库存" width="120" sortable>
      <template #default="scope">
        <span :style="{'color': scope.row.stock < 110 ? 'red' : ''}">{{ scope.row.stock }}</span>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip="true" align="center" prop="weight" label="商品重量" width="120" sortable/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="promotionStartTime" label="促销开始时间" width="160"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="promotionEndTime" label="促销结束时间" width="160"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="createdBy" label="创建人" width="120"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="createdTime" label="创建时间" width="160"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="updatedBy" label="修改人" width="120"/>
    <el-table-column show-overflow-tooltip="true" align="center" prop="updatedTime" label="修改时间" width="160"/>
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
function generatorProductList():void {
  for (let i = 0; i < 30; i++) {
    const item = {
      index: i + 1,
      productNumber: 'Phone' + i,
      productName: '荣耀' + i,
      productBrandName: 'HUAWEI',
      productCategoryName: '手机',
      productPicture: '',
      publishStatus: i % 2 === 0 ? 1 : 0,
      newProductStatus: i % 2 === 0 ? 0 : 1,
      price: 2290 + i,
      promotionPrice: 2190,
      giftPoints: 229,
      description: '商品促销打折中...',
      stock: 100 + i,
      weight: 300,
      promotionStartTime: '2024-03-09 00:00:00',
      promotionEndTime: '2024-03-24 23:59:59',
      createdBy: 'admin',
      createdTime: '2024-03-09 00:00:00',
      updatedBy: 'admin',
      updatedTime: '2024-03-09 00:00:00'
    };
    tableData.value.push(item);
  }
}
generatorProductList();
</script>

<style scoped lang="scss">

</style>
