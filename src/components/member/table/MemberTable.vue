<template>
  <table class="item-table">
    <thead>
      <TableHaederVue :store="memberStore"/>
    </thead>
    <tbody>
      <MemberTableRowVue v-for="(value, key) in memberStore.memberList" :key="key" :memberData="value"/>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useMemberStore } from '@/stores/member/member';
import MemberTableRowVue from './MemberTableRow.vue';
import TableHaederVue from '@/components/common/table/TableHaeder.vue';

export default {
  name: 'MemberTableVue',
  components: {
    TableHaederVue,
    MemberTableRowVue
  },  
  computed: {
    ...mapStores(useMemberStore),
  },
  methods: {
    ...mapActions(useMemberStore, ['setColumnSort']),
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";
.item-table {
  @include base-table();
}
</style>