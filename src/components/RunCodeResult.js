const RunCodeResult = ({ submittionUpdate, testCases }) => {
  let judgement = submittionUpdate.judgement;
  const testCase = submittionUpdate?.testCases
    ? submittionUpdate.testCases[0]
    : null;
  const testCaseInput = testCases[0].input;

  let output = "Pending";
  let expected = "Pending";

  if (testCase) {
    judgement = testCase.status;
    output = testCase.content || testCase.output;
    expected = testCase.output;
  }

  return (
    <div>
      <h4>Run Code Result: {judgement}</h4>
      <div style={{ padding: "2rem", border: "1px solid black" }}>
        <div style={{ "text-align": "left" }}>
          <p>Your input</p>
          <textarea style={{ width: "100%" }} value={testCaseInput} />
        </div>
        <div style={{ display: "flex", "justify-content": "space-between" }}>
          <div
            style={{ "text-align": "left", width: expected ? "40%" : "100%" }}
          >
            <p>Your answer</p>
            <textarea
              style={{ width: "100%", height: "5rem" }}
              value={output}
            />
          </div>
          {expected ? (
            <div style={{ "text-align": "left", width: "40%" }}>
              <p>Expected answer</p>
              <textarea
                style={{ width: "100%", height: "5rem" }}
                value={expected}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunCodeResult;
