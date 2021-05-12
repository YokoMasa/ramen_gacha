## Url
[https://ramen-gacha.netlify.app/](https://ramen-gacha.netlify.app/)

## function開発環境構築手順
1. cloneしたフォルダで以下を実行  
```  
$ cd function
$ pip install -r requirements.txt
$ pip install functions-framework
```
2. start_dev_server.bat.exampleの{your gcp key}部分にGCP keyを入力し、start_dev_server.batに名前を変えて保存
3. start_dev_server.batを実行。ローカルサーバーが立ち上がれば成功

## functionデプロイ手順
1. 以下を実行
```
$ cd function
$ gcloud functions deploy ramen_gacha --region=asia-northeast1 --entry-point=search_ramen --runtime python37 --trigger-http --allow-unauthenticated
```
