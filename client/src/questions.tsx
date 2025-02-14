import { useState } from "react";

const [questions, setQuestions] = useState(false);
const handleQuestions = (e) => {console.log(e.target.checked);
  setQuestions(e.target.checked);
};

return (
  <div>
    <form className="form">
      <h4>{questions.id}{questions.legend}</h4>
      <div className="form-row" style={{textAlign: 'center'}}>
        <label htmlFor="answer1">answer1</label>
        <input type="checkbox"
        name="answer1"
        id="answer1"
        checked={answer1}
        onChange={handleQuestions} />
      </div>

      <div className="form-row" style={{textAlign: 'center'}}>
        <label htmlFor="answer2">answer2</label>
        <input type="checkbox"
        name="answer2"
        id="answer2"
        checked={answer2}
        onChange={handleQuestions} />
      </div>

      <div className="form-row" style={{textAlign: 'center'}}>
        <label htmlFor="answer3">answer3</label>
        <input type="checkbox"
        name="answer3"
        id="answer3"
        checked={answer3}
        onChange={handleQuestions} />
      </div>

      <div className="form-row" style={{textAlign: 'center'}}>
        <label htmlFor="answer4">answer4</label>
        <input type="checkbox"
        name="answer4"
        id="answer4"
        checked={answer4}
        onChange={handleQuestions} />
      </div>

      

    </form>
  </div>

)

export default handleQuestions;