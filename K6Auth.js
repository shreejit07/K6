
import http from 'k6/http';
import {check} from 'k6';
import { group } from 'k6';
const BASE_URL = 'https://tampdevapp.azurewebsites.net/V1/Authenticate/Login';

export function setup() {
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
      const response = http.post(BASE_URL, payload, params);
      check(response, {
      'Response status is 200!' : (r)=> r.status ===200,
      })
      const Token = response.json('result.token');
      console.log('Token is:'+ Token);    

	return Token;
}

export default (Token) => {
	 group('Get Operators', () => {
      const request_headers = {
		  'content-type': "application/json",
		  'Authorization': `Bearer ${Token}`};
	console.log("The Header: " + JSON.stringify(request_headers));
	//Get all Operators
	let operators = http.get(`https://tampdevapp.azurewebsites.net/v1/User/Operators`, {headers: request_headers});
	const message = operators.json().result;
    console.log(message);
    check(operators, {
      'Response status is 200!': (r) => r.status === 200,
    })
	
    });	
    group('Get Widgets for User', () => {
      const request_headers = {
		  'content-type': "application/json",
		  'Authorization': `Bearer ${Token}`};
	console.log("The Header: " + JSON.stringify(request_headers));
	//Get widgets for Users
	let res_widgets = http.get(`https://tampdevapp.azurewebsites.net/v1/Widget/GetWidgetsForUser`, {headers: request_headers});
	const message = res_widgets.json().result;
    console.log(message);
    check(res_widgets, {
      'Response status is 200!': (r) => r.status === 200,
    })
	
    });	 	
};