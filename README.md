## App 구조

1. 앱 테스트: npx expo start -> i 로 실행합니다. (Expo, iOS Simulator)
2. App은 Home, QuizStack으로 구성되어 있습니다.
3. QuizStack은 Quiz와 AnswerNote 컴포넌트를 갖는 스택 네비게이션입니다.
4. Quiz 컴포넌트는 하위 컴포넌트인 SingleQuestion을 포함합니다.

## 구현 기능 가이드

### 퀴즈 풀기

- 상단에 진행 상황(총 문제 수와 현재 번호)을 확인합니다.
- 유저가 답을 선택하고 confirm 버튼을 누르면 Modal 스크린이 올라옵니다.
- Modal 스크린에는 정답 여부와 다음 문제로 넘어가는 Next 버튼이 있습니다.
- 마지막 문제를 풀고 Next 버튼을 누르면 결과 확인 스크린을 보여줍니다.

### 결과 확인

- 총 문제 수, 정답 개수, 정답 확률, 걸린 시간을 보여줍니다.
- 다시 풀기 버튼을 누르면 기록을 리셋하고 동일한 퀴즈를 처음부터 다시 풀 수 있습니다.
- 오답 노트 버튼을 누르면 유저가 선택한 오답과 정답들을 확인할 수 있습니다.
- 끝내기 버튼을 누르면 Home 스크린으로 돌아가 새로운 퀴즈를 시작할 수 있습니다.

## 세부 기능 소개

### Time record (퀴즈 푸는데 걸리는 시간 측정)

- Home에서 퀴즈 풀기 버튼을 누르면 timeRecord에 시작 시점을 기록하고 Quiz 스크린이 나타납니다.
- 마지막 문제를 풀고 Next 버튼을 누르면 timeRecord에 끝 시점을 기록합니다.
- timeConversion function은 퀴즈 푸는데 걸린 시간을 minute, seconds 단위로 변환한 record를 리턴합니다.
- 결과 확인 스크린에서 record를 걸린 시간을 보여줍니다.

### Shuffle list (객관식 문항 랜덤 배열)

- Quiz 컴포넌트는 SingleQuestion 컴포넌트로 question, correct_answer, incorrect_answers를 props으로 전달합니다.
- incorrect_answers 배열에 correct_answer을 추가하고, shuffleList function으로 배열을 랜덤으로 섞어서 리턴합니다.
