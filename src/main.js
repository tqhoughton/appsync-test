// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// main.js
import Vue from 'vue'
import App from './App'
import router from './router'
import AWSAppSyncClient from 'aws-appsync'
import VueApollo from 'vue-apollo'
import appSyncConfig from './aws-exports'

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
  },
  // TODO: figure out why it doesn't work without this line
  disableOffline: true
},{
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    }
  }
})

const appsyncProvider = new VueApollo({
  defaultClient: client
})

Vue.config.productionTip = false
Vue.use(VueApollo)

new Vue({
  el: '#app',
  router,
  components: { App },
  provide: appsyncProvider.provide(),
 template: '<App/>'
})
