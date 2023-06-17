/*
    input
    problem: {
        "language": "java",
        "code": "Test Problem 2",
        "actionType": "Run",
    }

    output
    {
        createdAt: "2023-05-12T08:43:30.123+00:00",
        submittionId: 1,
        submittionStatus: Accepted,
    }
 */
function createProblemSubmittion(problemSlug, payload, actionType, callBackSuccess, callBackFailure){
    actionType = actionType.toUpperCase();
    let url;
    if(actionType === 'TEST'){
        url = `/api/problems/${problemSlug}/submittions_run`;
    } else {
        url = `/api/problems/${problemSlug}/submittions`;
    }
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then(res => {
        if(res.ok){
            return res.json();
        } else {
            throw res;
        }
    })
    .then(res => {
        callBackSuccess(res);
    })
    .catch(err => {
        callBackFailure(err);
    });
}

export function testSolution(problemSlug, payload, callBackSuccess, callBackFailure){
console.log('Sending payload');
console.log(payload);
    fetch(`/api/problems/${problemSlug}/submittions_run`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then(res => {
        if(res.ok){
            return res.json();
        } else {
            throw res;
        }
    })
    .then(res => {
        callBackSuccess(res);
    })
    .catch(err => {
        callBackFailure(err);
    });
}

export function submitSolution(problemSlug, {code, language}, callBackSuccess, callBackFailure){
    createProblemSubmittion(
        problemSlug,
        {code, language},
        'SUBMIT',
        callBackSuccess,
        callBackFailure,
    );
}
