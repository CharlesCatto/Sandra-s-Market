import type React from "react";
import { useState } from "react";
import questionsData from "../../questions.json"; // Assuming questions.json is in the same directory

interface QuestionOption {
  img: string;
  checked: boolean;
}

interface QuestionsData {
  climate: QuestionOption[];
  budget: QuestionOption[];
  environnement: QuestionOption[];
  activity: QuestionOption[];
}

const QuestionsForm: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    climate: string[];
    budget: string[];
    environnement: string[];
    activity: string[];
  }>({
    climate: [],
    budget: [],
    environnement: [],
    activity: [],
  });

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: keyof QuestionsData,
  ) => {
    const { name, checked } = e.target;
    setSelectedAnswers((prevAnswers) => {
      const currentSelection = prevAnswers[category];
      return {
        ...prevAnswers,
        [category]: checked
          ? [...currentSelection, name]
          : currentSelection.filter((item) => item !== name),
      };
    });
  };

  const questionConfig: { label: string; key: keyof QuestionsData }[] = [
    { label: "Quel climat désirez-vous ?", key: "climate" },
    { label: "Quel budget ?", key: "budget" },
    { label: "Quel environnement ?", key: "environnement" },
    { label: "Quelles activités ?", key: "activity" },
  ];

  return (
    <div>
      <form className="form">
        {questionConfig.map((question) => (
          <fieldset key={question.key}>
            <legend>{question.label}</legend>
            {questionsData[question.key].map((option) => {
              const optionLabel =
                option.img.split(/[-.]/)[1] || option.img.split(".")[0];
              return (
                <div
                  className="form-row"
                  key={option.img}
                  style={{ textAlign: "center" }}
                >
                  <label htmlFor={`${question.key}-${optionLabel}`}>
                    {optionLabel}
                  </label>
                  <input
                    type="checkbox"
                    id={`${question.key}-${optionLabel}`}
                    name={optionLabel}
                    checked={selectedAnswers[question.key].includes(
                      optionLabel,
                    )}
                    onChange={(e) => handleCheckboxChange(e, question.key)}
                  />
                </div>
              );
            })}
          </fieldset>
        ))}
      </form>
      <pre>{JSON.stringify(selectedAnswers, null, 2)}</pre>{" "}
      {/* For debugging, you can remove this line */}
    </div>
  );
};

export default QuestionsForm;
