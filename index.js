// 네이버 음성합성 Open API 예제
var express = require('express');
var app = express();
require('dotenv').config();
var fs = require('fs');
const NAVER_API_CLIENT_ID = process.env.NAVER_API_CLIENT_ID;
const NAVER_API_CLIENT_SECRET = process.env.NAVER_API_CLIENT_SECRET;

app.get('/tts', function (req, res) {
  var apiUrl = 'https://naveropenapi.apigw.ntruss.com/voice/v1/tts';
  var request = require('request');
  var options = {
    url: apiUrl,
    form: { speaker: 'mijin', speed: '-1', text: `문재인 대통령이 국회동의를 거치지 않고 평양 선언과 군사 분야 합의서를 비준하자, 자유한국당이 강력하게 반발하고 나섰습니다.

    국회를 무시한 일방적인 진행이고 헌법을 어겼다면서, 법적 대응을 하겠다고 하는데 청와대는 위헌이 아니라고 반박했습니다.
    
    두 입장에서 쟁점은 무엇인지, 박영회 기자가 따져봤습니다.` },
    headers: { 'X-NCP-APIGW-API-KEY-ID': NAVER_API_CLIENT_ID, 'X-NCP-APIGW-API-KEY': NAVER_API_CLIENT_SECRET }
  };
  var writeStream = fs.createWriteStream('./tts1.mp3');
  var _req = request.post(options).on('response', function (response) {
    console.log(response.statusCode); // 200
    console.log(response.headers['content-type']);
  });
  _req.pipe(writeStream); // file로 출력
  _req.pipe(res); // 브라우저로 출력
});
app.listen(4000, function () {
  console.log('http://127.0.0.1:4000/tts app listening on port 4000!');
});
