import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1s', target: 10 },
    { duration: '5s', target: 500 },
    { duration: '30s', target: 500 },
  ],
};

export default function() {
  let roomId = Math.floor(Math.random() * 9999999) + 1;
  http.get(`http://localhost:3000/api/${roomId}/photo-gallery`);
  sleep(1);
}
