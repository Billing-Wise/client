<template>
  <div class="table-box">
    <table class="item-table">
      <thead>
        <TableHaederVue :store="memberStore" :excludeColumnArr="['contractCount', 'createdAt', 'updatedAt']" />
      </thead>
      <tbody>
        <MemberSelectTableRowVue v-for="(value, key) in memberStore.memberList" :key="key" :memberData="value" />
      </tbody>
    </table>
    <PaginationBarVue :store="memberStore" />
  </div>
</template>

<script>
import { mapActions, mapStores } from 'pinia';
import { useMemberStore } from '@/stores/member/member';
import { getMemberList } from '@/utils/member';
import TableHaederVue from '@/components/common/table/TableHaeder.vue';
import PaginationBarVue from '@/components/common/PaginationBar.vue';
import MemberSelectTableRowVue from './MemberSelectTableRow.vue';

export default {
  name: 'MemberSelectTableVue',
  components: {
    TableHaederVue,
    MemberSelectTableRowVue,
    PaginationBarVue
  },
  computed: {
    ...mapStores(useMemberStore),
  },
  methods: {
    ...mapActions(useMemberStore, ['setColumnSort']),
    async getMemberList() {
      // const result = await getMemberList();
      await getMemberList();

    },
    setupWatchers() {
      this.$watch('memberStore.size', this.getMemberList);
      this.$watch('memberStore.page', this.getMemberList);
      this.$watch('memberStore.columns', this.getMemberList, { deep: true });
    }
  },
  async mounted() {
    this.memberStore.$reset();
    await getMemberList();
    this.setupWatchers();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

.item-table {
  @include base-table();
}
</style>