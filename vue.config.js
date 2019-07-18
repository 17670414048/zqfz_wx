module.exports = {
    lintOnSave:false,
    baseUrl:'./',
    productionSourceMap:false,
    configureWebpack:{
        externals:{
            // vue:'Vue',
            // axios:'axios',
            // 'vue-router':'VueRouter',
            // vuex:'Vuex',
            // moment:'moment',
        }
    }
}