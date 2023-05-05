// Auto-generated by the postman-to-k6 converter

import "./libs/shim/core.js";
import "./libs/shim/urijs.js";
import { group } from "k6";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options,
  environment: {
    apiUrl: "https://lms-qa-backend.azurewebsites.net/api",
    token: ""
  }
});

export default function() {
  group("Auth", function() {
    postman[Request]({
      name: "Login",
      id: "e93a9530-f0cf-471f-9a8b-72fbcfe29d1a",
      method: "POST",
      address: "{{apiUrl}}/users/login",
      data:
        '{\n    "email": "adminuser07@yopmail.com",\n    "password": "Simform@123"\n}',
      post(response) {
        const resData = pm.response.json();
        console.log({ resData });
        pm.environment.set("token", resData.data.token);
      }
    });
  });

  group("Courses", function() {
    postman[Request]({
      name: "Get Course exams",
      id: "85160887-7bc0-41f2-bedf-ba21444ff007",
      method: "GET",
      address:
        "{{apiUrl}}/courses/61121399b1fbee06b0902cff/exams?search=new%20exam",
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });

    postman[Request]({
      name: "Create Course",
      id: "7c69cc2f-5807-4ccf-9754-7270a5ba480c",
      method: "POST",
      address: "{{apiUrl}}/courses",
      data:
        '{\n    "availability": "12",\n    "description": "test",\n    "image": "C:\\\\Users\\\\sreejit\\\\Downloads\\\\course.jpg",\n    "inactiveTime": 60,\n    "outOfFocusPause": "true",\n    "title": "Demo"\n}',
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });
  });

  group("Core library", function() {
    postman[Request]({
      name: "Update core library lesson",
      id: "ef78b7f5-1b95-4b19-b8cf-8d5e040ae9ce",
      method: "PATCH",
      address: "{{apiUrl}}/core/lessons/62b409565b5913c6c0c91e25",
      data:
        '{\n    "title": "get started with florida lesson",\n    "unlockNextLesson":"ON_LESSON_START",\n    "maxTime":"31",\n    "requiredTime":"1"\n}',
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });

    postman[Request]({
      name: "Create core lib lessons",
      id: "9e224ea4-aa59-401b-8a97-c531065f3b82",
      method: "POST",
      address: "{{apiUrl}}/courses/lessons-core",
      data:
        '{\n    "coreChaptersLink": "60630e11603be8cc3dae387e,6065f19186da8b67731306af",\n    "coreLessonsLink": "60630e1d603be8cc3dae3881,6065f22a86da8b67731306b3",\n    "courseId":"606192f35ceac9002e6a9c7f",\n    "isCreatedAsStatic":true\n}',
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });

    postman[Request]({
      name: "Publish Core Library lessons",
      id: "9e947720-9cc0-4b99-9b5c-a2821dd8f1a1",
      method: "POST",
      address: "{{apiUrl}}/core/63491626690a262126935b45/publish",
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });
  });

  group("Permissions", function() {
    postman[Request]({
      name: "Get Permissions",
      id: "d9d74cab-fac2-4b6f-9819-9890662fefa8",
      method: "GET",
      address: "{{apiUrl}}/permissions",
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });

    postman[Request]({
      name: "Create Permission Group",
      id: "7a4d4803-4f7b-484e-98e2-6eb21f715c6c",
      method: "POST",
      address: "{{apiUrl}}/permissions/group/create",
      data:
        '{\n    "groupName": "Owners 2",\n    "allowedPermissions": [],\n    "groupOrder": 10\n}',
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });

    postman[Request]({
      name: "Get Permission types",
      id: "1680b923-7891-4bf6-b64f-c8510c770273",
      method: "GET",
      address: "{{apiUrl}}/permissions/types",
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });

    postman[Request]({
      name: "Get permission groups",
      id: "758696ed-deca-4275-9064-0a263297f2e3",
      method: "GET",
      address: "{{apiUrl}}/permissions/groups",
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });

    postman[Request]({
      name: "Update permission group",
      id: "dbee3610-f9a1-4562-94b8-8611e59e4e1c",
      method: "PATCH",
      address: "{{apiUrl}}/permissions/group/edit/62c6de2935fbac8b2a333b78",
      data: '{    \n    "groupOrder": 2\n}',
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });

    postman[Request]({
      name: "Delete permission group",
      id: "61995ac3-9c2a-4619-9ff4-34bd6a824765",
      method: "DELETE",
      address: "{{apiUrl}}/permissions/group/delete/62cebffbdef4cec7f7c26f51",
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });

    postman[Request]({
      name: "Update Permissions",
      id: "ee0fd5f3-38a8-4ea7-bfe8-dcd4bdbe4404",
      method: "PATCH",
      address: "{{apiUrl}}/permissions/update/62c537ebead730f2b7aa6955",
      data:
        '{\n    "module": "grading",\n    "permissionsList": [\n      {\n        "permission": "viewGrading",\n        "displayName": "View Grading",\n        "severity": "normal"\n      },\n      {\n        "permission": "submitGradingFeedback",\n        "displayName": "Submit Grading Feedfack",\n        "severity": "normal"\n      }      \n    ]\n  }',
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });
  });

  group("Packages", function() {
    postman[Request]({
      name: "Get all Packages",
      id: "0ca7d59b-cc1a-4219-abb0-dd94c0e8e4ee",
      method: "GET",
      address: "{{apiUrl}}/packages",
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });

    postman[Request]({
      name: "Get All User Packages",
      id: "78b5c71a-f516-4f54-b188-9b972b766818",
      method: "GET",
      address: "{{apiUrl}}/users/6273e6f6ce04d40027baadcd/packages",
      auth(config, Var) {
        config.headers.Authorization = `Bearer ${pm[Var]("token")}`;
      }
    });
  });

  group("Discounts", function() {
    postman[Request]({
      name: "Update discount groups",
      id: "ae0d0377-5482-4b2e-b601-bc932e2dcd56",
      method: "PUT",
      address: "{{apiUrl}}/discounts/groups/62292317abd65500273bd0f7",
      data:
        '{\n    "createdAt": "2022-03-09T21:58:47.071Z",\n    "defaultCommisionType": "PERCENTAGE",\n    "defaultCommisionValue": 25,\n    "defaultDiscountType": "PERCENTAGE",\n    "defaultDiscountValue": 2,\n    "defaultFixedCode": "",\n    "name": "Students",\n    "updatedAt": "2022-07-25T05:34:48.377Z",\n    "__v": 0,\n    "_id": "62292317abd65500273bd0f7"\n}'
    });
  });
}
