<template>
  <!-- 24.12.13 수정 - 전체 폰트 수정 -->
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="admin-management-container">
        <AdminNavbar />
        <div class="wrapper">
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">
              {{ isEdit ? "코스 수정" : "코스 관리" }}
            </h2>
          </div>

          <div class="course-management-form">
            <!-- Basic Course Information -->
            <div class="form-group">
              <label for="course-name" class="pretendard-regular-normal-mine-shaft-18px">코스명</label>
              <input type="text" id="course-name" v-model="courseName" placeholder="코스명을 입력해주세요"
                class="pretendard-regular-normal-mountain-mist-16px" />
            </div>
            <div class="form-group">
              <label for="region" class="pretendard-regular-normal-mine-shaft-18px">지역</label>
              <input type="text" id="region" v-model="region" placeholder="지역을 입력해주세요"
                class="pretendard-regular-normal-mountain-mist-16px" />
            </div>
            <div class="form-group">
              <label for="total-distance" class="pretendard-regular-normal-mine-shaft-18px">총 거리</label>
              <!-- <input type="number" id="total-distance" v-model.number="totalDistance" placeholder="총 거리를 입력해주세요"
                class="pretendard-regular-normal-mountain-mist-16px" /> -->
              <!-- 24.12.13 수정 - type number - text 로 변경 -->
              <input type="type" id="total-distance" v-model="totalDistance" placeholder="총 거리를 입력해주세요"
                class="pretendard-regular-normal-mountain-mist-16px"   @input="(event) => validateNumber(event, 'totalDistance')"  />
            </div>
            <div class="form-group">
              <label for="difficulty" class="pretendard-regular-normal-mine-shaft-18px">난이도</label>
              <select id="difficulty" v-model="difficulty">
                <!-- 24.12.13 수정 - 기본값 설정 -->
                <option class="pretendard-regular-normal-mine-shaft-16px" value="" selected>코스 난이도</option>
                <option class="pretendard-regular-normal-mine-shaft-16px" value="Very_Easy">매우 쉬움</option>
                <option class="pretendard-regular-normal-mine-shaft-16px" value="Easy">쉬움</option>
                <option class="pretendard-regular-normal-mine-shaft-16px" value="Medium">중간</option>
                <option class="pretendard-regular-normal-mine-shaft-16px" value="Hard">어려움</option>
                <option class="pretendard-regular-normal-mine-shaft-16px" value="Very_Hard">매우 어려움</option>
              </select>
            </div>
            <div class="form-group">
              <label for="people-limit" class="pretendard-regular-normal-mine-shaft-18px">인원 제한</label>
              <select id="people-limit" v-model="maxPeople" class="pretendard-regular-normal-mine-shaft-16px">
                <!-- 24.12.13 수정 - 기본값 설정 -->
                <option class="pretendard-regular-normal-mine-shaft-16px" value="0" disabled>인원 제한</option>
                <option class="pretendard-regular-normal-mine-shaft-16px" value="no-limit">무제한</option>
                <option class="pretendard-regular-normal-mine-shaft-16px" value="10">10명</option>
                <option class="pretendard-regular-normal-mine-shaft-16px" value="20">20명</option>
              </select>
            </div>

            <div class="rank-info">
              <label class="pretendard-regular-normal-mine-shaft-18px">평균타수</label>
              <div class="rank-container">
                <div v-for="(rank, index) in ranks" :key="index"
                  class="rank-column pretendard-regular-normal-log-cabin-16px">
                  <div class="rank-label">{{ rank.label }}</div>
                  <input type="text" v-model="rankValues[index]" :placeholder="rank.placeholder"
                    class="pretendard-regular-normal-mountain-mist-16px"  @input="(event) => validateNumber(event, `rankValues[${index}]`)" />
                </div>
              </div>
            </div>
            <!-- Hole Details for First 9 Holes -->
            <div class="hole-details">
              <label class="pretendard-regular-normal-mine-shaft-18px">홀 상세1</label>
              <div class="course_name">
                <table>
                  <thead>
                    <tr>
                      <th class="pretendard-regular-normal-mine-shaft-18px">Hole</th>
                      <th v-for="n in 9" :key="'header1-' + n">{{ n }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Rows for Each Tee Box Color -->
                    <tr v-for="(color, colorIndex) in colors" :key="'color1-' + color">
                      <td class="pretendard-regular-normal-mine-shaft-18px"> {{ color }}</td>
                      <td v-for="hole in holes.slice(0, 9)" :key="'hole1-' + hole.holeNumber">
                        <!-- <input type="number" v-model="hole.teeBoxes[colorIndex].distance" placeholder="거리"
                          class="pretendard-regular-normal-mountain-mist-16px" /> -->
                        <!-- 24.12.13 수정 - type number - text 로 변경 -->
                        <input type="text" v-model="hole.teeBoxes[colorIndex].distance" placeholder="거리"
                          class="pretendard-regular-normal-mountain-mist-16px"  @input="(event) => validateNumber(event, `hole.teeBoxes[${colorIndex}].distance`)"  />
                      </td>
                    </tr>
                    <!-- PAR Row -->
                    <tr>
                      <td class="pretendard-regular-normal-mine-shaft-18px">PAR</td>
                      <td v-for="hole in holes.slice(0, 9)" :key="'par1-' + hole.holeNumber">
                        <!-- <input type="number" v-model.number="hole.teeBoxes[0].par" placeholder="PAR"
                          class="pretendard-regular-normal-mountain-mist-16px" /> -->
                        <!-- 24.12.13 수정 - type number - text 로 변경 -->
                        <input type="text" v-model="hole.teeBoxes[0].par" placeholder="PAR"
                          class="pretendard-regular-normal-mountain-mist-16px"  @input="(event) => validateNumber(event, 'hole.teeBoxes[0].par')"  />
                      </td>
                    </tr>
                    <tr>
                      <td class="pretendard-regular-normal-mine-shaft-18px">MAP</td>
                      <td v-for="(hole, index) in holes.slice(0, 9)" :key="'map1-' + index">
                        <div class="file-upload-container" @click="triggerFileInput(index)">
                          <!-- 미리보기 이미지 -->
                          <img v-if="selectedFiles[index]" :src="selectedFiles[index]" alt="map preview" />
                          <!-- <img
                            v-else-if="hole.teeBoxes[0].mapImage"
                            :src="hole.teeBoxes[0].mapImage || '../../../img/lets-icons_img-box-light.png'" 
                            alt="uploaded map"
                          /> -->
                          <!-- <img v-else-if="hole.teeBoxes[0].mapImage" :src="hole.teeBoxes[0].mapImage" alt="uploaded map" /> -->
                          <img v-else :src="hole.teeBoxes[0].mapImage &&
                            hole.teeBoxes[0].mapImage !== 'string'
                            ? hole.teeBoxes[0].mapImage
                            : defaultMapImage
                            " alt="map" />
                        </div>
                        <input type="file" ref="fileInputs" @change="(event) => {
                          handlePreview(event, index);
                          onFileSelected(event, index);
                        }
                          " style="display: none" class="pretendard-regular-normal-mountain-mist-16px" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Hole Details for Second 9 Holes -->
            <div class="hole-details">
              <label class="pretendard-regular-normal-mine-shaft-18px">홀 상세2</label>
              <div class="course_name">
                <table>
                  <thead>
                    <tr>
                      <th class="pretendard-regular-normal-mine-shaft-18px">Hole</th>
                      <th v-for="n in 9" :key="'header2-' + (n + 9)">
                        {{ n + 9 }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Rows for Each Tee Box Color -->
                    <tr v-for="(color, colorIndex) in colors" :key="'color2-' + color">
                      <td>{{ color }}</td>
                      <td v-for="hole in holes.slice(9, 18)" :key="'hole2-' + hole.holeNumber">
                        <!-- <input type="number" v-model="hole.teeBoxes[colorIndex].distance" placeholder="거리"
                          class="pretendard-regular-normal-mountain-mist-16px" /> -->
                        <!-- 24.12.13 수정 - type number - text 로 변경 -->
                        <input type="text" v-model="hole.teeBoxes[colorIndex].distance" placeholder="거리"
                          class="pretendard-regular-normal-mountain-mist-16px" @input="(event) => validateNumber(event, `hole.teeBoxes[${colorIndex}].distance`)"  />
                      </td>
                    </tr>
                    <!-- PAR Row -->
                    <tr>
                      <td class="pretendard-regular-normal-mine-shaft-18px">PAR</td>
                      <td v-for="hole in holes.slice(9, 18)" :key="'par2-' + hole.holeNumber">
                        <!-- <input type="number" v-model.number="hole.teeBoxes[0].par" placeholder="PAR"
                          class="pretendard-regular-normal-mountain-mist-16px" /> -->
                        <!-- 24.12.13 수정 - type number - text 로 변경 -->
                        <input type="text" v-model="hole.teeBoxes[0].par" placeholder="PAR"
                          class="pretendard-regular-normal-mountain-mist-16px" @input="(event) => validateNumber(event, 'hole.teeBoxes[0].par')"  />
                      </td>
                    </tr>
                    <tr>
                      <td class="pretendard-regular-normal-mine-shaft-18px">MAP</td>
                      <td v-for="(hole, index) in holes.slice(9, 18)" :key="'map2-' + index">
                        <div class="file-upload-container" @click="triggerFileInput(index + 9)">
                          <!-- 미리보기 이미지 -->
                          <img v-if="selectedFiles[index + 9]" :src="selectedFiles[index + 9]" alt="map preview" />
                          <!-- <img
                            v-else-if="hole.teeBoxes[0].mapImage"
                                :src="hole.teeBoxes[0].mapImage || '../../../img/lets-icons_img-box-light.png'" 
                            alt="uploaded map"
                          /> -->
                          <!-- <img v-else-if="hole.teeBoxes[0].mapImage" :src="hole.teeBoxes[0].mapImage" alt="uploaded map" /> -->
                          <img v-else :src="hole.teeBoxes[0].mapImage &&
                            hole.teeBoxes[0].mapImage !== 'string'
                            ? hole.teeBoxes[0].mapImage
                            : defaultMapImage
                            " alt="map" />
                        </div>
                        <input type="file" ref="fileInputs" @change="(event) => {
                          handlePreview(event, index, 9);
                          onFileSelected(event, index, 9);
                        }
                          " style="display: none" class="pretendard-regular-normal-mountain-mist-16px" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="form-group">
              <label for="course-rules" class="pretendard-regular-normal-mine-shaft-18px">규칙</label>
              <textarea id="course-rules" v-model="rules" placeholder="규칙을 입력해주세요"
                class="pretendard-regular-normal-mountain-mist-16px"></textarea>
            </div>
            <!-- Image Upload -->
            <div class="form-group">
              <label for="course-image" class="pretendard-regular-normal-mine-shaft-18px">대표 이미지</label>
              <!-- <input type="file" id="course-image" @change="onImageChange" -->
              <!-- 24.12.13 수정 - 미리보기 나오도록 수정 -->
              <div class="main-img-align">
                <input type="file" id="course-image" @change="(event) => {
                  mainImagePreview(event);
                  onImageChange(event);
                }" class="pretendard-regular-normal-mountain-mist-16px" />
                <div class="image-preview">
                  <!-- <img :src="mainImage" alt="Preview" /> -->
                  <!-- 24.12.13 수정 - 미리보기 -->
                  <img :src="mainImage || defaultMapImage" alt="Preview" />
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="button-group">
              <button class="cancel-btn pretendard-medium-white-18px" @click="goToList">취소하기</button>
              <button class="confirm-btn pretendard-medium-white-18px"
                @click="isEdit ? updateCourse() : postCourseMg()">
                {{ isEdit ? "코스 수정" : "코스등록" }}
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
import { adminStore } from "@/store/adminStore"; // API 호출
import axios from "axios";

export default {
  name: "AdminCourseManagementWrite",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      selectedFiles: Array(18).fill(null),
      courseName: "",
      region: "",
      totalDistance: 0,
      defaultMapImage: require("../../../img/lets-icons_img-box-light.png"),
      difficulty: "",
      maxPeople: 0,
      imageUrl: "",
      rules: "",
      mainImage: "",
      // mainImagePreview: "",
      isEdit: false,
      colors: ["Black"],
      ranks: [
        { label: "등급1", placeholder: "70타" },
        { label: "등급2", placeholder: "70타" },
        { label: "등급3", placeholder: "70타" },
        { label: "등급4", placeholder: "70타" },
        { label: "등급5", placeholder: "70타" },
        { label: "등급6", placeholder: "70타" },
      ],

      rankValues: [70, 70, 70, 70, 70, 70],
      // Holes structure with 18 holes, each containing 5 teeBoxes with different colors
      holes: Array.from({ length: 18 }, (_, i) => ({
        holeNumber: i + 1,
        par: "", // 기본 PAR 값 (필요에 따라 수정 가능)
        teeBoxes: [
          {
            color: "Black",
            distance: "",
            par: "",
            mapImage: "string",
          },
        ],
      })),
    };
  },
  mounted() {
    this.id = this.$route.query.id; // FAQ ID 가져오기
    this.isEdit = this.$route.query.isEdit === "true"; // 수정 여부 확인
    if (this.isEdit) {
      this.getCourseData(); // 수정 모드일 경우 기존 데이터를 가져옴
    }
  },
  methods: {
    // 24.12.13 수정 - 추가
    validateNumber(event, modelPath) {
      const input = event.target.value;
      const isValid = /^\d*$/.test(input); // 숫자인지 검사

      if (!isValid) {
        alert("숫자만 입력 가능합니다."); // 경고 메시지
        event.target.value = input.replace(/[^0-9]/g, ''); // 숫자만 남기기
      }

      // modelPath를 동적으로 업데이트
      this.$set(this, modelPath, Number(event.target.value || 0)); // 빈 값은 0으로 처리
    },
    // 24.12.13 수정 - 추가
    goToList() {
      this.$router.push({ path: "/admincourse-management" })
    },
    // 24.12.13 수정 - 대표사진 미리보기 업데이트
    mainImagePreview(event) {
      const file = event.target.files[0];
      if (file) {
        // FileReader를 사용하여 미리보기 이미지 URL을 생성
        this.mainImage = URL.createObjectURL(file);
      }
    },
    triggerFileInput(index) {
      this.$refs.fileInputs[index].click();
    },
    handlePreview(event, index, offset = 0) {
      const file = event.target.files[0];
      if (file) {
        const actualIndex = index + offset;
        this.$set(this.selectedFiles, actualIndex, URL.createObjectURL(file));
      }
    },
    async onFileSelected(event, index, offset = 0) {
      const file = event.target.files[0];
      if (file) {
        const actualIndex = index + offset;
        // 프리사인 URL 요청 파라미터 설정
        const params = {
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
        };

        // 프리사인 URL 생성 및 S3 업로드
        const response = await adminStore.postTask(
          "v1/files/presigned-url",
          params
        );
        console.log("response : : : : :" + JSON.stringify(response));

        const url = response[response.length - 1]?.presignedUrl;
        console.log("response.file.path : : : : :" + JSON.stringify(url));
        const urlName = new URL(url).origin + new URL(url).pathname;
        console.log("response.file.path : : : : :" + JSON.stringify(urlName));

        // S3 URL 저장
        this.holes[actualIndex].teeBoxes[0].mapImage =
          new URL(url).origin + new URL(url).pathname;
        console.log(
          "this.holes[actualIndex].teeBoxes[0].mapImage : : : ",
          this.holes[actualIndex].teeBoxes[0].mapImage
        );
        try {
          // S3에 파일 업로드
          await axios.put(url, file, {
            headers: {
              "Content-Type": file.type,
            },
          });
          console.log("File uploaded successfully!");
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    },
    async onImageChange(event) {
      console.log("통신 하는 중!!!");
      // const token = localStorage.getItem("managerToken");
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

      const response = await adminStore.postTask(
        "v1/files/presigned-url",
        params
      );
      console.log("response : : : : :" + JSON.stringify(response));

      const url = response[response.length - 1]?.presignedUrl;
      console.log("response.file.path : : : : :" + JSON.stringify(url));
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
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    // async
    postCourseMg() {
      console.log("Submitted rank values:", this.holes);

      // 총 작성된 홀의 개수를 계산
      const totalHoles = this.holes.filter(
        (hole) =>
          hole.par !== "" || hole.teeBoxes.some((box) => box.distance !== "")
      ).length;

      // 최소 홀 개수 검증
      if (totalHoles < 9) {
        alert("홀 9개 모두를 작성해주세요.");
        return;
      } else if (totalHoles > 9 && totalHoles < 18) {
        alert("홀 18개 모두를 작성해주세요.");
        return;
      }

      // Post할 파라미터 생성
      const params = {
        courseName: this.courseName,
        region: this.region,
        totalDistance: parseFloat(this.totalDistance) || 0,
        difficulty: this.difficulty,
        maxPeople:
          this.maxPeople === "no-limit" ? -1 : parseInt(this.maxPeople) || 0,
        rules: this.rules,
        mainImage: this.imageUrl,
        averageScores: this.rankValues.map((value) => Number(value)),
        holes: this.holes
          .map((hole) => {
            // `teeBoxes`에서 distance가 null 또는 빈 문자열인 항목을 제거
            const validTeeBoxes = hole.teeBoxes.filter(
              (teeBox) => teeBox.distance !== null && teeBox.distance !== ""
            );

            // 유효한 `teeBoxes`가 없으면 null 반환
            if (validTeeBoxes.length === 0) {
              return null;
            }

            // 유효한 데이터를 반환
            return {
              holeNumber: hole.holeNumber,
              teeBoxes: validTeeBoxes.map((teeBox) => ({
                color: teeBox.color,
                distance: parseInt(teeBox.distance) || 0,
                par: parseInt(teeBox.par),
                mapImage: teeBox.mapImage,
              })),
            };
          })
          .filter((hole) => hole !== null), // `null` 값 제거
      };

      console.log("params:", params);
      console.log("this.selectedFiles:", this.selectedFiles);

      try {
        const res = adminStore.postTask("course-management", params);
        console.log("API Response:", res);

        alert("코스 정보가 정상적으로 등록이 되었습니다.");
        this.$router.replace("/admincourse-management");
      } catch (error) {
        console.error("Error submitting course:", error);
        alert("Failed to submit course. Please try again.");
      }
    },
    async getCourseData() {
      try {
        const response = await adminStore.getTask(
          `course-management/${this.id}`
        );
        this.courseData = response;
        console.log("불러온 코스 데이터:", this.courseData);

        // 다른 데이터 설정
        this.holeInfo = `${this.courseData.holes.length || 0}홀`;
        this.region = this.courseData.region || "";
        this.rules = this.courseData.rules || "";
        this.totalDistance = this.courseData.totalDistance || 0;
        this.maxPeople = this.courseData.maxPeople || 0;
        this.courseName = this.courseData.courseName || "";
        this.mainImage = this.courseData.mainImage || "";

        // holes 데이터를 UI에 맞게 설정
        this.holes = Array.from({ length: 18 }, (_, i) => {
          const holeData = this.courseData.holes?.find(
            (hole) => hole.holeNumber === i + 1
          );
          return {
            holeNumber: i + 1,
            par: holeData?.par ?? "", // 없으면 빈 문자열 유지
            teeBoxes: holeData?.teeBoxes.map((teeBox) => ({
              color: teeBox.color,
              par: teeBox.par ?? "", // 없으면 빈 문자열 유지
              distance: teeBox.distance ?? "", // 없으면 빈 문자열 유지
              mapImage: teeBox.mapImage ?? this.defaultMapImage, // 기본 이미지 유지
            })) || [
                {
                  color: "Black",
                  distance: "",
                  par: "",
                  mapImage: this.defaultMapImage, // 기본 이미지 유지
                },
              ],
          };
        });

        this.difficulty = this.courseData.difficulty || "";
        this.rankValues = this.courseData.averageScores || [70, 70, 70, 70, 70, 70];

      } catch (error) {
        console.error("코스 데이터를 가져오는 중 오류 발생:", error);
      }
    }
    ,

    updateCourse() {
      const totalHoles = this.holes.filter(
        (hole) =>
          hole.par !== "" || hole.teeBoxes.some((box) => box.distance !== "")
      ).length;

      // 최소 홀 개수 검증
      if (totalHoles < 9) {
        alert("홀 9개 모두를 작성해주세요.");
        return;
      } else if (totalHoles > 9 && totalHoles < 18) {
        alert("홀 18개 모두를 작성해주세요.");
        return;
      }
      const updatedMainImage = this.imageUrl || this.mainImage;
      const params = {
        courseName: this.courseName,
        region: this.region,
        totalDistance: parseFloat(this.totalDistance) || 0,
        difficulty: this.difficulty,
        maxPeople:
          this.maxPeople === "no-limit" ? -1 : parseInt(this.maxPeople) || 0,
        rules: this.rules,
        mainImage: updatedMainImage,
        averageScores: this.rankValues.map((value) => Number(value)),
        holes: this.holes.map((hole) => ({
          holeNumber: hole.holeNumber,
          teeBoxes: hole.teeBoxes.map((teeBox) => ({
            color: teeBox.color,
            distance: parseInt(teeBox.distance) || 0,
            par: parseInt(teeBox.par),
            mapImage: teeBox.mapImage,
          })),
        })),
      };

      console.log("params:", params);

      try {
        const res = adminStore.updateTask(
          `course-management/${this.id}`,
          params
        );
        console.log("API Response:", res);
        // if(res.hole.length > 1){
        alert("코스 정보가 정상적으로 수정이 되었습니다.");
        this.$router.replace("/admincourse-management");
        // }else{
        //   alert('정보를 다시 입력해 주세요.');
        // }
      } catch (error) {
        console.error("Error submitting course:", error);
        alert("Failed to submit course. Please try again.");
        // this.$router.replace('/admincourse-management')
      }
    },
  },
};
</script>

<style scoped>
.admin-management-container {
  background: #f5f6f6;
  display: flex;
  height: 100%;
  flex-direction: row;
}

.wrapper {
  flex-grow: 1;
  padding: 30px;
  gap: 20px;
}

/* 타이틀 박스 */
.title-box {
  width: 100%;
  background-color: #fff;
  padding: 24px 30px;
  margin-bottom: 20px;
}

/* Form Section */
.course-management-form {
  background-color: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

/* 24.12.13 수정 */
.form-group label,
.rank-info label,
.hole-details label {
  /* width: 150px; */
  width: 10%;
  display: grid;
  align-items: center;

}

/* 24.12.13 수정 */
.form-group input {
  /* flex-grow: 1; */
  width: 90%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 50px;
}

.form-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
  height: 50px;
}

.form-group textarea {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  /* 24.12.13 수정 - 추가  */
  resize: none;
  height: 120px;
}

/* 24.12.13 수정 */
/* Rank Information Section */
.rank-info {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  margin-top: 20px;
  margin-bottom: 20px;
}


/* 24.12.14 수정 */
/* .rank-label {
  margin-bottom: 20px;
  width: 150px;
} */

.rank-container {
  border: 1px solid #ddd;
  padding: 20px;
  display: flex;
  width: 90%;
  justify-content: space-between;
  gap: 20px;
  /* Adds spacing between the rank columns */
}

/* 24.12.13 수정 - 추가  */
.rank-column {
  /* display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center; */
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: 20px;
}

/* 24.12.13 수정 */
.rank-column input {
  /* width: 170px; */
  width: 80%;
  /* Adjust width as needed */
  height: 48px;
  text-align: center;
  background-color: #f5f6f6;
  border: 1px solid #ddd;
}

/* .rank-column .rank-label {
  margin-bottom: 5px;
  color: #555;
} */

/* 24.12.13 수정 */
.course_name {
  width: 90%;
  padding: 20px;
  border: 1px solid #ddd;
}

.course_name input {
  width: 100%;
}

/* Hole Details Table */
.hole-details {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
}

/* 
.hole-details label {
  white-space: nowrap;
  margin-right: 90px;
} */

.hole-details table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

/* 24.12.13 수정 - 추가*/
.main-img-align {
  width: 90%;
  display: grid;
  border: 1px solid #ddd;
  gap: 10px;
}

/* 24.12.13 수정 - 추가 */
.main-img-align input {
border: none;
}

/* 24.12.13 수정 - 추가 */
.image-preview {
  width: 100%;
  padding: 0 10px;
}
/* 24.12.13 수정 */
.image-preview img {
  max-width: 100%;
  max-height: 200px;
  /* margin-left: 150px; */
  display: block;
}

/* 24.12.13 수정 */
.hole-details th,
.hole-details td {
  padding: 20px 10px;
  border: 1px solid #ddd;
  text-align: center;
}

/* 24.12.13 수정 */
.hole-details th {
  /* padding: 23.5px 40px; */
  background-color: #f4f4f4;
}

.hole-details tr:nth-child(6) {
  background-color: #f4f4f4;
}

.hole-details input {
  width: 60px;
  padding: 5px;
  border: 1px solid #ddd;
  text-align: center;
  border-radius: 4px;
}

.course_name input {
  width: 100%;
  height: 50px;
}

.hole-details img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

/* 24.12.13 수정 */
.button-group button {
  /* width: 470px; */
  width: 49%;
  height: 50px;
  border: none;
  margin: 0 auto;
  color: #fff;
  cursor: pointer;
}

.cancel-btn {
  background-color: #a0a0a0;
}

.confirm-btn {
  background-color: #184199;
}

.delete-btn {
  background-color: #d30f1a;
}
</style>
