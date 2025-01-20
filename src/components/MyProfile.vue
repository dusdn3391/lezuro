<template>
  <div class="container-center-horizontal">
    <div class="myprofile-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" />
      <div class="title valign-text-middle pretendard-bold-mine-shaft-38px">
        내정보
      </div>
      <div class="wrap">
        <div class="profile_tab pretendard-medium-granite-gray-18px">
          <div v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)"
            :class="['tab', { active: selectedTab === tab }]">
            {{ tab }}
          </div>
        </div>
        <!-- 내정보 변경 Section -->
        <div v-if="selectedTab === '내정보 변경'" class="myinfo_wrap">
          <!-- Profile Section -->
          <div class="profile-pic-container">
            <!-- Placeholder for user profile image -->
            <div class="profile-pic">
              <!-- 24.11.26 수정 - 기본프로필 사진 변경 -->
              <img :src="profile_image || basicProfileImg" alt="User Profile" />
            </div>

            <!-- Camera icon overlay -->
            <label for="file-upload" class="camera-icon">
              <img src="../../img/camera.png" alt="Upload Icon" />
            </label>
            <input type="file" id="file-upload" accept="image/*" @change="onFileChange" style="display: none" />
          </div>

          <!-- 개인정보 Section -->
          <div class="info-section">
            <div class="info_title">
              <!-- 24.12.23 수정 - div 추가 -->
              <div class="info-title-first">
                <!-- 24.12.04 수정 - font 변경 -->
                <div class="pretendard-medium-black-24px personaltitle">
                  개인정보
                </div>
                <div class="login_status">
                  <div class="circle pretendard-medium-log-cabin-18px" :class="{
                    'naver-color': loginInfo.type === 'NAVER',
                    'kakao-color': loginInfo.type === 'KAKAO',
                  }"></div>
                  <!-- 24.12.05 수정 - 폰트 추가 -->
                  <span class="pretendard-regular-normal-granite-gray-18px" v-if="loginInfo.type === 'NAVER'">네이버
                    로그인</span>
                  <span class="pretendard-regular-normal-granite-gray-18px" v-else-if="loginInfo.type === 'KAKAO'">카카오
                    로그인</span>
                  <span class="pretendard-regular-normal-granite-gray-18px" v-else>일반 로그인</span>
                </div>
              </div>
              <!-- 24.11.15 수정 - 창 이동에서 모달 이동으로 변경 -->
              <!-- 24.12.20 수정 - 폰트 추가 -->
              <button class="persional-edit-button pretendard-medium-white-18px" @click="editmysocialprofile()">
                개인정보 변경
              </button>
            </div>
            <table class="info-table">
              <thead>
                <tr class="pretendard-bold-mine-shaft-18px" style="background-color: #f5f6f6">
                  <th>이름</th>
                  <th>아이디</th>
                  <th>생년월일</th>
                  <th>성별</th>
                  <th>등급</th>
                </tr>
              </thead>
              <tbody>
                <tr class="pretendard-light-granite-gray-18px">
                  <td>{{ loginInfo.name }}</td>
                  <td>{{ loginInfo.phone }}</td>
                  <td>{{ loginInfo.birthDay }}</td>
                  <!-- 24.12.11 수정 - unknown 인 경우 '-' 출력 -->
                  <td>{{ loginInfo.gender === "MALE" ? "남자" : loginInfo.gender === "FEMALE" ? "여자" : "-" }}</td>
                  <td class="rank pretendard-medium-monza-18px">
                    {{ loginInfo.grade }}
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="info-warning pretendard-light-red-14px">
              ※ 실제 정보와 다르게 입력하는 경우 추후 대회 참가, 보상에 문제가
              발생할 수 있습니다.
            </p>
          </div>

          <!-- 회원정보 Section -->
          <div class="member-info-section">
            <div class="member-info-title">
              <!-- 24.12.04 수정 - font 변경 -->
              <div class="pretendard-medium-black-24px subtitle">회원정보</div>
              <!-- 24.11.15 수정 - 창 이동에서 모달 이동으로 변경 -->
              <!-- 24.12.20 수정 - 폰트 추가 -->
              <button class="persional-edit-button pretendard-medium-white-18px" @click="editmyprofile()">
                회원정보 변경
              </button>
            </div>
            <table class="member-info-table">
              <tbody>
                <tr>
                  <!-- 24.12.04 수정 - font 변경 -->
                  <td class="pretendard-medium-black-18px">닉네임</td>
                  <!-- 24.12.20 수정 - 폰트 수정 -->
                  <td class="pretendard-medium-granite-gray-18px">
                    <!-- {{ loginInfo.username }} -->
                    <!-- 24.11.26 수정 - 이름 나오게 수정 -->
                    {{ loginInfo.userName }}
                  </td>
                </tr>
                <tr>
                  <!-- 24.12.04 수정 - font 변경 -->
                  <td class="pretendard-medium-black-18px">
                    매장로그인 비밀번호
                  </td>
                  <!-- 24.12.20 수정 - 폰트 수정 -->
                  <td class="pretendard-medium-granite-gray-18px">
                    {{ loginInfo.storeId }}
                    <!-- 24.12.20 수정 - 폰트 수정 -->
                    <span class="pretendard-medium-suva-gray-16px password-info">(매장에서 로그인 시
                      닉네임과 함께 사용하는 간편 비밀번호입니다.)</span>
                  </td>
                </tr>
                <tr>
                  <!-- 24.12.04 수정 - font 변경 -->
                  <td class="pretendard-medium-black-18px">휴대폰 번호</td>
                  <!-- 24.12.20 수정 - 폰트 수정 -->
                  <td class="pretendard-medium-granite-gray-18px">
                    <!-- {{ loginInfo.phoneNm }} -->
                    <!-- 24.11.26 수정 - 번호 나오게 수정 -->
                    {{ loginInfo.phoneNm }}
                  </td>
                </tr>
                <tr>
                  <!-- 24.12.04 수정 - font 변경 -->
                  <td class="pretendard-medium-black-18px">이메일</td>
                  <!-- 24.12.20 수정 - 폰트 수정 -->
                  <td class="pretendard-medium-granite-gray-18px last-border">
                    {{ loginInfo.email }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 비밀번호 변경 Section -->
          <div class="password-change-section">
            <!-- 24.12.04 수정 - font 변경 -->
            <div class="pretendard-medium-black-24px subtitle">
              비밀번호 변경
            </div>
            <table class="password-change-table">
              <tr>
                <td class="pretendard-medium-black-18px">비밀번호</td>
                <td>
                  <!-- 24.11.15 수정 - 모달로 변경 -->
                  <!-- 24.12.04 수정 - font 변경 -->
                   <!-- 24.12.23 수정 - div로 변경 -->
                  <div v-if="loginInfo.type === 'PHONE'"
                    class="password-change-button pretendard-medium-torea-bay-18px" @click="toGoEditPassword()">
                    비밀번호 변경
                </div>
                </td>
              </tr>
            </table>
          </div>

          <!-- 간편로그인 Section -->
          <div class="quick-login-section">
            <!-- 24.12.04 수정 - font 변경 -->
            <div class="pretendard-medium-black-24px subtitle">
              간편로그인
            </div>
            <table class="quick-login-table">
              <tr>
                <td class="pretendard-medium-black-18px">간편 로그인</td>
                <td>
                  <div class="login-status">
                    <div class="link-button">
                      <div class="link-align">
                        <!-- 24.12.05 수정 - 색상 필터링 -->
                        <div class="circle pretendard-medium-log-cabin-18px" :class="{
                          'naver-color': loginInfo.type === 'NAVER',
                          'kakao-color': loginInfo.type === 'KAKAO',
                        }"></div>
                        <!-- 24.12.20 수정 - 폰트 추가 -->
                        <div class="pretendard-medium-granite-gray-18px">{{
                          loginInfo.createdAt
                            ? loginInfo.createdAt.split("T")[0]
                            : ""
                        }}
                          연동</div>
                      </div>
                    </div>
                    <div class="social-button">
                      <!-- 24.12.05 수정 - 폰트 변경 -->
                      <button v-if="loginInfo.type === 'NAVER'"
                        class="naver-button pretendard-regular-normal-white-14px">
                        네이버 연동
                      </button>

                      <!-- Kakao 로그인일 경우에만 표시 -->
                      <!-- 24.12.05 수정 - 폰트 변경 -->
                      <button v-if="loginInfo.type === 'KAKAO'"
                        class="kakao-button pretendard-regular-normal-log-cabin-14px">
                        카카오 연동
                      </button>
                      <div v-if="!['NAVER', 'KAKAO'].includes(loginInfo.type)" class="no-login-type"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <!-- 24.12.05 수정 - 폰트 변경 -->
            <p class="logout-note pretendard-light-mountain-mist-18px">
              레저로 서비스를 그만 이용하시겠다면,
              <!-- 24.12.05 수정 - 폰트 변경 -->
              <span class="logout_button pretendard-medium-granite-gray-18px"
                @click="openAccountDeletionModal">회원탈퇴</span>
            </p>
          </div>
        </div>
        <!-- <div v-if="selectedTab === '내정보 변경'" class="myinfo_wrap"> -->
        <!-- Profile Section, 개인정보 Section, 회원정보 Section, 비밀번호 변경, 간편로그인 -->
        <!-- Existing content for 내정보 변경 Section -->
        <!-- </div> -->

        <!-- 24.11.25 수정 - font 색상 수정 -->
        <!-- 1:1 문의내역 Section -->
        <div class="frame-7820" v-else-if="selectedTab === '1:1 문의내역'">
          <!-- Inquiry List -->
          <!-- 24.11.20 수정 -->
          <div class="frame-7831" v-if="!inquiries.length">
            <p class="no-data-message">문의가 없습니다.</p>
          </div>
          <!-- 24.11.21 수정 -->
          <div class="frame-7831" v-if="inquiries.length && !selectedInquiry">
            <!-- 24.12.09 수정 - 추가 -->
            <div class="select-box pretendard-regular-normal-mine-shaft-18px">
              <select v-model="inquiryOption">
                <option class="pretendard-regular-normal-mine-shaft-18px" value="전체" selected>전체</option>
                <option class="pretendard-regular-normal-mine-shaft-18px" value="접수완료">접수완료</option>
                <option class="pretendard-regular-normal-mine-shaft-18px" value="답변완료">답변완료</option>
              </select>
            </div>
            <div>
              <table class="inquiry-table pretendard-regular-granite-gray-18px">
                <thead>
                  <tr class="inpuiry-header pretendard-bold-mine-shaft-18px">
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성일</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- 24.12.09 수정 - paginatedItems - sortedInquiries 로 변경 -->
                  <tr v-for="(item, index) in sortedInquiries" :key="item.id" @click="selectInquiry(item)">


                    <td class="table-number pretendard-light-granite-gray-16px" data-label="번호">
                      <!-- {{ index + 1 }} -->
                      <!-- 24.11.25 수정 -->
                      <!-- {{ inquiries.length - ((inquiryCurrentPage - 1) * itemsPerPage + index) }} -->
                      <!-- 24.12.23 수정 -->
                      {{ item.id }}
                    </td>
                    <td class="table-title pretendard-light-granite-gray-16px" data-label="제목">
                      {{ item.title }}
                    </td>
                    <td class="table-date pretendard-light-granite-gray-16px" data-label="작성일">
                      {{ item.createdAt.split("T")[0] }}
                    </td>
                    <td class="table_status_wrap" data-label="상태">
                      <!-- 24.11.26 수정 -->
                      <div :class="[
                        'table-status',
                        { completed: item.status === 'answer' },
                      ]" class="pretendard-semi-bold-log-cabin-14px">
                        <!-- {{ item.status }} -->
                        <!-- {{ item.commentList && item.commentList.length > 0
                          ? '답변완료'
                          : item.status === 'waiting'
                            ? '접수완료'
                            : '상태 없음'
                        }} -->
                        {{ item.status === 'waiting'
                          ? '접수완료'
                          : '답변완료' }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- <p v-if="!inquiries.length" class="no-data-message">문의가 없습니다.</p> -->
              <div class="pagination-controls">
                <img class="pagination-arrow" @click="prevInquiryPage" :src="arrowLeftImage" :alt="'Previous'"
                  :class="{ disabled: inquiryCurrentPage === 1 }" />
                <!-- 24.11.21 수정 -->
                <div class="page-numbers pretendard-medium-log-cabin-16px">
                  <div v-for="page in totalPages" :key="page" :class="[
                    'page-number',
                    { active: page === inquiryCurrentPage },
                  ]" @click="goToInquiryPage(page)">
                    {{ page }}
                  </div>
                </div>
                <img class="pagination-arrow flipped" @click="nextInquiryPage" :src="arrowRightImage" :alt="'Next'"
                  :class="{ disabled: inquiryCurrentPage === totalPages }" />
              </div>
            </div>
          </div>

          <!-- Inquiry Detail Section -->
          <div v-if="selectedInquiry" class="inquiry-detail-container">
            <div class="inquiry-header">
              <h2 class="inquiry-title pretendard-bold-log-cabin-30px">
                {{ selectedInquiry.title }}
              </h2>
              <div class="inquiry-meta pretendard-regular-normal-mountain-mist-20px">
                <!-- 24.12.23 수정 - div 추가 -->
                <div class="inquiry-meta-first">
                  <span>{{ selectedInquiry.createdAt }}</span> l
                  <span>작성자: {{ selectedInquiry.author }}</span>
                </div>
                <!-- 24.11.26 수정 - 색 구분 -->
                <button class=" pretendard-semi-bold-monza-14px" :class="['status-button',
                  {
                    waiting: computedStatus === '접수완료'
                  }]">
                  {{ computedStatus }}
                </button>
              </div>
            </div>
            <div class="inquiry-content">
              <!-- 24.12.23 수정 - v-if 추가 -->
              <img v-if="selectedInquiry.imageUrl" :src="selectedInquiry.imageUrl" />
              <p class="pretendard-light-granite-gray-18px">{{ selectedInquiry.content }}</p>
            </div>
            <div class="back">
              <button @click="goBackToList" class="back-button pretendard-medium-white-18px">
                목록으로
              </button>
            </div>

            <!-- Reply Section -->
            <div class="reply-content">
              <div class="reply-write">
                <!-- 24.12.23 수정 - 폰트 추가 -->
                <textarea placeholder="내용을 입력해 주세요" class="reply-textarea pretendard-regular-normal-mountain-mist-16px"
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
              <div class="reply-view">
                <div class="reply-count pretendard-bold-black-20px">답변 {{ comments.length }}</div>
                <hr class="divider" />
                <!-- 24.11.21 수정 - 추가 -->
                <!-- 댓글이 있을 경우 -->
                <div v-if="comments.length > 0">
                  <div v-for="comment in comments" :key="comment.id" class="comment">
                    <div class="comment-header">
                      <img class="comment-avatar" :src="comment.avatar || (comment.profileImage || basicProfileImg)"
                        alt="User avatar" />
                      <span class="comment-author pretendard-medium-mine-shaft-20px">{{
                        comment.comment_author
                        }}</span>
                      <span class="comment-date pretendard-regular-normal-mine-shaft-18px">
                        {{
                          comment.comment_createdAt
                            ? comment.comment_createdAt.split("T")[0]
                            : "날짜 없음"
                        }}
                      </span>
                    </div>
                    <div class="comment-body pretendard-regular-normal-granite-gray-18px">
                      <div v-if="comment.isEditing">
                        <textarea type="text" v-model="comment.editedContent"
                          class="comment-input pretendard-regular-normal-granite-gray-18px" placeholder="댓글을 수정하세요" />
                      </div>
                      <div v-else>
                        {{ comment.comment_content || "내용 없음" }}
                      </div>
                    </div>
                    <div v-if="comment.comment_userId === loginInfo.id" class="comment-actions">
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
                <!-- 24.11.21 수정 - 추가 -->
                <!-- 댓글이 없을 경우 -->
                <div v-else>
                  <p class="pretendard-regular-normal-granite-gray-18px">등록된 댓글이 없습니다.</p>
                </div>
              </div>
            </div>

            <!-- Back Button -->
          </div>
        </div>


        <!-- 예약 내역 탭 -->
        <div class="frame-78201" v-else-if="selectedTab === '예약내역'">
          <!-- 24.12.09 수정 - 추가 -->
          <div class="select-box pretendard-regular-normal-mine-shaft-18px">
            <select v-model="reservationOption">
              <option class="pretendard-regular-normal-mine-shaft-18px" value="전체" selected>전체</option>
              <!-- 24.12.11 수정 - 대기중 - 접수중 으로 변경 -->
              <option class="pretendard-regular-normal-mine-shaft-18px" value="접수중">접수중</option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="예약완료">예약완료</option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="예약취소">예약취소</option>
            </select>
          </div>
          <p v-if="!reservations.length" class="no-data-message">예약내역이 없습니다.</p>
          <!-- 24.12.09 수정 - paginatedReservations - sortedReservations 로 변경 -->
          <div v-for="reservation in sortedReservations" :key="reservation.id" class="frame-777">
            <div class="frame-7925">
              <!-- <div class="frame-7301" @click="toGoReservation(reservation.id)"> -->
              <!-- 24.12.12 수정 - 예약 페이지 - 상세모달로 변경 -->
              <div class="frame-7301" @click="toGoBranch(reservation.id)">
                <img class="frame-7298" :src="reservation.image" alt="예약 이미지" />
              </div>
              <div class="frame-7923">
                <!-- <div class="frame-7922" @click="toGoReservation(reservation.id)"> -->
                <!-- 24.12.12 수정 - 예약 페이지 - 상세모달로 변경 -->
                <div class="frame-7922" @click="toGoBranch(reservation.id)">
                  <div class="frame-7308">
                    <div class="frame-7917">
                      <div class="group-33601">
                        <!-- 24.12.23 수정 - 아이콘 변경, class 변경 -->
                        <img v-if="reservation.status === 'waiting'" class="noniconsloading-16 group-33600"
                          src="../../img/waiting.png" alt="접수중 아이콘" />
                        <img v-else-if="reservation.status === 'confirm'" class="lets-iconscheck-fill"
                          src="../../img/confirm.png" alt="예약완료 아이콘" />
                        <img v-else-if="reservation.status === 'cancel'" class="vector" src="../../img/cancel.png"
                          alt="예약취소 아이콘" />
                      </div>
                      <!-- 24.12.11 수정 - 폰트 추가 -->
                      <div class="text-16 valign-text-middle pretendard-bold-monza-16px"
                        :class="statusColor(reservation.status)">
                        <!-- 24.12.11 수정 - 대기중 - 접수중 으로 변경 -->
                        <span v-if="reservation.status === 'waiting'"
                          :class="statusColor(reservation.status)">접수중</span>
                        <span v-else-if="reservation.status === 'confirm'"
                          :class="statusColor(reservation.status)">예약완료</span>
                        <span v-else-if="reservation.status === 'cancel'"
                          :class="statusColor(reservation.status)">예약취소</span>
                        <span v-else>{{ reservation.status }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="frame-7921">
                    <div class="frame-7303">
                      <div class="text reservationtext valign-text-middle pretendard-bold-mine-shaft-24px">
                        {{ reservation.store }}
                      </div>
                    </div>
                    <div class="frame-7920">
                      <div class="frame-7918 pretendard-semi-bold-black-16px">
                        <div class="reservation-align">
                          <div class="text-5 valign-text-middle">예약자</div>
                          <div class="reservation-name valign-text-middle pretendard-regular-normal-log-cabin-16px">
                            {{ reservation.name }}
                          </div>
                        </div>
                        <!-- <div class="reservation-align">
                          <div class="text-5 valign-text-middle">예약 시간</div>
                          <div class="reservation-name valign-text-middle pretendard-regular-normal-log-cabin-16px">
                            {{ reservation.time }}
                          </div>
                        </div> -->
                        <div class="reservation-align">
                          <div class="text-5 valign-text-middle">예약 시간</div>
                          <div class="reservation-name valign-text-middle pretendard-regular-normal-log-cabin-16px">
                            <!-- {{ reservation.time }} -->
                            <!-- 24.12.12 수정 -->
                            <!-- {{ reservation.date + ` ` + `[` + reservation.time + `]` }} -->
                            <!-- 24.12.20 수정 - resevation-date-time 추가  -->
                            <div class="reservation-date-time">
                              <span>{{ reservation.date }}</span>
                              <!-- 24.12.23 수정 - div 추가 -->
                              <div>[<span>{{ reservation.time }}</span>]</div>
                            </div>
                          </div>
                        </div>
                        <div class="reservation-align">
                          <div class="text-5 valign-text-middle">인원</div>
                          <div class="reservation-name valign-text-middle pretendard-regular-normal-log-cabin-16px">
                            {{ reservation.people }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="frame-7926">
                  <!-- 24.12.12 수정 - article - button 수정 -->
                  <button v-if="isReservationCancelable(reservation)"
                    class="frame-7923-3 pretendard-regular-normal-white-18px" @click="openRModal(reservation.id)">
                    예약취소
                  </button>
                  <!-- <article v-if="isReservationCancelable(reservation)" class="frame-7923-3"
                    style="background-color: #ccc" @click="openRModal(reservation.id)">
                    <div class="text_label-31 valign-text-middle pretendard-regular-normal-white-18px">
                      예약취소
                    </div>
                  </article> -->
                  <!-- <article class="frame-7923-3">
                    <div
                      class="text_label-31 valign-text-middle pretendard-regular-normal-white-18px"
                    >
                      매장보기
                    </div>
                  </article> -->
                </div>
              </div>
            </div>
          </div>
          <div class="pagination-controls" v-if="reservations.length">
            <img class="pagination-arrow" @click="prevReservationPage" :src="arrowLeftImage" :alt="'Previous'"
              :class="{ disabled: reservationCurrentPage === 1 }" />
            <div class="page-numbers pretendard-medium-log-cabin-16px">
              <div v-for="page in ReservationstotalPages" :key="page" :class="[
                'page-number',
                { active: page === reservationCurrentPage },
              ]" @click="goToReservationPage(page)">
                {{ page }}
              </div>
            </div>
            <img class="pagination-arrow flipped" @click="nextReservationPage" :src="arrowRightImage" :alt="'Next'"
              :class="{
                disabled: reservationCurrentPage === ReservationstotalPages,
              }" />
          </div>
        </div>
      </div>
      <x-footer />
    </div>
    <!-- 24.11.15 수정 - 추가 -->
    <EditProfile v-if="isOpenEditProfile" @close="closeEditProfile" :loginInfo="loginInfo" @confirm="confrimEdit" />
    <!-- 24.11.15 수정 - 추가 -->
    <EditSocialProfile v-if="isOpenEditSocialProfile" :loginInfo="loginInfo" @close="closeEditSocialProfile"
      @confirm="confrimEdit" />
    <!-- 24.11.15 수정 - 추가 -->
    <EditPassword v-if="isOpenEditPassword" @close="closeEditPassword" :phone="loginInfo.phone" />
    <ReservationCancelModal v-if="isOpenReservationCancelModal" @closeRModal="closeRModal"
      @reservationCanceled="onReservationCanceled" :reservationId="selectedReservationId" />
    <AccountDeletionModal v-if="isModalVisible" @close="closeModal" :idx="loginInfo.id" />
    <!-- 24.12.11 수정 - 추가 -->
    <GameDetail v-if="isOpenGameDetail && selectedShop" :shop="selectedShop" @close="closeGameDetail" />
  </div>
</template>

<script>
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import AccountDeletionModal from "./AccountDeletionModal.vue";
import ReservationCancelModal from "./ReservationCancelModal";
import GameDetail from "./GameDetail"; // 24.12.12 수정 - 추가
import XFooter from "./XFooter";
import axios from "axios";
import { taskStore } from "@/store/taskStore"; // API 호출
import EditProfile from "./EditProfile.vue"; //24.11.15 수정 - 추가
import EditSocialProfile from "./EditSocialProfile.vue";//24.11.15 수정 - 추가
import EditPassword from "./EditPassword.vue";//24.11.15 수정 - 추가
export default {
  name: "MyProfile",
  components: {
    Header,
    RjZsWi,
    EditProfile,//24.11.15 수정 - 추가
    EditSocialProfile,//24.11.15 수정 - 추가
    EditPassword, //24.11.15 수정 - 추가
    AccountDeletionModal,
    ReservationCancelModal,
    GameDetail, // 24.12.12 수정 - 추가
    XFooter,
  },
  data() {
    return {
      loginInfo: {},
      comments: [],
      contents: "",
      imageUrl: "",
      inquiryCurrentPage: 1, // 1:1 문의내역의 현재 페이지
      reservationCurrentPage: 1,
      selectedInquiry: null,
      itemsPerPage: 5,
      RitemsPerPage: 3,
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      tabs: ["내정보 변경", "1:1 문의내역", "예약내역"],
      inquiries: [],
      reservations: [],
      selectedTab: "내정보 변경",
      memberInfo: {},
      quickLoginStatus: {},
      isModalVisible: false,
      profile_image: "",
      isOpenReservationCancelModal: false,
      selectedReservationId: null,
      isOpenEditProfile: false,//24.11.15 수정 - 추가
      isOpenEditSocialProfile: false, //24.11.15 수정 - 추가
      isOpenEditPassword: false, //24.11.15 수정 - 추가
      basicProfileImg: 'https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/group-736@2x.png', // 24.11.26 수정 - 추가
      reservationOption: "전체",// 24.12.09 수정 - 추가 : 예약내역 select 박스
      inquiryOption: "전체",// 24.12.09 수정 - 추가 : 문의내역 select 박스
      selectedShop: null, // 24.12.12 수정 - 추가 : 예약내역 매장 상세페이지 이동
      isOpenGameDetail: false, // 24.12.12 수정 - 추가 : 예약내역 매장 상세페이지 모달 
    };
  },
  props: ["rJZsWIProps"],
  watch: {
    "$route.query.tab"(newTab) {
      this.selectedTab = newTab || "내정보 변경"; // 기본 탭은 '내정보 변경'
    },
    // 24.12.09 수정 - 추가
    reservationOption(newValue) {
      // 옵션이 변경될 때 페이지를 1로 초기화
      this.reservationCurrentPage = 1;
    },
    // 24.12.09 수정 - 추가
    inquiryOption() {
      // 옵션이 변경될 때 페이지를 1로 초기화
      this.inquiryCurrentPage = 1;
    }
  },
  mounted() {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

    this.loginInfo = loginInfo || {};
    console.log("초기화된 this.loginInfo:", this.loginInfo);

    // 쿼리 파라미터 'tab'을 확인하여 기본 탭을 설정
    if (this.$route.query.tab) {
      this.selectedTab = this.$route.query.tab;
    }
    this.getMyprofile();
    this.getMyContact();
    this.getReservationList();
  },
  computed: {
    // 24.12.09 수정 - 추가
    sortedInquiries() {
      if (this.inquiryOption === '전체') {
        return this.paginatedItems;
      } else if (this.inquiryOption === '접수완료') {
        return this.paginatedItems
          .filter(inquiry => inquiry.status === "waiting")
          .sort((a, b) => {
            // undefined 검사
            if (!a.time || !b.time) return 0; // 유효하지 않은 경우 정렬하지 않음
            return a.time.localeCompare(b.time); // 시간 순으로 정렬
          });
      } else if (this.inquiryOption === '답변완료') {
        return this.paginatedItems
          .filter(inquiry => inquiry.status === 'answer')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 최신순으로 정렬
      } else {
        return this.paginatedItems;
      }
    },
    // 24.12.09 수정 - 추가
    filteredInquiries() {
      if (this.inquiryOption === "전체") {
        return this.inquiries;
      } else if (this.inquiryOption === "접수완료") {
        return this.inquiries.filter(inquiry => inquiry.status === "waiting");
      } else if (this.inquiryOption === "답변완료") {
        return this.inquiries.filter(inquiry => inquiry.status === "answer");
      }
      return this.inquiries;
    },
    // 24.12.09 수정 - 추가
    sortedReservations() {
      if (this.reservationOption === '전체') {
        return this.paginatedReservations;
      }
      // 24.12.11 수정 - 대기중 - 접수중 으로 변경
      else if (this.reservationOption === '접수중') {
        return this.paginatedReservations
          .filter(reservation => reservation.status === 'waiting')
          .sort((a, b) => a.time.localeCompare(b.time)); // 시간 순으로 정렬
      } else if (this.reservationOption === '예약완료') {
        return this.paginatedReservations
          .filter(reservation => reservation.status === 'confirm')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 최신순으로 정렬
      } else if (this.reservationOption === '예약취소') {
        return this.paginatedReservations
          .filter(reservation => reservation.status === 'cancel')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 최신순으로 정렬
      } else {
        return this.paginatedReservations;
      }
    },
    // 24.12.09 수정 - 추가
    filteredReservations() {
      let filtered = [];
      if (this.reservationOption === '전체') {
        filtered = this.reservations;
      }
      // 24.12.11 수정 - 대기중 - 접수중 으로 변경
      else if (this.reservationOption === '접수중') {
        filtered = this.reservations.filter(reservation => reservation.status === 'waiting');
      } else if (this.reservationOption === '예약완료') {
        filtered = this.reservations.filter(reservation => reservation.status === 'confirm');
      } else if (this.reservationOption === '예약취소') {
        filtered = this.reservations.filter(reservation => reservation.status === 'cancel');
      } else {
        filtered = this.reservations;
      }
      return filtered;
    },
    computedStatus() {
      // commentList가 1개 이상이면 "답변완료"로 상태를 변경
      // 24.11.25 수정
      // if (this.comments.length > 0) {
      //   return "답변완료";
      // }
      // 24.11.26 수정
      if (this.selectedInquiry.commentList.some(comment => comment.author === "관리자")) {
        return "답변완료";
      }
      return this.selectedInquiry.status || "접수완료";
    },
    // 24.12.09 수정 -  inquiries - filteredInquiries 로 변경
    totalPages() {
      return Math.ceil(this.filteredInquiries.length / this.itemsPerPage);
    },
    // 24.12.09 수정 -  inquiries - filteredInquiries 로 변경
    paginatedItems() {
      const start = (this.inquiryCurrentPage - 1) * this.itemsPerPage;
      return this.filteredInquiries.slice(start, start + this.itemsPerPage);
    },
    // 24.12.09 수정 -  reservations - filteredReservations 로 변경
    ReservationstotalPages() {
      return Math.ceil(this.filteredReservations.length / this.RitemsPerPage);
    },
    // 24.12.09 수정 -  reservations - filteredReservations 로 변경
    paginatedReservations() {
      const start = (this.reservationCurrentPage - 1) * this.RitemsPerPage;
      return this.filteredReservations.slice(start, start + this.RitemsPerPage);
    },
  },
  methods: {
    //패스워드 일치 여부
    //  async chekPw(password){

    //     // v1/auth/me/password/gooara123
    //     const response = await taskStore.getSelectTasks(
    //         `v1/auth/me/password//${password}`
    //       );
    //       console.log("가져온 문의 상세 정보:", response);
    //   },
    confrimEdit() {
      window.location.reload(true);
    },
    selectTab(tab) {
      this.selectedTab = tab;
      this.selectedInquiry = null;
    },
    async patchMyprofileImage() {
      try {
        console.log("this.imageUrl: : : : ", this.imageUrl);
        const params = {
          profileImage: this.imageUrl, // 서버에 저장할 필드명 'profileImage'로 전송
        };
        // 서버에 프로필 이미지 업데이트 요청
        const response = taskStore.updateTask(
          "v1/auth/me/profile-image",
          params
        );
        alert("프로필 이미지가 성공적으로 업데이트되었습니다!");
        this.getMyprofile();
      } catch (error) {
        console.error("프로필 이미지 업데이트 실패:", error);
        alert("프로필 이미지 업데이트에 실패했습니다.");
      }
    },
    async onFileChange(event) {
      console.log("통신 하는 중!!!");
      // const token = localStorage.getItem("token");
      const file = event.target.files[0];
      this.file = file;
      console.log(file.size);
      console.log(file.name);
      console.log(file.type);
      const params = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      };
      console.log("통신 하는 중!!!" + JSON.stringify(this.file));

      const response = await taskStore.postTask(
        "v1/files/presigned-url",
        params
      );
      console.log("response : : : : :" + response);

      const url = response[0].presignedUrl;
      console.log("response.file.path : : : : :" + JSON.stringify(url));
      if (url === undefined || url === null) {
        alert('다시 시도해주세요.')
        window.location.reload();
      }
      // const url = 'https://lezuro-bk.s3.ap-northeast-2.amazonaws.com/camera.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6CLHNBRW3AA7JQ5Z%2F20241107%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20241107T074211Z&X-Amz-Expires=3600&X-Amz-Signature=dd4176d8288ed964223f471ff745ffec8943120dadf017fc2f373d91588df626&X-Amz-SignedHeaders=host&x-id=PutObject';
      this.imageUrl = new URL(url).origin + new URL(url).pathname;
      try {
        // 파일 업로드
        // 2. 프리사인 URL을 사용해 S3에 파일을 업로드합니다.
        await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
            // 'Content-Length': file.size
          },
        });
        console.log("File uploaded successfully!");
        this.patchMyprofileImage();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    async getMyContact() {
      try {
        const userId = Number(this.loginInfo.id);
        const token = localStorage.getItem("Token");
        // if (!token) {
        //   alert("로그인이 필요합니다.");
        //   return;
        // }

        const response = await axios.get(
          `https://13.124.62.68:3000/api/inquiries/userId/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("전체 response 객체:", response);
        console.log("문의 내역", response.data);

        const inquiries = response.data;

        // 24.11.21 수정 - 추가
        const userName = this.loginInfo.name;
        console.log('userName', userName)


        const filteredInquiries = inquiries.filter((item) => {
          return item.userId === userId;
        });

        // 24.11.25 수정 - 추가
        // 각 문의에 댓글 목록을 결합하기
        for (let item of filteredInquiries) {
          try {
            // 전체 댓글 목록 불러오기
            const commentResponse = await axios.get(
              `https://13.124.62.68:3000/api/comments`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            // 댓글 목록에서 현재 item.id와 일치하는 댓글만 필터링
            const filteredComments = commentResponse.data.filter(comment => comment.askId === item.id);

            // console.log('commentList : :: ' , JSON.stringify(commentResponse))
            // 24.11.27 수정
            // 필터링된 댓글 목록에 profileImage 추가
            item.commentList = filteredComments.map((comment) => ({
              ...comment,
              // profileImage: comment.user?.profileImage || null, // user에서 profileImage 가져오기
            }));

            // console.log("item.commentList  : : " ,item.commentList )

            // 24.11.26 수정 - 추가
            // 상태 처리: 'waiting'이면 '접수완료', 'answer'이면 '답변완료'
            item.status = item.status;

          } catch (error) {
            console.error("댓글 데이터를 가져오는 중 오류 발생:", error);
          }
        }

        this.inquiries = filteredInquiries.map((item) => ({
          ...item,
          // 24.11.21 수정 - 추가
          name: userName,
        }));
      } catch (error) {
        console.error("문의 데이터를 가져오는 중 오류 발생:", error);
        // alert("데이터를 가져오는 중 문제가 발생했습니다.");
      }
    },
    async postComments() {
      try {
        const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
        const author = loginInfo.name;
        const userId = loginInfo.id;
        const now = new Date();
        const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9 시간대 조정
        const createdAt = koreaTime
          .toISOString()
          .replace("T", " ")
          .slice(0, 19);
        // POST 요청으로 데이터를 서버에 전송
        console.log('author 123', author)
        const params = {
          // title: this.title,
          content: this.contents,
          author: author,
          userId: userId,
          category: "문의하기",
          views: 0,
          freeBoardId: "1",
          afterServiceId: "1",
          askId: String(this.selectedInquiry.id),
          createdAt: createdAt,
          commentText: "0",
          updatedAt: createdAt,
        };
        console.log("보내는 데이터:", JSON.stringify(params, null, 2));

        const response = await taskStore.postTask("comments", params);

        console.log("등록 성공:");
        alert("등록이 되었습니다");
        await this.getInquiryDetail(this.selectedInquiry.id);
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
        const updatedAt = koreaTime
          .toISOString()
          .replace("T", " ")
          .slice(0, 19);

        const params = {
          content: comment.editedContent,
          updatedAt: updatedAt,
        };

        // 서버에 업데이트 요청
        const response = await taskStore.updateTask(
          `comments/${comment.comment_id}`,
          params
        );
        console.log("댓글 수정 응답:", response);

        // if (response.success) {
        //   alert("댓글이 수정되었습니다.");
        //   comment.comment_content = comment.editedContent; // 수정된 내용 반영
        //   comment.isEditing = false; // 수정 모드 종료
        // } else {
        //   alert("댓글 수정에 실패했습니다.");
        // }
        // await this.getContactDt();
        //  24.11.21 수정
        await this.getInquiryDetail(this.selectedInquiry.id);
      } catch (error) {
        console.error("댓글 수정 중 오류 발생:", error);
        alert("댓글 수정 중 오류가 발생했습니다.");
      }
    },
    async deleteComments(commentId) {
      try {
        // 특정 댓글을 삭제
        // const response = await adminStore.deleteTask(`comments/${commentId}`);
        const response = await taskStore.deleteTask(`comments/${commentId}`);
        console.log("댓글 삭제 응답:", response);

        // 삭제 후 댓글 목록을 갱신
        alert("댓글이 삭제되었습니다.");
        // await this.getContactDt();
        // 24.11.21 수정
        await this.getInquiryDetail(this.selectedInquiry.id);
        // window.location.reload();
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    },
    async getMyprofile() {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          alert("로그인이 필요합니다.");
          return;
        }

        // API 요청 보내기
        const response = await axios.get(
          "https://13.124.62.68:3000/api/v1/auth/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // 응답 데이터에서 필요한 정보 추출
        const data = response.data;
        if (data) {
          this.loginInfo = data; // 사용자 정보 저장
          this.profile_image =
            // 24.11.26 수정 - 기본 프로필 사진 변경
            data.profileImage || this.basicProfileImg; // 프로필 이미지 설정
        } else {
          console.log("프로필 정보를 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("프로필 정보 가져오기 실패:", error);
        alert("프로필 데이터를 가져오는 중 문제가 발생했습니다.");
      }
    },
    formatDate(date) {
      if (!date) return "";
      return date.split("T")[0]; // 날짜만 가져오기
    },
    openAccountDeletionModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    // 24.11.15 수정 - 모달로 수정
    editmysocialprofile() {
      // loginInfo에서 id 값을 가져와 쿼리로 전달
      this.isOpenEditSocialProfile = true;

      // const userId = this.loginInfo.id;
      // if (userId) {
      //   this.$router.push({
      //     path: "/editsocialprofile",
      //     query: { id: userId },
      //   });
      //   this.isOpenEditSocialProfile = true;
      // } else {
      //   alert("로그인 정보가 없습니다. 다시 시도해 주세요.");
      // }
    },
    // 24.11.15 수정 - 추가
    closeEditSocialProfile() {
      this.isOpenEditSocialProfile = false;
    },
    // 24.11.15 수정 - 모달로 수정
    editmyprofile() {
      // const userId = this.loginInfo.id;
      // if (userId) {
      //   this.$router.push({
      //     path: "/editprofile",
      //     query: { id: userId },
      //   });
      this.isOpenEditProfile = true;
      // }
    },
    // 24.11.15 수정 - 추가
    closeEditProfile() {
      this.isOpenEditProfile = false;
    },
    //24.11.15 수정 - 모달로 수정
    toGoEditPassword() {
      // this.$router.push({ path: "/editpassword" });
      this.isOpenEditPassword = true;
    },
    //24.11.15 수정 - 추가
    closeEditPassword() {
      this.isOpenEditPassword = false;
    },
    openContactDetail() {
      this.$router.push({ path: "/mycontact-detail" });
    },
    openRModal(reservationId) {
      this.isOpenReservationCancelModal = true;
      this.selectedReservationId = reservationId;
    },
    closeRModal() {
      this.isOpenReservationCancelModal = false;
      this.selectedReservationId = null;
    },
    onReservationCanceled() {
      this.getReservationList(); // 예약 목록 갱신
    },
    nextReservationPage() {
      if (this.reservationCurrentPage < this.ReservationstotalPages) {
        this.reservationCurrentPage++;
      }
    },
    prevReservationPage() {
      if (this.reservationCurrentPage > 1) {
        this.reservationCurrentPage--;
      }
    },
    goToReservationPage(page) {
      this.reservationCurrentPage = page;
    },
    nextInquiryPage() {
      if (this.inquiryCurrentPage < this.totalPages) {
        this.inquiryCurrentPage++;
      }
    },
    prevInquiryPage() {
      if (this.inquiryCurrentPage > 1) {
        this.inquiryCurrentPage--;
      }
    },
    toGoBoardList() {
      this.$router.push({ path: "/board-list" });
    },
    async selectInquiry(inquiry) {
      this.selectedInquiry = inquiry; // 선택된 문의 저장
      console.log("선택된 문의 ID:", inquiry.id);

      // 선택된 문의의 ID를 이용해 상세 정보를 가져옴
      await this.getInquiryDetail(inquiry.id);
    },
    async getInquiryDetail(inquiryId) {
      try {
        // API 호출을 통해 특정 문의의 상세 정보를 가져옴
        const response = await taskStore.getSelectTasks(
          `inquiries/${inquiryId}`
        );
        console.log("가져온 문의 상세 정보:", response);

        // 가져온 데이터를 selectedInquiry에 저장
        if (response) {
          this.selectedInquiry = {
            ...this.selectedInquiry,
            title: response[0].inquiry_title,
            content: response[0].inquiry_content,
            // author: response[0].inquiry_user_name,
            // 24.11.21 수정
            author: this.loginInfo.name,
            createdAt: response[0].inquiry_createdAt.split("T")[0],
            status: response[0].status,
          };

          // this.comments = response[0].commentList || [];
          // this.comments = this.comments.map((comment) => ({
          //   ...comment,
          //   isEditing: false,
          //   editedContent: comment.comment_content,
          // }));

          console.log('res 123', response)
          // 24.11.21 수정
          this.comments = (response[0].commentList || []).filter(
            (comment) =>
              comment.comment_content !== null &&
              comment.comment_content.trim() !== "" &&
              comment.comment_author !== null
          ).map((comment) => ({
            ...comment,
            isEditing: false,
            // 24.11.27 수정
            profileImage: comment.profileImage || this.basicProfileImg, // user에서 profileImage 가져오기
            editedContent: comment.comment_content,
          }));

          // console.log("this.selectedInquiry:", this.selectedInquiry);
          // console.log("this.selectedInquiry.profileImage", this.selectedInquiry.commentList[0].profileImage);
          // console.log("comment.profileImage", this.comments[0].profileImage)
          // console.log("this.comments 123:", this.comments);
        } else {
          console.error("문의 상세 정보를 가져올 수 없습니다.");
        }
      } catch (error) {
        console.error("문의 상세 정보 가져오기 실패:", error);
      }
    },
    async getReservationList() {
      try {
        const token = localStorage.getItem("Token");
        const userId = Number(this.loginInfo.id);
        if (!token || !userId) {
          console.error("토큰 또는 사용자 ID가 없습니다.");
          return;
        }

        const response = await axios.get(
          `https://13.124.62.68:3000/api/reservations/user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 응답 데이터 확인
        console.log("예약예약예약예약예약예약", response);
        console.log("예약예약", response.data);

        const reservationsData = response.data;

        // 예약 내역이 존재할 경우
        if (reservationsData && reservationsData.length > 0) {
          const reservations = [];

          for (const item of reservationsData) {
            // 각 item 내의 모든 reservations를 반복 처리
            if (item.reservations && item.reservations.length > 0) {
              for (const reservation of item.reservations) {
                // 예약 정보 추출
                const reservationData = {
                  id: reservation.id,
                  managerid: reservation.managerid,
                  name: reservation.reser_user || "Unknown",
                  date: this.extractDate(reservation.startTime),
                  // time: `${reservation.startTime.split('T')[1].split(':').slice(0, 2).join(':')} ~ ${reservation.endTime.split('T')[1].split(':').slice(0, 2).join(':')} [${this.extractDate(reservation.startTime)}]`,
                  // 24.12.11 수정 - 추가
                  // time: `${this.extractDate(reservation.startTime)} [${reservation.startTime.split('T')[1].split(':').slice(0, 2).join(':')} ~ ${reservation.endTime.split('T')[1].split(':').slice(0, 2).join(':')}] `,
                  time: `${reservation.startTime.split('T')[1].split(':').slice(0, 2).join(':')} ~ ${reservation.endTime.split('T')[1].split(':').slice(0, 2).join(':')}`,
                  people: reservation.member || "1",
                  status: reservation.status || "Unknown",
                };

                // 지점 정보 가져오기
                const branchData = await this.getBranch(reservation.managerid);
                if (branchData) {
                  reservationData.store = branchData.store;
                  reservationData.image = branchData.image;
                }

                // reservations 배열에 추가
                reservations.push(reservationData);
              }
            }
          }
          reservations.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time.split(' ~ ')[0]}`);
            const dateB = new Date(`${b.date}T${b.time.split(' ~ ')[0]}`);
            return dateB - dateA; // 최신 시간부터 정렬
          });
          // 결합된 데이터를 reservations 배열에 저장
          this.reservations = reservations;
          console.log("최종 예약 목록:", this.reservations);
        } else {
          console.log("예약 내역이 없습니다.");
        }
      } catch (error) {
        console.error("예약 내역 가져오기 실패:", error);
        alert("예약 데이터를 가져오는 중 오류가 발생했습니다.");
      }
    },

    extractDate(dateTime) {
      if (!dateTime) return "";
      return dateTime.split("T")[0]; // 'YYYY-MM-DD' 형식으로 반환
    },
    // 시간 부분만 추출하여 'HH:mm' 형식으로 변환
    formatTime(dateTime) {
      if (!dateTime) return "";
      const date = new Date(dateTime);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    async getBranch(managerId) {
      try {
        const token = localStorage.getItem("Token");

        const response = await axios.get(
          `https://13.124.62.68:3000/api/v1/branch/managerId/${managerId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const branchData = response.data;
        console.log("branchData", branchData)

        // 데이터가 있는지 확인 후 반환
        if (branchData) {
          return {
            store: branchData.name,
            image:
              branchData.mapImage,
            branchId: branchData.branchId,
            address: branchData.address,
            weekdayHours: branchData.weekdayHours,
            weekendHours: branchData.weekendHours,
            managerid: branchData.managerid,
            storeScale: branchData.storeScale,
            location: {
              latitude: branchData.latitude,
              longitude: branchData.longitude
            },
            // 24.12.12 수정 - 추가
            description: branchData.description,
            freeParking: branchData.freeParking,
            telNumber: branchData.telNumber
          };
        } else {
          console.log("지점 정보가 없습니다.");
          return null;
        }
      } catch (error) {
        console.error("지점 정보 가져오기 실패:", error);
        return null;
      }
    },
    goToInquiryPage(page) {
      this.inquiryCurrentPage = page;
    },
    statusColor(status) {
      switch (status) {
        case "waiting":
          return "text-waiting"; // 대기중 색상 클래스
        case "confirm":
          return "text-confirm"; // 예약완료 색상 클래스
        case "cancel":
          return "text-cancel"; // 예약취소 색상 클래스
        default:
          return "text-cancel"; // 기본 색상 클래스
      }
    },

    goBackToList() {
      this.selectedInquiry = null; // Return to the inquiry list
    },
    // async toGoReservation(reservationId) {
    //   try {
    //     // 예약 ID로 예약 데이터를 찾기
    //     const reservation = this.reservations.find(res => res.id === reservationId);

    //     const managerId = reservation.managerid; // reservation에서 managerid 추출

    //     // managerId로 지점 데이터 가져오기
    //     const branchData = await this.getBranch(managerId);

    //     if (branchData) {
    //       this.$router.push({
    //         name: "reservation-write",
    //         params: {
    //           name: branchData.store,
    //           branchId: branchData.branchId,
    //           address: branchData.address,
    //           weekdayHours: branchData.weekdayHours || "",
    //           weekendHours: branchData.weekendHours || "",
    //           mapImage: branchData.image || "",
    //           managerid: managerId,
    //           storeScale: branchData.storeScale || "",
    //           latitude: branchData.location.latitude || "",
    //           longitude: branchData.location.longitude || "",
    //         },
    //       });
    //     } else {
    //       console.error("지점 데이터가 없습니다.");
    //       alert("지점 정보를 가져오는 데 실패했습니다.");
    //     }
    //   } catch (error) {
    //     console.error("예약 상세 정보를 가져오는 중 오류 발생:", error);
    //     alert("예약 상세 정보를 가져오는 중 문제가 발생했습니다.");
    //   }
    // },
    isReservationCancelable(reservation) {
      const currentDateTime = new Date(); // 현재 날짜와 시간
      const reservationDateTime = new Date(`${reservation.date}T${reservation.time.split(' ~ ')[0]}`); // 예약 시작 시간

      // 예약 상태가 'cancel'이 아니고, 예약 시간이 현재보다 이후인 경우에만 true
      return reservation.status !== 'cancel' && currentDateTime < reservationDateTime;
    },
    // 24.12.12 수정 - 추가
    async toGoBranch(reservationId) {
      try {
        // 예약 ID로 예약 데이터를 찾기
        const reservation = this.reservations.find(res => res.id === reservationId);

        const managerId = reservation.managerid; // reservation에서 managerid 추출

        // managerId로 지점 데이터 가져오기
        const branchData = await this.getBranch(managerId);
        console.log('branchData1', branchData)

        // 필요한 데이터 가공
        this.selectedShop = {
          name: branchData.store,
          branchId: branchData.branchId,
          address: branchData.address,
          freeParking: branchData.freeParking || "",
          description: branchData.description || "",
          telNumber: branchData.telNumber || "",
          weekdayHours: branchData.weekdayHours || "",
          weekendHours: branchData.weekendHours || "",
          mapImage: branchData.image || "",
          managerid: managerId,
          storeScale: branchData.storeScale || "",
          latitude: branchData.location.latitude || "",
          longitude: branchData.location.longitude || "",
        },

          this.isOpenGameDetail = true;

        console.log("Updated selectedShop:", JSON.stringify(this.selectedShop));
      } catch (error) {
        console.error("예약 상세 정보를 가져오는 중 오류 발생:", error);
        alert("예약 상세 정보를 가져오는 중 문제가 발생했습니다.");
      }
    },
    // 24.12.12 수정 - 추가
    closeGameDetail() {
      this.isOpenGameDetail = false;
      this.selectedShop = null;
    }
  },
};
</script>

<style scoped src="@/style/myprofile/myprofile.css"></style>
