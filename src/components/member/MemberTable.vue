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
import { useMemberStore } from '@/stores/member';
import TableHaederVue from '../common/table/TableHaeder.vue';
import MemberTableRowVue from './MemberTableRow.vue';

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