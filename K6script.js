import http from 'k6/http';
import {check} from 'k6';

export let options={
 //stages:[
  // {duration:'10s', target:5},
  //  {duration:'20s', target:10}
 // ]
//vus: 10, duration:'10s'
}

export default function() {
 let response = http.get("https://run.mocky.io/v3/292bdbd2-590d-4b26-9b1e-288a34195a20");
 check(response, {
  'Response status is 200!' : (r)=> r.status ===200,
})

}

