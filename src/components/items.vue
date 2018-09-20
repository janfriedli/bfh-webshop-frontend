<template>
    <div id="items" class="md-layout md-gutter">
        <div class="md-layout-item md-size-33" v-for="item in items" v-bind:key="item.id" >
            <product v-bind:product="item"></product>
        </div>
    </div>
</template>

<script>
import Product from './product'

export default {
  name: 'items',
  components: { Product },
  data: () => ({
    items: [
      { id: 1, title: 'Foo', subtitle: 'sub 1' },
      { id: 2, title: 'Bar', subtitle: 'sub 2' },
      { id: 3, title: 'Pea', subtitle: 'sub 3' },
      { id: 4, title: 'lol', subtitle: 'sub 4' },
      { id: 5, title: 'miau', subtitle: 'sub 5' }
    ]
  })
}
</script>

<style scoped>

</style>
