import http from 'k6/http';
import { Trend } from 'k6/metrics';

const receiving_Trend = new Trend('Receiving_time');
const waiting_Trend = new Trend('Waiting_time');

export default function(){
const r = http.get('https://reqres.in/api/users?page=2');
receiving_Trend.add(r.timings.receiving);
waiting_Trend.add(r.timings.waiting);
console.log(receiving_Trend.name);
console.log(waiting_Trend.name);
}