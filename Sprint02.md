# Sprint 2차 : DB 정리와 전체조회 API

---

## DB 정리 💬

대표님이 상세페이지에 필요한 데이터들을 정리해 주셨다. API를 만들기 위해서는 데이터를 어떤 테이블에서 가져오고 조합해서 보내야하는지에 대한 고민이 필요하다. 그 고민을 하기 위해 먼저 우리팀이 이해할 수 있는 언어로 DB 정리를 진행했다.

- **사용 툴** : PostgreSQL, TablePlus, Excel
- **진행 방식**
  - 필요한 데이터 파악 ( 사용자 이메일 등등 )
  - 테이블의 관계 파악 → 사용자들의 결제 내역은 사용자 테이블 id 값으로 묶여 있다 등의 FK 확인
  - 필요한 컬럼들을 엑셀파일에 정리해서 팀원들과 공유

<br>

## 전체조회 API ⚒️

프론트에 `mock data` 를 넘겨줘야 해서 전체 정보 조회 API를 수정하게 됐다.

기존의 로직은 “모든 정보”를 전달해야 했는데, 일부 정보를 선택해서 전달하기로 변경이 됐다.

**SQL 구문 변경하기**

```sql
SELECT email, TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI') created_at,
		TO_CHAR(TO_TIMESTAMP(last_login / 1000), 'YYYY-MM-DD HH24:MI') last_login,
		total_email,
		total_webpage,
		a.total
  FROM user
  LEFT JOIN (
    SELECT
    user_id as uid,
    SUM (amount) as total
  FROM payment_history
  GROUP BY user_id) as a ON a.uid = user.id
  WHERE deleted_at ISNULL;
```

1. **int8 로 되어 있는 시간을 TimeStamp 형식으로 바꾸기**

   - `TO_CHAR(expression, format)` **:** 데이터의 유형을 원하는 형식으로 변환하는 함수
   - `TO_TIMESTAMP(timestamp, format)` : 타임스탬프 형식으로 변환 해주는 함수

   ```sql
   # 1. unix Time으로 되어있는 timestamp로 변환
   # 2. TO_CHAR 함수를 사용해서 string으로 변환하며 형식도 변환

   TO_CHAR(TO_TIMESTAMP(last_login / 1000), 'YYYY-MM-DD HH24:MI') last_login
   ```

1. **subquery 문 활용하기**

   - `SUM(DISTINCT expression)` : SQL에서 총합을 구할 때 사용하는 함수

   ```sql
   # 1. 사용자 결제 금액을 SUM()함수를 통해 추출
   # 2. 서브쿼리로 테이블을 하나 생성하고, 그 테이블과 메인 테이블을 연결

   LEFT JOIN (
       SELECT
       user_id as uid,
       SUM (amount) as total
     FROM payment_history
     GROUP BY user_id) as a ON a.uid = user.id
   ```

<br>

## 상세 조회 API ⚒️

상세 조회 API는 사용자가 본인의 고객 정보를 확인할 수 있도록 정보를 제공한다.

- 프론트와 협의 : endpoint에 path param 으로 id값을 전달하기
- 전달해야하는 정보의 양이 많기에 Dao단에서 카테고리 별로 나눠서 전달하기

<br>

‼️ 쿼리문에 작성한 테이블 명과 컬럼명은 실제 사용된 이름이 아닙니다.
