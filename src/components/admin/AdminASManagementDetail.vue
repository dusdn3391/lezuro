<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">A/S 관리</h2>
          </div>
          <div class="list-box">
            <!-- A/S 신청 내역 제목 -->
            <div class="as-title">
              <div class="pretendard-bold-log-cabin-30px">{{ title }}</div>
              <div class="as-info pretendard-regular-normal-mountain-mist-20px">
                <!-- 신청 날짜 -->
                <div class="text-29-7 valign-text-middle">
                  {{ requestedAt.split("T")[0] }}
                </div>
                <!-- <div class="rectangle-50927-1"></div> -->
                <span>l</span>
                <div class="valign-text-middle" :class="statusClass(selectedStatus)">
                  {{ selectedStatus }}
                </div>
                <!-- <div class="text-29-7 valign-text-middle">
                    작성자 : 레저로 박
                  </div>
                  <div class="rectangle-50927-1"></div>
                  <div class="text-29-7 valign-text-middle">조회수 : 150</div> -->
              </div>
            </div>
            <!-- A/S 신청 내용 -->
            <div class="as-content">
              <div class="as-content-st pretendard-light-granite-gray-18px">
                <p class="ft valign-text-middle">{{ content }}</p>
              </div>
              <button class="list-btn pretendard-medium-white-18px" @click="toGoList()">
                목록으로
              </button>
              <div class="reply-content">
                <div class="reply-write">
                  <textarea placeholder="내용을 입력해 주세요" class="reply-textarea" v-model="contents"></textarea>
                  <div class="reply-buttons">
                    <button class="cancel-button pretendard-regular-normal-white-18px">
                      취소
                    </button>
                    <button class="submit-button pretendard-regular-normal-white-18px" @click="postComments">
                      입력
                    </button>
                  </div>
                </div>
                <div class="reply-view">
                  <div class="reply-count">댓글 {{ comments.length }}</div>
                  <!-- 24.12.04 수정 - 추가 -->
                  <!-- 댓글이 있을 경우 -->
                  <div v-if="comments.length > 0">
                    <div class="comment" v-for="comment in comments" :key="comment.id">
                      <div class="comment-header">
                        <img class="comment-avatar"
                          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/group-736@2x.png"
                          alt="User avatar" />
                        <span class="comment-author">{{
                          comment.comment_author
                        }}</span>
                        <span class="comment-date">{{
                          comment.comment_createdAt
                            ? comment.comment_createdAt.split("T")[0]
                            : "날짜 없음"
                        }}</span>
                      </div>
                      <div class="comment-body">
                        <div v-if="comment.isEditing">
                          <textarea type="text" v-model="comment.editedContent" class="comment-input"
                            placeholder="댓글을 수정하세요" />
                        </div>
                        <div v-else>
                          {{ comment.comment_content || '내용 없음' }}
                        </div>
                      </div>

                      <div class="comment-actions">
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
                  <!-- 24.12.04 수정 - 추가 -->
                  <!-- 댓글이 없을 경우 -->
                  <div v-else>
                    <!-- 24.12.04 수정 - font 추가 -->
                    <p class="pretendard-regular-normal-granite-gray-18px">등록된 댓글이 없습니다.</p>
                  </div>
                </div>

              </div>
              <div class="process-status">
                <div class="status pretendard-regular-normal-mine-shaft-18px">
                  진행상태 <span>*</span>
                </div>
                <select v-model="selectedStatus" class="pretendard-regular-normal-mine-shaft-18px">
                  <option value="" disabled selected>
                    진행상태를 선택해주세요
                  </option>
                  <option value="진행중">진행중</option>
                  <option value="접수">접수</option>
                  <option value="취소">취소</option>
                  <option value="완료">완료</option>
                </select>
              </div>
              <button class="answer-insert pretendard-regular-normal-mountain-mist-20px" @click="updateAnswer()">
                답변등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from "./AdminHeader.vue";
import AdminNavbar from "./AdminNavbar.vue";
import { adminStore } from "@/store/adminStore";

export default {
  name: "AdminASManagementDetail",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      id: null,
      title: "",
      content: "",
      contents: "",
      requestedAt: "",
      selectedStatus: "",
      comments: [],
    };
  },
  async mounted() {
    // 라우터에서 id를 받아옴
    this.id = this.$route.query.id;
    console.log("받아온 ID:", this.id);
    await this.getASDetail();
  },
  methods: {
    statusClass(status) {
      if (status === "접수") return "status-reception";
      if (status === "진행중") return "status-processing";
      if (status === "취소") return "status-hold";
      if (status === "완료") return "status-complete";
      return "";
    },
    async getASDetail() {
      try {
        // A/S 상세 데이터를 가져옴
        const response = await adminStore.getTask(`as-requests/${this.id}`);
        console.log("A/S 상세 데이터:", response);

        // 데이터를 data 속성에 할당
        this.title = response[0].asRequest_title;
        (this.content = response[0].asRequest_description),
          (this.requestedAt = response[0].asRequest_requestedAt); // 날짜 포맷
        this.selectedStatus = response[0].asRequest_status;

        // this.comments = response[0].commentList || [];
        // this.comments = this.comments.map(comment => ({
        //   ...comment,
        //   isEditing: false,
        //   editedContent: comment.comment_content
        // }));

        // 24.12.04 수정 - 기본 null 값 댓글 제외
        this.comments = (response[0].commentList || []).filter(
          (comment) =>
            comment.comment_content !== null &&
            comment.comment_content.trim() !== "" &&
            comment.comment_author !== null
        ).map((comment) => ({
          ...comment,
          isEditing: false,
          editedContent: comment.comment_content
        }));
      } catch (error) {
        console.error("A/S 상세 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    toGoList() {
      this.$router.push({ path: "/adminas-management" });
    },
    async updateAnswer() {
      console.log("진행 상태:", this.selectedStatus);
      const params = {
        status: this.selectedStatus,
      };
      try {
        const response = await adminStore.updateTask(
          `as-requests/${this.id}`,
          params
        );
        console.log("업데이트 결과:", response);
        alert("답변이 등록되었습니다.");
      } catch (error) {
        console.error("업데이트 중 오류 발생:", error);
        alert("업데이트 중 오류가 발생했습니다.");
      }
    },
    async postComments() {
      try {

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
          author: "관리자",
          category: "as관리",
          views: 0,
          freeBoardId: "1",
          userId: "1",
          afterServiceId: this.id,
          askId: "1",
          createdAt: createdAt,
          commentText: "0",
          updatedAt: createdAt,
        };
        console.log("보내는 데이터:", JSON.stringify(params, null, 2));

        const response = await adminStore.postTask("comments", params);

        console.log("등록 성공:");
        alert("등록이 되었습니다");
        await this.getASDetail();
        this.contents = ""; // 입력한 댓글 초기화
      } catch (error) {
        console.error("등록 실패:", error);
        alert("등록에 실패했습니다.");
      }
    },
    toggleEditComment(comment) {
      if (comment.isEditing) {
        // 수정 모드에서 완료를 누르면 `updateComment` 호출
        this.updateComment(comment);
      } else {
        // 수정 모드로 전환할 때 기존 댓글 내용을 `editedContent`에 복사
        comment.editedContent = comment.comment_content;
      }
      comment.isEditing = !comment.isEditing;
    },
    async updateComment(comment) {
      try {
        const now = new Date();
        const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9 시간대 조정
        const updatedAt = koreaTime.toISOString().replace("T", " ").slice(0, 19);

        const params = {
          content: comment.editedContent,
          updatedAt: updatedAt,
        };

        // 서버에 업데이트 요청
        const response = await adminStore.updateTask(`comments/${comment.comment_id}`, params);
        console.log("댓글 수정 응답:", response);

        // if (response.success) {
        //   alert("댓글이 수정되었습니다.");
        //   comment.comment_content = comment.editedContent; // 수정된 내용 반영
        //   comment.isEditing = false; // 수정 모드 종료
        // } else {
        //   alert("댓글 수정에 실패했습니다.");
        // }
        await this.getASDetail();
      } catch (error) {
        console.error("댓글 수정 중 오류 발생:", error);
        alert("댓글 수정 중 오류가 발생했습니다.");
      }
    }
    ,
    async deleteComments(commentId) {
      try {
        // 특정 댓글을 삭제
        const response = await adminStore.deleteTask(`comments/${commentId}`);
        console.log("댓글 삭제 응답:", response);

        // 삭제 후 댓글 목록을 갱신
        alert("댓글이 삭제되었습니다.");
        await this.getASDetail();
        window.location.reload();
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    },
  },
};
</script>

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.reservation-container {
  background-color: #f5f6f6;
  display: flex;
  height: 100%;
  width: 100%;
  /* 기본값이 세로방향인 flex-direction을 가로방향으로 설정 */
  flex-direction: row;
}

.wrapper {
  flex-grow: 1;
  /* 나머지 공간을 차지하게 함 */
  padding: 30px;
  gap: 20px;
}

/* 타이틀 박스 */
.title-box {
  background-color: #fff;
  padding: 24px 30px;
  margin-bottom: 20px;
  gap: 10px;
}

/* 리스트 박스 */
.list-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #fff;
  padding: 30px;
}

.as-title {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
  padding-bottom: 40px;
}

.as-info {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  justify-content: center;
  position: relative;
}

.as-content {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
}

.as-content-st {
  align-items: flex-start;
  align-self: stretch;
  border: 1px solid;
  border-color: var(--alto);
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 30px;
  padding: 40px;
  position: relative;
  width: 100%;
}

.ft {
  letter-spacing: 0;
  line-height: 28px;
  margin-top: -1px;
  position: relative;
  /* width: 1320px; */
}

/* 24.12.03 수정 - 추가 */
.list-btn {
  background-color: var(--monza);
  width: 200px;
  height: 50px;
  border: none;
}

.reply {
  height: 150px;
  position: relative;
  width: 100%;
}

.reply-input {
  align-items: flex-start;
  background-color: var(--hint-of-red);
  border: 1px solid;
  border-color: var(--celeste);
  display: flex;
  gap: 10px;
  height: 150px;
  left: 0;
  padding: 20px;
  position: relative;
  top: 0;
  width: 100%;
}

.reply-btn {
  display: flex;
  position: absolute;
  /* 부모 요소의 하단에 배치 */
  bottom: 10px;
  right: 0;
}

.cancel-btn,
.insert-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid;
  border-color: var(--blackwhitewhite);
  border-radius: 8px;
  gap: 10px;
  height: 48px;
  width: 90px;
  margin-right: 10px;
}

.cancel-btn {
  background-color: var(--mountain-mist);
}

.insert-btn {
  background-color: var(--torea-bay);
}

.reply-list {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 30px;
  position: relative;
  width: 100%;
}

.reply-count {
  align-items: center;
  align-self: stretch;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: var(--mountain-mist);
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 30px 0px 15px;
  position: relative;
  width: 100%;
}

.reply-count-text {
  letter-spacing: -0.8px;
  line-height: 32px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.reply-header {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 20px;
  position: relative;
}

.reply-writer {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 8px;
  position: relative;
}

.profile-img {
  height: 30px;
  position: relative;
  width: 30px;
}

.nickname {
  letter-spacing: -0.8px;
  line-height: 32px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.insertDate {
  letter-spacing: -0.72px;
  line-height: 32px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.reply-background {
  align-self: stretch;
  background-color: var(--hint-of-red);
  height: 200px;
  position: relative;
  width: 100%;
}

.reply-content-btn {
  display: flex;
  position: absolute;
  /* 부모 요소의 하단에 배치 */
  bottom: 10px;
  right: 0;
}

.modify-btn,
.delete-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid;
  border-color: var(--blackwhitewhite);
  border-radius: 8px;
  gap: 10px;
  height: 48px;
  width: 90px;
  margin-right: 10px;
}

.modify-btn {
  background-color: var(--mountain-mist);
}

.delete-btn {
  background-color: var(--monza);
}

.reply-content-detail {
  left: 25px;
  /* letter-spacing: -0.72px; */
  line-height: 32px;
  position: absolute;
  top: 81px;
}

.process-status {
  display: flex;
  align-items: center;
  width: 100%;
}

.status {
  display: flex;
  margin-right: 40px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.process-status span {
  color: #d30f1a;
}

.process-status select {
  height: 56px;
  width: 93%;
  right: 0;
}

.answer-insert {
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  white-space: nowrap;
  width: 100%;
  height: 54px;
  border: none;
  background-color: #184199;
  color: #fff;
}

.reply-content {
  width: 100%;
  margin: 0 auto;
  padding: 20px 0px;
}

.reply-write {
  background-color: #fafafa;
  padding: 20px;
  margin-bottom: 20px;
}

.reply-textarea {
  width: 100%;
  background-color: #fafafa;
  border: none;
  height: 49px;
  outline: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  resize: none;
}

.reply-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.cancel-button {
  background-color: #999;
  border: none;
  width: 90px;
  height: 48px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.submit-button {
  background-color: #184199;
  border: none;
  width: 90px;
  height: 48px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

/* 24.12.04 수정 */
.reply-view {
  padding: 20px 0;
  border-radius: 5px;
}

.reply-count {
  font-weight: bold;
  margin-bottom: 10px;
}

.divider {
  border-top: 1px solid #dddddd;
  margin: 10px 0;
}

.comment {
  padding: 15px 0;
  border-bottom: 1px solid #eeeeee;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.comment-author {
  font-weight: bold;
}

.comment-date {
  color: #888888;
}

.comment-body {
  padding: 20px;
  background-color: #f9f9f9;
  margin-top: 30px;
}

.comment-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
  background-color: #f9f9f9;
  padding: 20px;
}

.comment-edit-button {
  background-color: #cccccc;
  border: none;
  width: 90px;
  height: 48px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.delete-button {
  background-color: #d30f1a;
  border: none;
  width: 90px;
  height: 48px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.comment-body textarea {
  border: none;
  width: 100%;
  background-color: #f9f9f9;
  height: 100%;
}

.status-reception,
.status-processing,
.status-hold,
.status-complete {
  color: #14b655;
  border: 1px solid #14b655;
  width: 80px;
  padding: 11px 0px;
  border-radius: 5px;
  text-align: center;
}

/* 상태 - 진행중 */
.status-processing {
  color: #d30f1a;
  border: 1px solid #d30f1a;
}

/* 상태 - 취소 */
.status-hold {
  color: #999999;
  border: 1px solid #999999;
}

/* 상태 - 완료 */
.status-complete {
  color: #184199;
  border: 1px solid #184199;
}
</style>