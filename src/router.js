import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home";

// 로그인
import PhoneCertification from "./components/PhoneCertification";
import SignUp from "./components/SignUp";
import FindIdWrite from "./components/FindIdWrite";
import Loginview from "./components/Loginview";
import SocialSignUp from "./components/SocialSignUp";
import FindPassword from "./components/FindPassword";
import ResetPassword from "./components/ResetPassword";
import FindIdResult from "./components/FindIdResult";

// 기록실
import MyScoreCard from "./components/MyScoreCard";
import MySwingVideoList from "./components/MySwingVideoList";

// 대회
import GameDetail from "./components/GameDetail";
import gameInfoDetail from "./components/gameInfoDetail";
import GameList from "./components/GameList";
import MyGameList from "./components/MyGameList";

// 매장예약
import MapList from "./components/MapList";
import ReservationProgress from "./components/ReservationProgress";
import ReservationWrite from "./components/ReservationWrite";

// 코스
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
// 가이드
import SystemPreparing from "./components/SystemPreparing";
import GameIntroPreparing from "./components/GameIntroPreparing";
import GameGuidePreparing from "./components/GameGuidePreparing";

// 커뮤니티
import ContactWriteno2 from "./components/ContactWriteno2";
import EventDetail from "./components/EventDetail";
import BoardList from "./components/BoardList";
import EventList from "./components/EventList";
import BoardDetail from "./components/BoardDetail";
import BoardWrite from "./components/BoardWrite.vue";
import SwingVideoList from "./components/SwingVideoList.vue";
import SwingVideoEdit from "./components/SwingVideoEdit";

// 고객센터
import TermsView from "./components/TermsView";
import NoticeDetail from "./components/NoticeDetail";
import TermsWrite from "./components/TermsWrite";
import ContactWrite from "./components/ContactWrite";
import FaqList from "./components/FaqList";
import NoticeList from "./components/NoticeList";

// 마이페이지
import EditSocialProfile from "./components/EditSocialProfile";
import EditProfile from "./components/EditProfile";
import EditPassword from "./components/EditPassword";
import MyProfile from "./components/MyProfile";
import AccountDeletion from "./components/AccountDeletion";

import ManagerLogin from "./components/manager/ManagerLogin";
import ManagerRoom from "./components/manager/ManagerRoom";
import ManagerReservation from "./components/manager/ManagerReservation";
import ManagerHomepage from "./components/manager/ManagerHomepage";
import ManagerRoomManagement from "./components/manager/ManagerRoomManagement";
import ManagerPointManagement from "./components/manager/ManagerPointManagement";
import ManagerContactList from "./components/manager/ManagerContactList";
import ManagerContactDetail from "./components/manager/ManagerContactDetail";
import ManagerASManagement from "./components/manager/ManagerASManagement";
import ManagerASWrite from "./components/manager/ManagerASWrite";
import ManagerASDetail from "./components/manager/ManagerASDetail";
import ManagerVisitorStatistics from "./components/manager/ManagerVisitorStatistics";
import ManagerReservationStatistics from "./components/manager/ManagerReservationStatistics";
import ManagerGameStatistics from "./components/manager/ManagerGameStatistics";
import ManagerGameManagement from "./components/manager/ManagerGameManagement";
import ManagerUserStatistics from "./components/manager/ManagerUserStatistics";
import ManagerGameWrite from "./components/manager/ManagerGameWrite";
import ManagerGameManagementList from "./components/manager/ManagerGameManagementList";
import NicePay from "./components/manager/NicePay";
import NicePayConfirm from "./components/manager/NicePayConfirm";

import AdminLogin from "./components/admin/AdminLogin";
import AdminUserManagement from "./components/admin/AdminUserManagement";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminGameManagement from "./components/admin/AdminGameManagement";
import AdminPointManagement from "./components/admin/AdminPointManagement";
import AdminManagerManagement from "./components/admin/AdminManagerManagement";
import AdminManagerManagementWrite from "./components/admin/AdminManagerManagementWrite";
import AdminEquipmentManagement from "./components/admin/AdminEquipmentManagement";
import AdminCourseManagementWrite from "./components/admin/AdminCourseManagementWrite";
import AdminASManagement from "./components/admin/AdminASManagement";
import AdminASManagementDetail from "./components/admin/AdminASManagementDetail";
import AdminContactList from "./components/admin/AdminContactList";
import AdminContactDetail from "./components/admin/AdminContactDetail";
import AdminStatistics from "./components/admin/AdminStatistics";
import AdminCourseManagement from "./components/admin/AdminCourseManagement";
import Callback from "./components/Callback";
import KaKaoCallback from "./components/KaKaoCallback";
import ABCD from "./components/ABCD";
import EventWrite from "./components/admin/EventWrite";
import AdminEventList from "./components/admin/AdminEventList";
import AdminEventDetail from "./components/admin/AdminEventDetail";
import NoticeWrite from "./components/admin/NoticeWrite";
import AdminNoticeList from "./components/admin/AdminNoticeList";
import AdminNoticeDetail from "./components/admin/AdminNoticeDetail";
import AdminFaqManagement from "./components/admin/AdminFaqManagement";
import AdminBanner from "./components/admin/AdminBanner";
import AdminBannerDetail from "./components/admin/AdminBannerDetail";
import AdminBannerWrite from "./components/admin/AdminBannerWrite";
import AdminFaqDetail from "./components/admin/AdminFaqDetail";
import AdminFaqList from "./components/admin/AdminFaqList";
import AdminTermsList from "./components/admin/AdminTermsList";
import AdminTermsWrite from "./components/admin/AdminTermsWrite";
import AdminTermsDetail from "./components/admin/AdminTermsDetail";

import {
  myProfile2Data,
  reservation22Data,
  updateTerms2Data,
  // frame7655Data,
  communityWrite2Data,
  terms2Data,
  // signUp22Data,
  // login2Data,
  // signUp32Data,
  tournamentInfo2Data,
  scorecard2Data,
  faq2Data,
  tournaments2Data,
  mySwingVideos2Data,
  myTournament2Data,
  findVenue2Data,
  systemOverview2Data,
  reservation12Data,
  eventDetails2Data,
  events2Data,
  courses2Data,
  community2Data,
  courseDetails2Data,
  communityDetails2Data,
  announcements2Data,
} from "./data";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/abcd",
      component: ABCD,
    },
    { path: "/callback", component: Callback, name: "Callback" },
    { path: "/KaKaoCallback", component: KaKaoCallback, name: "KaKaoCallback" },
    {
      path: "/editsocialprofile",
      component: EditSocialProfile,
    },
    {
      path: "/editprofile",
      component: EditProfile,
    },

    {
      path: "/myprofile",
      component: MyProfile,
      props: {
        rJZsWIProps: myProfile2Data.rJZsWIProps,
      },
    },

    {
      path: "/terms-write",
      component: TermsWrite,
      props: {
        rJZsWIProps: updateTerms2Data.rJZsWIProps,
      },
    },
    {
      path: "/game-detail",
      component: GameDetail,
      // props: { ...frame7655Data },
    },
    {
      path: "/account-deletion",
      component: AccountDeletion,
    },
    {
      path: "/swingvideo-write",
      component: ContactWriteno2,

      props: {
        rJZsWIProps: eventDetails2Data.rJZsWIProps,
      },
    },
    {
      path: "/swingvideo-edit",
      name: "SwingVideoEdit", // 네임드 라우트 설정
      component: SwingVideoEdit,

      props: {
        rJZsWIProps: eventDetails2Data.rJZsWIProps,
      },
    },
    {
      path: "/notice-detail",
      component: NoticeDetail,
      props: {
        ...announcements2Data,
      },
    },
    {
      path: "/contact-write",
      name: "ContactWrite",
      component: ContactWrite,
      props: {
        rJZsWIProps: communityWrite2Data.rJZsWIProps,
      },
    },
    {
      path: "/phone-certification",
      component: PhoneCertification,
    },
    {
      path: "/termsview",
      component: TermsView,
      props: { ...terms2Data },
    },
    {
      path: "/signup",
      component: SignUp,
      // props: { ...signUp22Data },
    },
    {
      path: "/findid-write",
      component: FindIdWrite,
    },
    {
      path: "/login",
      component: Loginview,
      // props: { ...login2Data },
    },
    {
      path: "/socialsignup",
      component: SocialSignUp,
      // props: { ...signUp32Data },
    },
    {
      path: "/findpassword",
      component: FindPassword,
    },
    {
      path: "/resetpassword",
      name:"resetpassword",
      component: ResetPassword,
    },
    {
      path: "/swingvideo-list",
      name: "SwingVideoList",
      component: SwingVideoList,
      props: {
        rJZsWIProps: community2Data.rJZsWIProps,
      },
    },

    {
      path: "/findid-result",
      name: "findid-result",
      component: FindIdResult,
    },
    {
      path: "/",
      component: Home,
    },
    {
      path: "/gameinfo-detail",
      component: gameInfoDetail,
      name: "gameInfoDetail",
      props: {
        rJZsWIProps: tournamentInfo2Data.rJZsWIProps,
      },
    },
    {
      path: "/myscorecard",
      name: "MyScoreCard",
      component: MyScoreCard,
      props: { ...scorecard2Data },
    },
    {
      path: "/board-write",
      name: "BoardWrite",
      component: BoardWrite,
      props: {
        rJZsWIProps: eventDetails2Data.rJZsWIProps,
      },
    },
    {
      path: "/faq-list",
      component: FaqList,
      props: { ...faq2Data },
    },
    {
      path: "/events-list",
      component: EventList,
      name: EventList,
      props: { ...events2Data },
    },
    {
      path: "/game-list",
      component: GameList,
      name: "GameList",
      props: { ...tournaments2Data },
    },
    {
      path: "/myswingvideos-list",
      name: "MySwingVideoList",
      component: MySwingVideoList,
      props: {
        rJZsWIProps: mySwingVideos2Data.rJZsWIProps,
      },
    },
    {
      path: "/mygame-list",
      component: MyGameList,
      name: "MyGameList",
      props: { ...myTournament2Data },
    },
    {
      path: "/map-list",
      component: MapList,
      name: "MapList",
      props: { ...findVenue2Data },
    },
    {
      path: "/reservation-progress",
      component: ReservationProgress,
      props: {
        rJZsWIProps: reservation22Data.rJZsWIProps,
      },
    },
    {
      path: "/system-preparing",
      component: SystemPreparing,
      name: "SystemPreparing",
      props: {
        rJZsWIProps: systemOverview2Data.rJZsWIProps,
      },
    },
    {
      path: "/reservation-write",
      name: "reservation-write",
      component: ReservationWrite,
      // props: true // props를 통해 `params` 데이터를 컴포넌트에 전달할 수 있게 설정
      props: { ...reservation12Data },
      // props: route => ({  branchId: route.params.branchId }),

      // params: {
      //   name: "매장명",
      //   branchId: "매장명",
      //   address: "매장명",
      //   weekdayHours : "",
      //   weekendHours : "",
      //   mapImage : "",
      //   location: { latitude: 123.123, longitude: 123.123 }
      // }
    },
    {
      path: "/event-detail",
      component: EventDetail,
      props: {
        rJZsWIProps: eventDetails2Data.rJZsWIProps,
      },
    },
    {
      path: "/gameintro-preparing",
      component: GameIntroPreparing,
      props: {
        rJZsWIProps: systemOverview2Data.rJZsWIProps,
      },
    },
    {
      path: "/gameguide-preparing",
      component: GameGuidePreparing,
      props: {
        rJZsWIProps: systemOverview2Data.rJZsWIProps,
      },
    },
    {
      path: "/course-list",
      component: CourseList,
      name: "CourseList",
      props: {
        rJZsWIProps: courses2Data.rJZsWIProps,
      },
    },

    {
      path: "/board-list",
      component: BoardList,
      props: { ...community2Data },
    },
    { path: "/editpassword", component: EditPassword },
    {
      path: "/course-detail",
      component: CourseDetail,
      props: { rJZsWIProps: courseDetails2Data.rJZsWIProps },
    },
    {
      path: "/board-detail",
      component: BoardDetail,
      props: {
        ...communityDetails2Data,
      },
    },
    {
      path: "/notice-list",
      component: NoticeList,
      name: "NoticeList",
      props: { ...announcements2Data },
    },
    // 메니저 관리
    {
      path: "/managerlogin",
      component: ManagerLogin,
    },
    {
      path: "/managerroom",
      component: ManagerRoom,
    },
    {
      path: "/managerreservation",
      component: ManagerReservation,
    },
    {
      path: "/managerhomepage",
      component: ManagerHomepage,
    },
    {
      path: "/managerroom-management",
      component: ManagerRoomManagement,
    },
    {
      path: "/managerpoint-management",
      component: ManagerPointManagement,
    },
    // 24.11.27 수정 - 추가
    {
      path: "/managercontact",
      component: ManagerContactList,
    },
    // 24.11.27 수정 - 추가
    {
      path: "/managercontact-detail",
      component: ManagerContactDetail,
    },
    // 24.11.27 수정 - 추가
    {
      path: "/manageras-management",
      component: ManagerASManagement,
    },
    // 24.11.27 수정 - 추가
    {
      path: "/manageras-write",
      component: ManagerASWrite,
    },
    // 24.11.27 수정 - 추가
    {
      path: "/manageras-detail",
      component: ManagerASDetail,
    },
    {
      path: "/managervisitor-statistics",
      component: ManagerVisitorStatistics,
    },
    {
      path: "/managerreservation-statistics",
      component: ManagerReservationStatistics,
    },
    {
      path: "/managergame-statistics",
      component: ManagerGameStatistics,
    },
    {
      path: "/managergame-management",
      component: ManagerGameManagement,
    },
    {
      path: "/manageruser-statistics",
      component: ManagerUserStatistics,
    },
    {
      path: "/managergame-write",
      component: ManagerGameWrite,
    },
    {
      path: "/managergame-managementlist",
      component: ManagerGameManagementList,
    },
    {
      path: "/managergame-contact",
      component: ManagerGameManagementList,
    },
    {
      path: "/nicePays",
      name: "nicePays",
      component: NicePay,
    },
    {
      path: "/NicePayConfirm",
      name: "NicePayConfirm",
      component: NicePayConfirm,
    },
    
    // 관리자 메인
    {
      path: "/adminlogin",
      component: AdminLogin,
    },
    {
      path: "/adminuser-management",
      component: AdminUserManagement,
    },
    {
      path: "/admin-dashboard",
      component: AdminDashboard,
    },
    {
      path: "/admingame-management",
      component: AdminGameManagement,
    },
    {
      path: "/adminpoint-management",
      component: AdminPointManagement,
    },
    {
      path: "/managergame-management/:id",
      name: "ManagerGameManagement", // 라우트 이름 설정
      component: ManagerGameManagement,
      props: true,
    },
    {
      path: "/adminmanager-management",
      component: AdminManagerManagement,
    },
    {
      path: "/adminmanager-managementwrite",
      component: AdminManagerManagementWrite,
    },
    {
      path: "/adminequipment-management",
      component: AdminEquipmentManagement,
    },
    {
      path: "/admincourse-managementwrite",
      component: AdminCourseManagementWrite,
    },
    {
      path: "/adminas-management",
      component: AdminASManagement,
    },
    {
      path: "/adminas-managementdetail",
      component: AdminASManagementDetail,
    },
    {
      path: "/admincontact-list",
      component: AdminContactList,
    },
    {
      path: "/admincontact-detail",
      component: AdminContactDetail,
    },
    {
      path: "/admin-statistics",
      component: AdminStatistics,
    },
    {
      path: "/admincourse-management",
      component: AdminCourseManagement,
    },
    {
      path: "/event-write",
      component: EventWrite,
    },
    {
      path: "/notice-write",
      name: "NoticeWrite",
      component: NoticeWrite,
    },
    {
      path: "/adminfaq-management",
      name: "AdminFaqManagement",
      component: AdminFaqManagement,
    },
    {
      path: "/adminnotice-list",
      component: AdminNoticeList,
    },
    {
      path: "/adminnotice-detail",
      component: AdminNoticeDetail,
    },
    {
      path: "/adminevent-list",
      component: AdminEventList,
    },
    {
      path: "/adminevent-detail",
      component: AdminEventDetail,
    },
    {
      path: "/adminbanner",
      component: AdminBanner,
    },
    {
      path: "/adminbanner-detail",
      name: "AdminBannerDetail",
      component: AdminBannerDetail,
    },
    {
      path: "/adminbanner-write",
      name: "AdminBannerWrite",
      component: AdminBannerWrite,
    },
    {
      path: "/adminfaq-list",
      component: AdminFaqList,
    },
    {
      path: "/adminfaq-detail",
      component: AdminFaqDetail,
    },
    {
      path: "/adminterms-list",
      name:"AdminTermsList",
      component: AdminTermsList,
    },
    {
      path: "/adminterms-write",
      name:"AdminTermsWrite",
      component: AdminTermsWrite,
    },
    {
      path: "/adminterms-detail",
      name:"AdminTermsDetail",
      component: AdminTermsDetail,
    },
  ],
  
  
  scrollBehavior() {
    // 항상 페이지의 상단으로 스크롤
    return { x: 0, y: 0 };
  },
});

