<template>
    <div class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop>
            <!-- 모달 헤더 -->
            <div class="modal-header">
                <h2 class="modal-title pretendard-extra-extra-bold-log-cabin-24px">코스 별 스코어 카드</h2>
                <div class="close" @click="closeModal">✕</div>
            </div>

            <!-- 첫 번째 스코어 카드 -->
            <!-- <div class="score-card">
                <div class="course_title pretendard-semi-bold-black-20px">{{ course_detail.courseName }}</div>
                <table>
                    <thead>
                        <tr class="pretendard-semi-bold-log-cabin-18px">
                            <th>Hole</th>
                            <th v-for="(hole, index) in courseName.holes" :key="'hole-' + index">{{ hole }}</th>
                            <th>합계</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="pretendard-semi-bold-log-cabin-18px">
                            <td>PAR</td>
                            <td v-for="(par, index) in courseName.pars" :key="'par-' + index">{{ par }}</td>
                            <td>{{ course_detail.totalPar }}</td>
                        </tr>
                        <tr class="pretendard-regular-normal-mine-shaft-18px">
                            <td>점수</td>
                            <td v-for="(score, index) in courseName.scores" :key="'score-' + index">{{ score }}</td>
                            <td> {{ course_detail.totalScore }} ({{ totalScore }}) </td>
                        </tr>
                        <tr class="pretendard-regular-normal-mine-shaft-18px">
                            <td>퍼트</td>
                            <td v-for="(putt, index) in courseName.putts" :key="'putt-' + index">{{ putt }}</td>
                            <td>{{ course_detail.totalPutts }}</td>
                        </tr>
                    </tbody>
                </table>
            </div> -->


            <div class="score-card">
                <div class="course_title pretendard-semi-bold-black-20px">{{ course_detail.courseName }}</div>

                <!-- First Scorecard Table for Holes 1–9 -->
                <table>
                <thead>
                    <tr class="pretendard-semi-bold-log-cabin-18px">
                    <th>Hole</th>
                    <th v-for="(hole, index) in courseName.holes.slice(0, 9)" :key="'hole-' + index">{{ hole }}</th>
                    <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="pretendard-semi-bold-log-cabin-18px">
                    <td>PAR</td>
                    <td v-for="(par, index) in courseName.pars.slice(0, 9)" :key="'par-' + index">{{ par }}</td>
                    <td>{{ course_detail.totalPar }}</td>
                    </tr>
                    <tr class="pretendard-regular-normal-mine-shaft-18px">
                    <td>점수</td>
                    <td v-for="(score, index) in courseName.scores.slice(0, 9)" :key="'score-' + index">{{ score }}</td>
                    <td>{{ course_detail.totalScore }} ({{ totalScore }})</td>
                    </tr>
                    <tr class="pretendard-regular-normal-mine-shaft-18px">
                    <td>퍼트</td>
                    <td v-for="(putt, index) in courseName.putts.slice(0, 9)" :key="'putt-' + index">{{ putt }}</td>
                    <td>{{ course_detail.totalPutts }}</td>
                    </tr>
                </tbody>
                </table>

                <!-- Conditional Second Scorecard Table for Holes 10–18 -->
                <table v-if="courseName.holes.length > 9">
                <thead>
                    <tr class="pretendard-semi-bold-log-cabin-18px">
                    <th>Hole</th>
                    <th v-for="(hole, index) in courseName.holes.slice(9, 18)" :key="'hole-' + (9 + index)">{{ hole }}</th>
                    <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="pretendard-semi-bold-log-cabin-18px">
                    <td>PAR</td>
                    <td v-for="(par, index) in courseName.pars.slice(9, 18)" :key="'par-' + (9 + index)">{{ par }}</td>
                    <td>{{ course_detail.totalPar }}</td>
                    </tr>
                    <tr class="pretendard-regular-normal-mine-shaft-18px">
                    <td>점수</td>
                    <td v-for="(score, index) in courseName.scores.slice(9, 18)" :key="'score-' + (9 + index)">{{ score }}</td>
                    <td>{{ course_detail.totalScore }} ({{ totalScore }})</td>
                    </tr>
                    <tr class="pretendard-regular-normal-mine-shaft-18px">
                    <td>퍼트</td>
                    <td v-for="(putt, index) in courseName.putts.slice(9, 18)" :key="'putt-' + (9 + index)">{{ putt }}</td>
                    <td>{{ course_detail.totalPutts }}</td>
                    </tr>
                </tbody>
                </table>
            </div>




            <!-- 닫기 버튼 -->
            <div class="button-box">
                <button class="close-button pretendard-bold-white-18px" @click="closeModal">닫기</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminScorecardModal",
    
  data() {
        return {
            courseName: {
                holes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                pars: [4, 5, 4, 4, 4, 4, 3, 4, 55],
                scores: [-1, -1, -1, -1, 0, -1, -1, -1, -1],
                putts: [2, 1, 3, 1, 2, 1, 1, 2, 1],
            }
        };
    },
    props: {
        course_detail: {
        type: Object,
        required: true
        },
    },
       computed: {
        // 첫 번째 코스의 합계 계산
        totalPar() {
            return this.courseName.pars.reduce((sum, par) => sum + par, 0);
        },
        totalScore() {
            return this.courseName.scores.reduce((sum, score) => sum + score, 0);
        },
        scoreOverPar() {
            return this.totalPar + this.totalScore;
        },
        totalPutts() {
            return this.courseName.putts.reduce((sum, putt) => sum + putt, 0);
        },
    },
    mounted(){
        console.log("course_detail : : : : 확인 : : :: : " , this.course_detail);
        this.courseName.holes = [];
        this.courseName.pars = [];
        this.courseName.scores = [];
        this.courseName.putts = [];
        for(var a = 0;  a < this.course_detail.holes.length; a++){
        this.courseName.holes.push(this.course_detail.holes[a].holeNumber)
        this.courseName.pars.push(this.course_detail.holes[a].par)
        this.courseName.scores.push(this.course_detail.holes[a].score)
        this.courseName.putts.push(this.course_detail.holes[a].putts)
        }
       

    console.log("this.courseName.holes : : : " ,  this.courseName.pars)
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
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
}

.close-button {
    background: none;
    border: none;
    cursor: pointer;
}

.score-card {
    margin-bottom: 20px;
}

.course_title{
    margin-bottom:20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
}

th, td {
    padding: 23.5px;
    text-align: center;
    border: 1px solid #ddd;
    
}

th {
    background-color: #f5f5f5;
}

.button-box {
    text-align: center;
}

button.close-button {
    background-color: #184199;
    color: white;
    padding: 23.5px 20px;
    width:100%;

    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button.close-button:hover {
    background-color: #003377;
}
</style>