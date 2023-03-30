# GraphicsTermProject
사용한 기술 : JavaScript, Three.JS

## UI
![image](https://user-images.githubusercontent.com/74289147/228911616-ab396b59-8312-4f9a-9410-debcc04d6c8c.png)
![image](https://user-images.githubusercontent.com/74289147/228911729-4d38176b-b439-472c-a63e-de5701710176.png)
## Animation, movement, graphic
![image](https://user-images.githubusercontent.com/74289147/228911769-95092ddd-dde0-4a12-bf4f-3bddf372a615.png)
Three.JS의 애니메이션 재생 기능을 통해 대기 모션과 걷는 모션을 넣었습니다.
![image](https://user-images.githubusercontent.com/74289147/228911940-88ea4b44-c877-4f81-b372-3c30273a60aa.png)
캐릭터가 이동할 수 있게 Event trigger를 이용했습니다. 여러개의 키를 동시에 누를 수 있게 KeyDown과 KeyUp event를 조합하여 토글을 구현하였고, 이를 통해 얻은 방향을 바탕으로 캐릭터의 좌표값을 구해 position을 변경하고 방향에 따른 rotation을 반영했습니다.
![image](https://user-images.githubusercontent.com/74289147/228912878-32778dcd-1bfd-44f8-8ce6-d5b44819f82f.png)
카메라는 기본적으로 캐릭터를 따라오게 되며, 움직임이 딱딱하게 보이지 않게 하기 위해 smoothing효과를 적용했습니다.
![image](https://user-images.githubusercontent.com/74289147/228914652-97029baa-89b7-4d2f-b809-625aa9460a8a.png)

## Game logics
![image](https://user-images.githubusercontent.com/74289147/228914042-367fcde3-dc62-4459-81b0-cdd97cf1314e.png)
박스형태의 collision과 라인형태의 collision을 구현하였습니다.
![image](https://user-images.githubusercontent.com/74289147/228914164-4703517f-21f7-408f-aaa3-0384d14bfbcb.png)
지뢰모양의 장애물의 경우 큐를 이용하여 가까이에 있는 지뢰만 충돌연산에서 고려하여 최적화를 했고, 데드라인의 경우 캐릭터와 데드라인 사이의 거리가 멀 때 빠르게, 가까울 때 느리게 다가오게 설정했습니다.

## Demo
https://www.youtube.com/watch?v=XxnFWIj3DwM
