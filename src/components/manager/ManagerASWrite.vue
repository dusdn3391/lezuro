<template>
    <div class="all">
        <ManagerHeader />
        <div class="wrap">
            <div class="as-container">
                <ManagerNavbar />
                <div class="wrapper">
                    <div class="title-top pretendard-bold-normal-black-28px">A/S 관리</div>
                    <div class="content-wrap">
                        <div class="write-wrap">
                            <div class="title-box">
                                <div class="content-title valign-text-middle pretendard-medium-black-18px">
                                    제목
                                </div>
                                <input type="text" class="frame-7281-8 pretendard-regular-normal-mine-shaft-16px"
                                    placeholder="제목을 입력해주세요" v-model="title">
                            </div>
                            <div class="content-box">
                                <div class="content-title valign-text-middle pretendard-medium-black-18px">
                                    내용
                                </div>
                                <input type="text" class="frame-7281-9 pretendard-regular-normal-mine-shaft-16px"
                                    placeholder="내용을 입력해주세요" v-model="content">
                            </div>
                            <div class="button-container">
                                <button class="cancel-button pretendard-medium-white-18px" @click="cancel">취소하기</button>
                                <button class="submit-button pretendard-medium-white-18px" @click="submit">{{ isEditing
                                    ? "수정하기" :
                                    "등록하기"
                                    }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { managerStore } from '../../store/managerStore';  // API 호출
import ManagerHeader from './ManagerHeader.vue';
import ManagerNavbar from "./ManagerNavbar.vue";

export default {
    name: "ManagerASWrite",
    components: {
        ManagerHeader,
        ManagerNavbar,
    },
    props: ["id"],
    data() {
        return {
            title: "",
            content: "",
            isEditing: false,
        };
    },

    async created() {
        const { id } = this.$route.query; // query에서 id 추출

        if (id) {
            this.isEditing = true; // 수정 상태로 변경
            await this.loadNoticeData(id); // 서버에서 데이터를 가져옴
        }
    },
    methods: {
        // 기존 데이터 로드 (수정 시)
        async loadASData(id) {
            try {
                const response = await managerStore.getTask(`as-requests/${this.id}`);
                console.log('as response', response)

                this.title = response.title;
                this.content = response.content;
            } catch (error) {
                console.error("데이터를 불러오는 데 실패했습니다:", error);
                alert("데이터를 불러오지 못했습니다.");
            }
        },
        // 등록하기 버튼 클릭 시 호출되는 메서드
        async submit() {
            if (!this.title || !this.content) {
                alert("제목과 내용을 입력해주세요.");
                return;
            }

            // 로컬 스토리지에서 managerInfo 가져오기
            const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
            console.log("managerInfo : : : " , JSON.stringify(managerInfo))

            const branchId = managerInfo.id;
            // POST 요청으로 데이터를 서버에 전송
            const params = {
                title: this.title,
                description: this.content,
                status: "접수",
                // managerId: parseInt(managerInfo.id),
                managerId: managerInfo.id,
            };

            try {
                if (this.isEditing) {
                    const id = this.$route.query.id; // URL에서 id를 추출
                    const response = await managerStore.updateTask(`as-requests/${id}`, params);

                    console.log('수정 data', params)
                    alert("수정이 되었습니다");

                } else {
                    const response = await managerStore.postTask("as-requests", params);

                    console.log('등록 data', params)
                    console.log("등록 성공:", response);
                    alert("등록이 되었습니다");
                }

                this.$router.replace({ path: "/manageras-management" });
            } catch (error) {
                console.error("등록 실패:", error);
                alert("등록에 실패했습니다.");
            }
        },
        cancel() {
            this.$router.push({ path: "/manageras-management" });
        },
    },
};
</script>



<style scoped>
.as-container {
    display: flex;
    height: 100%;
    flex-direction: row;
    background: #f5f6f6;
}

.title-top {
    background-color: #fff;
    padding: 30px;
    margin-bottom: 20px;
}

/* 24.12.23 수정 */
.wrapper {
    width: 100%;
    padding: 30px;
    /* gap: 20px; */
    height: 100vh;
}

.title {
    padding: 44px 13.5%;
    padding-top: 104px;
}

.button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 50px;
}

.cancel-button,
.submit-button {
    width: 200px;
    padding: 18.5px;
    border: none;
    cursor: pointer;
}

.cancel-button {
    background-color: #999;
}

.submit-button {
    background-color: #184199;
    color: white;
}

.frame-7782-1 {
    margin-bottom: 140px;
}


.contact-write {
    width: 100%;
}

.write-wrap {
    width: 100%;
}

.title {
    padding: 104px 13.5%;
    padding-bottom: 44px;
}

.cancel-btn {
    align-items: center;
    background-color: var(--mountain-mist);
    display: flex;
    gap: 10px;
    height: 50px;
    justify-content: center;
    padding: 18px 66px;
    position: relative;
    width: 150px;
    border: none;
    border-radius: 7px;
}

.frame-7923-3 {
    border: none;
    border-radius: 7px;
}

.content-title {
    display: flex;
    gap: 10px;
    position: relative;
    width: 150px;
}

.title-box,
.content-box {
    align-items: center;
    align-self: stretch;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: var(--celeste);
    border-top-style: solid;
    border-top-width: 1px;
    display: flex;
    flex: 0 0 auto;
    padding: 20px 20px 20px 0px;
    position: relative;
    width: 100%;
}

.content-box {
    border: none;
}

input::placeholder {
    color: #999;
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
    border: 0.5px solid #ddd;
    height: 200px;
}

.write-wrap {
    border: 1px solid #dddddd;
    padding: 40px;
}

.content-wrap {
    align-items: center;
    display: flex;
    gap: 10px;
    padding: 30px;
    position: relative;
    width: 100%;
    background-color: #fff;
    margin-bottom: 20px;
}

.img-pick {
    align-items: center;
    background-color: var(--hint-of-red);
    border: 0.5px solid;
    border-color: var(--celeste);
    display: flex;
    gap: 10px;
    height: 55px;
    width: 100%;
    padding: 0px 20px;
    position: relative;
}

.img-pick label {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
<style scoped src="@/style/cs/noticewrite.css"></style>