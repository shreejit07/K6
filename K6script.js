import http from 'k6/http';
import {check} from 'k6';
import {rate} from 'k6/metrics';
export let options={
 stages:[
  {duration:'10s', target:5},
 {duration:'20s', target:10}
 ]
//vus: 10, duration:'10s'
}

export function setup() {


}


export default function(){
  const url = 'https://tampdevapp.azurewebsites.net/V1/Authenticate/Login';
  const payload = JSON.stringify({
    email: 'joshray@yopmail.com',
    password: 'Shree@1234',
  });
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  //http.post(url, payload, params);
  const response = http.post(url, payload, params);
  check(response, {
  'Response status is 200!' : (r)=> r.status ===200,
  })
  const Token = response.json('result.token');
  console.log('Token is:'+ Token);
 

const url1 ="https://tampdevapp.azurewebsites.net/v1/User/Operators";

const params2 = {
  headers: {
    Authorization: 'Bearer ${Token}',
  },
};
console.log(JSON.stringify(params));
http.get(url1,params1);
const res = http.get(url1,Token);
console.log(JSON.stringify(res));
check(res, {
  'Response status is 200!' : (r)=> r.status ===200,
  })
}

