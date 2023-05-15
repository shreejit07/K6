import * as courseservice from '../Utility/courseservice.js'
import * as env from '../env.js'
import * as testdata from '../testdata/testdata.js'

export let options ={

    vus:testdata.VU,
    duration:testdata.DURATION,
}

let environment;
let token;

if (`${__ENV.ENVIRONMENT}` == env.int) {
    environment = env.int_Environment;
    token = `${__ENV.INT_TOKEN}`
}

else if (`${__ENV.ENVIRONMENT}` == env.dev) {
    environment = env.dev_Environment;
    token = `${__ENV.DEV_TOKEN}`
}


export function setUp() {
    // there is no set up required
}

// 5 - Test Life Cycle - Default function - VU Main function
export default function () {
    try {
        // call course workflow
        console.log(`ENV -> ${environment.SERVER_ENDPOINT}`)
        let responseBody = courseservice.createCourse(`${environment.SERVER_ENDPOINT}`, token);

        courseservice.getCourse(environment.SERVER_ENDPOINT, token, responseBody[0].id)

        courseservice.deleteCourse(environment.SERVER_ENDPOINT, token, responseBody[0].id)

    }
    catch (ex) {
        console.log(`error occurs in execution`)
    }
}