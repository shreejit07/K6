import http from 'k6/http';
import { check, sleep } from 'k6';

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