<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <div class="title-top pretendard-bold-log-cabin-38px"> {{ isEdit ? "이용약관 수정" : "이용약관 작성" }}</div>
          <div class="content-wrap">
            <div class="write-wrap">
              <div class="title-box">
                <div class="content-title valign-text-middle pretendard-medium-black-18px">
                  약관 종류
                </div>
                <select name="category" id="category" v-model="selectedCategory"
                  class="category-select pretendard-regular-normal-mine-shaft-16px" @change="updateTermsType">
                  <option value="" disabled selected>
                    약관 종류를 선택해주세요
                  </option>
                  <option value="이용약관">이용약관</option>
                  <option value="개인정보">개인정보처리방침</option>
                  <option value="위치정보">위치정보이용약관</option>
                </select>
              </div>
              <div v-for="(article, index) in terms" :key="index" class="article-box">
                <!-- 제목 -->
                <div class="title-box">
                  <input type="text" class="frame-7281-8 pretendard-regular-normal-mine-shaft-16px"
                    :placeholder="`제 ${index + 1} 조 제목을 입력해주세요`" v-model="article.title" />
                </div>
                <!-- 내용 -->
                <div class="content-box">
                  <textarea class="frame-7281-9 pretendard-regular-normal-mine-shaft-16px"
                    :placeholder="`제 ${index + 1} 조 내용을 입력해주세요`" v-model="article.content"></textarea>
                </div>
              </div>
              <div class="button-container">
                <button class="cancel-button pretendard-medium-white-18px" @click="backList">
                  취소하기
                </button>
                <!-- 24.12.12 수정 - 수정하기에서 버튼 없애기 -->
                <button  v-if="!isEdit" class="add-button pretendard-medium-white-18px" @click="addArticle">
                  추가하기
                </button>
                <button class="submit-button pretendard-medium-white-18px" @click="isEdit ? updateTerms() : submit()">
                  {{ isEdit ? "수정하기" : "등록하기" }}
                </button>
              </div>
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
  name: "AdminTermsWrite",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      selectedCategory: "", // 약관 종류 선택
      terms: [
        { title: "제 1 조", content: "", type: "" }, // 초기 데이터
      ],
      isEdit: false,
      id: null,
    };
  },
  mounted() {
    // 라우터 params에서 데이터를 받아옴
    const { id, title, content, isEdit, type } = this.$route.params;

    if (isEdit) {
      // 수정 모드일 경우 데이터를 초기화
      this.isEdit = true;
      this.id = id;
      this.selectedCategory = type;
      this.terms = [{ title, content, type: "" }];
      console.log("수정할 데이터:", { id, title, content, type });
    } else {
      // 새 데이터 추가 시 초기화
      this.terms = [{ title: "제 1 조", content: "", type: "" }];
    }
  },
  methods: {
    // 새 조항 추가
    addArticle() {
      const nextIndex = this.terms.length + 1;
      this.terms.push({
        title: `제 ${nextIndex} 조`,
        content: "",
        type: this.selectedCategory,
      });
    },
    backList() {
      this.$router.push({ path: "/adminterms-list" })
    },
    // 약관 종류 업데이트
    updateTermsType() {
      this.terms.forEach((term) => {
        term.type = this.selectedCategory;
      });
    },
    // 데이터 저장
    async submit() {
      if (!this.selectedCategory) {
        alert("약관 종류를 선택해주세요.");
        return;
      }

      if (this.terms.some((term) => !term.title || !term.content)) {
        alert("모든 제목과 내용을 입력해주세요.");
        return;
      }

      try {
        const params = {
          terms: this.terms,
        };

        const response = await adminStore.postTask("terms/term", params);

        console.log("등록 성공:", response.data);
        alert("등록이 되었습니다.");
        this.$router.push({ path: "/adminterms-list" });
      } catch (error) {
        console.error("등록 실패:", error);
        alert("등록에 실패했습니다.");
      }
    },
    async updateTerms() {
      try {
        // 서버에 전송할 데이터 준비
        const { title, content } = this.terms[0]; // terms 배열의 첫 번째 항목만 전송
        console.log("수정 요청 title:", title);
        console.log("수정 요청 content:", content);
        console.log("수정 요청 ID:", this.id);

        const params = {
          title,
          content,
        };
        console.log("수정 전", params)
        const response = await adminStore.updateTask(`terms/${this.id}`, params);
        console.log("수정 후", params)
        // console.log("수정 성공:", response.data);
        alert("이용약관이 수정되었습니다.");
        this.$router.push({ path: "/adminterms-list" });
      } catch (error) {
        console.error("이용약관 수정 실패:", error);
        alert("이용약관 수정에 실패했습니다.");
      }
    }


  },
};
</script>
<style scoped>
.reservation-container {
  display: flex;
  height: 100%;
  flex-direction: row;
  background: #f5f6f6;
}

.title-top {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
  /* 24.12.10 수정 - 추가 */
  font-size: 28px;
}

.wrapper {
  flex-grow: 1;
  padding: 30px;
  gap: 20px;
}

.article-box {
  margin-bottom: 20px;
}

.title-box {
  margin-bottom: 10px;
}

.content-box {
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.add-button,
.cancel-button,
.submit-button {
  width: 200px;
  padding: 15px;
  border: none;
  cursor: pointer;
}

/* 24.12.10 수정 - 추가 */
.cancel-button {
  background-color: #999;
}

/* 24.12.12 수정 - 배경색 변경 */
.add-button {
  background-color: #d30f1a;
  color: white;
}

/* 24.12.12 수정 - 배경색 변경 */
.submit-button {
  background-color: #184199;
  color: white;
}

.frame-7281-8 {
  background-color: #fafafa;
  padding: 20px;
  width: 100%;
  border: 0.5px solid #ddd;
}

.frame-7281-9 {
  background-color: #fafafa;
  padding: 20px;
  width: 100%;
  height: 100px;
  border: 0.5px solid #ddd;
  resize: none;
}

.write-wrap {
  background-color: #fff;
  padding: 30px;
}

.category-select {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
}
</style>
