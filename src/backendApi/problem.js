/*
    input
    problem: {
        "slug": "test-problem-2",
        "title": "Test Problem 2",
        "description": "This is test description for problem 2",
        "testStrategy": "CompleteRun",
        "solutionCheckStrategy": "TrimThenExact"
    }

    output
    {
        createdAt: "2023-05-12T08:43:30.123+00:00",
        description: "This is test description for problem 2",
        resourceURL: "/problems/test-problem-2/",
        slug: "test-problem-2",
        solutionCheckStrategy: "TrimThenExact",
        testStrategy: "CompleteRun",
        title: "Test Problem 2"
    }
 */
export function createProblem(problem, callBackSuccess, callBackFailure){
    fetch('/api/problems/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(problem),
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        callBackSuccess(res);
    })
    .catch(err => {
        callBackFailure(err);
    });
}

export function getProblemBySlug(slug, callBackSuccess, callBackFailure){
    fetch(`/api/problems/${slug}/`)
    .then(res => {
        if(res.ok){
            return res.json();
        } else {
            throw res;
        }
    })
    .then(res => {
        res.defaultLanguage = {id: 'open-java-8', name: 'Open jdk 8'};
        res.languages = [
            {id: 'py37', name: 'Python 3.7'},
            {id: 'py38', name: 'Python 3.8'},
            {id: 'open-java-8', name: 'Open jdk 8'},
            {id: 'oracle-java-8', name: 'Oracle Java 8'},
        ];
        callBackSuccess(res);
    })
    .catch(err => {
        callBackFailure(err);
    });
}
