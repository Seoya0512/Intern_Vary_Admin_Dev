# Sprint 03 : API 마무리 및 TS

## 상세 조회 API 로직 만들기 💬

지난 스프린트에 상세 조회를 끝내려고 했는데, 다소 복잡한 구조를 발견하고 그 다음 스프린트로 미뤘다.

- **문제** : VARY의 두가지 서비스인 이메일, 웹사이트 구독을 분별할 수 있는 방법이 없다.
- **해결 :** 회사의 서비스가 어떤 프로세스로 진행되는지 생각해보기 ⚒️
  - VARY는 “선 결제 서비스”라는 특성을 가지고 있어 최근에 결제한 이용 내역이 사용자가 사용하고 있는 서비스라고 인식 할 수 있다.
  - 즉, 결제 이력을 담고있는 데이터에는 해당 금액이 이메일 혹은 웹사이트 인지 분별할 수 있었다.

<br>

## JS에 TS 입히기 ➕

지난 프로젝트에서는 계속 javascript만 사용했었는데, 이번 프로젝트에서는 TypeScript를 사용하게 됐다. Typescript는 자바스크립트에 타입이 추가된 언어이다. 크게 다른 점은 없지만, 컴파일 타임에서 에러를 미리 잡을 수 있기 때문에 용이하다.

TypeScript를 사용한 대표적인 예시로는, Error등을 미들웨어로 처리할 때 사용했다.

```tsx
interface Error {
  statusCode?: number;
  code?: number;
  stack?: string;
  message?: string;
}

export const raiseCustomError = (message?: string, statusCode?: number) => {
  const err: Error = new Error(message);
  err.statusCode = statusCode;
  throw err;
};
```

`interface` 는 객체의 타입을 정의할 때 사용된다. 위 코드에서 raiseCustomError라는 함수의 인자에 type을 정하고, err라고 선언한 상수 값의 타입을 Error로 지정했다.
