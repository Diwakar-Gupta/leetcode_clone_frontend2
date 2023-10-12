import { useParams } from "react-router-dom";
import {
  testSolution,
  submitSolution,
  codeRunUpdateListener,
} from "../../backendApi/submittions";
import { getProblemBySlug } from "../../backendApi/problem";
import { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

function ProblemEditorPage() {
  const { problemSlug } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editorLanguageSlug, setEditorLanguageSlug] = useState("java");
  let [code, setCode] = useState("");

  function handleRunCodeButtonPress() {
    const submittionDTO = {
      languageSlug: editorLanguageSlug,
      code: code,
    };
    function onCodeStatupdate(meta) {
      console.log(meta);
    }
    function onConnectionClose() {
      // did not work now
      console.log("connection closed");
    }
    function codeSubmittedhandler(meta) {
      console.log(meta);
      codeRunUpdateListener(meta, onCodeStatupdate, onConnectionClose);
    }
    testSolution(
      problemSlug,
      submittionDTO,
      codeSubmittedhandler,
      console.error
    );
  }

  function handleSubmitCodeButtonPress() {
    const submittionDTO = {
      languageSlug: editorLanguageSlug,
      code: code,
    };
    submitSolution(problemSlug, submittionDTO, console.log, console.error);
  }
  function textAreaChangeHandler(e) {
    e.preventDefault();
    const newCode = e.target.value;
    setCode(newCode);
  }
  function editorLanguageChangehandler(e) {
    setEditorLanguageSlug(e.target.value);
  }

  useEffect(() => {
    setLoading(true);
    function success(problem) {
      console.log(problem);
      setLoading(false);
      setEditorLanguageSlug(problem.defaultLanguage.slug);
      setProblem(problem);
    }
    function failed(err) {
      setLoading(false);
      setError(err.err.statusText);
    }
    getProblemBySlug(problemSlug, success, failed);
  }, [problemSlug]);

  if (loading) {
    return <div>Loading</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div>
        <div style={{ textAlign: "start" }}>
          <h3>{problem.title}</h3>
          <MarkdownPreview
            source={problem.description}
            wrapperElement={{
              "data-color-mode": "light",
            }}
          />
        </div>
        <div>
          <select
            defaultValue={editorLanguageSlug}
            onChange={editorLanguageChangehandler}
          >
            {problem.languageAvailable.map((lang) => {
              return (
                <option key={lang.slug} value={lang.slug}>
                  {lang.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <textarea
            rows={10}
            cols={50}
            value={code}
            onChange={textAreaChangeHandler}
          ></textarea>
        </div>
        <button onClick={handleRunCodeButtonPress}>Test</button>
        <button onClick={handleSubmitCodeButtonPress}>Submit</button>
        <div></div>
      </div>
    );
  }
}

export default ProblemEditorPage;
