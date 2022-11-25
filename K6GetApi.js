import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

const myRate = new Rate('my_rate');

export let options ={
  thresholds: {
    my_rate : ['rate<0.1']
  }
}

export default function () {
  const responses = http.batch([
    ['GET', 'https://test.k6.io', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://test.k6.io/style.css', null, { tags: { ctype: 'css' } }],
    ['GET', 'https://test.k6.io/images/logo.png', null, { tags: { ctype: 'images' } }],
  ]);
  check(responses[0], {
    'main page status was 200': (res) => res.status === 200,
  });
  check(responses[1], {
    'main page status was 200': (res) => res.status !== 200,
  });
  check(responses[2], {
    'main page status was 200': (res) => res.status == 200,
  });
  myRate.add(!check);
}