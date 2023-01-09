# Sprint 01 : 백엔드 초기세팅

---

## Step 👣

전체 작업을 진행한 순서!

1. PostreSQL 설치
2. 사내 DB → Local 로 가져오기
3. 회사 github clone 해서 코드 확인하기
4. Layered Pattern으로 코드 아키텍쳐 구성 <br>
   a. `server.js`
   <br>
   b. `app.js`
   <br>
   c. `Controllers` , `Services` , `Models`
5. `.env` 파일 생성하기 <br>
   a. Local 과 실제 DB 따로 관리해야함 <br>
   b. 이를 통해 API를 로컬에서도 실행해 볼 수 있도록 구성

---

<br>

## MySQL VS PostgreSQL 📚

이번 기업에서는 `postgreSQL` 을 사용하게 됐다. 기존에 사용하던 `MySQL` 과 어떤 차이점이 있는지 정리해보고자 한다.

<br>

**용어 정리 〰️**

- **OLTP (Online Transaction Processing)**
  - 네트워크 상의 온라인 사용자들의 Database에 대한 일괄 트랜잭션 처리를 의미
  - Transaction 의 과정에서 INSERT/UPDATE 를 중점적으로 수행
- **OLAP (Online Analytical Processing)**
  - 시스템과 연관되어 Data 를 분석하고 의미있는 정보로 치환하거나, 복잡한 모델링을 가능하게끔 하는 분석 방법
  - SELECT Query 를 통한 데이터 스캔 Operation)

<br>

### `PostgreSQL`

- 오픈 소스로 무료로 사용 가능
- **ORDBMS** (Object Relational DataBase Management Systems) 객체 관계형 데이터 베이스
- **다양한 데이터 타입 제공** : 숫자, 문자열, 날짜와 시간 타입 이외에 기하학적인 도형, 네트워크 주소, JSON 항목등
- **지원 언어가 다양함**
- **사용처** : 복잡한 쿼리를 실행해야 하는 시스템, SELECT 와 INSERT (읽기 쓰기) 및 데이터를 검증해야하는 경우 대규모 서비스, OLTP, OLAP에 적절, 동시성이 중요한 작업에 사용

<br>

### `MySQL`

- 오픈 소스로 무료로 사용 가능 (유료도 존재)
- **RDBMS** (Relational DataBase Management Systems), 관계형 데이터 베이스
- **사용처** : 속도와 안정성, 사용의 용이성(접근성이 뛰어남) 및 대중성, Web Application, 간단한 동작을 구현하는 서비스

<br>

### `PostgreSQL을 선택`한 이유를 추측해보면..

- 무료 오픈 소스이며 서비스에 대한 안정성과 다양한 데이터 타입을 제공한다. 배리에는 문자열, 숫자 뿐만 아니라 다양한 데이터 타입을 다루고 있다.
- 또한, 배리는 OLTP 와 OLAP 둘다 지원하는 서비스를 제공하고 있다. OLAP 서비스로는 사용자가 이용한 서비스가 얼마나 활용되고 있고, 효율적인지 등에 대한 분석 지표를 제공한다.

---

<br>

## Git 초기세팅 😼

회사에서 새로 만들어준 git repo에 초기세팅을 하고, 파일을 실행해보니 문제가 생겼다.

- **문제** : Git repo를 clone 해온 그대로 npm을 시작하면 실행 되지 않음
- **원인** : repo안에 하위 폴더가 생성되어 있었기 때문, 주로 `app.js` , `server.js` 는 상위 폴더에 위치함
- **해결 방안** : 이전의 commit 들을 삭제하고, 원래 상태로 돌아와 다시 파일을 push 하는 방법

이전으로 돌리는 2가지 방법

- `reset` : 시간을 **아예** 과거의 특정 사건(commit)으로 되돌린다.
- `revert` : **현재에 있으면서** 과거의 특정 사건(commit)들만 없던 일로 만든다. 기록은 남아있음

두가지 방법 중, `reset` 을 선택했는데 그 이유는 1) 초기세팅 이기때문에 다른 파일이 없었음, 2) 팀원들이 따로 사용하는 브랜치가 없었음.

```bash
git reset [되돌아가야하는 commit ID 6자리]

// commit으로 돌아간 후 파일 형식에 변화: 하위 폴더 내용을 상위 폴더로 이동
// 이 경우, 충돌(conflict)가 발생할 확률이 높다.

git add .

git commit  -m "ADD: 초기세팅"

// 원격 저장소에 강제로 push하여 덮어쓰기
git push -u origin +main
```

`reset` 을 활용한 이전으로 되돌리기 방법과 `+` 를 사용한 강제 push 방법은 “혼자 작업”할때 사용해야 한다.또한, 여러 경우의 수를 고려한 후에 사용해야한다..!
