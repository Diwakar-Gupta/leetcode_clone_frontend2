export function getProblemSet(slug, {pageSize, pageIndex}, callBackSuccess, callBackFailure){
    fetch(`/api/problemset/${slug}/`)
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
