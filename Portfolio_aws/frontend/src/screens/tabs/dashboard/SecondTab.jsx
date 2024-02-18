import * as React from 'react';
import WebView from 'react-native-webview';

const SecondTab = () => {
  const handleMessage = event => {
    // 외부 사이트에서 보낸 데이터를 수신합니다.
    console.log('Received data from external site:', event.nativeEvent.data);
  };
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=6f7706763fa13bc2bcca34e5dd11d146"></script>
      <script>
        let KAKAO_MAP;

        document.addEventListener("DOMContentLoaded", function () {
          setMapView();
          setMarker();
          document.getElementById('sendButton').addEventListener('click', function() {
            window.ReactNativeWebView.postMessage(getInfo());
          });
        });

        function setMapView() {
          const container = document.getElementById('kakaoMap');
          const options = {
              center: new kakao.maps.LatLng(37.53848082617048, 126.6210322605947),
              level: 4
          };
          KAKAO_MAP = new kakao.maps.Map(container, options);
        }

        function getInfo() {
          // 지도의 현재 중심좌표를 얻어옵니다 
          const center = KAKAO_MAP.getCenter(); 
          
          // 지도의 현재 레벨을 얻어옵니다
          const level = KAKAO_MAP.getLevel();
          
          // 지도타입을 얻어옵니다
          const mapTypeId = KAKAO_MAP.getMapTypeId(); 
          
          // 지도의 현재 영역을 얻어옵니다 
          const bounds = KAKAO_MAP.getBounds();
          
          // 영역의 남서쪽 좌표를 얻어옵니다 
          const swLatLng = bounds.getSouthWest(); 
          
          // 영역의 북동쪽 좌표를 얻어옵니다 
          const neLatLng = bounds.getNorthEast(); 
          
          // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
          const boundsStr = bounds.toString();
          
          let message = '지도 중심좌표는 위도 ' + center.getLat() + ', <br>';
          message += '경도 ' + center.getLng() + ' 이고 <br>';
          message += '지도 레벨은 ' + level + ' 입니다 <br> <br>';
          message += '지도 타입은 ' + mapTypeId + ' 이고 <br> ';
          message += '지도의 남서쪽 좌표는 ' + swLatLng.getLat() + ', ' + swLatLng.getLng() + ' 이고 <br>';
          message += '북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng() + ' 입니다';
          
          return message;
         }

         function setMarker() {

          // 마커가 표시될 위치입니다 
          const markerPosition  = new kakao.maps.LatLng(37.53848082617048, 126.6210322605947); 
          
          // 마커를 생성합니다
          const marker = new kakao.maps.Marker({
              position: markerPosition
          });
          
          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(KAKAO_MAP);

         }

      </script>
    </head>
    <body>
      <div id="kakaoMap" style="width: 100%; height: 400px"></div>
      <button id="sendButton">Send Data to React Native</button>
    </body>
  </html>`;
  return (
    <WebView
      source={{html: html}}
      style={{flex: 1}}
      onMessage={handleMessage}
    />
  );
};

export default SecondTab;
