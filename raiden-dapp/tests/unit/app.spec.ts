import { DeniedReason } from '@/model/types';

jest.mock('@/services/raiden-service');

import Mock = jest.Mock;
import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import RaidenService from '@/services/raiden-service';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import flushPromises from 'flush-promises';
import store from '@/store';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);

describe('App.vue', () => {
  let $raiden: RaidenService;
  let connect: Mock<any, any>;

  beforeEach(() => {
    $raiden = new RaidenService(store);
    $raiden.connect = jest.fn();
    $raiden.disconnect = jest.fn();
  });

  it('should call connect on component creation and disconnect on destruction', async () => {
    const wrapper = shallowMount(App, {
      store,
      mocks: {
        $raiden: $raiden
      }
    });

    await (wrapper.vm as any).connect();

    await flushPromises();
    wrapper.vm.$destroy();

    expect($raiden.connect).toHaveBeenCalledTimes(1);
    expect($raiden.disconnect).toHaveBeenCalledTimes(1);
  });

  test('connect works after initial failure', async () => {
    store.commit('accessDenied', DeniedReason.NO_ACCOUNT);
    const wrapper = shallowMount(App, {
      store,
      mocks: {
        $raiden: $raiden
      }
    });

    await (wrapper.vm as any).connect();

    await flushPromises();
    expect(store.state.accessDenied).toEqual(DeniedReason.UNDEFINED);
  });
});
