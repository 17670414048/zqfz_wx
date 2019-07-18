import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import axios from 'axios'
import {
    timeout
} from 'q';

Vue.prototype.$axios = axios
// 测试环境
axios.defaults.baseURL = 'http://api.tszh.wiwcc.com';
// Vue.prototype.$url = 'http://api.tszh.wiwcc.com';
// 正式环境
// axios.defaults.baseURL=  'https://xinshengerke.hbb.net:4433/api';
// axios.defaults.baseURL = 'http://xinshengerke.hbb.net:8080/api';
// axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// var instance = axios.create({
//     baseURL: 'https://api.wiwcc.com',
//     // headers: {
//     //     'userid': '30',
//     //     'source': 'WebCampus',
//     //     'token': 'KsNnKrurzmXkTkAwa9EETJFU-6Ds4jm0'
//     // }
// });
// axios.interceptors.request.use(
//     config=>{
//         if(window.sessionStorage){
//           //如果session不为null就怎样
//           this.$router.push({path:'/myBaby'});
//         }else{
//             //如果session为null就怎样
//             window.location.href = 'http://wx.tszh.wiwcc.com/wx/auth?origin='+encodeURIComponent(window.location.href); //测试环境
//         }
//     },err=>{
//        // 请求失败的处理
//      return Promise.reject(err);

//     });
axios.interceptors.response.use(
    response => {
        // console.log(response);
        if (response.data.result == 20009) {
            //       // window.location.href = 'http://xinshengerke.hbb.net:8080/frontend/wx/auth?origin='+encodeURIComponent(window.location.href); //正式环境
            window.location.href = 'http://wx.tszh.wiwcc.com/wx/auth?origin=' + encodeURIComponent(window.location.href); //测试环境
        }
        return response;
    }, error => {
        if (error && error.response) {
            //console.log(error)
            if (error.response.status == 20009) {
                // window.location.href = 'http://xinshengerke.hbb.net:8080/frontend/wx/auth?origin='+encodeURIComponent(window.location.href); //正式环境
                window.location.href = 'http://wx.tszh.wiwcc.com/wx/auth?origin=' + encodeURIComponent(window.location.href); //测试环境
            }
        } else {
            error.message = '网络出现问题，请稍后重试';
        }
    });

Vue.prototype.$timeTable = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
// 请求拦截（配置发送请求的信息）

/**
 * 这里导入组件
 */
const myBaby = () => import('../components/myBaby.vue')

const addBaby = () => import('../components/babyInfo/addBaby.vue')
const editBaby = () => import('../components/babyInfo/editBaby.vue')
const editInfo = () => import('../components/babyInfo/editInfo.vue')
const selectBaby = () => import('../components/babyInfo/selectBaby.vue')

const myCourse = () => import('../components/course/myCourse.vue')
const courseDetail = () => import('../components/course/courseDetail.vue')
const appointCourse = () => import('../components/course/appointCourse.vue')
const unappointCourse = () => import('../components/course/unappointCourse.vue')

const leaveList = () => import('../components/leave/leaveList.vue')
const leaveRecord = () => import('../components/leave/leaveRecord.vue')
const selectLeave = () => import('../components/leave/selectLeave.vue')

const editRegister = () => import('../components/gms/editRegister.vue')
const lookInfo = () => import('../components/gms/lookInfo.vue')
const gmsList = () => import('../components/gms/gmsList.vue')

const info = () => import('../components/other/info.vue')
const fill = () => import('../components/other/fill.vue')

const weekSlider = () => import('../components/weekSlider.vue')
// const login = () => import('../components/account/login.vue')
//创建路由对象
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/myBaby'
        },
        {
            path: '/myBaby',
            component: myBaby
        },

        {
            path: '/addBaby',
            component: addBaby
        },
        {
            path: '/editBaby',
            component: editBaby
        },
        {
            path: '/editInfo',
            component: editInfo
        },
        {
            path: '/selectBaby',
            component: selectBaby
        },

        {
            path: '/myCourse/:time',
            component: myCourse
        },
        {
            path: '/courseDetail',
            component: courseDetail
        },
        {
            path: '/appointCourse',
            component: appointCourse
        },
        {
            path: '/unappointCourse',
            component: unappointCourse
        },

        {
            path: '/leaveList',
            component: leaveList
        },
        {
            path: '/leaveRecord',
            component: leaveRecord
        },
        {
            path: '/selectLeave',
            component: selectLeave
        },

        {
            path: '/editRegister',
            component: editRegister
        },
        {
            path: '/lookInfo',
            component: lookInfo
        },
        {
            path: '/gmsList',
            component: gmsList
        },


        {
            path: '/info',
            component: info
        },
        {
            path: '/fill',
            component: fill
        },
        {
            path: '/weekSlider',
            component: weekSlider
        },
    ]
})
//导航守卫
router.beforeEach((to, from, next) => {
    var cookie = decodeURIComponent(document.cookie);
    //判断是否授权成功
    if (cookie && cookie != null) {
        var user = '{}';
        var arr, reg = new RegExp("(^| )user_params=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            user = decodeURIComponent(arr[2]);
        }
        console.log(user);
        var user_params = JSON.parse(user);
        document.cookie = "userid =" + encodeURIComponent(user_params.userid);
        document.cookie = "token =" + encodeURIComponent(user_params.token);
        document.cookie = "source =" + encodeURIComponent(user_params.source);
        document.cookie = "openid =" + encodeURIComponent(user_params.openid);
        document.cookie = "origin =" + encodeURIComponent(user_params.origin);
        document.cookie = "nickname =" + encodeURIComponent(user_params.nickname);
        document.cookie = "headimgurl =" + encodeURIComponent(user_params.headimgurl);
        //判断是否第一次进入
        if (to.path === "/unappointCourse") {
            next();
        } else {
            // console.log(user_params);
            if (user_params.userid && user_params.token) {
                next();
            } else {
                if (to.path != "/editInfo") {
                    next('/editInfo');
                }
                next();
            }
        }
    } else {
        // window.location.href = 'http://xinshengerke.hbb.net:8080/frontent/wx/auth?origin='+encodeURIComponent(window.location.href); //正式环境
        window.location.href = 'http://wx.tszh.wiwcc.com/wx/auth?origin=' + encodeURIComponent(window.location.href); //测试环境
    }

})
export {
    router
}