import { useParams } from 'react-router-dom';
import { testSolution, submitSolution } from '../../backendApi/submittions';
import { getProblemBySlug } from '../../backendApi/problem';
import { useEffect, useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

function ProblemEditorPage(){
    const { problemSlug } = useParams();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editorLanguage, setEditorLanguage] = useState('java');
    let code = '';
    
    function handleRunCodeButtonPress() {
        const submittionDTO = {
            language: editorLanguage.id,
            code: code,
        };
        testSolution(problemSlug, submittionDTO, console.log, console.error);
    }

    function handleSubmitCodeButtonPress() {
        const submittionDTO = {
            language: editorLanguage.id,
            code: 'code',
        };
        submitSolution(problemSlug, submittionDTO, console.log, console.error);
    }
    function textAreaChangeHandler(e){
        e.preventDefault();
        code = e.target.value;
    }
    function editorLanguageChangehandler(e) {
        setEditorLanguage(e.target.value);
    }

    useEffect(() => {
        setLoading(true);
        function success(problem){
            setLoading(false);
            setEditorLanguage(problem.defaultLanguage);
            setProblem(problem);
        }
        function failed(err){
            setLoading(false);
            setError(err.err.statusText);
        }
        getProblemBySlug(problemSlug, success, failed);
    },[problemSlug]);

    if(loading){
        return (<div>Loading</div>);
    } else if(error){
        return (<div>{error}</div>)
    } else {
        return (
            <div>
                <div style={{'textAlign': 'start'}}>
                    <h3>{problem.title}</h3>
                    <MarkdownPreview
                        source={problem.description}
                        wrapperElement={{
                            "data-color-mode": "light"
                        }}
                            
                    />
                </div>
                    <div>
                        <select defaultValue={editorLanguage.id} onChange={editorLanguageChangehandler}>
                            {
                                problem.languageAvailable.map(lang => {
                                    return (
                                        <option key={lang.id} value={lang.id}>{lang.name}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                <div>
                    <textarea rows={10} cols={50} onChange={textAreaChangeHandler}>
                    </textarea>
                </div>
                    <button onClick={handleRunCodeButtonPress}>Test</button>
                    <button onClick={handleSubmitCodeButtonPress}>Submit</button>
                <div>
                </div>
            </div>
        );
    }
}

export default ProblemEditorPage;