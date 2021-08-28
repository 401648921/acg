import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/admin'
  },
  {
    path:'/test',
    name:'test',
    component:()=>import ('../components/business/question/QuestionCard')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: ()=>import ('../views/Admin.vue'),
    children:[
      {
        path:'/admin',
        redirect: '/admin/sign'
      },
      {
        path:'/admin/recommend',
        name:'recommendList',
        component:()=>import ('../components/common/admin/Recommend.vue')
      },
      {
        path:'/admin/putInformation',
        name:'userPutInformation',
        component:()=>import ('../components/common/admin/PutInformation.vue')
      },
      {
        path:'/admin/login',
        name:'login',
        component:()=>import ('../components/common/admin/LoginFrom.vue')
      },
      {
        path:'/admin/resetPassword',
        name:'resetPassword',
        component:()=>import ('../components/common/admin/ResetPassword.vue')
      },
      {
        path:'/admin/sign',
        name:'sign',
        component:()=>import ('../components/common/admin/SignFrom.vue')
      },
      {
        path:'/admin/signByPhone',
        name:'signByPhone',
        component:()=>import ('../components/common/admin/SignFromByPhone.vue')
      }
    ]
  },
  {
    path:'/home',
    name:'home',
    component:()=> import('../views/Home.vue'),
    children:[
      {
        path:'/home',
        redirect:'/home/index'
      },
      {
        path:'/home/index',
        name:'userInformation',
        component:()=>import ('../components/business/home/Index.vue')
      },
      {
        path:'/home/setting',
        name:'setting',
        component:()=>import ('../components/business/modify/ModifyIndex.vue'),
        children:[
          {
            path:'/home/setting/modify',
            name:'imgModify',
            component:()=>import ('../components/business/modify/ModifyFrom.vue'),
          },
          {
            path:'/home/setting/feedback',
            name:'feedbackUser',
            component:()=>import ('../components/business/modify/Feedback.vue'),
          },
          {
            path:'/home/setting/commonList',
            name:'commonList',
            component:()=>import ('../components/business/modify/CommonList.vue'),
          },
          {
            path:'/home/setting/commonQuestionDetail',
            name:'commonQuestionDetail',
            component:()=>import ('../components/business/modify/CommonQuestionDetail.vue'),
          },
          {
            path:'/home/setting/banUser',
            name:'banUser',
            component:()=>import ('../components/business/modify/BanUser.vue'),
          },
          {
            path:'/home/setting/messagesSettings',
            name:'messagesSettings',
            component:()=>import ('../components/business/modify/MessagesSetting.vue'),
          },
          {
            path:'/home/setting/security',
            name:'security',
            component:()=>import ('../components/business/modify/Security.vue'),
          },
          {
            path:'/home/setting/banGroup',
            name:'banGroup',
            component:()=>import ('../components/business/modify/BanGroup.vue'),
          },
        ]
      },
      {
        path:'/home/list',
        name:'list',
        component:()=>import ('../components/business/home/ListIndex.vue'),
        children:[
          {
            path:'/home/list/dayCosList',
            name:'dayCosList',
            component:()=>import ('../components/business/home/CosList.vue'),
          },
          {
            path:'/home/list/weekCosList',
            name:'weekCosList',
            component:()=>import ('../components/business/home/CosListWeek.vue'),
          },
        ]
      },
      {
        path:'/home/questionResList',
        name:'questionReslist',
        component:()=>import ('../components/business/home/QuestionAndResponseIndex.vue')
      },
      {
        path:'/home/questionIndex',
        name:'questionIndex',
        component:()=>import ('../components/business/home/QuestionIndex.vue')
      },
      {
        path:'/home/showQuestion',
        name:'showQuestion',
        component:()=>import ('../components/business/home/ShowQuestion.vue')
      },
      {
        path:'/home/createGroup',
        name:'createGroup',
        component:()=>import ('../components/business/home/CreateGroup.vue')
      },
      {
        path:'/home/groupIndex',
        name:'groupIndex',
        component:()=>import ('../components/business/person/GroupIndex'),
        children:[
          {
            path:'/home/groupIndex/groupHot',
            name:'groupHot',
            component:()=>import ('../components/business/person/GroupHot.vue')
          },
          {
            path:'/home/groupIndex/groupDiscuss',
            name:'groupDiscuss',
            component:()=>import ('../components/business/person/DiscussList.vue')
          },
        ]
      },
      {
        path:'/home/personIndex',
        name:'personIndex',
        component:()=>import ('../components/business/person/PersonIndex.vue'),
        children:[
          {
            path:'/home/personIndex',

            redirect:'/home/personIndex/dynamicList'
          },
          {
            path:'/home/personIndex/fansList',
            name:'fansList',
            component:()=>import ('../components/business/person/FansList')
          },
          {
            path:'/home/personIndex/dynamicList',
            name:'dynamic',
            component:()=>import ('../components/business/person/DynamicList')
          },
          {
            path:'/home/personIndex/followList',
            name:'followList',
            component:()=>import ('../components/business/person/FollowList')
          },
          {
            path:'/home/personIndex/response',
            name:'response',
            component:()=>import ('../components/business/question/Response.vue')
          },
          {
            path:'/home/personIndex/questionList',
            name:'questionList',
            component:()=>import ('../components/business/person/QuestionList')
          },
          {
            path:'/home/personIndex/waitResponseList',
            name:'WaitResponseList',
            component:()=>import ('../components/business/person/WaitResponseList')
          },
          {
            path:'/home/personIndex/help',
            name:'help',
            component:()=>import ('../components/business/help/commonProblem.vue')
          },
          {
            path:'/home/personIndex/feedback',
            name:'feedback',
            component:()=>import ('../components/business/help/Feedback.vue')
          },
          {
            path:'/home/personIndex/feedbackRes',
            name:'feedbackRes',
            component:()=>import ('../components/business/help/FeedbackRes.vue')
          },
          {
            path:'/home/personIndex/likeArticle',
            name:'likeArticle',
            component:()=>import ('../components/business/article/LikeArticleList')
          },
          {
            path:'/home/personIndex/personQuestionList',
            name:'personQuestionList',
            component:()=>import ('../components/business/question/QuestionPersonList.vue')
          },
          {
            path:'/home/personIndex/personGroup',
            name:'personGroup',
            component:()=>import ('../components/business/person/PersonGroup.vue')
          },
          {
            path:'/home/personIndex/myFollow',
            name:'myFollow',
            component:()=>import ('../components/business/person/MyFollow.vue')
          },
          {
            path:'/home/personIndex/myLike',
            name:'myLike',
            component:()=>import ('../components/business/person/MyLike.vue')
          },
          {
            path:'/home/personIndex/myHistory',
            name:'myHistory',
            component:()=>import ('../components/business/person/MyHistory.vue')
          },
          {
            path:'/home/personIndex/collectionList',
            name:'collectionList',
            component:()=>import ('../components/business/collection/CollectionList.vue')
          },
        ]
      },
      {
        path:'/home/search',
        name:'search',
        component:()=>import ('../components/business/home/Search.vue')
      },
      {
        path:'/home/searchQuestion',
        name:'searchQuestion',
        component:()=>import ('../components/business/home/SearchQuestion.vue')
      },
      {
        path:'/home/collectionIndex',
        name:'collectionIndex',
        component:()=>import ('../components/business/collection/CollectionIndex')
      },
      {
        path:'/home/otherPersonIndex',
        name:'otherPersonIndex',
        component:()=>import ('../components/business/person/OtherPersonIndex')
      },
      {
        path:'/home/othersQuestion',
        name:'othersQuestion',
        component:()=>import ('../components/business/person/OthersQuestion')
      },
      {
        path:'/home/searchUser',
        name:'searchUser',
        component:()=>import ('../components/business/home/SearchUser.vue')
      },
      {
        path:'/home/detailQuestion',
        name:'detailQuestion',
        component:()=>import ('../components/business/question/DetailQuestion.vue')
      },
      {
        path:'/home/searchGroup',
        name:'searchGroup',
        component:()=>import ('../components/business/home/SearchGroup.vue')
      },
      {
        path:'/home/followFans',
        name:'followFans',
        component:()=>import ('../components/business/question/QuestionFollow.vue')
      },
      {
        path:'/home/putArticle',
        name:'putArticle',
        component:()=>import ('../components/business/article/PutArticleCard.vue')
      },
      {
        path:'/home/ownerArticle',
        name:'ownerArticle',
        component:()=>import ('../components/business/article/OwnerArticle.vue')
      },
      {
        path:'/home/putQuestion',
        name:'putQuestion',
        component:()=>import ('../components/business/question/PutQuestion.vue')
      },
      {
        path:'/home/message',
        name:'message',
        component:()=>import ('../components/business/message/MessageIndex.vue'),
        children:[
          {
            path:'/home/message', //评论我的
            redirect:"/home/message/myMessage"
          },
          {
            path:'/home/message/myMessage', //评论我的
            name:'searchMyGroup',
            component:()=>import ('../components/business/message/MyMessage.vue')
          },
          {
            path:'/home/message/messageToMe', //@我的
            name:'messageToMe',
            component:()=>import ('../components/business/message/MessageToMe.vue')
          },
          {
            path:'/home/message/getGoodList',
            name:'getGoodList',
            component:()=>import ('../components/business/message/GetGoodList.vue')
          },
          {
            path:'/home/message/messages',
            name:'latelymessages',
            component:()=>import ('../components/business/message/Messages.vue')
          },
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
