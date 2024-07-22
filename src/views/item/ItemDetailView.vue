<template>
  <div>

  </div>
</template>

<script>
import { getItem } from '@/utils/item';

export default {
  name: 'ItemDetailView',
  async mounted() {
    const result = await getItem(this.$route.params.id);
    console.log(result)
  }
}
</script>

<style lang="scss" scoped>

</style>