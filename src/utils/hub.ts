import * as vscode from "vscode";
import * as path from "path";
import {getWebviewContent, getLoadingView, getAsstesPath} from "../template/template";
import { getListVideos } from "./api";

export default function(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
        "91hub",
        "Coding…………",
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            retainContextWhenHidden: true
        }
    );

  // And set its HTML content
    const jqPath = getAsstesPath(path.join(context.extensionPath, 'assets/js', 'jquery-3.3.1.min.js')).toString();
    const codeGif = getAsstesPath(path.join(context.extensionPath, 'assets/img', 'code.gif')).toString();
    const jsPath = getAsstesPath(path.join(context.extensionPath, 'assets/js', 'index.js')).toString();
    const loadingPath = getAsstesPath(path.join(context.extensionPath, 'assets/img', 'loading.gif')).toString();

    panel.webview.html = getLoadingView(loadingPath);

    Promise.all([getListVideos()]).then(([hub]) => {
        panel.webview.html = getWebviewContent({jqPath, jsPath, codeGif}, {hub});
    }).catch((err) => {
        console.log(err);
    });

//   getListVideos();
}
