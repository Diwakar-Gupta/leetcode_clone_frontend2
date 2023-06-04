import { useEffect, useState } from "react";
import { getProblemSet } from '../../backendApi/problemset';

function ProblemSetPage() {
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const pageSize = 20;
    const pageIndex = 0;

    useEffect(() => {
        setLoading(true);
        setError(null);

        function success(res) {
            setLoading(false);
            setProblems(res);
        }
        function failure(err) {
            setLoading(false);
            setError(`${err.status} ${err.statusText}`);
        }
        getProblemSet('all', { pageSize, pageIndex }, success, failure);
    }, [pageSize, pageIndex]);
    
    if (loading === true) {
        return (<div>Loading</div>)
    } else if (error) {
        return (<div>{error}</div>)
    } else {
        return (
            <div>
                {
                    problems.map(problem => {
                        return (
                            <div key={problem.slug}>
                                <a href={`/problems/${problem.slug}`}>{problem.title}</a>
                                <span>{problem.difficulty}</span>
                                <span>{problem.acceptance}</span>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default ProblemSetPage;