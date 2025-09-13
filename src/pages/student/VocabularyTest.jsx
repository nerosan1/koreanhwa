import React, { useMemo } from 'react';
import VocabularyWritting from './VocabularyWritting';
import VocabularyPronunciation from './VocabularyPronunciation';
import ListenAndWriteQuiz from './VocabularyListenAndWriteQuiz';
import VocabularyMatching from './VocabularyMatching';
import VocabularyQuiz from './VocabularyQuiz';

const VocabularyTest = () => {
  // useMemo để random chỉ 1 lần khi component mount
  const RandomComponent = useMemo(() => {
    const components = [
      VocabularyWritting,
      VocabularyPronunciation,
      ListenAndWriteQuiz,
      VocabularyMatching,
      VocabularyQuiz,
    ];
    const randomIndex = Math.floor(Math.random() * components.length);
    return components[randomIndex];
  }, []);

  return (
    <div >
      <RandomComponent />
    </div>
  );
};

export default VocabularyTest;
