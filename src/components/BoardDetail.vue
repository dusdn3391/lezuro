<template>
  <div class="container-center-horizontal">
    <div class="communitydetails-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="frame-7913">

        <div class="title pretendard-bold-log-cabin-38px">자유게시판</div>
        <div class="board-detail">
          <!-- 24.11.26 수정 - class 수정-->
          <div class="board-detail-top">
            <!-- 24.11.26 수정 - class 수정-->
            <div class="board-detail-title valign-text-middle pretendard-bold-log-cabin-30px">
              {{ title }}
            </div>
            <!-- 24.11.26 수정 - class 수정-->
            <div class="notice-info pretendard-regular-normal-mountain-mist-20px">
              <!-- 24.11.26 수정 - 추가 -->
              <div class="notice-info-first">
                <div class="frame-7835-item-1 valign-text-middle">
                  {{ updatedAt }}
                </div>
                <!-- 24.11.26 수정 -->
                <span class="slash"> l </span>
                <div class="frame-7835-item-1 separ valign-text-middle">
                  작성자 : {{ author }}
                </div>
                <!-- 24.11.26 수정 -->
                <span class="slash"> l </span>
                <div class="frame-7835-item-1 valign-text-middle">
                  조회수 : {{ views }}
                </div>
              </div>
              <!-- 24.11.26 수정 - 추가 -->
              <!-- <div class="notice-info-btn" v-if="loginInfo.id === authorId"> -->
              <div class="notice-info-btn" v-if="loginInfo.name === author">
                <button class="comment-edit-button pretendard-medium-white-18px" @click="togoEditBoard">수정</button>
                <button class="delete-button pretendard-medium-white-18px" @click="deleteBoard">삭제</button>
              </div>
            </div>
          </div>
          <div class="frame-7836-6 pretendard-light-granite-gray-18px">
            <p class="lorem-ipsum-dolor-si-7 valign-text-middle">
              {{ content }}
            </p>
            <div v-if="imageUrl" class="image-container">
              <img :src="imageUrl" alt="첨부된 이미지" class="uploaded-image" />
            </div>
          </div>
        </div>

        <button class="to-go-list valign-text-middle pretendard-medium-white-18px" @click="toGoBoardList">
          목록으로
        </button>

        <div class="reply-content">
          <!-- 24.11.26 수정 - 추가 -->

          <div v-if="isLoggedIn" class="reply-write">
            <!-- 24.12.19 수정 - 폰트 추가 -->
            <textarea placeholder=" 내용을 입력해 주세요" class="reply-textarea pretendard-regular-normal-mountain-mist-16px"
              v-model="contents"></textarea>
            <div class="reply-buttons">
              <button class="cancel-button pretendard-regular-normal-white-18px">
                취소
              </button>
              <button class="submit-button pretendard-regular-normal-white-18px" @click="postComments">
                입력
              </button>
            </div>
          </div>
          <div v-else class="reply-write">
            <p class="pretendard-regular-normal-granite-gray-18px" @click="toGoLoginView">로그인 후 댓글을 작성할 수 있습니다.</p>
          </div>

          <div class="reply-view">
            <div class="reply-count pretendard-bold-black-20px">댓글 {{ comments.length }}</div>
            <hr class="divider" />
            <!-- 24.11.22 수정 - 추가 -->
            <!-- 댓글이 있을 경우 -->
            <div v-if="comments.length > 0">
              <div class="comment" v-for="comment in comments" :key="comment.id">
                <div class="comment-header">
                  <!-- <img class="comment-avatar" :src="comment.avatar" alt="User avatar" /> -->
                  <!-- 24.11.22 수정 -->
                  <img class="comment-avatar" :src="comment.avatar || (comment.profileImage || basicProfileImg)"
                    alt="User avatar" />
                  <span class="comment-author pretendard-medium-mine-shaft-20px">{{ comment.comment_author }}</span>
                  <span class="comment-date pretendard-regular-normal-mine-shaft-18px">{{ comment.comment_createdAt ?
                    comment.comment_createdAt.split("T")[0] :
                    '날짜 없음' }}</span>
                </div>
                <div class="comment-body pretendard-regular-normal-granite-gray-18px">
                  <div v-if="comment.isEditing">
                    <textarea type="text" v-model="comment.editedContent"
                      class="comment-input pretendard-regular-normal-granite-gray-18px" placeholder="댓글을 수정하세요" />
                  </div>
                  <div v-else>
                    {{ comment.comment_content || '내용 없음' }}
                  </div>
                </div>

                <div class="comment-actions" v-if="comment.comment_userId === loginInfo.id">

                  <button class="comment-edit-button pretendard-regular-normal-white-18px"
                    @click="toggleEditComment(comment)">
                    {{ comment.isEditing ? "완료" : "수정" }}
                  </button>
                  <button class="delete-button pretendard-regular-normal-white-18px"
                    @click="deleteComments(comment.comment_id)">
                    삭제
                  </button>
                </div>
              </div>
            </div>
            <!-- 24.11.22 수정 - 추가 -->
            <!-- 댓글이 없을 경우 -->
            <div v-else>
              <!-- 24.11.26 수정 - font 추가 -->
              <p class="pretendard-regular-normal-granite-gray-18px">등록된 댓글이 없습니다.</p>
            </div>
          </div>
        </div>
      </div>
      <x-footer />
    </div>
  </div>
</template>

<script>
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
import Header from "./Header.vue";
import { taskStore } from "@/store/taskStore";

export default {
  name: "BoardDetail",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps"],
  data() {
    return {
      title: "",
      updatedAt: "",
      author: "",
      views: "",
      content: "",
      contents: "",
      imageUrl: "",
      loginInfo: {},
      comments: [],
      isEditing: false,
      // 24.11.22 수정
      basicProfileImg: 'https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/group-736@2x.png',
      authorId: null, // 24.11.26 수정 - 추가:게시글 작성자의 ID
      isLoggedIn: null, // 24.11.26 수정 - 추가 : 로그인 상태
    };
  },
  async mounted() {
    // 라우트에서 전달된 상태 데이터를 가져옵니다.
    const id = this.$route.query.id
    console.log("Received ID:", id);
    if (id) {
      this.id = id;
      await this.fetchBoardDetail();
    } else {
      console.error("ID를 찾을 수 없습니다.");
      this.toGoBoardList();
    }
    // await this.getComments();
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.loginInfo = loginInfo || {};
    console.log("초기화된 this.loginInfo:", this.loginInfo);

    // 24.11.26 수정 - 추가
    // 로그인된 상태에서만 댓글을 작성할 수 있도록 처리
    this.isLoggedIn = this.loginInfo.id ? true : false;
    console.log('isLoggedIn', this.isLoggedIn)
  },
  methods: {
    // 24.11.26 수정 - 추가
    togoEditBoard() {
      this.$router.push({
        path: "/board-write",
        query: {
          id: this.id,
        },
      });
    },
    // 24.11.26 수정 - 추가
    async deleteBoard() {
      const response = await taskStore.deleteTask(`posts/${this.id}`);
      alert('게시글이 삭제되었습니다.');
      this.$router.push({ path: "/board-list" });
    },
    async fetchBoardDetail() {
      try {
        if (!this.id) {
          console.error("게시물 ID가 없습니다.");
          return;
        }

        // API 호출
        const response = await taskStore.getSelectTasks(`posts/${this.id}`);
        console.log("API 응답:", response);

        // 데이터가 존재하는지 확인 후 할당
        if (response && response[0]) {
          // 게시물 정보 할당
          this.title = response[0].post_title || "제목 없음";
          this.author = response[0].post_author || "작성자 없음";
          this.authorId = response[0].post_authorId || null; // 24.11.26 수정 - 추가:작성자의 ID 저장
          this.content = response[0].post_content || "내용이 없습니다.";
          this.updatedAt = response[0].updatedAt
          this.views = response[0].post_views,
            this.updatedAt = response[0].post_createdAt.split("T")[0];
          this.imageUrl = response[0].post_imageUrl




          // 댓글 정보 할당
          // this.comments = response[0].commentList || [];
          // console.log("댓글 리스트:", this.comments);
          // this.comments = this.comments.map((comment) => ({

          // 24.11.26 수정 - 기본 null 값 댓글 제외
          this.comments = (response[0].commentList || []).filter(
            (comment) =>
              comment.comment_content !== null &&
              comment.comment_content.trim() !== "" &&
              comment.comment_author !== null
          ).map((comment) => ({
            ...comment,
            isEditing: false, // Add isEditing with a default value of false
            // 24.11.26 수정 - 추가
            profileImg: comment.profileImg || this.basicProfileImg, // 댓글 작성자 프로필 이미지
            editedContent: comment.comment_content,
          }));
          console.log("Updated Comments:", this.comments);
          console.log('response 1', response)

        } else {
          console.error("응답 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    async postComments() {
      try {
        const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
        const author = loginInfo.name;
        const userId = loginInfo.id;
        // console.log('userId', userId)
        // const userInfo = await taskStore.getSelectTasks(`http://13.124.62.68:3000/api/v1/users/${loginInfo.id}`);
        // console.log('userInfo', userInfo)
        const profileImg = loginInfo.profileImage; //24.11.22 수정 - 추가
        console.log('profileImg:', profileImg);
        const now = new Date();
        const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9 시간대 조정
        const createdAt = koreaTime
          .toISOString()
          .replace("T", " ")
          .slice(0, 19);
        // POST 요청으로 데이터를 서버에 전송
        const params = {
          // title: this.title,
          content: this.contents,
          author: author,
          userId: userId,
          category: "자유게시판",
          views: 0,
          freeBoardId: this.id,
          afterServiceId: "1",
          askId: "1",
          createdAt: createdAt,
          commentText: "0",
          updatedAt: createdAt,
          profileImage: profileImg, // 24.11.22 수정 : profileImage 추가
        };
        console.log("보내는 데이터:", JSON.stringify(params, null, 2));

        const response = await taskStore.postTask("comments", params);


        console.log("등록 성공:", response);
        alert("등록이 되었습니다");
        await this.fetchBoardDetail();
        this.contents = ""; // 입력한 댓글 초기화
      } catch (error) {
        console.error("등록 실패:", error);
        alert("등록에 실패했습니다.");
      }
    },
    toggleEditComment(comment) {
      // 수정 모드 토글
      if (comment.isEditing) {
        this.updateComment(comment);
      }
      comment.isEditing = !comment.isEditing;
    },
    async updateComment(comment) {
      try {
        const now = new Date();
        const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9 시간대 조정
        const createdAt = koreaTime
          .toISOString()
          .replace("T", " ")
          .slice(0, 19);
        // POST 요청으로 데이터를 서버에 전송
        console.log(JSON.stringify(comment))
        const params = {
          content: comment.editedContent,
          createdAt: createdAt,
        };
        console.log("보내는 데이터:", JSON.stringify(params));

        const response = await taskStore.updateTask(
          `comments/${comment.comment_id}`,
          params
        );
        console.log("댓글 수정 응답:", response);
        await this.fetchBoardDetail();
        alert("댓글이 수정되었습니다.");
      } catch (error) {
        console.error("등록 실패:", error);
        alert("등록에 실패했습니다.");
      }
    },
    async deleteComments(commentId) {
      console.log("commentId : : ", commentId)
      try {
        // 특정 댓글을 삭제
        const response = await taskStore.deleteTask(`comments/${commentId}`);
        console.log("댓글 삭제 응답:", response);

        // 삭제 후 댓글 목록을 갱신
        alert("댓글이 삭제되었습니다.");
        await this.fetchBoardDetail();
        // 24.11.26 수정 - 새로고침 삭제
        // window.location.reload();
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    },
    toGoBoardList() {
      this.$router.push({ path: "/board-list" });
    },
    // 24.11.26 수정 - 추가
    toGoLoginView() {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style scoped src="@/style/community/boarddetail.css"></style>
