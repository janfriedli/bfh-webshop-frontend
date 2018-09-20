<template>
  <div id="items">
    <md-card v-for="item in items">
      <md-card-header>
        <md-avatar>
          <img src="https://via.placeholder.com/350x150" alt="Avatar">
        </md-avatar>

        <div class="md-title">{{item.title}}</div>
        <div class="md-subhead">{{item.subtitle}}</div>
      </md-card-header>

      <md-card-media>
        <img src="https://via.placeholder.com/350x150" alt="People">
      </md-card-media>

      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.
      </md-card-content>

      <md-card-actions>
        <md-button>Action</md-button>
        <md-button>Action</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
    export default {
        name: 'items',
        props: {
            msg: String
        },
        data: () => ({
            items: [
                { title: 'Foo', subtitle: "sub 1" },
                { title: 'Bar', subtitle: "sub 2" },
                { title: 'Pea', subtitle: "sub 3" },
                { title: 'lol', subtitle: "sub 4" },
                { title: 'miau', subtitle: "sub 5" }
            ]
        })
    }
</script>

<style scoped>

</style>
