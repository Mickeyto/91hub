class Html{
    constructor(props){
        this.hub = props.response.videos || {};
        this.hubDom = document.getElementById('row');
        this.codeGif = window.CODEGIF_DIR;
        this.init();
    }

    init(){
        this.view();
    }
    timeformate(time){
        const date = new Date(time * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() : date.getMonth();
        const dat = date.getDate();
        const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        return year + '-' + month + '-' + dat + ' ' + h + ':' + m;
    }
    videoTimeformat(time){
        let h = parseInt(time/3600);
        let m = parseInt(time%3600/60);
        let s = Math.ceil(time%60);
        h = h < 9 ? '0' + h : h;
        m = m < 9 ? '0' + m : m;
        s = s < 9 ? '0' + s : s;

        return h + ':' + m + ':' + s;
    }
    view(){
        this.hubDom.innerHTML = this.videosList();
    }

    videosList(){
        const item = this.hub.map((items, index) => {
            return this.innerHtml(items);
        });

        return item;
    }

    innerHtml(items){
        const hdHt = items.hd ? '<div class="hd-text-icon">HD</div>' : '';
        const time = this.timeformate(items.addtime);
        const duration = this.videoTimeformat(items.duration);

        return `<div class="col-sm-4">
        <div class="well well-sm">
            <a class="test">
                <div class="thumb-overlay">
                    <img class="lazy img-responsive" src="${this.codeGif}" title="${items.title}" alt="${items.title}" data-original="${items.preview_url}">
                    ${hdHt}
                    <div class="duration">${duration}</div>
                </div>
                <span class="video-title title-truncate m-t-5">${items.embedded_url}</span>
            </a>
            <div class="video-added">${time}</div>
            <div class="video-views pull-left"><b>views:</b>${items.viewnumber}</div>
            <div><details>${items.title}</details></div>
            <div class="clearfix"></div>
        </div>
    </div>`;
    }

}

new Html(window.JSON_DATA || {})