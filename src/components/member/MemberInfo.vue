<template>
  <div class="info-container">
    <IconInfoVue icon="bi bi-person-fill" :info="memberStore.currentMember.name"/>
    <IconInfoVue icon="bi bi-envelope-fill" :info="memberStore.currentMember.email"/>
    <IconInfoVue icon="bi bi-telephone-fill" :info="memberStore.currentMember.phone"/>
    <TitleInfoVue title="계약건" :info="`${memberStore.currentMember.contractCount} 건`"/>
    <TitleInfoVue title="미납건" :info="`${memberStore.currentMember.unPaidCount} 건`"/>
    <TitleInfoVue title="총 청구액" :info="`${memberStore.currentMember.totalInvoiceAmount}원`"/>
    <TitleInfoVue title="총 미납액" :info="`${memberStore.currentMember.totalUnpaidAmount}원`"/>
    <TitleInfoVue title="등록일" :info="createdAtDate"/>
    <TitleInfoVue title="수정일" :info="updatedAtDate"/>
    <DescriptionInfoVue :infoValue="memberStore.currentMember.description"/>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useMemberStore } from '@/stores/member/member';
import { toDateFromDateTime } from '@/utils/date';
import IconInfoVue from '../common/info/IconInfo.vue';
import TitleInfoVue from '@/components/common/info/TitleInfo.vue';
import DescriptionInfoVue from '../common/info/DescriptionInfo.vue';

export default {
name: 'MemberInfoVue',
components: {
  TitleInfoVue,
  DescriptionInfoVue,
  IconInfoVue
},
computed: {
  ...mapStores(useMemberStore),
  createdAtDate() {
    return toDateFromDateTime(this.memberStore.currentMember.createdAt)
  },
  updatedAtDate() {
    return toDateFromDateTime(this.memberStore.currentMember.updatedAt)
  }
},
}
</script>

<style lang="scss" scoped>
.info-container {
@include flex-box(column, center, 20px);
width: 100%;
}
</style>