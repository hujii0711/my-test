@ECHO off
REM 현재 디렉터리 %~dp0: C:\_git\Portfolio_aws\lambda\deploy-packaging\upload\
SET currentDate=%date%
SET currentTime=%time%

SET lambda_name=lmda-polaris-portfolio-upload
SET package_folder=%lambda_name%_deploy
SET package_zip=%lambda_name%_deploy.zip

REM 1. package_folder 폴더 생성
mkdir "%~dp0\%package_folder%"

REM 2. 프로젝트 폴더의 모든 파일들을 package_folder 폴더에 복사
xcopy "%~dp0\..\..\%lambda_name%" "%~dp0\%package_folder%" /E /I /Y

REM 3. package_folder 폴더를 package_zip으로 만들기
zip -9vrj "%~dp0\%package_zip%" "%~dp0\%package_folder%" 

REM 4. package_zip 파일을 AWS CLI를 통한 업로드
aws lambda update-function-code --function-name "%lambda_name%" --zip-file fileb://%~dp0\"%package_zip%"
aws lambda publish-version --function-name "%lambda_name%" --description "%currentDate% %currentTime%(from polaris CEO)"

REM 5. package_folder과 package_zip 파일 삭제
@IF EXIST "%~dp0\%package_zip%" (
  del "%~dp0\%package_zip%"
)

@IF EXIST "%~dp0\%package_folder%" (
  rmdir /S /Q "%~dp0\%package_folder%"
)

pause
