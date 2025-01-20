<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <!-- 모달 헤더 -->
      <div class="modal-header">
        <h2 class="modal-title pretendard-extra-extra-bold-log-cabin-24px">회원정보</h2>
        <button class="close-button" @click="closeModal">✕</button>
      </div>

      <!-- 회원정보 내용 -->
      <div class="modal-body">
        <div class="user-info-header">
          <img
  class="user-avatar"
  :src="user.profileImage ? user.profileImage : 'https://via.placeholder.com/50'"
  alt="avatar"
/>
          <div class="user-info-title pretendard-bold-mine-shaft-18px">
            {{ user.name }}님의 회원정보
          </div>
        </div>

        <table class="user-info-table">
          <tr>
            <td class="label pretendard-regular-normal-granite-gray-14px">아이디</td>
            <td>{{ user.phone }}</td>
            <td class="label pretendard-regular-normal-granite-gray-14px">이름</td>
            <td>{{ user.name }}</td>
          </tr>
          <tr>
            <td class="label pretendard-regular-normal-granite-gray-14px">성별</td>
            <td>{{ user.gender }}</td>
            <td class="label pretendard-regular-normal-granite-gray-14px">나이</td>
            <td>{{ calculateAge(user.birthDay) }}세</td>
          </tr>
          <tr>
            <td class="label pretendard-regular-normal-granite-gray-14px">휴대폰</td>
            <td>{{ user.phone }}</td>
            <td class="label pretendard-regular-normal-granite-gray-14px">이메일</td>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <td class="label pretendard-regular-normal-granite-gray-14px">등급</td>
            <td>{{ user.grade }}</td>
            <td class="label pretendard-regular-normal-granite-gray-14px">가입일</td>
            <td>{{ user.createdAt.split('T')[0] }}</td>
          </tr>
        </table>
      </div>

      <!-- 닫기 버튼 -->
      <div class="modal-footer">
        <button class="close-modal-btn" @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminUserInfoModal",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  const dayDifference = today.getDate() - birth.getDate();

  // Adjust age if the birth month and day haven't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  width: 880px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom:1px solid #ddd;
  padding-bottom:33.5px;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 20px;
}

.user-info-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-avatar {
  border-radius: 50%;
  width: 26px;
  height: 26px;
  margin-right: 10px;
}


.user-info-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.user-info-table td {
  padding: 12px;
  border: 1px solid #ddd;
}

.label {
  background-color: #f5f5f5;
  width:100px;
}

.modal-footer {
  text-align: center;
  margin-top: 20px;
}

.close-modal-btn {
  background-color: #184199;
  color: white;
  border: none;
  padding: 10px 20px;
  width:100%;
  cursor: pointer;
}
</style>
