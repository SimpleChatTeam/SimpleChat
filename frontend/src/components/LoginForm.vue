<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center @keydown.enter="connexion({username, password})">
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dense color="primary" dark flat>
              <v-toolbar-title>{{ $t('login.title') }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  :label="$t('login.username')"
                  v-model="username"
                  prepend-icon="mdi-account"
                  type="text"
                />
                <v-text-field
                  id="password"
                  :label="$t('login.password')"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="green" dark @click="$router.push('/register')">{{ $t('login.sign_up') }}</v-btn>
              <v-spacer/>
              <v-btn color="primary" @click="connexion({username, password})">{{ $t('login.sign_in') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { call } from "vuex-pathify";
import * as types from "@/store/types.js";
import RegisterStoreModule from "@/mixins/RegisterStoreModule";
import { user } from "@/store/modules/user";
export default {
  mixins: [RegisterStoreModule],
  data() {
    return {
      username: "",
      password: ""
    };
  },
  created() {
    this.registerStoreModule("user", user);
  },
  methods: {
    connexion: call(`user/${types.connexion}`)
  }
};
</script>
