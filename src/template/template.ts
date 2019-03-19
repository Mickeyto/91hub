import * as vscode from "vscode";

interface AssetsConfig {
  jqPath ?: string;
  jsPath ?: string;
  codeGif ?:string;
}

interface JsonData{
  hub ?: any;
}

function getAsstesPath(path: string):object {
  const onDiskPath = vscode.Uri.file(path);

  return onDiskPath.with({scheme: 'vscode-resource'});
}

function getLoadingView(loadingPath:string):string {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Loading</title>
      <style>
          body,img{padding: 0;margin: 0 auto;display: block;}
      </style>
  </head>
  <body>
      <div>
          <img src="${loadingPath}" alt="">
      </div>
  </body>
  </html>`;
}

function getWebviewContent(asset: AssetsConfig, jsonData: JsonData):string {

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="Access-Control-Allow-Origin" content="*">
      <title>Title</title>
      <script src="${asset.jqPath}"></script>
      <style type="text/css">
          body, <img src="${asset.codeGif}" {
              height: 100%;
              padding: 0;
              margin: 0 auto;
          }
          a{
            cursor: pointer;
          }
          div {
              display: block;
          }
  
          section {
              display: block;
              width: 100%;
          }
  
          img{
              display: block;
              width: 100%;
          }
          a {
              display: block;
          }
  
          .row {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
          }
  
          .col-sm-4 {
              padding: 20px;
              width: 15%;
          }
  
          .video-title {
              display: block;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
          }
          .thumb-overlay {
              position: relative;
              width: 100%;
          }
          .hd-text-icon{
              position: absolute;
              top: 5px;
              right: 5px;
              border: none;
              background-color: #fbbc05;
              color: #000;
              padding: 1px 3px 0;
              line-height: 16px;
              text-align: center;
              font-size: 12px;
              border-radius: 3px;
              -moz-border-radius: 3px;
              -webkit-border-radius: 3px;
              font-weight: 700;
              font-family: Helvetica, Arial, sans-serif;
              letter-spacing: 0;
              -webkit-box-shadow: 1px 1px 0 0 rgba(0, 0, 0, .15);
              -moz-box-shadow: 1px 1px 0 0 rgba(0, 0, 0, .15);
              box-shadow: 1px 1px 0 0 rgba(0, 0, 0, .15);
          }
          .duration{
            position: absolute;
            bottom: 5px;
            right: 5px;
            border: none;
            background-color: rgba(0,0,0,.7);
            color: #fff;
            padding: 3px 5px;
            font-size: 12px;
            border-radius: 3px;
        }
        .video-views{
            color: #aaa;
            font-size: 13px;
        }
        .video-added{
            color: #555;
            font-size: 13px;
        }
      </style>
  </head>
  <body>
  <section>
      <div id="row" class="row">
          
      </div>
  </section>
  <script>
          window.JSON_DATA = ${JSON.stringify(jsonData.hub)};
          window.CODEGIF_DIR = "${asset.codeGif}";
  </script>
  <script src=${asset.jsPath}></script>
  <script>
    $('.img-responsive').hover(function(){
        const or_url = $(this).attr('data-original');
        const src_pic = $(this).attr('src');
        $(this).attr('src', or_url);
        $(this).attr('data-original', src_pic);
    });
  </script>
  </body>
  </html>`;
}

export {getWebviewContent, getLoadingView, getAsstesPath};
