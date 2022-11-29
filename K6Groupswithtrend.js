import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';
import { Rate } from 'k6/metrics';
import { group } from 'k6';
export let errorRate = new Rate('errors');

let groupDuration = Trend("groupDuration");

export let options = {
    vus: 10,
    duration: '20s',
    thresholds: {
        errors: ['rate<0.1'],
        'groupDuration{groupName:GetBooks}': ['avg<200'],
        'groupDuration{groupName:GetGroups}': ['avg<200'],
    },
}

function groupWithMetrics(NameofGroup, groupFunction) {
    let start = new Date();
    group(NameofGroup, groupFunction);
    let end = new Date();
    groupDuration.add(end - start, { groupName: NameofGroup })
}


export default function () {
    group("GetBooks", () => {
            const responsegetbooks = http.get('https://run.mocky.io/v3/bd30666d-e5a4-4347-a859-4d74f016ba64');
            const checkgetbookresponse = check(responsegetbooks, { " Is response of Get books 200 ?:": r => r.status === 200 });

            errorRate.add(!checkgetbookresponse);
        })

        group("GetGroups", () => {
            const responsegetgroups = http.get('https://run.mocky.io/v3/413c4ea2-92ee-407b-b24b-832c2dc97d73');
            const checkgetgroupsresponse = check(responsegetgroups, { " Is response of Get groups 200 ?:": r => r.status === 200 })

            errorRate.add(!checkgetgroupsresponse);
        }) 
}

