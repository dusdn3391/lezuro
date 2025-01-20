<template>
  <div class="container-center-horizontal">
    <div class="findvenue-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" />
      <div class="title pretendard-bold-log-cabin-38px">매장찾기</div>
      <div class="select-box">
        <div class="select-align">
          <div class="select-style">
            <!-- 지역을 선택할 수 있는 select box -->
            <select class="select-text pretendard-regular-normal-mine-shaft-18px" v-model="selectedRegion"
              @change="filterVenuesByRegion">
              <!-- 24.12.04 수정 - 추가 -->
              <option class="pretendard-regular-normal-mine-shaft-18px" value="" selected>
                전체 지역
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="서울">
                서울
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="인천">
                인천
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="대전">
                대전
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="대구">
                대구
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="광주">
                광주
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="울산">
                울산
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="부산">
                부산
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="강원">
                강원
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="경기">
                경기
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="충북">
                충북
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="충남">
                충남
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="전북">
                전북
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="전남">
                전남
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="경북">
                경북
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="경남">
                경남
              </option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="제주">
                제주
              </option>
            </select>
          </div>
          <!-- <div class="select-style">
            세부지역을 선택할 수 있는 select box 
            <select
              class="select-text pretendard-regular-normal-mine-shaft-18px"
            >
              <option
                class="pretendard-regular-normal-mine-shaft-18px"
                value=""
                disabled
                selected
              >
                전체지역(시군구)
              </option>
              <option
                class="pretendard-regular-normal-mine-shaft-18px"
                value=""
              >
                서울
              </option>
              <option
                class="pretendard-regular-normal-mine-shaft-18px"
                value=""
              >
                대구
              </option>
              <option
                class="pretendard-regular-normal-mine-shaft-18px"
                value=""
              >
                부산
              </option>
            </select>
          </div> -->
        </div>
        <div class="input-style">
          <!-- 검색어 입력 필드 -->
          <input type="text" class="input-text pretendard-regular-normal-mountain-mist-18px" placeholder="검색어를 입력해주세요"
            v-model="searchQuery" />
          <img class="search-btn-10"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
            alt="searchBtn" @click="handleSearchAndFilter(searchQuery)" />
        </div>
      </div>

      <!-- 720px 초과 -->
      <div class="shop-list-frame">
        <div class="shop-lists">
          <div v-for="(venue, index) in limitVenue" :key="index" class="shop-info-box">
            <div class="shop-info">
              <div class="shop-name-info">
                <div class="valign-text-middle pretendard-bold-mine-shaft-20px">
                  {{ venue.name }}
                </div>
              </div>
              <div class="address-contant-align pretendard-regular-normal-granite-gray-16px">
                <!-- <div>주소 : {{ venue.address }}</div> -->
                <!-- 24.11.19 수정 - 추가 -->
                <div>주소: {{ getShortAddress(venue.address) }}</div>
                <div>연락처 : {{ venue.telNumber }}</div>
              </div>
            </div>
            <div class="shop-info-btn">
              <button class="detail-view-btn pretendard-medium-white-12px" @click="openModal(venue)">
                자세히보기
              </button>
              <button class="reservation-btn pretendard-medium-white-12px" @click="toGoReservationWrite(venue)">
                예약하기
              </button>
              <button class="call-btn pretendard-medium-white-12px">
                <a :href="'tel:' + venue.telNumber" class="pretendard-medium-white-12px">전화걸기</a>
              </button>
              <!-- <div class="view-44">
                <div class="overlap-group2-5">
                  <a :href="'tel:' + venue.telNumber">
                    <div class="text-1-4 valign-text-middle pretendard-medium-white-12px">전화걸기</div>
                  </a>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="map-box">
          <!-- <div ref="mapContainer" class="map-container"></div> -->
          <div id="map" style="width: 100%; height: 868px"></div>
          <!-- <div class="frame-container-10" :style="{ 'background-image': 'url(' + frameContainer + ')' }">
              <frame72984 :text2687="frame729841Props.text2687" />
              <frame72984 :text2687="frame729842Props.text2687" :className="frame729842Props.className" />
              <frame72984 :text2687="frame729843Props.text2687" :className="frame729843Props.className" />
              <frame72984 :text2687="frame729844Props.text2687" :className="frame729844Props.className" />
            </div> -->
        </div>
      </div>

      <!-- 720px 이하 -->
      <div class="shop-list">
        <div v-for="(venue, index) in limitVenue" :key="index" class="shop-list-card">
          <div class="shop-info-align">
            <div class="pretendard-bold-mine-shaft-20px">{{ venue.name }}</div>
            <div class="address-contant-align pretendard-regular-normal-granite-gray-16px">
              <div>주소 : {{ venue.address }}</div>
              <div>연락처 : {{ venue.telNumber }}</div>
            </div>
          </div>
          <div class="btn-align">
            <div class="btn-align-head">
              <button class="detail-view-btn pretendard-medium-white-12px" @click="openModal(venue)">
                자세히보기
              </button>
              <button class="call-btn pretendard-medium-white-12px">
                <a :href="'tel:' + venue.telNumber" class="pretendard-medium-white-12px">전화걸기</a>
              </button>
            </div>
            <button class="reservation-btn pretendard-medium-white-12px" @click="toGoReservationWrite(venue)">
              예약하기
            </button>
          </div>
        </div>
      </div>

      <!-- <div>   -->
      <!-- <div id="map" style="width: 500px; height: 400px;"></div> -->
      <!-- </div> -->

      <XFooter />
      <GameDetail v-if="isModalVisible" :shop="selectedShop" @close="closeModal" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header";
import RjZsWi from "./RjZsWi";

import XFooter from "./XFooter";
import GameDetail from "./GameDetail";
import GoogleMap from "./GoogleMap.vue";
import { Loader } from "@googlemaps/js-api-loader";
import { taskStore } from "@/store/taskStore"; // API 호출

export default {
  name: "MapList",
  components: {
    Header,
    GameDetail,
    RjZsWi,
    XFooter,
    GoogleMap,
  },
  props: ["rJZsWIProps"],
  data() {
    return {
      isModalVisible: false,
      searchQuery: "",
      selectedShop: null, // 선택한 매장 정보 저장
      limitVenue: [], // 필터링된 매장 데이터
      selectedRegion: "", // 선택된 지역
      venues: [
        {
          name: "레저로스크린파크골프 광명점",
          address: "경기도 광명시 오리로500",
          telNumber: "02-898-0727",
          branchId: "branch301",

          location: {
            latitude: 37.556785357670286,
            longitude: 126.8369964659211,
          },
        },
      ],
      limitVenue: [],
      map: null,
      location: null, // 위치 정보
      protocol: '',
      isSecure: false,
    };
  },
  mounted() {
    //  this.loadNaverMap();
    this.getDetailStroeInfo();
    // this.callArround()
    // this.initializeMap();
  },
  methods: {
    handleSearchAndFilter() {
      console.log("Search query received:", this.searchQuery);
      console.log("Selected Region:", this.selectedRegion);

      // 검색어와 지역 모두 일치하는 매장 필터링
      const filteredVenues = this.venues.filter((venue) => {
        const matchesQuery = this.searchQuery
          ? venue.name.includes(this.searchQuery)
          : true; // 검색어가 없으면 모든 매장 포함
        const matchesRegion = this.selectedRegion
          ? venue.region === this.selectedRegion
          : true; // 지역이 선택되지 않으면 모든 매장 포함
        return matchesQuery && matchesRegion;
      });

      if (filteredVenues.length === 0) {
        alert("해당되는 매장이 존재하지 않습니다. 현재 위치로 이동합니다.");
        this.limitVenue = [];

        // 현재 위치로 이동
        if (this.location) {
          this.naverInitMap();
        } else {
          console.error("현재 위치 정보가 없습니다.");
          alert("현재 위치 정보를 가져올 수 없습니다.");
        }
        return;
      }

      // 필터링된 매장을 화면에 표시
      this.limitVenue = filteredVenues.slice(0, 5); // 최대 5개 매장 표시
      console.log("Filtered venues:", this.limitVenue);

      // 첫 번째 매장을 지도 중심으로 설정
      const firstVenue = filteredVenues[0];
      this.location = {
        lat: firstVenue.location.latitude,
        lng: firstVenue.location.longitude,
      };

      // 지도 업데이트
      this.updateMapWithVenues(filteredVenues);
    },
    updateMapWithVenues(venues) {
      console.log("Updating map with venues:", venues);

      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(
          venues[0].location.latitude,
          venues[0].location.longitude
        ),
        zoom: 16, // 적절한 줌 레벨
      });

      venues.forEach((venue) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            venue.location.latitude,
            venue.location.longitude
          ),
          map: map,
        });

        const infoWindow = new naver.maps.InfoWindow({
          content: `<div style="padding:10px; cursor:pointer;">${venue.name}</div>`,
        });

        naver.maps.Event.addListener(marker, "click", () => {
          infoWindow.open(map, marker);
        });
      });

      console.log("Map updated with filtered venues.");
    },
    // async handleSearch(query) {
    //   // Handle the search query here
    //   console.log("Search query received:", query);

    //   const foundLocations = this.venues
    //     // .filter(venue => venue.name.includes(query)) // Check if the venue name includes the search query
    //     .filter((venue) => venue.name === query)
    //     .map((venue) => venue.location); // Return only the location values
    //   console.log("Found locations:", foundLocations);
    //   if (foundLocations.length === 0) {
    //     alert("해당되는 매장이 존재 하지 않습니다."); // Warning for no matches
    //   } else {
    //     this.location = {
    //       lat: foundLocations[0].latitude,
    //       lng: foundLocations[0].longitude,
    //     };
    //     this.initializeMap();
    //   }
    // },
    // 현재 나의 위치 찾기
    getCurrentLocation() {
      console.log("[Step 1] Geolocation 지원 여부 확인");
      this.protocol = window.location.protocol;
      const hostname = window.location.hostname;


      // HTTPS 여부 판단
      if (this.protocol === 'https:' || hostname === 'localhost' || hostname === '127.0.0.1') {
        if (navigator.geolocation) {
          console.log("[Step 2] Geolocation 지원됨. 현재 위치 요청 시작...");

          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("[Step 3] 위치 정보 요청 성공");
              console.log(`[Step 4] 위도: ${position.coords.latitude}`);
              console.log(`[Step 5] 경도: ${position.coords.longitude}`);
              console.log(`[Step 6] 정확도: ${position.coords.accuracy} 미터`);

              this.location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              console.log("[Step 7] 위치 정보 저장 완료:", this.location);

              this.loadNaverMap(); // 네이버 지도 로드
              console.log("[Step 8] 네이버 지도 로드 함수 호출 완료");
            },
            (error) => {
              console.error("[Error] 위치 정보 요청 실패:", error);
            }
          );
        } else {
          console.error(
            "[Error] 이 브라우저는 Geolocation API를 지원하지 않습니다."
          );
          alert("Geolocation is not supported by this browser.");
        }
      } else {
        // HTTP 일때 경우의 수
        fetch("http://ip-api.com/json/")
          .then((response) => response.json())
          .then((data) => {
            console.log("IP-based location:", data);
            this.location = {
              lat: data.lat,
              lng: data.lon,
            };
            this.loadNaverMap(); // 네이버 지도 로드
          })
          .catch((error) => console.error("Error fetching location:", error));
      }




    },

    openModal(venue) {
      this.selectedShop = venue;
      this.isModalVisible = true; // 모달 열기
      console.log("this.selectedShop : : :", JSON.stringify(this.selectedShop));
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedShop = null;
    },
    // 동까지만 추출하는 메서드 - 24.11.19 수정
    getShortAddress(fullAddress) {
      if (!fullAddress) {
        console.warn(
          "[getShortAddress] Received undefined or empty address:",
          fullAddress
        );
        return "주소 정보 없음"; // 기본 메시지 반환
      }

      // 주소를 공백이나 특정 기준(예: "동")으로 분리
      const regex = /(.*동|.*읍|.*면|.*길|.*로)/;
      const match = fullAddress.match(regex);
      return match ? match[0] : fullAddress; // 동까지만 반환하거나 원본 주소 반환
    },
    toGoReservationWrite(venue) {
      this.selectedShop = venue;
      console.log("this.selectedShop : : : ", this.selectedShop);

      // 24.12.27 수정 - 추가
      // localStorage에 데이터 저장
      localStorage.setItem("selectedShop", JSON.stringify(venue));

      this.$router.push({
        name: "reservation-write", // 해당 경로의 name을 지정하세요.
        params: {
          name: this.selectedShop.name,
          branchId: this.selectedShop.branchId,
          address: this.selectedShop.address,
          weekdayHours: this.selectedShop.weekdayHours,
          weekendHours: this.selectedShop.weekendHours,
          mapImage: this.selectedShop.mapImage,
          managerid: this.selectedShop.managerid,
          storeScale: this.selectedShop.storeScale,
          location: {
            latitude: this.selectedShop.latitude,
            longitude: this.selectedShop.longitude,
          },
        },
      });
    },
    async getDetailStroeInfo() {
      try {
        const response = await taskStore.getSelectTasks("v1/branch/list");
        console.log("Courses loaded:", JSON.stringify(response));
        if (!response || response === undefined) {
          alert("로그인을 다시 해주세요.");
        } else {
          this.venues = this.transformBranchesData(response); // 데이터 변환
          this.limitVenue = this.transformBranchesData(response); // 배포용
          this.getCurrentLocation();
        }
      } catch (error) {
        console.error("Error loading courses:", error);
        alert("매장데이터 조회 실패했습니다. 서버 오류를 확인하세요.");
      }
    },
    filterVenuesByRegion() {
      console.log("Selected Region:", this.selectedRegion); // 선택한 지역 출력
      if (!this.selectedRegion) {
        console.log("전체 지역 선택됨");
        this.getDetailStroeInfo(); // 전체 매장 목록을 다시 불러옴
        return;
      }
      let filteredVenues = this.venues;

      // 지역 필터링
      if (this.selectedRegion) {
        filteredVenues = this.venues.filter(
          (venue) => venue.region === this.selectedRegion
        );
        // 필터링된 매장 출력
      }

      console.log("Filtered Venues:", filteredVenues);
      if (filteredVenues.length > 0) {
        // 데이터 변환
        const transformedVenues = this.transformBranchesData(filteredVenues);
        console.log("Transformed Venues:", transformedVenues); // 변환된 매장 데이터 출력

        // 현재 위치
        const currentLocation = this.location;
        console.log("Current Location:", currentLocation); // 현재 위치 출력

        // 가까운 매장 계산
        const closestBranches = this.findClosestBranch(
          currentLocation,
          transformedVenues
        );

        // 가장 가까운 매장
        if (closestBranches.length > 1) {
          const closestShop = closestBranches[1]; // 현재 위치 제외한 가장 가까운 매장
          console.log("Closest Shop:", closestShop); // 가장 가까운 매장 콘솔 출력

          // 지도 중심 업데이트 및 마커 표시
          this.updateMapWithClosestShop(closestShop);
        } else {
          console.log("No closest shop found.");
        }

        // 화면에 표시할 매장 설정
        this.limitVenue = closestBranches.slice(1, 5); // 현재 위치 제외하고 4개 선택
      } else {
        console.log("No venues found in selected region."); // 선택한 지역에 매장이 없을 경우
        this.limitVenue = [];
        this.naverInitMap(); // 지도 초기화
        alert("선택한 지역에 매장이 없습니다.");
      }
    },
    updateMapWithClosestShop(closestShop) {
      console.log("Updating map with closest shop:", closestShop);

      // Naver Map 생성 또는 업데이트
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(
          closestShop.location.latitude,
          closestShop.location.longitude
        ),
        zoom: 16, // 적절한 줌 레벨
      });
      const currentLocationMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(this.location.lat, this.location.lng),
        map: map,
        title: "현재 위치", // 마커 타이틀
        icon: {
          content: `
        <div style="
          background-color: #D30F1A;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 5px rgba(0,0,0,0.3);
        "></div>
      `,
        },
      });
      // 가장 가까운 매장 위치에 기본 네이버 마커 추가
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          closestShop.location.latitude,
          closestShop.location.longitude
        ),
        map: map, // 마커가 추가될 지도
      });

      console.log("Naver Marker added at:", closestShop.location);

      // 인포윈도우 생성
      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding:10px; cursor:pointer;">${closestShop.name}</div>`, // 매장 이름 표시
      });

      // 마커 클릭 이벤트 추가
      naver.maps.Event.addListener(marker, "click", () => {
        infoWindow.open(map, marker); // 인포윈도우 열기

        // 인포윈도우 클릭 이벤트 추가
        const infoElement = document.querySelector(`.gm-style div[title="${closestShop.name}"]`);
        if (infoElement) {
          infoElement.addEventListener("click", () => {
            console.log("InfoWindow clicked for:", closestShop.name);
            this.$router.push({
              name: "reservation-write",
              params: {
                name: closestShop.name,
                branchId: closestShop.branchId,
                address: closestShop.address,
                weekdayHours: closestShop.weekdayHours,
                weekendHours: closestShop.weekendHours,
                mapImage: closestShop.mapImage,
                managerid: closestShop.managerid,
                storeScale: closestShop.storeScale,
                location: {
                  latitude: closestShop.location.latitude,
                  longitude: closestShop.location.longitude,
                },
              },
            });
          });
        }
      });

      // 지도 중심 위치로 이동
      map.setCenter(new naver.maps.LatLng(
        closestShop.location.latitude,
        closestShop.location.longitude
      ));
    },
    // 주변 반경 찾기 로직
    calculateDistance(lat1, lng1, lat2, lng2) {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371; // Earth's radius in kilometers
      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
    },

    findClosestBranch(currentLocation, branches) {
      console.log("Calculating distances from:", currentLocation); // 현재 위치 출력
      console.log("Branches to calculate:", branches); // 계산 대상 매장 출력

      const branchesWithDistance = branches.map((branch) => {
        const distance = this.calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          branch.location.latitude,
          branch.location.longitude
        );
        console.log(`Distance to ${branch.name}: ${distance} km`); // 각 매장 거리 출력
        return { ...branch, distance };
      });

      const sortedBranches = branchesWithDistance.sort(
        (a, b) => a.distance - b.distance
      );
      console.log("Sorted Branches by Distance:", sortedBranches); // 정렬된 매장 출력

      return [
        {
          name: "현재 위치",
          location: {
            latitude: currentLocation.lat,
            longitude: currentLocation.lng,
          },
          distance: 0,
        },
        ...sortedBranches,
      ];
    },
    // 주변 매장 탐색
    callArround() {
      const currentLocation = { lat: 37.5583761, lng: 126.8345277 };
      const branches = [
        {
          branchId: "branch001",
          name: "서울 지점",
          location: { latitude: 37.5, longitude: 127.0364 },
        },
        {
          branchId: "branch0010",
          name: "델리케밥",
          location: {
            latitude: 37.55965189952221,
            longitude: 126.83222565575036,
          },
        },
        {
          branchId: "branch0001",
          name: "델리케밥0",
          location: {
            latitude: 37.56006592349469,
            longitude: 126.83523518132029,
          },
        },
        {
          branchId: "branch101",
          name: "델리케밥1",
          location: {
            latitude: 37.56128049081266,
            longitude: 126.8394164423239,
          },
        },
        {
          branchId: "branch201",
          name: "델리케밥2",
          location: {
            latitude: 37.56080374714247,
            longitude: 126.82919239989074,
          },
        },
        {
          branchId: "branch301",
          name: "델리케밥3",
          location: {
            latitude: 37.556785357670286,
            longitude: 126.8369964659211,
          },
        },
        {
          branchId: "branch401",
          name: "델리케밥4",
          location: {
            latitude: 37.56009802237206,
            longitude: 126.83171172240971,
          },
        },
        {
          branchId: "branch501",
          name: "델리케밥5",
          location: {
            latitude: 37.559176533344726,
            longitude: 126.8314024154255,
          },
        },
        {
          branchId: "branch601",
          name: "델리케밥6",
          location: {
            latitude: 37.56138036084911,
            longitude: 126.82090267531436,
          },
        },

        {
          branchId: "branch002",
          name: "부산 지점",
          location: { latitude: 31.5, longitude: 117.0364 },
        },
      ];
      const closestBranch = this.findClosestBranch(currentLocation, branches);
      console.log("Closest Branch:", closestBranch);
    },
    // 데이터 변환
    transformBranchesData(data) {
      return data.map((branch) => {
        return {
          ...branch,
          branchId: branch.id,
          location: {
            latitude: branch.latitude || 37.56128049081266, // 기본값 사용
            longitude: branch.longitude || 126.8394164423239, // 기본값 사용
          },
        };
      });
    },
    // 네이버 지도 로드
    loadNaverMap() {
      // Naver Maps API 로드 확인
      if (typeof naver !== "undefined") {
        this.naverInitMap();
      } else {
        // 로드되지 않았으면 다시 확인
        const checkNaverMap = setInterval(() => {
          if (typeof naver !== "undefined") {
            clearInterval(checkNaverMap);
            this.naverInitMap();
          }
        }, 100); // 100ms 간격으로 확인
      }
    },
    // 네이버 지도 로드
    naverInitMap() {
      console.log("진행중입니다.");
      console.log(this.location);

      // Naver Map 생성
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(
          this.location.lat, // 지도 중심을 약간 아래로 이동
          this.location.lng
        ),
        zoom: 16, // 적절한 줌 레벨
      });

      // 현재 위치 마커 추가
      const currentLocationMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(this.location.lat, this.location.lng),
        map: map,
        icon: {
          content: `
      <div style="
        background-color: #D30F1A;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
      "></div>
      `,
        },
      });
      console.log("Current location marker added.");

      // 가까운 매장 찾기
      const closestBranch = this.findClosestBranch(
        this.location,
        this.limitVenue
      );

      // 마커 및 인포윈도우 추가
      closestBranch.forEach((branch, index) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            branch.location.latitude,
            branch.location.longitude
          ),
          map: map,
          icon:
            index === 0
              ? {
                content: `
          <div style="
            background-color: #D30F1A;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 5px rgba(0,0,0,0.3);
          "></div>
          `,
              }
              : null,
        });

        // 인포윈도우 내용 설정
        const infoWindow = new naver.maps.InfoWindow({
          content: `<div id="info-${branch.branchId}" style="padding:10px; cursor: pointer;">${branch.name}</div>`, // 고유 ID 추가
        });

        // 마커 클릭 이벤트
        naver.maps.Event.addListener(marker, "click", () => {
          infoWindow.open(map, marker);

          setTimeout(() => {
            const infoElement = document.getElementById(
              `info-${branch.branchId}`
            );
            if (infoElement) {
              infoElement.addEventListener("click", () => {
                console.log("InfoWindow content clicked:", branch.name);
                this.$router.push({
                  name: "reservation-write",
                  params: {
                    name: branch.name,
                    branchId: branch.branchId,
                    address: branch.address,
                    weekdayHours: branch.weekdayHours,
                    weekendHours: branch.weekendHours,
                    mapImage: branch.mapImage,
                    managerid: branch.managerid,
                    storeScale: branch.storeScale,
                    location: {
                      latitude: branch.location.latitude,
                      longitude: branch.location.longitude,
                    },
                  },
                });
              });
            }
          }, 0); // InfoWindow가 DOM에 렌더링된 후 실행
        });
      });

      // 가까운 매장만 리스트 업데이트
      this.limitVenue = closestBranch.slice(1, 5);
    },
    /// 구글 지도 로드
    async initializeMap() {
      const loader = new Loader({
        apiKey: "AIzaSyCDIXWiutjxK5qjCATUyKIL5Sd13E-LSUs", // 생성한 API 키로 교체
        version: "weekly",
      });

      console.log(this.location);
      console.log("JSOPN : : : ", JSON.stringify(this.location));
      await loader.load();
      this.map = new google.maps.Map(this.$refs.mapContainer, {
        // center: this.location,35.869368,128.599230
        center: { lat: 35.869368, lng: 128.59923 }, // 초기 지도 중심 좌표 (예: 샌프란시스코)
        zoom: 15,
      });

      console.log("this.location: : : : : : : ", this.location);
      // const closestBranch = this.findClosestBranch(currentLocation, branches);
      const closestBranch = this.findClosestBranch(this.location, this.venues);
      console.log("Closest Branch:", closestBranch);

      // 매장명 보이기
      const infoWindow = new google.maps.InfoWindow();
      this.limitVenue = closestBranch.slice(1, 5);
      // this.venues = closestBranch.slice(1, 5);

      // 모든 지점에 대해 마커 추가 및 클릭 이벤트 설정
      closestBranch.forEach((branch, index) => {
        const marker = new google.maps.Marker({
          position: {
            lat: branch.location.latitude,
            lng: branch.location.longitude,
          },
          map: this.map,
          title: branch.name, // 타이틀 설정
          icon:
            index === 0
              ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              : null, // 현재 위치 마커는 파란색
        });

        // 마커 클릭 시 InfoWindow에 타이틀 표시
        marker.addListener("click", () => {
          infoWindow.setContent(branch.name); // 지점 이름을 InfoWindow에 설정
          infoWindow.open(this.map, marker); // InfoWindow를 마커 위치에 표시
        });
      });
    },
  },
};
</script>

<style scoped src="@/style/shop/maplist.css" />
