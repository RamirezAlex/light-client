<template>
  <div class="content-host">
    <v-form v-model="valid" autocomplete="off">
      <v-layout align-center justify-center row>
        <v-flex xs10 md10 lg10>
          <div class="screen-title">Select Hub</div>
        </v-flex>
      </v-layout>

      <v-layout align-center justify-center row>
        <v-flex xs10 md10 lg10>
          <address-input
            v-model="partner"
            class="address-input"
          ></address-input>
        </v-flex>
      </v-layout>

      <v-layout align-center justify-center row>
        <div class="divider"></div>
      </v-layout>

      <v-layout align-center justify-center row>
        <v-flex xs10 md10 lg10 class="information">
          <div class="information-label text-xs-left">Token</div>
          <div class="information-description text-xs-left">
            <span class="font-weight-medium">{{ token.symbol }}</span>
            · {{ token.name }}
          </div>
          <div class="text--secondary">
            {{ token.address }}
          </div>
        </v-flex>
      </v-layout>

      <v-layout align-center justify-center class="section">
        <v-flex xs10 md10 lg10 class="text-xs-center">
          <v-btn
            id="select-hub"
            class="text-capitalize confirm-button"
            depressed
            :disabled="!valid"
            large
            @click="selectHub()"
          >
            Select Hub
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { Token, TokenPlaceholder } from '@/model/types';
import AddressInput from '@/components/AddressInput.vue';
import AddressUtils from '@/utils/address-utils';
import NavigationMixin from '@/mixins/navigation-mixin';

@Component({
  components: { AddressInput }
})
export default class SelectHub extends Mixins(NavigationMixin) {
  token: Token = TokenPlaceholder;

  partner: string = '';
  valid: boolean = false;

  selectHub() {
    this.navigateToDeposit(this.token.address, this.partner);
  }

  async created() {
    const { token } = this.$route.params;
    if (!AddressUtils.checkAddressChecksum(token)) {
      this.navigateToHome();
      return;
    }

    let tokenInfo = this.$store.getters.token(token);
    if (!tokenInfo) {
      tokenInfo = await this.$raiden.getToken(token);
    }

    if (!tokenInfo) {
      this.navigateToHome();
    } else {
      this.token = tokenInfo;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/input-screen';
</style>
