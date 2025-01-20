<template>
    <div>
      <div ref="mapContainer" class="map-container"></div>
    </div>
  </template>
  
  <script>
  import { Loader } from '@googlemaps/js-api-loader';
  
  export default {
    name: 'GoogleMap',
    data() {
      return {
        map: null, // 지도 객체
      };
    },
    mounted() {
      this.initializeMap();
    },
    methods: {
      async initializeMap() {
        const loader = new Loader({
          apiKey: 'AIzaSyCDIXWiutjxK5qjCATUyKIL5Sd13E', // 생성한 API 키로 교체
          version: 'weekly',
        });
  
        await loader.load();
        this.map = new google.maps.Map(this.$refs.mapContainer, {
          center: { lat: 37.7749, lng: -122.4194 }, // 초기 지도 중심 좌표 (예: 샌프란시스코)
          zoom: 10,
        });
  
        // 예시 마커 추가
        new google.maps.Marker({
          position: { lat: 37.7749, lng: -122.4194 },
          map: this.map,
          title: 'Hello Vue!',
        });
      },
    },
  };
  </script>
  
  <style>
  .map-container {
    width: 100%;
    height: 400px;
  }
  </style>
  