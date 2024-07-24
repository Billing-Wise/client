<template>
  <tr class="table-row" @click="toMemberDetail">
    <td class="table-column"><span>{{ memberData.id }}</span></td>
    <td class="table-column"><span>{{ memberData.name }}</span></td>
    <td class="table-column"><span>{{ memberData.email }}</span></td>
    <td class="table-column"><span>{{ memberData.phone }}</span></td>
    <td class="table-column"><span>{{ memberData.contractCount }}건</span></td>
    <td class="table-column"><span>{{ createdAtDate }}</span></td>
    <td class="table-column"><span>{{ updatedAtDate }}</span></td>
  </tr>
</template>

<script>
import { toDateFromDateTime } from '@/utils/date';

export default {
  name: 'MemberTableRowVue',
  props: {
    memberData: Object
  },
  computed: {
    createdAtDate() {
      return toDateFromDateTime(this.memberData.createdAt)
    },
    updatedAtDate() {
      return toDateFromDateTime(this.memberData.updatedAt)
    }
  },
  methods: {
    toMemberDetail() {
      // this.$router.push(`/member/${this.memberData.id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

</style>