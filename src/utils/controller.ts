import * as vscode from "vscode";
import { Videos } from "./videos";
import * as path from "path";
import {
  getWebviewContent,
  getLoadingView,
  getAsstesPath
} from "../template/template";
import { getCategroies } from "./api";

const quickPick = vscode.window.createQuickPick();

quickPick.onDidChangeSelection(select => {
  if (select[0]) {
    const item: any = select[0];
    quickPick.busy = true;
    quickPick.hide();
    Controller.categroiesVideosList(item.chid);
  }
});

const showQuickPick = (item: any, placeholder: string) => {
  quickPick.busy = false;
  quickPick.placeholder = placeholder;
  quickPick.items = item;
  quickPick.show();
};

export const Controller = {
  webviewPanel: {},
  currentPanel: {},
  categroiesList: (context: vscode.ExtensionContext) => {
    Controller.webviewPanel = context;
    getCategroies().then((res: any) => {
      const response: Array<object> = res.response.categories;
      const result = response.map((item: any, index: any) => ({
        label: item.shortname,
        description: item.name,
        chid: item.CHID
      }));

      showQuickPick(result, "video 分类");
    });
  },
  categroiesVideosList: (chid: any) => {
    Controller.webview(chid);
  },
  webview: (chid: any) => {
    if(JSON.stringify(Controller.currentPanel) === '{}'){
        Controller.currentPanel = vscode.window.createWebviewPanel(
            "91hub",
            "Coding…………",
            vscode.ViewColumn.One,
            {
              enableScripts: true,
              retainContextWhenHidden: true
            }
          );
    }

    const panel:any = Controller.currentPanel;

    const webviewPanel: any = Controller.webviewPanel;
    // And set its HTML content
    const jqPath = getAsstesPath(
      path.join(webviewPanel.extensionPath, "assets/js", "jquery-3.3.1.min.js")
    ).toString();
    const codeGif = getAsstesPath(
      path.join(webviewPanel.extensionPath, "assets/img", "code.gif")
    ).toString();
    const jsPath = getAsstesPath(
      path.join(webviewPanel.extensionPath, "assets/js", "index.js")
    ).toString();
    const loadingPath = getAsstesPath(
      path.join(webviewPanel.extensionPath, "assets/img", "loading.gif")
    ).toString();

    panel.webview.html = getLoadingView(loadingPath);

    Promise.all([Videos.list(chid)])
      .then(([hub]) => {
        panel.webview.html = getWebviewContent(
          { jqPath, jsPath, codeGif },
          { hub }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
};
