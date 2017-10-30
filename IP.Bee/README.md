Image Processing Bee!

실시간으로, 요청된 크기의 이미지를 꿀벌처럼 가져다 주는 서비스!

#호출 예제
http://localhost:3000/image/resize/50/200?format=jpeg&quality=100&progressive=true&url=이미지URL
http://localhost:3000/image/resize/600/100?format=jpeg&quality=100&progressive=true&crop=true&url=이미지URL

#옵션 (global 내의 core(options) 로 전달되는 옵션 값 설명)
cropMaxSize : 1000 //CROP허용 최대 길이(픽셀) (폭 또는 높이). 참고 :이 값이 너무 높으면 공격자가 값을 사용하여 서버 부하를 줘서 장애를 유발 시킬 수 있다. 기본값은 1000
cors : {} //https://github.com/expressjs/cors 참고

#호출시 파라미터 설명
format : jpeg,gif,webp, png //http://sharp.dimens.io/en/stable/api-output/#toformat 에서 지원하는 확장자면 OK
progressive : jpeg 와 png 에서 사용되는 포맷. //http://sharp.dimens.io/en/stable/api-output/#jpeg 참고, 기타 필요 옵션값은 소스 수정을 통해추가
quality : 기본값 75%, 이미지 품질
crop : sharp 의 crop 기능 활성화. 기본값 false, crop 기능 사용 시, 폭과 높이 모두 필수 값! //http://sharp.dimens.io/en/stable/api-resize/#crop
gravity : 기본값은 center, crop 옵션으로 어디를 자를지//http://sharp.dimens.io/en/stable/api-resize/#crop
url : 리사이징 할 URL

#추가 개발 시 특이사항
대부분 필요한건 sharp api document 참고하면 다 있다.


#주요 참고 라이브러리
https://github.com/lovell/sharp
https://github.com/jcupitt/libvips

