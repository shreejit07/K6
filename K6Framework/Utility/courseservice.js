
import { check, fail } from 'k6'
import { Rate } from 'k6/metrics'
import http from 'k6/http'
import { Trend } from 'k6/metrics'

// Check Failure Rate or Error Rate
let failureRate = new Rate("failure_rate")

// define trends -  we will be testing create course, get course and delete course ... so 3 trends
var createCourseTrend = new Trend("Trend_CreateCourse")
var getCourseTrend = new Trend("Trend_GetCourse")
var deleteCourseTrend = new Trend("Trend_DeleteCourse")// copy paste is also better :) it saves time :)



// logging
export function logger(endPoint, token, response) {
    console.log(`Logger Started VU=${__VU} ITER=${__ITER}`)
    console.log(`Endpoint is ${endPoint} Token is ${token} VU=${__VU} ITER=${__ITER}`)
    console.log(`Response Status is ${response.status} VU=${__VU} ITER=${__ITER}`)
    console.log(`Body is ${JSON.stringify(JSON.parse(response.body))}`)

    try {
        // add correlation id
        console.log(`Correlation Id is ${JSON.stringify(JSOn.parse(response.headers))['X-Correlation-Id']}`)
    }
    catch (ex) { }
}

// Moodle format of requests is application/x-www-form-urlencoded
export const setHeader = () => {
    return {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
}

function generateRandomString(length) {
    var chars = "asbyqwasdasdkadjqwueu17364748kadsadsjd12345678909sdiuqweyqehqwehwqehweethvnmxcpasksookl123456789lsdfokaj"
    var results;
    for (var i = length; i > 0; --i) {
        results += chars[Math.floor(Math.random() * chars.length)]
    }

    return results;

}


export const route_createCourse = (endPoint, token) => `${endPoint}?wstoken=${token}&moodlewsrestformat=json&wsfunction=core_course_create_courses&courses[0][fullname]=mycourses&courses[0][shortname]=${generateRandomString(15)}&courses[0][categoryid]=1&courses[0][visible]=1&courses[0][summary]=text&courses[0][enablecompletion]=0&courses[0][summaryformat]=1&courses[0][format]=topics&courses[0][numsections]=0`

export const route_getCourse = (endPoint, token, courseId) => `${endPoint}?wstoken=${token}&wsfunction=core_course_get_courses&options[ids][0]=${courseId}&moodlewsrestformat=json`

export const route_deleteCourse = (endPoint, token, courseId) => `${endPoint}?wstoken=${token}&moodlewsrestformat=json&wsfunction=core_course_delete_courses&courseids[0]=${courseId}`


export function createCourse(endPoint, token) {
    console.log(`Inside createCourse token=${token}`)
    
    let postResponse = http.post(`${route_createCourse(endPoint, token)}`, null, setHeader())
    // lets add trend
    createCourseTrend.add(postResponse.timings.duration)
    
    let checkPostResponse = check(postResponse, {
        "Create Course status 200 : ": r => r.status === 200
    })
    // Now define Error Rate
    failureRate.add(!checkPostResponse)

    // add Logs
    logger(endPoint, token, postResponse)

    // Now lest read response
    let responseBody = JSON.parse(postResponse.body)
    // It returns array containign id...as we are creating only one course at a time, we can direclt read value of id from response body

    // now this line can throuw exception if any error occurs in code or there is deefct, so we also need to track this in check and error rate

    try {
        var id = responseBody[0].id;
        console.log(`Create Course returns body as ${JSON.stringify(responseBody)}`)
        console.log(`course id is ${id}`)
        if (`${responseBody[0].id}` == 'undefined') {
            checkPostResponse = check(postResponse, {
                "Create Course returns Undefined Id ": r => r.status === 999 // add any invalid value here
            })
            failureRate.add(!checkPostResponse)
        }
    }
    catch (ex) {
        // here we need to add check
        // in case of exception user must see a log on K6 console
        checkPostResponse = check(postResponse, {
            "Create Course does not return valid data ": r => r.status === 999 // provide any invalid Id, so that Create Course does not return valid datamessage can be visible on K6 console as failure
        })
        failureRate.add(!checkPostResponse)

    }
    return responseBody;
}


export function getCourse(endPoint, token, courseId) {

    const getResponse = http.get(`${route_getCourse(endPoint, token, courseId)}`, null)
    // lets add check
    var checkGetResponse = check(getResponse, {
        "Get Course status is 200 ": r => r.status === 200
    })
    // add error rate
    failureRate.add(!checkGetResponse)
    // add trend
    getCourseTrend.add(getResponse.timings.duration)

    
    let getResponseBody = JSON.parse(getResponse.body)

    // add Logs
    logger(endPoint, token, getResponse)

    // lets log id
    // add check in vase of id not found
    try {
        // Now here course id can be undefined
        // if course id is undefined, we need to log this inside K6 logs

        // id exists inside array but value is undefined
        if (`${getResponseBody[0].id}` == 'undefined') {
            checkGetResponse = check(getResponse, {
                "Get Course returns Undefined Id ": r => r.status === 999 // add any invalid value here
            })
            failureRate.add(!checkGetResponse)
        }
        console.log(`get course body is ${JSON.stringify(getResponseBody)}`)
        console.log(`course id is ${getResponseBody[0].id}`)
    }
    catch (ex) {
        checkGetResponse = check(getResponse, {
            "Get Course does not return valid data ": r => r.status === 999 // provide any invalid Id, so that Create Course does not return valid datamessage can be visible on K6 console as failure
        })
        failureRate.add(!checkGetResponse)
    }

    // return response body
    return getResponseBody;

}


export function deleteCourse(endPoint, token, courseId) {
    console.log(`Inside delete course. course id is ${courseId}`)

    // define response
    let deleteResponse = http.del(`${route_deleteCourse(endPoint, token, courseId)}`, null, setHeader())
    // add Logs
    logger(endPoint, token, deleteResponse)

    // define check
    var checkDeleteResponse = check(deleteResponse, {
        "Delete Course status 200 ": r => r.status === 200
    })
    // define error rate
    failureRate.add(!checkDeleteResponse)
    // measure trend - http response time
    deleteCourseTrend.add(deleteResponse.timings.duration)

}
