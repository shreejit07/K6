
import http from 'k6/http';
import { check } from 'k6';

const url = 'https://httpbin.test.k6.io/delete';

export default function () {
  const params = { headers: { 'X-MyHeader': 'k6test' } };
  let res = http.del(url, null, params);
  console.log(res);

  check(res, {
    'Validate status message is 200 Ok or not?': (res) => res.status_text === '200 OK',
  });
}