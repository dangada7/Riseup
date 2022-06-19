<template>
  <v-app>
    <v-app-bar app color="#ffcf01" dark>
      <v-img
        class="logo"
        :src="require('@/assets/logo.svg')"
        contain
        max-height="50px"
        max-width="50px"
      />
      <v-spacer />
      <v-app-bar-title class="title-color">My Transactions</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
          <TransactionsList></TransactionsList>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TransactionsList from "@/components/TransactionsList";

export default {
  name: "App",

  components: {
    TransactionsList,
  },
};
</script>

<style scoped lang="scss">
.logo {
  color: #fff;
}

.title-color {
  color: #000;
}
</style>
