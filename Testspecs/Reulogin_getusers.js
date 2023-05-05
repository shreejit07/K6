import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], 
    http_req_duration: ['p(95)>300'], 
    //checks:['rate==100']
  },
  stages: [
    { duration: '1m', target: 100 },
    { duration: '5m', target: 300 },
    { duration: '2m', target: 500 },
    { duration: '2m', target: 700 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  const baseUrl = 'https://lms-qa-backend.azurewebsites.net/api';
  const loginUrl = `${baseUrl}/users/login`;
  const getUsersUrl = `${baseUrl}/users`;

  // Login
  const loginPayload = JSON.stringify({
    email: 'adminuser07@yopmail.com',
    password: 'Simform@123',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const loginRes = http.post(loginUrl, loginPayload, params, {
    tags: {
      my_tag: "Login",
    },
  });


  check(loginRes, { 'Login status was 200': (r) => r.status === 200 });

  const authToken = loginRes.json('data.token');
  
  const authHeaders = { Authorization: `Bearer ${authToken}` };

  // Get users
  const getUsersRes = http.get(getUsersUrl, { headers: authHeaders, tags: { name: 'Get Users' }, });

  check(getUsersRes, { 'Get users status was 200': (r) => r.status === 200 });

  console.log(`Login response time: ${loginRes.timings.duration} ms`);
  console.log(`Get Users response time: ${getUsersRes.timings.duration} ms`);

 // sleep(1);
}