<template>
  <tr :class="{'table-row': true, 'choosed-row':isChoosed}" @click="chooseMember">
    <td class="table-column"><span>{{ memberData.id }}</span></td>
    <td class="table-column"><span>{{ memberData.name }}</span></td>
    <td class="table-column"><span>{{ memberData.email }}</span></td>
    <td class="table-column"><span>{{ memberData.phone }}</span></td>
  </tr>
</template>

<script>
import { useContractCreateStore } from '@/stores/contract/contractCreate';
import { mapActions, mapStores } from 'pinia';

export default {
  name: 'MemberSelectTableRowVue',
  props: {
    memberData: Object
  },
  computed: {
    ...mapStores(useContractCreateStore),
    isChoosed() {
      return this.memberData.id === this.contractCreateStore.member.id;
    }
  },
  methods: {
    ...mapActions(useContractCreateStore, ['setMember']),
    chooseMember() {
      this.contractCreateStore.setMember(this.memberData);  
    }
  } 
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/component/table.scss";

.choosed-row {
  background-color: $back-color;
}

</style>