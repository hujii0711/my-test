@ECHO off
REM 현재 디렉터리 %~dp0: C:\_git\Portfolio_aws\lambda\deploy-packaging\upload\
SET currentDate=%date%
SET currentTime=%time%

SET lambda_name=lmda-polaris-portfolio-upload
SET package_folder=%lambda_name%_deploy
SET package_zip=%lambda_name%_deploy.zip

REM 1. package_folder 폴더 생성
mkdir "%~dp0%package_folder%"

REM 2. 프로젝트 폴더의 모든 파일들을 package_folder 폴더에 복사
REM /Y: 대상 경로에 이미 동일한 이름의 파일이 있어도 덮어쓰기를 수행합니다.
REM /E: 디렉터리 및 하위 디렉터리에 있는 모든 파일을 복사합니다.
REM /I: 대상 경로가 디렉터리인 경우, 복사할 디렉터리인지 확인하지 않고 디렉터리로 처리합니다.
xcopy "%~dp0..\..\%lambda_name%" "%~dp0%package_folder%" /E /Y

REM .\*.* 현재 디렉터리의 포함되지 않고 하위 폴더들을 zip으로 생성
REM 3. package_folder 폴더를 package_zip으로 만들기
REM -r: 폴더의 하위까지 모두 묶는다.
cd "%~dp0%package_folder%"
zip -r "%~dp0%package_zip%" .\*.*
pause

REM 4. package_zip 파일을 AWS CLI를 통한 업로드
aws lambda update-function-code --function-name "%lambda_name%" --zip-file fileb://"%~dp0%package_zip%"
REM aws lambda publish-version --function-name "%lambda_name%" --description "%currentDate% %currentTime%(from polaris CEO)"
pause
REM 5. package_folder과 package_zip 파일 삭제
@IF EXIST "%~dp0%package_zip%" (
  del "%~dp0\%package_zip%"
)

cd "%~dp0"
@IF EXIST "%~dp0%package_folder%" (
  rmdir /S /Q "%~dp0\%package_folder%"
)
