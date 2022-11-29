import http from 'k6/http';
import { check } from 'k6';
import {Trend} from 'k6/metrics';
//import {rate} from 'k6/metrics';
var getApitrend = new Trend("Get_api_trend");
var postApitrend = new Trend("Post_api_trend");

export let options = {
  //Rampup Rampdown 
  stages: [
    { duration: '10s', target: 15 },
    { duration: '10s', target: 30 },
    { duration: '10s', target: 0 },
  ],
  //vus: 10, duration:'10s'
  ext: {
    loadimpact: {
      projectID: 3611094,
      // Test runs with the same name groups test runs together
      name: "Basic Cloud Test"
    }
  }
}

export function setup() {
//test

}


export default function () {
  let response1 = http.get('http://test.k6.io'); 
  getApitrend.add(response1.timings.duration);
  const url = 'http://test.k6.io/login';
  const payload = JSON.stringify({
    email: 'aaa',
    password: 'bbb',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let response2 = http.post(url, payload, params);
  postApitrend.add(response1.timings.duration);
  check(response1, {
    'Response status is 200!' : (r)=> r.status ===200,
    })
}

