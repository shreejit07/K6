import http from 'k6/http';
import { Trend, Gauge } from 'k6/metrics';

const responseTimes = new Trend('response_times');
const percentile90 = new Gauge('response_time_90th_percentile');

export default function() {
  const res = http.get('https://reqres.in/api/users?page=2');
  responseTimes.add(res.timings.duration);

  // Calculate the 90th percentile response time and add it to the gauge
  const p90 = responseTimes.percentile(90);
  percentile90.add(p90);
 
}