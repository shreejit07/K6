import http from 'k6/http';
import { Rate } from 'k6/metrics';
const successRate = new Rate('api_success_rate');
const FailureRate = new Rate('api_failure_rate');

export default function(){
const r = http.get('https://reqres.in/api/users?page=4');
const p = http.get('https://reqres.in//api/users/23');
const success = r.status === 200;
const failure = r.status !== 200;

const successp = r.status === 200;
const failurep = r.status !== 200;

successRate.add(success);
FailureRate.add(failure);
successRate.add(successp);
FailureRate.add(failurep);

}